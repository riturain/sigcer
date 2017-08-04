<?php //CERTIFICADOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "inspeccionFrontera";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/inspeccionFrontera.php");
require("../model/lacteos-autorizaciones.php");

if (isset($_POST['accion'])){	
	switch($_POST['accion']){	
		case 'guardarInspeccion':
			/* guardar */
			//para repost - no borrar
			$_SESSION['rePost'] = $_POST; 
			
			//validar datos: idCertificado, idInsFrontera, idUsuario y estado			
			
			//para recargar una vez que guardó
			$_SESSION['idAut'] = $_POST['idAutorizacion'];
			$_SESSION['idCert'] = $_POST['idCertificado'];
			$_SESSION['idFrontera'] = $_POST['idInspeccionFrontera'];
				
			/* guardar inspeccion */
			$ret = inspeccionesFronteraABMWeb($_POST['idInspeccionFrontera'], $_POST['idCertificado'], $_SESSION['id_usuario'], $_POST['verificado']);
			switch ($ret){
				case 0:
					//error al guardar
					$_SESSION['rojo'] = "La inspección no se pudo guardar.";
					break;
				case 1:
					//guardado correctamente
					$_SESSION['verde'] = "Se guardó la inspección correctamente";
					unset($_SESSION['rePost']);//guardó correctamente -> borro el re_post
					break;
			}
			/* - FIN DE GUARDAR - */
			header ('Location: inspeccionFrontera.php');
			return false;
		break;

		case 'autocompletarPaises'://MODELO PAISES
			require("../model/paises.php");
			$paises = paisesRetornaSimilares($_POST['term']);
			echo(json_encode(utf8_encode_all($paises)));
			break;
			
		case 'buscarCertificadosParaInsp':			
			$numCert = $_POST['numCertificado'];
			$numAut = $_POST['numAutorizacion'];
			$empre = $_POST['empresa'];
			$anio = $_POST['anio'];			
			$destino = $_POST['destino'];
			$certificados = certificadosRetornaParaInspFrontera($numCert, $numAut, $empre, $anio, $destino);
			echo(json_encode(utf8_encode_all($certificados)));
			break;

		case 'buscarInspeccionesFrontera':
			//del buscador de inspecciones frontera
			$numCert = $_POST['numCertificado'];
			$numAut = $_POST['numAutorizacion'];
			$empre = $_POST['empresa'];
			$anio = $_POST['anio'];			
			$destino = $_POST['destino'];
			$certificados = inspeccionesFronteraBuscaDatos($numCert, $numAut, $empre, $anio, $destino);
			echo(json_encode(utf8_encode_all($certificados)));
			break;
		
		case 'traerCertificado':
			$_SESSION['idAut'] = $_POST['id_autorizacion'];
			$_SESSION['idCert'] = $_POST['id_certificado'];
			echo "1";
			// recarga JAVASCRIPT
			break;
		
		case 'traerDatosInspeccionFronteraDeCertificado':
			$_SESSION['idAut'] = $_POST['id_autorizacion'];
			$_SESSION['idCert'] = $_POST['id_certificado'];
			$_SESSION['idFrontera'] = $_POST['id_inspeccion'];			
			echo "1";
			// recarga JAVASCRIPT
			break;
		
		case 'validaEstadoParaModificar':			
			echo "1";
			break;
	}
}else{

	if(isset($_SESSION['idAut'])){
	
		if(isset($_SESSION['idCert'])){
			//traer Datos del certificado
			$datosCertificado = certificadosRetornaDatosWeb($_SESSION['idCert']);
			
			$productosCertificado = certificadosRetornaProdAfectados($_SESSION['idCert']);
			$contenedoresCertificado = certificadosRetornaContProdAfectados($_SESSION['idCert']);			
			$lotesCertificado = certificadosRetornaLotesWeb($_SESSION['idCert']);
			
			$firmantesCertificado = certificadosRetornaFirmantesWeb($_SESSION['idCert']);
			$datosEmpresaCertificado = certificadosRetornaDatosEmpresaWeb($_SESSION['idCert']);
			
			$observada = certificadosRetornaObservaciones($_SESSION['idCert']);
			
			unset($_SESSION['idCert']);
			$_SESSION['inspecciones'] = $datosCertificado['Inspecciones'];
		}

		if(isset($_SESSION['idFrontera'])){		
			$datosInspeccionFrontera = inspeccionesFronteraRetornaDatos($_SESSION['idFrontera']);
			$_SESSION['datosIns'] = $datosInspeccionFrontera;
		}
		
		//info autorización
		$autorizacion = array();
		$autorizacion['datos'] = autorizacionesRetornaDatos($_SESSION['idAut']);
		$ret = autorizacionesRetornaPlantas($_SESSION['idAut']);		
		$autorizacion['plantas'] = autorizacionesRetornaPlantasPosibles($autorizacion['datos']['IdEmpAut'], $autorizacion['datos']['IdPais'], $_SESSION['id_usuario']);
		$autorizacion['plantasId'] = $ret['plantas'];		
		//productos
		$autorizacion['productos'] = certificadosRetornaProdInspSelec($_SESSION['inspecciones'], $_SESSION['idAut']);
		
		$pics = paisesRetornaPicAMostrar($autorizacion['datos']['IdPais']);
		
		//firmantes
		$firmantes = array();
		$firmantes[1] = firmantesRetornaDatos(1); //combo 1
		$firmantes[2] = firmantesRetornaDatos(2); //combo 2
		
		//inspecciones concatenadas
		$ids = explode("#", $_SESSION['inspecciones']);
		$primerId = $ids[1];
		//buque
		$buque = certificadosRetornaTransporteInspeccion($primerId,$_SESSION['idAut']);		
		//contendores
		$contenedores = certificadosRetornaContInspSelec($_SESSION['inspecciones'],$_SESSION['idAut']);
		//productos
		$itProductos = certificadosRetornaProductosParaLotes($_SESSION['inspecciones'],$_SESSION['idAut']);
		//inspecciones
		$inspecciones = $_SESSION['inspecciones']; //NO BORRAR
		
		if(isset($_SESSION['idAut'])){ unset($_SESSION['idAut']);}
		if(isset($_SESSION['inspecciones'])){ unset($_SESSION['inspecciones']);}		
		if(isset($_SESSION['idFrontera'])){ unset($_SESSION['idFrontera']);}
	}	
	
	//buscador	
	$anios = admRetornaAniosProcesados();
		
	//datos de la página
	$_SESSION['ruta'] = "Inspección de Frontera";
	$contenido = 'inspeccionFrontera.php';
	require('../view/layout.php');
	if (isset($_SESSION['rePost'])){
		unset($_SESSION['rePost']);
	}
}
?>