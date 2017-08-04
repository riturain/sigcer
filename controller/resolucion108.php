<?php //resolucion108 CONTROLLER
@session_start();
$_SESSION['archivo'] = "resolucion108";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/resolucion108.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'traerPlantasresolucion108':					
			$plantas = resolucion108RetornaPlantasPosibles($_POST['que_eligio'],$_POST['idempresa108']);		
			echo(json_encode(utf8_encode_all($plantas)));
			break;	
		case 'autocompletarEmpresas': 
			require("../model/empresas.php");
			$empresas = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
			echo(json_encode(utf8_encode_all($empresas)));
			break;	
		case 'guardarResolucion108':
			require("../classes/validador.php");
			if ((validarFecha($_POST['fechadeVigencia'])) && ($_POST['listadoPlantas'] != '')){
				guardardatosResolucion108($_POST['fechadeVigencia'],$_POST['listadoPlantas']);
				$_SESSION['verde'] = 'Se han guardado los datos de la empresa';
			}
			$_SESSION['res_idEmp'] = $_POST['idEmp'];
			$_SESSION['res_nomEmp'] = utf8_decode($_POST['nomEmp']);
			$_SESSION['res_op'] = $_POST['op'];
			break;
		default:
			$_SESSION['amarillo'] = 'No hay una opción para eso';
			header('Location: resolucion108.php');
			break;
	}
}else{
	if (isset($_SESSION['res_idEmp'])){
		$resIdEmp = $_SESSION['res_idEmp']; unset($_SESSION['res_idEmp']);		
		$resNomEmp = $_SESSION['res_nomEmp']; unset($_SESSION['res_nomEmp']);
		$resOp = $_SESSION['res_op']; unset($_SESSION['res_op']);		
	}
	$_SESSION['ruta'] = "Resolución 108";
	$contenido = 'resolucion108.php';
	require('../view/layout.php');
}
?>