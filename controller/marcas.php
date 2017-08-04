<?php // MARCAS CONTROLLER
@session_start();
$_SESSION['archivo'] = "marcas";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/marcas.php");
require("../model/empresas.php");
require("../classes/functions.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
	case 'autocompletarPlantas': //MODELO EMPRESAS
		$plantasAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'PLANTA');
		echo(json_encode(utf8_encode_all($plantasAuto)));
		break;
	
	case 'autocompletarProductos':
		$productosAuto = ProductosRetornaSimilares($_POST['term']);
		echo(json_encode(utf8_encode_all($productosAuto)));
		break;
	case 'traerEmpresasAsociadas':
		$empresasAsociadas = MarcasYPlantasRetornaDatos($_POST['id_marca'], $_SESSION['id_usuario']);
		echo json_encode(utf8_encode_all($empresasAsociadas));
		break;

	case 'guardar': // Guardar Importador	
		$res = marcasRegistraDatos($_POST['id_marca'],utf8_decode($_POST['marca']));
		echo $res;
		break;
		
	case 'guardarEmpresas':
		
		//DEL LISTADO DE CAMBIOS
		/*$largo = $_POST['cantCambios'];
		for ($i=0; $i< $largo; $i++){		
			switch($_POST['cambioEstado'.$i]){
			case 'borrar':
				marcasYPlantasAsocBorrarDatos($_POST['id_marca'], $_POST['cambioIdEmpresa'.$i]);
				break;
			case 'guardar':
				marcasYPlantasRegistraDatos($_POST['id_marca'], $_POST['cambioIdEmpresa'.$i]);
				break;
			}
		}*/
		$arr_borrar = array();
		if ($_POST['listadoABorrar'] != ""){
			$arr_borrar = explode('#', $_POST['listadoABorrar']);
		}	
		foreach ($arr_borrar as $idABorrar){
			$posasterisco = strpos($idABorrar,'*');
			$laplanta = substr($idABorrar,0,$posasterisco);
			$elproducto = substr($idABorrar,$posasterisco +1,50);
			marcasYPlantasAsocBorrarDatos($_POST['id_marca'], $laplanta,$elproducto);
		}		
		$arr_nuevos = array();
		if ($_POST['listadoNuevas'] != ""){
			$arr_nuevos = explode('#', $_POST['listadoNuevas']);
		}
		foreach ($arr_nuevos as $idAGuardar){
			$posasterisco = strpos($idAGuardar,'*');
			$laplanta = substr($idAGuardar,0,$posasterisco);
			$elproducto = substr($idAGuardar,$posasterisco +1,50);
			marcasYPlantasRegistraDatos($_POST['id_marca'], $laplanta,$elproducto);
		}		
		$_SESSION['verde'] = 'Se han guardado los datos de la marca comercial: '.$_POST['marcadesc'];
		header('Location: marcas.php');
		break;	
	}		
}else{
	$marcas = MarcasRetornaDatos($_SESSION['id_usuario']);
	$_SESSION['ruta'] = "Marcas Comerciales";
	$contenido = 'marcas.php';
	require('../view/layout.php');
}
?>