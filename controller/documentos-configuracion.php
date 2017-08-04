<?php //DOCUMENTOS CONFIGURACION CONTROLLER 
@session_start();
$_SESSION['archivo'] = "documentos-configuracion";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
$_SESSION['ruta'] = "Documentos Configuración";
$contenido = 'documentos-configuracion.php';
require('../view/layout.php');
?>