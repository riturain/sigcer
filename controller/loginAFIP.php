<?php 
@session_start();
require("../security/checkBrowser.php");

//verificar si no está logueado ya
if ((isset($_SESSION['logueado'])) && ($_SESSION['logueado'] == 1)){
	header('Location: home.php');
	return false;
}
if ((!isset($_POST['token'])) || (!isset($_POST['sign']))){
	header('Location: cerrarsesion.php');
	return false;
}

// login AFIP
// 2 parámetros:
	//-un TOKEN XML
	//-una FIRMA
	
# EJEMPLO DEL XML:
/*
<?xml version="1.0"?> 
<sso version="2.0">
<id src="	
		C=AR,
		L=Ciudad Autonoma de Buenos Aires,
		O=Administracion Federal de Ingresos Publicos,
		OU=DeSeIn,
		serialNumber=CUIT 33693450239,
		CN=AuthServerHomo" 
	dst="senasa_sigsa" 
	unique_id="548368367" 
	gen_time="1375970967" 
	exp_time="1375971447"/>
<operation type="login" value="granted">
<login 	service="senasa_sigsa" 
		entity="33693450239" 
		uid="20205406701" 
		authmethod="passphrase" 
		regmethod="3">
	<relations>
		<relation key="20205406701" reltype="12"/>
		<relation key="30709556734" reltype="12"/>
	</relations>
</login>
</operation>
</sso>
*/	
	
	
#==============================================================================
	function VerifySignature($tokenXML,$firma){
		//echo "-".$firma."-";
		$pubkeyid = openssl_get_publickey(file_get_contents('authhomo-external-signing.crt'));
		$s = openssl_verify($tokenXML, $firma, $pubkeyid);
		if ($s == -1) {return "Error verifying signature";}
		if ($s == 0) {return "Invalid signature";}
		return true;
	}
#==============================================================================
	
	$tokenXML=base64_decode($_POST['token']);	
	$firma=base64_decode($_POST['sign']);

	//$_SESSION['xml'] = $tokenXML;
	//$_SESSION['firma'] = $firma;
	//
	//exit();
	
	
/** BORRAR **/
/*
$tokenXML = <<<XML
<?xml version="1.0"?> 
<sso version="2.0">
<id src="	
		C=AR,
		L=Ciudad Autonoma de Buenos Aires,
		O=Administracion Federal de Ingresos Publicos,
		OU=DeSeIn,
		serialNumber=CUIT 33693450239,
		CN=AuthServerHomo" 
	dst="senasa_sigsa" 
	unique_id="548368367" 
	gen_time="1375970967" 
	exp_time="1375971447"/>
<operation type="login" value="granted">
<login 	service="senasa_sigsa" 
		entity="33693450239" 
		uid="20205406701" 
		authmethod="passphrase" 
		regmethod="3">
	<relations>
		<relation key="20205406701" reltype="12"/>
		<relation key="30709556734" reltype="12"/>
	</relations>
</login>
</operation>
</sso>
XML;
*/
/** BORRAR HASTA ACÁ **/

	
	$parser = new SimpleXMLElement($tokenXML);
	#SERVICE - 
	#Se debe validar que el servicio que viene en el XML sea el que corresponda a la aplicación 
	#(en el caso de senasa_service es un ejemplo, para lacteos va a ser otro)	
	#	// que el nombre del service sea el correcto
	if (!(isset($parser->operation->login['service'])) || ($parser->operation->login['service'] != 'senasa_sigcer')){
		header('Location: cerrarsesion.php');
		return false;
	}
	
	#HORA - Y se debe validar que la hora esté entre los parámetros gen_time y exp_time que vienen en el XML
	#	// que la hora actual esté entre gen_time y exp_time	
	if (!isset($parser->id['gen_time'])){
		header('Location: cerrarsesion.php');
		return false;
	}	
	if (!isset($parser->id['exp_time'])){
		header('Location: cerrarsesion.php');
		return false;
	}
	$now = time();
	$genTime = $parser->id['gen_time'];
	$expTime = $parser->id['exp_time'];	
	if (($now > $expTime) || ($now < $genTime)){
		header('Location: cerrarsesion.php');
		return false;
	}	
	
	#verificar XML Y FIRMA
	//if (!VerifySignature($tokenXML,$firma)){
	//	$_SESSION['sale'] = 5;
	//	header('Location: cerrarsesion.php');
	//	return false;
	//}
	
	#UID - Luego en el XML viene el campo uid ( en el ejemplo, uid="20205406701" que trae el CUIT del usuario que está conectándose 
	#	//UID -> $_SESSION['UID'] = $uid;
	#CUITS - Y más abajo, en los tags relation ( que pueden venir varios ) viene la lista de CUIT representados por la persona que se conecta ( entre los que figura el cuit de la persona que se conecta )
	#Estos últimos CUITS son los importantes, se deben buscar cuál de estos corresponde a una empresa de Lechera habilitada para operar el sistema, para dejarlo entrar si hay alguno ) 
	#	//viendo el listado de cuits, si no hay ningún habilitado -> logoff
	
	$_SESSION['UID'] = (string)$parser->operation->login['uid'];
	//$i = 0;
	//$_SESSION['CUITS'] = array();
	$cuits = "";
	foreach ($parser->operation->login->relations->relation as $rel){
		//$_SESSION['CUITS'][$i] = "".$rel['key']."";
		if ($cuits == ''){
			$cuits = "".$rel['key']."";
		}else{
			$cuits .= "#".$rel['key']."";
		}
		//$i++;
	}
	
	#ver si algún cuit de $_SESSION['CUITS'] pertenece a una empresa lechera
	require("../classes/sql2k.php");
	require("../model/login.php");
	$ret = admVerificaAccesoAfip($_SESSION['UID'],$cuits);
	if ($ret != '0'){
		$datos = usuariosInfoLog($ret);
		$_SESSION['logueado'] = 1;
		$_SESSION['id_usuario'] = $datos['Idusuario'];
		$_SESSION['perfil'] = $datos['IdPerfil']; 
		$_SESSION['nyap'] = $datos['Usuario'];
		$_SESSION['tipo_usuario'] = $datos['Tipo'];
		$_SESSION['tipo_acceso'] = $datos['TipoAcceso'];
		$_SESSION['UID'] = $datos['CUIT'];
		$_SESSION['loginType'] = 'AFIP';
		menuPorTipoDeAcceso();
		header('Location: home.php');
		return false;
	}else{
		$_SESSION['rojo'] = "No está autorizado para operar con ninguna empresa Láctea.";		
		header('Location: error.php');
		exit();
	}
?>