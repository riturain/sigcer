<?php //USUARIOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "auditoria";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/auditoria.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		case 'buscarTramite':
			require("../classes/validador.php");
			if (validarNumeroEntre($_POST['anio'], 2000, 2050) && validarSoloNumeros($_POST['num'])){
				$ret = bitacoraRetornaDatos($_POST['num'],$_POST['anio'],$_POST['tipoTramite']);
				echo (json_encode(utf8_encode_all($ret)));				
				return false;
			}else{
				echo "0";
				return false;
			}
			break;
		case 'verTramite':
			$ret = bitacoraRetornaDetalle($_POST['idBitacora']);
			echo (json_encode(utf8_encode_all($ret)));
			break;
	}
}else{
	
	if (isset($_SESSION['auditoriaTramite'])){
		$auditTramite = $_SESSION['auditoriaTramite'];
		unset($_SESSION['auditoriaTramite']);
	}
	
	//datos de relleno
	$tiposTramite = bitacoraRetornaTablas();
	$anios = admRetornaAniosProcesados();
	
	//datos de la página
	$_SESSION['ruta'] = "Auditoria";
	$contenido = 'auditoria.php';
	require('../view/layout.php');
}
?>