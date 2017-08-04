<?php //PAISES CONTROLLER 
@session_start();
$_SESSION['archivo'] = "paises";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/paises.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		case 'guardar': 
			//guarda datos
			if (isset($_POST['llevaProvisorio'])){
				$provisorio = 1;
			}else{
				$provisorio = 0;			
			}
			paisesRegistraDatos($_POST['id_pais'],$_POST['grupoPais'],$provisorio);
						
			//guarda vias de transporte
			/*$vias = "";
			if (isset($_POST['transporte'])){
				foreach($_POST['transporte'] as $each){
					if ($vias == ""){
						$vias = "$each";
					}
					$vias .= "#$each";
				}
			}
			paisesRegistraViaTransporte($_POST['id_pais'],$vias);*/
			
			//guarda pics
			$pics = "";
			if (isset($_POST['pic'])){
				foreach($_POST['pic'] as $each){
					if ($pics == ""){
						$pics = "$each";
					}
					$pics .= "#$each";
				}
			}
			paisesRegistraPic($_POST['id_pais'],$pics);
			
			//guarda pasos fronterizos
			$pasos = "";
			if (isset($_POST['paso'])){
				foreach($_POST['paso'] as $each){
					if ($pasos == ""){
						$pasos = "$each";
					}
					$pasos .= "#$each";
				}
			}
			paisesRegistraPasoFronterizo($_POST['id_pais'],$pasos);
			
			//guarda documentos
			$documentos = "";
			$i = 0;
			if (isset($_POST['idPlantilla'])){
				foreach($_POST['idPlantilla'] as $each){
					if ($documentos == ""){
						$documentos = "$each*".$_POST['esTresIdiomas'][$i];
					}
					$documentos .= "#$each*".$_POST['esTresIdiomas'][$i];
					$i++;
				}
			}
			paisesRegistraPlantilla($_POST['id_pais'],$documentos);
			
			//salva el idPais para volver a mostrar el país guardado
			$_SESSION['traerIdPais'] = $_POST['id_pais'];
			
			$_SESSION['verde'] = 'Se ha guardado el pais: '.$_POST['pais'];
			header('Location: paises.php');
			return false;
			break;
			
		case 'buscarPais':
			$paises = paisesRetornaSimilares($_POST['term']);			
			echo (json_encode(utf8_encode_all($paises)));
			break;
			
		case 'traerPais':
			$pais = paisesRetornaDatos($_POST['id_pais']);
			echo (json_encode(utf8_encode_all($pais)));
			break;
		
		case 'retornaPicsPais':
			$pics = paisesRetornaPicsCertificados($_POST['id_pais']);
			echo (json_encode(utf8_encode_all($pics)));
			break;
			
		case 'retornaPasosFronterizosPais':
			$pasos = paisesRetornaPasosFronterizos($_POST['id_pais']);
			echo (json_encode(utf8_encode_all($pasos)));
			break;
		
		case 'retornaPlantillasPais':
			$plantillas = paisesRetornaPlantillas($_POST['id_pais']);
			echo (json_encode(utf8_encode_all($plantillas)));
			break;
		
		case 'retornaDocumentosSimilares':
			$plantillas = plantillasBuscarDatos($_POST['term'],$_POST['tipo']);
			echo (json_encode(utf8_encode_all($plantillas)));
			break;
	}
}else{
	
	if (isset($_SESSION['traerIdPais'])){
		$paisGuardado = $_SESSION['traerIdPais'];
		unset($_SESSION['traerIdPais']);
	}
	
	//datos de relleno
	$gruposPaises = paisesRetornaGrupos();
	$tiposPlantilla = plantillasRetornaTipos();
	
	//datos de página	
	$_SESSION['ruta'] = "Paises";
	$contenido = 'paises.php';	
	require('../view/layout.php');
}
?>