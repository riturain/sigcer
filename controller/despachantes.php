<?php // IMPORTADORES CONTROLLER
@session_start();
$_SESSION['archivo'] = "despachantes";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/despachantes.php");
require("../model/empresas.php");
require("../classes/functions.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
	case 'autocompletarEmpresas': //MODELO EMPRESAS
		$empreAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
		echo(json_encode(utf8_encode_all($empreAuto)));
		break;
	
	case 'traerEmpresasAsociadas':
		$empresasAsociadas = despachantesYEmpresasRetornaDatos($_POST['id_despachante']);
		echo json_encode(utf8_encode_all($empresasAsociadas));
		break;

	case 'guardar': // Guardar Importador		
		$res = despachantesRegistraDatos($_POST['id_despachante'],utf8_decode($_POST['despachantedesc']),utf8_decode($_POST['telefonodesp']),$_POST['maildesp']);
		echo $res;
		break;
		
	case 'guardarEmpresas':		
		$arr_borrar = array();
		if ($_POST['listadoABorrar'] != ""){
			$arr_borrar = explode('#', $_POST['listadoABorrar']);
		}		
		foreach ($arr_borrar as $idABorrar){
			despachantesYEmpresaAsocBorrarDatos($_POST['id_despachante'], $idABorrar);
		}		
		$arr_nuevos = array();
		if ($_POST['listadoNuevas'] != ""){
			$arr_nuevos = explode('#', $_POST['listadoNuevas']);
		}
		foreach ($arr_nuevos as $idAGuardar){
			despachantesYEmpresasRegistraDatos($_POST['id_despachante'], $idAGuardar);
		}

		$_SESSION['verde'] = 'Se han guardado los datos del despachante: '.$_POST['despachante'];
		header('Location: despachantes.php');
		break;	
	}		
}else{
	$despachantes = despachantesRetornaDatos($_SESSION['id_usuario']);
	//$empresas = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario']);	
	$_SESSION['ruta'] = "Despachantes";
	$contenido = 'despachantes.php';
	require('../view/layout.php');
}
?>