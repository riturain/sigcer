<?php //LÁCTEOS ANEXOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "lacteos-anexos";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
switch ($_SESSION['perfil']){
			case 2:
				$_SESSION['ruta'] = "Lácteos | Anexos";
				break;
			case '10':
				$_SESSION['ruta'] = "Apícola | Anexos";
				break;
			case 11:
				$_SESSION['ruta'] = "Lácteos/Apícola | Anexos";
				break;
			default:
				$_SESSION['ruta'] = "Anexos";
				break;
	}
$contenido = 'lacteos-anexos.php';
require('../view/layout.php');
?>