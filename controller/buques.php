<?php // BUQUES CONTROLLER
@session_start();
$_SESSION['archivo'] = "buques";
require("../classes/sql2k.php");
require("../security/checkUser.php");
require("../model/buques.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'guardar': // Guardar Importador	
			$res = BuquesRegistraDatos($_POST['id_buque'],$_POST['id_terminal'],utf8_decode($_POST['buque']));			
			if ($res == 1){
				$_SESSION['verde'] = 'Se han guardado los datos del buque: '.$_POST['Post_buque'];
			}else{
				$_SESSION['rojo'] = 'Ya existe un buque con los datos ingresados';
			}
			echo $res;
			break;
	}		
}else{
	$buques = BuquesRetornaTodos();
	$terminales = TerminalesRetornaTodas();
	$_SESSION['ruta'] = "Buques";
	$contenido = 'buques.php';
	require('../view/layout.php');
}
?>