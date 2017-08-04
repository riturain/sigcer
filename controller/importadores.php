<?php // IMPORTADORES CONTROLLER
@session_start();
$_SESSION['archivo'] = "importadores";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/importadores.php");
require("../model/empresas.php");
require("../classes/functions.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
	case 'autocompletarEmpresas': //MODELO EMPRESAS
		$empreAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
		echo(json_encode(utf8_encode_all($empreAuto)));
		break;
		
	case 'traerEmpresasAsociadas':
		$empresasAsociadas = importadoresYEmpresasRetornaDatos($_POST['id_importador'],$_SESSION['id_usuario']);		
		echo json_encode(utf8_encode_all($empresasAsociadas));
		break;

	case 'guardar': // Guardar Importador		
		$res = importadoresRegistraDatos($_POST['id_importador'],utf8_decode($_POST['importador']));
		echo $res;
		break;
		
	case 'guardarEmpresas':		
		$arr_borrar = array();
		if ($_POST['listadoABorrar'] != ""){
			$arr_borrar = explode('#', $_POST['listadoABorrar']);
		}		
		foreach ($arr_borrar as $idABorrar){
			importadoresYEmpresaAsocBorrarDatos($_POST['id'], $idABorrar);
		}		
		$arr_nuevos = array();
		if ($_POST['listadoNuevas'] != ""){
			$arr_nuevos = explode('#', $_POST['listadoNuevas']);
		}
		foreach ($arr_nuevos as $idAGuardar){
			importadoresYEmpresasRegistraDatos($_POST['id'], $idAGuardar);
		}
		$_SESSION['verde'] = 'Se han guardado los datos del importador: '.$_POST['descripcion'];
		header('Location: importadores.php');
		break;	
	}		
}else{
	$importadores = importadoresRetornaDatos($_SESSION['id_usuario']);
	//$empresas = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario']);	
	$_SESSION['ruta'] = "Importadores";
	$contenido = 'importadores.php';
	require('../view/layout.php');
}
?>