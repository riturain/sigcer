<?php //PASOS FRONTERIZOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "pasosfronterizos";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/pasosfronterizos.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		case 'guardar': 			
			//guarda datos
			if ($_POST['estado'] == 'nuevo'){
				$_POST['id_paso'] = 0;
			}
			//salva el idPaso para volver a mostrar el paso fronterizo guardado
			$idPaso = pasosFronterizosRegistraDatos($_POST['id_paso'], $_POST['nombre_paso']);
			if ($idPaso != 0){
				$_SESSION['traerIdPaso'] = $idPaso;
				$_SESSION['traerNombrePaso'] = $_POST['nombre_paso'];
				$vias = "";
				if (isset($_POST['transporte'])){
					foreach($_POST['transporte'] as $each){
						if ($vias == ""){
							$vias = "$each";
						}
						$vias .= "#$each";
					}
				}
				pasosFronterizosAsignaTransporte($idPaso,$vias);
				$_SESSION['verde'] = 'Se ha guardado el paso fronterizo: '.$_POST['nombre_paso'];
			}else{
				$_SESSION['traerIdPaso'] = $_SESSION['id_paso'];
				$_SESSION['traerNombrePaso'] = $_SESSION['nombre_paso_hidden'];
				$_SESSION['rojo'] = 'No se pudo guardar el paso fronterizo: '.$_POST['nombre_paso'];
			}
			header('Location: pasosfronterizos.php');
			return false;
			break;
			
		case 'pasosRetornaVias':
			$vias = pasosFronterizosRetornaViasTransporte($_POST['id_paso']);			
			echo (json_encode(utf8_encode_all($vias)));
			break;
	}
}else{
	
	if (isset($_SESSION['traerIdPaso'])){
		$idPasoGuardado = $_SESSION['traerIdPaso'];
		$pasoGuardado = $_SESSION['traerNombrePaso'];
		unset($_SESSION['traerIdPaso']);
	}
	
	//datos de relleno	
	$pasosFronterizos = pasosFronterizosRetornaTodos();
	
	//datos de página
	$_SESSION['ruta'] = "Pasos fronterizos";
	$contenido = 'pasosfronterizos.php';
	require('../view/layout.php');
}
?>






