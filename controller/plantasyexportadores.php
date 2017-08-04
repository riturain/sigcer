<?php //plantasyexportadores CONTROLLER
@session_start();
$_SESSION['archivo'] = "plantasyexportadores";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/plantasyexportadores.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'traerLosExportadores':					
			$plantas = RetornaExportadoresAsociados($_POST['idplantaquery']);		
			echo(json_encode(utf8_encode_all($plantas)));
			break;	
		case 'autocompletarPlantas': 
			$plantasbuscadas = buscadorPlantas($_POST['term']);
			echo(json_encode(utf8_encode_all($plantasbuscadas)));
			break;	
		case 'autocompletarExportadores': 
			$exportadoresposibles = buscadorExportadores($_POST['idplantaasociada'],$_POST['term']);
			echo(json_encode(utf8_encode_all($exportadoresposibles)));
			break;
		case 'guardarExportadores':
			require("../classes/validador.php");
			if ((validarFecha($_POST['fechadeVigencia'])) && ($_POST['listadoExpo'] != '')){
				guardardatosExportadoresAsociados($_POST['idPlantaAReg'],$_POST['fechadeVigencia'],$_POST['limKilos'],$_POST['listadoExpo']);
				$_SESSION['verde'] = 'Se han guardado los datos de la planta elaboradora.';
			}
			$_SESSION['res_idPlanta'] = $_POST['idPlantaAReg'];
			$_SESSION['res_nomPlanta'] = utf8_decode($_POST['nomDePlanta']);
			$_SESSION['res_nomEmpresa'] = utf8_decode($_POST['laEmpresa']);
			break;
		default:
			$_SESSION['amarillo'] = 'No hay una opción para eso';
			header('Location: plantasyexportadores.php');
			break;
	}
}else{
	if (isset($_SESSION['res_idPlanta'])){
		$resIdPlanta = $_SESSION['res_idPlanta']; unset($_SESSION['res_idPlanta']);		
		$resNomPlanta = $_SESSION['res_nomPlanta']; unset($_SESSION['res_nomPlanta']);
		$resNomEmpresa = $_SESSION['res_nomEmpresa']; unset($_SESSION['res_nomEmpresa']);
	}
	$_SESSION['ruta'] = "Plantas Elaboradoras y Empresas Exportadoras";
	$contenido = 'plantasyexportadores.php';
	require('../view/layout.php');
}
?>