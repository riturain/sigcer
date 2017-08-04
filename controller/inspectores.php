<?php // INSPECTORES CONTROLLER
@session_start();
$_SESSION['archivo'] = "inspectores";  // archivo js y ccs que van dentro de la carpeta section
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require('../model/inspectores.php');
//SI ES ESTÁN SETEADAS LAS VARIABLES de ID_INSPECTOR Y NAME_INSPECTOR ES PARA REGISTRAR
if (isset($_POST['accion'])){
	if ($_POST['accion'] == 'autocompletarPerfil'){
		$usuarios = RetornaDatosSegunUsuario($_POST['term']);		
		echo(json_encode(utf8_encode_all($usuarios)));
	}
}else{
	if (isset($_POST['id_inspector']) && isset($_POST['name_inspector'])){		
		inspectoresRegistraDatos(
			$_POST['id_inspector'],
			strtoupper(utf8_decode($_POST['name_inspector'])),
			utf8_decode($_POST['tel_inspector']),
			$_POST['mail_inspector'],
			$_POST['id_usuario_insp']
			);
	}else{
		$losinspectores = inspectoresRetornaTodos();		
		$_SESSION['ruta'] = "Inspectores";  //indica lo que se muestra como titulo de la pagina a mostrar
		$contenido = 'inspectores.php';  //lo que va a mostrar layout.php
		require('../view/layout.php');
	}
}
?>