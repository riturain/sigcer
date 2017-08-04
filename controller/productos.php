<?php //PRODUCTOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "productos";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/productos.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		
		case 'guardarProducto': // Guardar Producto				
				
				$idProducto = productosRegistraDatos($_POST['id_producto'],$_POST['id_subgrupo'],$_POST['producto']);
				
				//traducciones
				$largo = $_POST["cantidadTraducciones"];
				for ($i=0; $i< $largo; $i++){
					switch ($_POST[$i."estadoTraduccion"]){
						case  "nuevo": 
							productosRegistraTraducciones(0,$idProducto,$_POST[$i."idIdioma"],$_POST[$i."traduccion"]);
							break;
						case  "borrar": 										
							borrarTraduccion($_POST[$i."idTraduccion"]);										
							break;					
					}
				}
				
				//análisis
				$largo = $_POST["cantidadAnalisis"];
				for ($i=0; $i< $largo; $i++){
					switch ($_POST[$i."estadoAnalisis"]){
						case  "nuevo":
							productosRegistraAnalisis(0,$idProducto,$_POST[$i."idAnalisis"],$_POST[$i."valorAnalisis"]);
							break;
						case  "borrar":
							borrarAnalisis($_POST[$i."idAnalisis"]);
							break;
					}
				}
				
				//plantas-marcas
				$arr_borrar = array();
				if ($_POST['listadoABorrar'] != ""){
					$arr_borrar = explode('#', $_POST['listadoABorrar']);
				}	
				foreach ($arr_borrar as $idABorrar){
					$posasterisco = strpos($idABorrar,'*');
					$laplanta = substr($idABorrar,0,$posasterisco);
					$laMarca = substr($idABorrar,$posasterisco +1,50);
					plantasElaboradorasYProductosBorrar($laplanta,$idProducto,$laMarca);
				}		
				$arr_nuevos = array();
				if ($_POST['listadoNuevas'] != ""){
					$arr_nuevos = explode('#', $_POST['listadoNuevas']);
				}
				foreach ($arr_nuevos as $idAGuardar){
					$posasterisco = strpos($idAGuardar,'*');
					$laplanta = substr($idAGuardar,0,$posasterisco);
					$laMarca = substr($idAGuardar,$posasterisco +1,50);
					plantasElaboradorasYProductosRegDatos($laplanta,$idProducto,$laMarca);
				}
				$_SESSION['traerIdProducto'] = $idProducto;
				$_SESSION['verde'] = 'Se ha guardado el producto: '.$_POST['producto'];
				header('Location: productos.php');
				return false;
				break;
		
		case 'buscarProductos':
			$productos = productosRetornaSimilares($_POST['term']);
			echo (json_encode(utf8_encode_all($productos)));
			break;
		
		case 'traerProducto':
			$datos = productosRetornaDatos($_POST['id']);
			echo (json_encode(utf8_encode_all($datos)));
			break;
		
		case 'traerTraducciones': // traigo la traducción del análisis seleccionado				
			$traducciones = traduccionesRetornaDatos($_POST['id_producto']);
			echo (json_encode(utf8_encode_all($traducciones)));
			break;
		
		case 'traerAnalisisDeProducto':
			$analisis = productosRetornaAnalisis($_POST['id_producto']);
			echo (json_encode(utf8_encode_all($analisis)));
			break;
		
		case 'autocompletarPlantas': //MODELO EMPRESAS
			require("../model/empresas.php");
			$plantasAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'PLANTA');
			echo (json_encode(utf8_encode_all($plantasAuto)));
			break;
		
		case 'autocompletarMarcas':
			$marcasAuto = marcasRetornaSimilares($_POST['term']);
			echo (json_encode(utf8_encode_all($marcasAuto)));
			break;
			
		case 'traerPlantasMarcasDeProducto':
			$datos = productosRetornaPlantasElabora($_POST['id_producto']);
			echo (json_encode(utf8_encode_all($datos)));
			break;
		
	}
}else{
	
	if (isset($_SESSION['traerIdProducto'])){
		$productoGuardado = $_SESSION['traerIdProducto'];
		unset($_SESSION['traerIdProducto']);
	}
	
	//datos de relleno
	$subgrupos = productosRetornaSubGrupos();
	$idiomas = IdiomasRetornaTodos();
	$analisisListado = analisisRetornaTodos();
	
	//datos de página
	$_SESSION['ruta'] = "Productos";
	$contenido = 'productos.php';
	require('../view/layout.php');
}
?>