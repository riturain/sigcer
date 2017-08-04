<?php // ENVASES CONTROLLER
@session_start();
$_SESSION['archivo'] = "envases";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/envases.php");
include("../classes/functions.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		case 'traerTraducciones': // traigo la traducción del análisis seleccionado				
				$traducciones = envasesRetornaTraducciones($_POST['id_envase']);	
				//devolver en json
				echo json_encode(utf8_encode_all($traducciones)); //sale por ajax
				break;
				
		case 'guardar': // Guardar Envase
				$res = envasesRegistraDatos($_POST['id_envase'],utf8_decode($_POST['envase']));
				echo $res;
				break;
		
		case 'guardarTraducciones': 
				$largo = $_POST["cantidadTraducciones"];
				for ($i=0; $i< $largo; $i++){
					switch ($_POST[$i."estadoTraduccion"]){
						case  "nuevo": 
										envasesRegistraTraducciones($_POST['id_envase'],$_POST[$i."idIdioma"],utf8_decode($_POST[$i."traduccion"]),$_POST[$i."idTraduccion"]);
										break;
						case  "borrar": 	
										borrarTraduccion($_POST[$i."idTraduccion"]);
										break;					
					}
				}
				$_SESSION['verde'] = 'Se han guardado los datos del envase: '.$_POST['envase'];
				header('Location: envases.php');
				break;
		
	}
}else{
	$envases = envasesRetornaTodos();
	$idiomas = IdiomasRetornaTodos();	
	$_SESSION['ruta'] = "Clases de Envases";
	$contenido = 'envases.php';
	require('../view/layout.php');
}
?>