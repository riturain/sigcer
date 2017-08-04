<?php // terminales CONTROLLER
@session_start();
$_SESSION['archivo'] = "terminales";
require("../classes/sql2k.php");
require("../security/checkUser.php");
require("../model/terminales.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'guardar': // Guardar Importador	
			$res = terminalRegistraDatos($_POST['id_terminal'],utf8_decode(strtoupper($_POST['terminal'])),$_POST['fecha_vto']);
			$_SESSION['asd'] = $res;
			if ($res == 1){
				$_SESSION['verde'] = 'Se han guardado los datos de la terminal: '.$_POST['Post_terminal'];
			}else{
				$_SESSION['rojo'] = 'Ya existe una terminal con los datos ingresados';
			}
			echo $res;
			break;
	}		
}else{
	$terminales = terminalesRetornaTodas();	
	//$_SESSION['terminales'] = $terminales;
	$_SESSION['ruta'] = "Terminales";
	$contenido = 'terminales.php';
	require('../view/layout.php');
}
?>