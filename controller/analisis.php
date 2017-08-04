<?php // ANALISIS CONTROLLER
@session_start();
$_SESSION['archivo'] = "analisis";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/analisis.php");
include("../classes/functions.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'traerTraducciones': // traigo la traducción del análisis seleccionado				
				$traducciones = analisisRetornaTraducciones($_POST['id_analisis']);	
				//devolver en json
				echo json_encode(utf8_encode_all($traducciones)); //sale por ajax
				break;
				
		case 'guardar': // Guardar Análisis
				$res = analisisRegistraDatos($_POST['id_analisis'],utf8_decode($_POST['analisis']),$_POST['tipo_analisis']);								
				echo $res;
				break;
		
		case 'guardarTraducciones':				
				$largo = $_POST["cantidadTraducciones"];
				for ($i=0; $i< $largo; $i++){
					switch ($_POST[$i."estadoTraduccion"]){
						case  "nuevo": 
										analisisRegistraTraducciones($_POST['id'],$_POST[$i."idIdioma"],utf8_decode($_POST[$i."traduccion"]));
										break;
						case  "borrar": 										
										borrarTraduccion($_POST[$i."idTraduccion"]);										
										break;					
					}
				}
				$_SESSION['verde'] = 'Se han guardado los datos del análisis: '.$_POST['descripcion'];
				header('Location: analisis.php');
				break;				
	}
}else{
	$analisis = analisisRetornaTodos();
	$tipos = analisisRetornaTipos();
	$idiomas = IdiomasRetornaTodos();	
	$_SESSION['ruta'] = "Análisis";
	$contenido = 'analisis.php';
	require('../view/layout.php');
}
?>