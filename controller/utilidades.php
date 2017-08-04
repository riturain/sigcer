<?php //UTILIDADES CONTROLLER 
@session_start();
$_SESSION['archivo'] = "utilidades";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
$_SESSION['ruta'] = "Utilidades";
$contenido = 'utilidades.php';
require('../view/layout.php');
?>