<?php //CONTROLLER
@session_start();
$_SESSION['archivo'] = "consulta_empresa";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/consulta_empresa.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		case 'traerEmpresa':
			$datosdelaempresa = empresaRetornaDatos($_POST['id_empresa']);
			echo(json_encode(utf8_encode_all($datosdelaempresa)));
			break;
		case 'buscarEmpresas':
			$par2 = $_POST['empresa'];
			$lasempresas = empresasBuscarDatos($par2);
			echo(json_encode(utf8_encode_all($lasempresas)));
			break;
		case 'traerPlantas':
			$par = $_POST['id_empresa'];
			$lasplantas = empresaRetornaPlantas($par);
			echo(json_encode(utf8_encode_all($lasplantas)));
			break;
		case 'traerProductos':
			$par = $_POST['id_empresa'];
			$losproductos = empresasRetornaProductos($par);
			echo(json_encode(utf8_encode_all($losproductos)));
			break;
		case 'traerDespachantes':
			$losdespachantes = EmpresasRetornaDespachantesSegunUsuario($_SESSION['id_usuario'],$_POST['id_empresa']);
			echo(json_encode(utf8_encode_all($losdespachantes)));
			break;
		case 'traerImportadores':
			$losimportadores = EmpresasRetornaImportadores($_POST['id_empresa']);
			echo(json_encode(utf8_encode_all($losimportadores)));
			break;
		case 'traerDestinos':
			$losdestinos = EmpresasRetornaDestinos($_POST['id_empresa']);
			echo(json_encode(utf8_encode_all($losdestinos)));
			break;
		case 'traerInfo108':
			$datos108 = EmpresasRetornaInfoRes108($_POST['id_empresa']);
			echo(json_encode(utf8_encode_all($datos108)));
			break;
		case 'traerExportadores':
			$infoexpo = EmpresasRetornaExportadoresAsociados($_POST['id_empresa']);
			echo(json_encode(utf8_encode_all($infoexpo)));
			break;
		default:
			header('Location: consulta_empresa.php');
			break;
	}
}else{
	$_SESSION['ruta'] = "Consulta General por Empresa";
	$contenido = 'consulta_empresa.php';
	require('../view/layout.php');	
}
?>