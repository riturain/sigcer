<?php //DOCUMENTOS MODELOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "documentos-modelos";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
$_SESSION['ruta'] = "Documentos Modelos";
$contenido = 'documentos-modelos.php';
require('../view/layout.php');
?>