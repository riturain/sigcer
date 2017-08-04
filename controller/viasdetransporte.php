<?php // VIAS DE TRANSPORTE CONTROLLER
@session_start();
$_SESSION['archivo'] = "viasdetransporte";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/viasdetransporte.php");
include("../classes/functions.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'traerTraducciones': // traigo la traducción del análisis seleccionado				
				$traducciones = ViasdetransporteRetornaTraducciones($_POST['id_via_transporte']);	
				//devolver en json
				echo json_encode(utf8_encode_all($traducciones)); //sale por ajax
				break;
				
		case 'guardar': // Guardar transporte
				$res = viasdeTransporteRegistraDatos($_POST['id_transporte'],utf8_decode($_POST['transporte']),$_POST['tipo_via'],$_POST['limite']);								
				echo $res;
				break;
		
		case 'guardarTraducciones':				
				$largo = $_POST["cantidadTraducciones"];			
				for ($i=0; $i< $largo; $i++){
					switch ($_POST[$i."estadoTraduccion"]){
						case  "nuevo": 
										viasdetransporteRegistraTraducciones($_POST[$i."idTraduccion"],$_POST['id_transporte'],$_POST[$i."idIdioma"],utf8_decode($_POST[$i."traduccion"]));
										break;
						case  "borrar": 										
										borrarTraduccion($_POST[$i."idTraduccion"]);										
										break;					
					}
				}
				$_SESSION['verde'] = 'Se han guardado los datos del transporte: '.$_POST['transporte'];
				header('Location: viasdetransporte.php');
				break;				
	}
}else{
	$viasdetransporte = ViasdeTransporteRetornaTodas();
	$idiomas = IdiomasRetornaTodos();	
	$_SESSION['ruta'] = "Vías de Transporte";
	$contenido = 'viasdetransporte.php';
	require('../view/layout.php');
}
?>