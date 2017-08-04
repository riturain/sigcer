<?php //CERTIFICADOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "lacteos-certificados";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/lacteos-certificados.php");
require("../model/lacteos-autorizaciones.php");

if (isset($_GET['id'])){	
	require("../classes/exportarAPDF.php");
	switch($_GET['tipo']){
		case 'fa4':
			imprimirCertificado($_GET['id'],$_GET['idPais']);
			break;
		case 'san':
			if (($_GET['idPais'] == 130) || ($_GET['idPais'] == 133)){
				//SI ES CHINA O RUSIA
				imprimirRusiaChina($_GET['id'],$_GET['idPais'],$_GET['tresIdiomas'],$_GET['ca'],$_GET['em']);
			}else{
				//SI NO ES CHINA O RUSIA
				require("../model/moduloPDF.php");
				imprimirCertificadoSanitario($_GET['id'],$_GET['idPais'],$_GET['tresIdiomas'],$_GET['ca'],$_GET['em']);
			}
			break;
		default:
			require("../model/moduloPDF.php");
			imprimirAnexoCertificado($_GET['id'], $_GET['tipo'], $_GET['idPais'], $_GET['tresIdiomas'],$_GET['ca'],$_GET['em']);
			break;
	}
	return false;
}
if (isset($_POST['accion'])){	
	switch($_POST['accion']){	
		case 'guardarCertificado':
			/* guardar */
			$_SESSION['rePost'] = $_POST; //para repost - no borrar			
			if ($_POST['idCertificado'] == ""){
				$_POST['idCertificado'] = 0;
			}			
			$pics = retornaNumPics($_POST['idPais']);
			
			$_SESSION['idCert'] = $_POST['idCertificado'];
			$_SESSION['idAut'] = $_POST['idAutorizacion'];
			$_SESSION['inspecciones'] = $_POST['idInspecciones'];
			
			/*
			$modelos =  certificadosVerificaModelosWeb($_POST['idInspecciones'], $_POST['idAutorizacion']);
			switch ($modelos){
				case 0:
					//ALGUNOS PRODUCTOS NO ESTÁN AFECTADOS A UN MODELO DE CERTIFICADO = 0
					$_SESSION['rojo'] = "Algunos productos no están afectados a un modelo de certificado";
					header('Location: lacteos-certificados.php');
					return false;
					break;
				case 1:
					//TODO BIEN					
					break;
				case 2:
					//LOS PRODUCTOS AFECTADOS ESTÁN ASOCIADOS A MÁS DE UN MDOELO DE CERTIFICADO = 2
					$_SESSION['rojo'] = "Los productos afectados están asociados a más de un modelo de certificado";
					header('Location: lacteos-certificados.php');
					return false;
					break;
			}
			*/
			
			//validar PICS necesarios
			$guardarLotes = false;
			$guardarFirmantes = false;
			$guardar11 = false;
			$guardar13 = false;
			
			foreach($pics as $each){				
				switch ($each){			
					case '0':
						// contenedores -> nada
						break;
					case '1':
						//tabla de lotes
						$guardarLotes = true;
						if ($_POST['totalLotes'] != $_POST['totalCertificado']){
							$_SESSION['rojo'] = "El total de lotes debe ser igual al total del certificado";
							header('Location: lacteos-certificados.php');
							return false;
						}
						if ($_POST['cantProductos'] > count($_POST['idProducto'])){
							$_SESSION['rojo'] = "Deben especificarse todos los productos para los lotes";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '2':
						// analisis -> nada
						
						
						
						break;
					case '3':
						if (!($_POST['pic03_kgBrutos'] > 0)){
							$_SESSION['rojo'] = "Deben indicar la cantidad de kilos mayor que cero";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '4':
						if ($_POST['pic04_destino'] == ""){
							$_SESSION['rojo'] = "Debe indicar el Puerto de destino";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '5':
						if ($_POST['pic05_transito'] == ""){
							$_SESSION['rojo'] = "Debe indicar el tránsito";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '6':
						if ($_POST['pic06_buqueVuelo'] == ""){
							$_SESSION['rojo'] = "Debe indicar el buque/vuelo";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '7':
						if ($_POST['pic07_condAlmacenamiento'] == ""){
							$_SESSION['rojo'] = "Debe indicar las condiciones de almacenamiento";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '8':
						if ($_POST['pic08_unidadTerritorial'] == ""){
							$_SESSION['rojo'] = "Debe indicar la unidad territorial";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '9':
						//$("#pic09_observaciones").val() //OPCIONAL
						//$("#pic09_pieDePag").val() //SI PIC 10 != "NINGUNA" 	!= ""
						//si no existe el pic10 .. debe completar pie de página
						//if(!isset($_POST['pic10_leyenda'])){
						//	if ($_POST['pic09_pieDePag'] == ""){
						//		$_SESSION['rojo'] = "Debe completar el pie de página";
						//		header('Location: lacteos-certificados.php');
						//		return false;
						//	}
						//}
						break;
					case '10':
						if ($_POST['pic10_leyenda'] == ""){
							$_SESSION['rojo'] = "Debe seleccionar una leyenda";
							header('Location: lacteos-certificados.php');
							return false;
						}else{
							if (($_POST['pic10_leyenda'] != "NINGUNA") && ($_POST['pic09_pieDePag'] == "")){
								$_SESSION['rojo'] = "Debe completar el pie de página";
								header('Location: lacteos-certificados.php');
								return false;
							}
						}
						break;
					case '11':
						//$("#pic11_sanitarios").val() //OPCIONAL
						$guardar11 = true;
						break;
					case '12':
						$guardarFirmantes = false;
						if ($_POST['pic12_copias'] == ""){
							$_POST['pic12_copias'] == "0";
						}
						if($_SESSION['tipo_acceso'] != 2){
							$guardarFirmantes = true;
							if (($_POST['pic12_inspectoresOfFirm'] == "")||($_POST['pic12_inspectoresOfFirm2'] == "")){
								$_SESSION['rojo'] = "Debe indicar los inspectores oficiales firmantes";
								header('Location: lacteos-certificados.php');
								return false;
							}
						}
						break;
					case '13':
						$guardar13 = true;
						if (($_POST['pic13_importador'] == "") || ($_POST['pic13_importador_id'] == "")){
							$_SESSION['rojo'] = "Debe indicar el importador";
							header('Location: lacteos-certificados.php');
							return false;
						}
						//if (($_POST['pic13_porCuentaYOrden'] == "") || ($_POST['pic13_porCuentaYOrden_id'] == "")){
						//	$_SESSION['rojo'] = "Debe indicar por cuenta y orden";
						//	header('Location: lacteos-certificados.php');
						//	return false;
						//}
						break;
					case '14':
						//$("#pic14_consumoAnimal").val() //OPCIONAL
						break;
					case '15':
						if ($_POST['pic15_puestoFrontDestino'] == ""){
							$_SESSION['rojo'] = "Debe indicar el puesto fronterizo de destino";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					case '16':
						if ($_POST['pic16_puertoDeDescarga'] == ""){
							$_SESSION['rojo'] = "Debe indicar el puerto de descarga";
							header('Location: lacteos-certificados.php');
							return false;
						}
						if ($_POST['pic16_fechaDeDescarga'] == ""){
							$_SESSION['rojo'] = "Debe indicar la fecha de descarga";
							header('Location: lacteos-certificados.php');
							return false;
						}
						break;
					//default:
						//$_SESSION['pics_que_no_existen'][] = $each;
						//$_SESSION['rojo'] = "Error de pic al guardar";
						//header('Location: lacteos-certificados.php');
						//return false;
						//break;
				}				
			}
			
			/* checkboxes */
			if (!isset($_POST['pic11_sanitarios'])){$_POST['pic11_sanitarios'] = 0;}
			if (!isset($_POST['pic14_consumoAnimal'])){$_POST['pic14_consumoAnimal'] = 0;}
			/* ---- */
			if (!isset($_POST['pic03_kgBrutos'])){$_POST['pic03_kgBrutos'] = 0;}
			if (!isset($_POST['pic04_desde'])){$_POST['pic04_desde'] = "";}
			if (!isset($_POST['pic04_destino'])){$_POST['pic04_destino'] = "";}
			if (!isset($_POST['pic05_transito'])){$_POST['pic05_transito'] = "";}
			if (!isset($_POST['pic06_buqueVuelo'])){$_POST['pic06_buqueVuelo'] = "";}
			if (!isset($_POST['pic06_blGuia'])){$_POST['pic06_blGuia'] = "";}
			if (!isset($_POST['pic06_fechaSalida'])){$_POST['pic06_fechaSalida'] = "";}
			if (!isset($_POST['pic07_condAlmacenamiento'])){$_POST['pic07_condAlmacenamiento'] = "";}
			if (!isset($_POST['pic08_unidadTerritorial'])){$_POST['pic08_unidadTerritorial'] = "";}
			if (!isset($_POST['pic09_observaciones'])){$_POST['pic09_observaciones'] = "";}
			if (!isset($_POST['pic09_pieDePag'])){$_POST['pic09_pieDePag'] = "";}
			if (!isset($_POST['pic12_copias'])){$_POST['pic12_copias'] = 0;}
			if (!isset($_POST['pic12_requeridos'])){$_POST['pic12_requeridos'] = 0;}
			if (!isset($_POST['pic13_importador_id'])){$_POST['pic13_importador_id'] = 0;}
			if (!isset($_POST['pic13_porCuentaYOrden_id'])){$_POST['pic13_porCuentaYOrden_id'] = 0;}			
			if (!isset($_POST['pic15_puestoFrontDestino'])){$_POST['pic15_puestoFrontDestino'] = "";}
			if (!isset($_POST['pic16_puertoDeDescarga'])){$_POST['pic16_puertoDeDescarga'] = "";}
			if (!isset($_POST['pic16_fechaDeDescarga'])){$_POST['pic16_fechaDeDescarga'] = "";}			
			/* ---- */
			
			//LLAMADA PARA VER SI ES CAMBIO
			if ($_POST['idCertificado'] != 0){
				$esCambio = certificadosVerificaSiEsCambio($_POST['idCertificado']);
			}else{
				$esCambio = 0;
			}
			
			if(!$guardar13){
				$_POST['pic13_porCuentaYOrden_id'] = 0;
			}
			
			/* guardar Certificado */
			$idCert = certificadosABMWeb(
				$_POST['idCertificado'],
				$_POST['idAutorizacion'],
				$_POST['pic13_importador_id'],
				$_POST['estado'],
				$_POST['fechaPedido'],
				$_POST['pic05_transito'],
				$_POST['pic04_desde'],
				$_POST['pic04_destino'],
				$_POST['pic08_unidadTerritorial'],
				$_POST['pic06_buqueVuelo'],
				$_POST['pic06_blGuia'],
				$_POST['pic06_fechaSalida'],
				$_POST['pic15_puestoFrontDestino'],
				$_POST['pic16_puertoDeDescarga'],
				$_POST['pic16_fechaDeDescarga'],
				$_POST['pic07_condAlmacenamiento'],
				$_POST['pic09_observaciones'],
				$_POST['pic12_copias'],
				$_POST['pic12_requeridos'],
				$_POST['pic03_kgBrutos'],				
				$_POST['pic14_consumoAnimal'],
				$_SESSION['id_usuario'],
				$_POST['nOrdRef'],
				$_POST['pic09_pieDePag'],
				$_POST['anularYReemplazar'],
				$_POST['pic11_sanitarios'],
				$_POST['pic13_porCuentaYOrden_id']
				);
				
			if ($idCert > 0){
				
				$_SESSION['idCert'] = $idCert;
				
				/* guardar Inspecciones*/
				certificadosRegistraInspecciones($idCert,$_POST['idInspecciones'],$_POST['idAutorizacion']);			
				/* guardar Productos */
				certificadosRegistraProdWeb($idCert,$_POST['idInspecciones'],$_POST['idAutorizacion']);
				
				/* guardar Lotes */
				if ($guardarLotes){ //PIC 1					
					$i = 0;
					foreach ($_POST['idProducto'] as $idProductoAut){
						if ($_POST['idLote'][$i] == 0){
							certificadosRegistraLotes($_POST['idLote'][$i], $idCert, $idProductoAut, $_POST['lote'][$i], $_POST['fechaElab'][$i], $_POST['fechaEmpaq'][$i], $_POST['fechaVto'][$i], $_POST['cantidad'][$i],$esCambio);
						}
						$i++;
					}
					$aux = $_POST['idlotesborrar'];
					if ($aux != ''){
						$lotesABorrar = explode('#', $aux);
						foreach($lotesABorrar as $idLote){
							if ((filter_var($idLote, FILTER_VALIDATE_INT)) && ($idLote != 0)){
							//si idLote es un numero lo borra (valido por las dudas)
								certificadosBorrarLote($idLote);
							}
						}
					}
				}
				
				/* guardar Análisis PIC 2 */
				if (($_SESSION['tipo_acceso'] == 1) || ($_SESSION['tipo_acceso'] == 5)){
					if (isset($_POST['analisisIdProdAut'])){
						foreach($_POST['analisisIdProdAut'] as $prod){
							//$idCert
							//$prod = idProductoAut
							foreach($_POST["analisisF".$prod] as $key => $idAnalisis){
								//$idAnalisis
								$valor = $_POST["valorF".$prod][$key];
								$detalle = $_POST["detalleF".$prod][$key];
								certificadosRegistraAnalisis($detalle,$idCert, $prod, $idAnalisis, $valor);
							}
							foreach($_POST["analisisM".$prod] as $key => $idAnalisis){
								//$idAnalisis
								$valor = $_POST["valorM".$prod][$key];
								$detalle = $_POST["detalleM".$prod][$key];
								certificadosRegistraAnalisis($detalle,$idCert, $prod, $idAnalisis, $valor);
							}
						}						
					}
				}
				
				if ($guardarFirmantes){ //PIC 12
					/* guardar Firmantes */
					certificadosRegistraFirmantes($idCert,$_POST['pic12_inspectoresOfFirm'],$_POST['pic12_inspectoresOfFirm2']);
				}
				
				unset($_SESSION['rePost']);//guardó correctamente -> borro el re_post
				$_SESSION['verde'] = "El certificado fue guardado correctamente";
				/* - FIN DE GUARDAR - */
			}else{
				$_SESSION['rojo'] = "El certificado no se puede guardar porque tiene operaciones pendientes";
			}
			header ('Location: lacteos-certificados.php');
			return false;
		break;

		case 'autocompletarPaises'://MODELO PAISES
			require("../model/paises.php");
			$paises = paisesRetornaSimilares($_POST['term']);
			echo(json_encode(utf8_encode_all($paises)));
			break;
		
		case 'autocompletarLocalidades'://MODELO LOCALIDADES
			require("../model/localidades.php");
			$localidades = localidadesRetornaSimilares($_POST['term']);
			echo(json_encode(utf8_encode_all($localidades)));
			break;
			
		case 'buscarCertificados':
			$numCert = $_POST['numCertificado'];
			$numAut = $_POST['numAutorizacion'];
			$empre = $_POST['empresa'];
			$anio = $_POST['anio'];
			$estado = $_POST['estado'];
			$destino = $_POST['destino'];
			$certificados = certificadoRetornaBusqueda($numCert, $numAut, $empre, $anio, $estado, $destino, $_SESSION['id_usuario']);
			echo(json_encode(utf8_encode_all($certificados)));
			break;	
		
		case 'traerCertificado':
			$_SESSION['idAut'] = $_POST['id_autorizacion'];
			$_SESSION['idCert'] = $_POST['id_certificado'];
			echo "1";
			// recarga JAVASCRIPT
			break;
		
		case 'validaEstadoParaModificar':
			$ret = 2;// 2 - USUARIO SIN PERMISOS
			if ($_SESSION['tipo_acceso'] != 0){
				$ret = verificaSiTieneCambios($_POST['idCert'], "CERTIFICADOS"); //0 ó 1: 0 = cupones pendientes, 1 = puede modificar
			}
			echo $ret;
			break;

		case 'anularCertificado':			
			$ret = certificadosAnular($_POST['id_certificado'], $_SESSION['id_usuario']);
			if ($ret == 1){
				//se anuló -> recargo
				$_SESSION['verde'] = "El certificado fue anulado";
				echo $ret;
			}else{
				//no se anuló
				$_SESSION['rojo'] = "El certificado no se puede anular";
				echo $ret;
			}
			break;
			
		case 'autocompletarPorCuentaYOrden': 			
			$cuentaYOrden = certificadoPorCuentaYOrdenRetornaSimilares($_SESSION['id_usuario'], $_POST['term'], 'PORCUENTAYORDEN');
			echo(json_encode(utf8_encode_all($cuentaYOrden)));
			break;
		
		case 'autocompletarImportadores':
			$importadores = certificadoImportadoresRetornaSimilares($_SESSION['id_usuario'], $_POST['term'], 'IMPORTADORES');
			echo(json_encode(utf8_encode_all($importadores)));
			break;
			
		case 'quePics':
			$pics = retornaNumPics($_POST['idPais']);
			echo(json_encode(utf8_encode_all($pics)));
			break;
		/*
		case 'cuponesRetornaAfectados':
			require ("../model/cupones.php");
			$ret = cuponesYPagosRetornaCuponesAfectados($_POST['idCertificado'], "CERTIFICADOS");					
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'cuponesRetornaDisponibles':
			require ("../model/cupones.php");	
			$ret = array();
			$ret['cuponesRequeridos'] = cuponesYPagosRetornaCuponesDisponibles($_POST['idEmpresa'], 2); //REQUERIDOS
			$ret['cuponesCopias'] = cuponesYPagosRetornaCuponesDisponibles($_POST['idEmpresa'], 1010820); //COPIAS		
			echo (json_encode(utf8_encode_all($ret)));
			break;
		
		case 'cuponesRetornaValores':
			require ("../model/cupones.php");
			$ret = certificadosRetornaValoresCupones($_POST['idCertificado']);
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'cuponesRetornaAbonados':
			require ("../model/cupones.php");
			$ret = tramitesTotalCuponesPagos($_POST['idCertificado'], 'CERTIFICADOS');
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'cuponesConfirmar':
			require ("../model/cupones.php");			
			$ret = cuponesAfectarAPago($_POST['idPagoCupon'], $_POST['idCupones']);
			$ret = 1;//borrar
			echo $ret;
			break;
		*/
		case 'verificarCambios':
			$ret = certificadosRetornaAnexos($_POST['idCert']);
			echo(json_encode(utf8_encode_all($ret)));
			break;
	}
}else{
	
	$observada = "";	

	if(isset($_SESSION['idAut'])){
		$idCertif = 0;
		if(isset($_SESSION['idCert']) && ($_SESSION['idCert'] != 0)){
			//traer Datos del certificado
			$datosCertificado = certificadosRetornaDatosWeb($_SESSION['idCert']);			
			
			$productosCertificado = certificadosRetornaProdAfectados($_SESSION['idCert']);
			$contenedoresCertificado = certificadosRetornaContProdAfectados($_SESSION['idCert']);			
			$lotesCertificado = certificadosRetornaLotesWeb($_SESSION['idCert']);
			
			$firmantesCertificado = certificadosRetornaFirmantesWeb($_SESSION['idCert']);			
			
			$observada = certificadosRetornaObservaciones($_SESSION['idCert']);
			$idCertif = $_SESSION['idCert'];
			unset($_SESSION['idCert']);
			$_SESSION['inspecciones'] = $datosCertificado['Inspecciones'];
		}
	
		//info autorización
		$autorizacion = array();
		$autorizacion['datos'] = autorizacionesRetornaDatos($_SESSION['idAut']);                
		$ret = autorizacionesRetornaPlantas($_SESSION['idAut']);		
		$autorizacion['plantas'] = autorizacionesRetornaPlantasPosibles($autorizacion['datos']['IdEmpAut'], $autorizacion['datos']['IdPais'], $_SESSION['id_usuario']);
		$autorizacion['plantasId'] = $ret['plantas'];		
		//productos
		$autorizacion['productos'] = certificadosRetornaProdInspSelec($_SESSION['inspecciones'], $_SESSION['idAut']);
		
		$pics = paisesRetornaPicAMostrar($autorizacion['datos']['IdPais']);
		
		//firmantes
		$firmantes = array();
		$firmantes[1] = firmantesRetornaDatos(1); //combo 1
		$firmantes[2] = firmantesRetornaDatos(2); //combo 2
		
		if ($_SESSION['inspecciones'] == '#'){
			//certificado sin inspecciones
			$buque = "";
			$contenedores = array();
			//productos
			$itProductos = certificadosRetornaProductosParaLotes($_SESSION['inspecciones'],$_SESSION['idAut']);
			//analisis
			$analisisProds = array();
			foreach($itProductos as $each){
				$analisisProds[$each['IdDetalleAuto']] = parametrosAnalisisRetornaDatos($idCertif, $each['IdDetalleAuto']);
			}
			
		}else{
			//inspecciones concatenadas
			$ids = explode("#", $_SESSION['inspecciones']);
			$primerId = $ids[1];
			//buque
			$buque = certificadosRetornaTransporteInspeccion($primerId,$_SESSION['idAut']);		
			//contendores
			$contenedores = certificadosRetornaContInspSelec($_SESSION['inspecciones'],$_SESSION['idAut']);
			//productos
			$itProductos = certificadosRetornaProductosParaLotes($_SESSION['inspecciones'],$_SESSION['idAut']);
			//analisis
			$analisisProds = array();
			foreach($itProductos as $each){
				$analisisProds[$each['IdDetalleAuto']] = parametrosAnalisisRetornaDatos($idCertif, $each['IdDetalleAuto']);
			}
		}
		//inspecciones
		$inspecciones = $_SESSION['inspecciones']; //NO BORRAR
		
		if(isset($_SESSION['idAut'])){ unset($_SESSION['idAut']);}
		if(isset($_SESSION['inspecciones'])){ unset($_SESSION['inspecciones']);}		
	}
	
	$tipoUrgencia = tipoUrgenciaRetornaDatos();	
	
	//buscador	
	$anios = admRetornaAniosProcesados();
	$estados = admRetornaEstadosProcesados("CERTIFICADOS");
	
	//datos de la página
	switch ($_SESSION['perfil']){
			case 2:
				$_SESSION['ruta'] = "Lácteos | Certificados";
				break;
			case '10':
				$_SESSION['ruta'] = "Apícola | Certificados";
				break;
			case 11:
				$_SESSION['ruta'] = "Lácteos/Apícola | Certificados";
				break;
			default:
				$_SESSION['ruta'] = "Certificados Sanitarios";
				break;
	}
	$contenido = 'lacteos-certificados.php';
	require('../view/layout.php');
	if (isset($_SESSION['rePost'])){
		unset($_SESSION['rePost']);
	}
}
?>