<?php //MODULO PDF CONTROLLER 
@session_start();
$_SESSION['archivo'] = "moduloPDF";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require('../model/moduloPDF.php');

if (isset($_GET['accion'])){
	switch($_GET['accion']){
		case 'imprimir':
			require("../classes/exportarAPDF.php");
			$code = $_SESSION['codigoParaImprimir'];
			unset($_SESSION['codigoParaImprimir']);
			imprimirVistaPrevia($code); //acá se corta la ejecución
			break;
	}
	return false;
}

if (isset($_POST['accion'])){	
	switch($_POST['accion']){
		case 'validarParaGuardar':
			$ret = plantillasValidaExistencia($_POST['id_plantilla'], $_POST['id_tipo_plantilla'], $_POST['nombre'],$_POST['id_categoria']);
			echo $ret; //0 - error
			break;
		case 'guardar':			
			if ((isset($_POST['idPlantilla'])) && ($_POST['idPlantilla'] != '') && ($_POST['idPlantilla'] != 0)){
				$idGraba = $_POST['idPlantilla'];
			}else{
				$idGraba = 0; //es nueva la plantilla
			}
			$id = plantillasRegistraDatos($idGraba, $_POST['nombreArchivoPDF'], $_POST['tipoPlantilla'], $_SESSION['id_usuario'],$_POST['catPlantilla']);
			if ($id == 0){
				$_SESSION['rojo'] = "Error al guardar";
				header("Location: moduloPDF.php");
				return false;
			}else{
				//sin errores: se guardan los elementos
				//borrar detalles viejos
				borrarDetalles($id);
				$i = 0;
				foreach ($_POST['elemento'] as $each){					
					plantillasRegistraLineaDetalle(0, $id, $_POST['rotulo'][$i], $each,$_POST['subgrupos'][$i]."#",$_POST['consumoAnimal'][$i],$_POST['alcance'][$i]);
					$i++;
				}
				$_SESSION['verde'] = "La Plantilla se guardó con éxito";
				$_SESSION['idPlantilla'] = $id; // para recargar
				header("Location: moduloPDF.php");
				return false;
			}
			break;
		case 'buscarPlantillas':
			$nombre = (isset($_POST['nombre']) && ($_POST['nombre'] != ''))? $_POST['nombre'] : 'null';
			$idPlantilla = (isset($_POST['idPlantilla']) && ($_POST['idPlantilla'] != ''))? $_POST['idPlantilla'] : 0;
			$ret = plantillasBuscarDatos($nombre, $idPlantilla);			
			echo json_encode(utf8_encode_all($ret));
			break;
		case 'buscarCertificaciones':
			$filtroCertif = $_POST['filtroCertif'];
			$idPlantilla = (isset($_POST['idPlantilla']) && ($_POST['idPlantilla'] != ''))? $_POST['idPlantilla'] : 0;
			$ret = certificacionesBuscaPorFiltro($filtroCertif,$idPlantilla);
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'traerPlantilla':
			$_SESSION['idPlantilla'] = $_POST['idPlantilla'];
			echo "1";
			break;
		case 'traerElementosTablaDinamica':
			$ret = moduloPdfRetornaEstructuraTabla($_POST['valor']);
			echo json_encode(utf8_encode_all($ret));
			break;
		case 'prepararParaVistaPrevia':	
			$_SESSION['codigoParaImprimir'] = utf8_decode($_POST['code']); //para imprimir
			echo "1";
			break;
			
		case 'cambiarEstructura':
			$tipos = moduloPdfRetornaEstructuraTabla($_POST['tipo']);
			echo (json_encode(utf8_encode_all($tipos)));
			break;
		
		case 'traerCategorias':
			$ret = moduloPdfRetornaTablasPosibles($_POST['valor']);
			echo json_encode(utf8_encode_all($ret));
			break;
		/* ------------- CERTIFICACIONES ------------- */
		case 'guardarCert':		
			if (($_POST['idCert'] != "") && ($_POST['texto'] != "") && ($_POST['idPlantilla'] != "")){
				require("../model/certificaciones.php");
				$res = textoCertificacionesRegistraDatos($_POST['idCert'],utf8_decode($_POST['texto']), $_POST['idPlantilla']);						
				echo $res;
			}else{
				echo "0";
			}
			break;
		case 'certificacionesXTipo':
			require("../model/certificaciones.php");
			$certificaciones = textoCertificacionesRetornaDatos($_POST['tipo']);
			echo (json_encode(utf8_encode_all($certificaciones)));
			break;
		
		/* ----------- FIN CERTIFICACIONES ------------ */
	}
}else{
	
	//CERTIFICACIONES --------------------------------
	require("../model/certificaciones.php");
	$certificaciones = textoCertificacionesRetornaDatos(0);
	//FIN CERTIFICACIONES ----------------------------
	

	//si está seteado para traer una Plantilla...
	if (isset($_SESSION['idPlantilla'])){
		$datosPlantillaGuardada = plantillasRetornaDatos($_SESSION['idPlantilla']);
		$elementosPlantillaGuardada = plantillasRetornaDetalles($_SESSION['idPlantilla']);		
		$aux = array();
		foreach ($elementosPlantillaGuardada as $each){
			$each['DetalleHtml'] = str_replace('\\', '', $each['DetalleHtml']);
			$aux[] = $each['DetalleHtml'];
		}
		$i = 0;
		foreach ($aux as $cada){
			$elementosPlantillaGuardada[$i]['DetalleHtml'] = $cada;
			$i++;
		}
		unset($_SESSION['idPlantilla']);		
	}
	//--- fin traer Plantilla
	
	$tiposPlantilla = plantillasRetornaTipos();
	$tipos = array();
	$lascategorias = plantillasRetornaCategorias();
	
	$subgrupos = subGrupoRetornaSimilares("");	
	$paises = paisesRetornaSimilares("");	
	
	//datos de la página
	$_SESSION['ruta'] = "Módulo PDF";
	$tinyMCE = true;
	$contenido = 'moduloPDF.php';
	require('../view/layout.php');
}
?>