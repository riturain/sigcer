<?php // PROVISORIOS CONTROLLER
@session_start();
$_SESSION['archivo'] = "provisorios";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/provisorios.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'guardar':
			if (isset($_POST['ids_provisorios']) && ($_POST['ids_provisorios'] != "")){
				$_POST['ids_provisorios'] = "#".$_POST['ids_provisorios']."#";
				$res = provisoriosAprobar($_SESSION['id_usuario'], $_POST['ids_provisorios']);
				$_SESSION['verde'] = "Se aprobaron los provisorios seleccionados";
			}
			break;
		case 'buscar':			
			$numero 	= (isset($_POST['numero']) && ($_POST['numero'] != ''))? $_POST['numero'] : 0;
			$empresa 	= (isset($_POST['empresa']) && ($_POST['empresa'] != ''))? $_POST['empresa'] : 'null';
			$planta 	= (isset($_POST['planta']) && ($_POST['planta'] != ''))? $_POST['planta'] : 'null';
			$idPais 	= (isset($_POST['idPais']) && ($_POST['idPais'] != ''))? $_POST['idPais'] : 0;
			$provisorios = provisoriosRetornaAprobNoAprob(1, $numero, $empresa, $planta, $idPais);
			echo json_encode(utf8_encode_all($provisorios));
			return false;
			break;
	}
}
$provisorios = provisoriosRetornaAprobNoAprob(0);

$_SESSION['ruta'] = "Provisorios";
$contenido = 'provisorios.php';
require('../view/layout.php');

?>