<?php // POR CUENTA Y ORDEN CONTROLLER
@session_start();
$_SESSION['archivo'] = "cuentayorden";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/cuentayorden.php");
require("../model/empresas.php");
require("../classes/functions.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
	case 'autocompletarEmpresas': //MODELO EMPRESAS
		$empreAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
		echo(json_encode(utf8_encode_all($empreAuto)));
		break;
	
	case 'traerEmpresasAsociadas':
		$empresasAsociadas = cuentayordenYEmpresasRetornaDatos($_POST['id_cuentayorden'], $_SESSION['id_usuario']);
		echo json_encode(utf8_encode_all($empresasAsociadas));
		break;

	case 'guardar': // Guardar cuenta y orden	
		$res = cuentayordenRegistraDatos($_POST['id_cuentayorden'],STRTOUPPER(utf8_decode($_POST['cuentayorden'])));
		echo $res;
		break;
		
	case 'guardarEmpresas':
		//DEL LISTADO DE CAMBIOS
		/*$largo = $_POST['cantCambios'];
		for ($i=0; $i< $largo; $i++){		
			switch($_POST['cambioEstado'.$i]){
			case 'borrar':
				cuentayordenYEmpresaAsocBorrarDatos($_POST['id'], $_POST['cambioIdEmpresa'.$i]);
				break;
			case 'guardar':
				cuentayordenYEmpresasRegistraDatos($_POST['id'], $_POST['cambioIdEmpresa'.$i]);
				break;
			}
		}*/
		$arr_borrar = array();
		if ($_POST['listadoABorrar'] != ""){
			$arr_borrar = explode('#', $_POST['listadoABorrar']);
		}		
		foreach ($arr_borrar as $idABorrar){
			cuentayordenYEmpresaAsocBorrarDatos($_POST['id'], $idABorrar);
		}		
		$arr_nuevos = array();
		if ($_POST['listadoNuevas'] != ""){
			$arr_nuevos = explode('#', $_POST['listadoNuevas']);
		}
		foreach ($arr_nuevos as $idAGuardar){
			cuentayordenYEmpresasRegistraDatos($_POST['id'], $idAGuardar);
		}		
		$_SESSION['verde'] = 'Se han guardado los datos de la cuenta: '.$_POST['descripcion'];
		header('Location: cuentayorden.php');
		break;	
	}		
}else{
	$cuentayorden = cuentayordenRetornaDatos($_SESSION['id_usuario']);
	//$empresas = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario']);	
	$_SESSION['ruta'] = "Por Cuenta y orden";
	$contenido = 'cuentayorden.php';
	require('../view/layout.php');
}
?>