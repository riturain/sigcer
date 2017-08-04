<?php // ADUANAS CONTROLLER
@session_start();
$_SESSION['archivo'] = "aduanas";
require('../classes/sql2k.php');
require("../model/modeloComun.php");
require("../security/checkUser.php");
require('../model/aduanas.php');

//SI ES ESTÁN SETEADAS LAS VARIABLES de ID_ADUANA Y NAME_ADUANA ES PARA REGISTRAR
if (isset($_POST['id_aduana']) && isset($_POST['name_aduana'])){
	$ret = aduanasRegistraDatos($_POST['id_aduana'], utf8_decode($_POST['name_aduana']));	
	if ($ret){
		$_SESSION['verde'] = 'Se han guardado los datos ';
	}else{
		$_SESSION['rojo'] = 'La aduana ya existe. ';
	}
	echo $ret;
}else{		
	$aduanas = aduanasRetornaTodas();
	$_SESSION['ruta'] = "Aduanas";
	$contenido = 'aduanas.php';
	require('../view/layout.php');
}
?>