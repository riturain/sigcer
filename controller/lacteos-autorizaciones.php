<?php //lacteos-autorizaciones CONTROLLER
@session_start();
$_SESSION['archivo'] = "lacteos-autorizaciones";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/lacteos-autorizaciones.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
	case 'autocompletarEmpresas': //MODELO EMPRESAS
		require("../model/empresas.php");
		$empresas = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
		echo(json_encode(utf8_encode_all($empresas)));
		break;

	case 'traerPaises':
		$paises = autorizacionesRetornaPaisesPosibles($_POST['id_empresa']);		
		$optionsPaises = devuelveOptions($paises,0,1);
		echo $optionsPaises;
		break;

	case 'traerTransportes':
		$transportes = transportesRetornaDatos($_POST['id_paso']);
		$optionsTransportes = devuelveOptions($transportes,0,1);
		echo $optionsTransportes;
		break;

	case 'traerAduanas': //MODELO ADUANAS
		require("../model/aduanas.php");
		$aduanas = aduanasRetornaTodas();
		$optionsAduanas = devuelveOptions($aduanas,0,1);
		echo $optionsAduanas;
		break;

	case 'traerPasosFronterizos':
		$pasos = pasosRetornaDatos($_POST['id_pais']);
		$optionsPasos = devuelveOptions($pasos,0,1);
		echo $optionsPasos;
		break;

	case 'traerPlantasDeEmpresa':
		$plantas = autorizacionesRetornaPlantasPosibles($_POST['id_empresa'], $_POST['id_pais'], $_SESSION['id_usuario']);
		echo(json_encode(utf8_encode_all($plantas)));
		break;

	case 'traerExportadores':
		$exportadores = autorizacionesRetornaExportadoresPosibles($_POST['listado_plantas'], $_SESSION['id_usuario']);
		echo(json_encode(utf8_encode_all($exportadores)));
		break;

	case 'traerLugaresDeInspeccion':
		$lugares = autorizacionesRetornaLugaresInspPosibles($_POST['id_empresa']);		
		echo (json_encode(utf8_encode_all($lugares)));
		break;

	case 'traerDespachantes': //MODELO EMPRESAS
		require("../model/empresas.php");
		$despachantes = empresasRetornaDespachantesSegunUsuario($_SESSION['id_usuario'], $_POST['id_exportador']);				
		echo(json_encode(utf8_encode_all($despachantes)));
		break;

	case 'autocompletarProductos':
		$productos = autorizacionesRetornaProductosPosibles($_POST['id_pais'], $_POST['plantas'], $_POST['term']);
		echo(json_encode(utf8_encode_all($productos)));
		break;

	case 'autocompletarMarcas':
		$marcas = autorizacionesRetornaMarcasAsociadas($_POST['id_producto'],$_POST['id_planta'], $_POST['term']);
		echo(json_encode(utf8_encode_all($marcas)));
		break;

	case 'traerEnvases': //MODELO ENVASES
		require("../model/envases.php");
		$envases = envasesRetornaTodos();
		$optionsEnvases = devuelveOptions($envases,0,1);
		echo $optionsEnvases;
		break;

	//consumo animal
	case 'verificarCertificado':
		$ret = verificarCertificado($_POST['id_autorizacion']);
		echo(json_encode(utf8_encode_all($ret)));
		break;

	//modificar
	case 'admRetornaTopesParaProrroga':
		$ret = admRetornaTopesParaProrroga();
		echo (json_encode(utf8_encode_all($ret)));
		break;

	case 'puedeModificar':
		$ret = autorizacionesPuedeModificar($_POST['id_autorizacion'], $_SESSION['id_usuario']);
		echo utf8_encode($ret);
		break;
	
	case 'validarEstadoParaModificar':
		$ret = autorizacionesValidaEstadoParaMod($_POST['id_autorizacion'], $_SESSION['id_usuario']);
		echo utf8_encode($ret);
		break;

	case 'validarEstadoParaModificarConUsuario': //COMO ARRIBA PERO CON USUARIO CERO PARA QUE NO VALIDE SI TIENE CAMBIOS (XQ ES RÉPLICA)
		$ret = autorizacionesValidaEstadoParaMod($_POST['id_autorizacion'], '0');
		echo utf8_encode($ret);
		break;
	
	case 'puedePedirInspeccion':
		$ret = autorizacionesLacteosPuedePedirInspeccion($_POST['id_autorizacion']);		
		echo $ret;
		break;		
	
	case 'validaEstadoParaReplicar':
		$ret = autorizacionesLacteosValidaParaReplica($_POST['id_autorizacion']);
		echo $ret;
		break;
	
	case 'traerProductosParaReplica':
		$productos = array();
		$productos['listado'] = autorizacionesRetornaProductosAfectados($_POST['id_autorizacion']);
		$productos['cantProductos'] = count($productosAutorizacion);
		echo(json_encode(utf8_encode_all($productos)));
		break;

	case 'autorizacionesVerificaEstadoPlantas':
		//replica - devuelven plantas para sacar de la autorizacion
		$plantas = autorizacionesVerificaEstadoPlantas($_POST['id_autorizacion']);
		echo $plantas;
		break;	
	
	case 'viasDeTransporteRetornaLimite':
		//devuelve el limite de kilos por transporte
		$limite = viasTransporteRetornaLimite($_POST['idTransporte']);
		echo $limite;
		break;
		
	case 'guardarAutorizacion'://USA MODELO COMÚN		
		
		//if (validar parámetros){
			//guardar parámetros
			$idElaborador = $_POST['idEmpresaSelected'];
			$observada = 0;
			$mensaje = "";
			if((!isset($_POST['numOrdenRefAutorizacion'])||($_POST['numOrdenRefAutorizacion']==""))){$_POST['numOrdenRefAutorizacion']=0;}
			if((!isset($_POST['consumoAnimal'])||($_POST['consumoAnimal']!=1))){$_POST['consumoAnimal']=0;}else{$_POST['consumoAnimal']=1;}
			if((!isset($_POST['prorrogarAutorizacion'])||($_POST['prorrogarAutorizacion']!=1))){$_POST['prorrogarAutorizacion']=0;}else{$_POST['prorrogarAutorizacion']=1;}
			//SI GUARDA UNA AUTORIZACION PARA MODIFICAR Y CAMBIO EL PAIS BORRO LOS DATOS DE PLANTAS Y PRODUCTOS ANTES DE GUARDAR
			if(($_POST['estado'] == 'modificar') && ($_POST['modificoPais'] != $_POST['idPais'])){
				autorizacionesBorrarPorCambioPais($_POST['idAutorizacion']);
			}
			
			//LLAMADA PARA VER SI ES CAMBIO
			if ($_POST['idAutorizacion'] != 0){
				$esCambio = autorizacionesLacteosVerificaSiEsCambio($_POST['idAutorizacion']);				
			}else{
				$esCambio = 0;				
			}
			
			$ret = autorizacionesLacteosAbm($_POST['idAutorizacion'],$_POST['nroAutorizacion'],$_POST['fechaAutorizacion'],$_POST['estadoAutorizacion'],$idElaborador,$_POST['idEmpresaExportador'],$_POST['fechaInspeccion'],$_POST['idLugarInspeccion'],utf8_decode($_POST['dirInspeccion']),utf8_decode($_POST['dirVerificacion']),$_POST['idPais'],$_POST['idTransporte'],$_POST['idAduana'],$_POST['idPaso'],$_POST['idDespachante'],$_POST['prorrogarAutorizacion'],$_SESSION['id_usuario'],$observada,$_POST['numOrdenRefAutorizacion'],1,$_POST['copias'],$_POST['requeridos'],$_POST['consumoAnimal'],$_POST['urgencia']);
			//arancel es = 1 para que se inserte a la fuerza porque si copia es 0 y requerido es 0 no se mete en la tabla PagoCupones. Diferente de Muestras que envía 0 (cero)
			if ($_POST['idAutorizacion'] != 0){
				//es una modificación
				$ret = $_POST['idAutorizacion'];
			}else{
				if ($ret > 0){//si devolvió id_autorizacion
				//es una autorización nueva, genero el circuito interno del trámite
				AutorizacionesLacteosCompletaAltaWeb($ret,$_SESSION['id_usuario']);
				}
			}			
			if ($ret > 0){				
				$idPlantas = explode('#',$_POST['plantas']);
				$long = count($idPlantas);
				for($x = 1; $x<$long-1; $x++){
					autorizacionesRegistrarPlantaAsociada($ret,$idPlantas[$x]);
				}
				$borraDDJJ = 1; //para borrar la primera vez las ddjj, después por cada producto no borra
				//recorro todos los productos
				for($i=0;$i<$_POST['cantProductosCargados'];$i++){
					$producto = devolverProductoConArray($_POST["prod$i"]);
					if ($producto != false){
						if ($producto['estado']== 'NUEVO'){
							$idDetalle = autorizacionesRegistrarProducto($ret, $producto['idProducto'], utf8_decode($producto['por']), $producto['cantEnvases'], $producto['idClaseEnvase'], $producto['unidades'], $producto['idMarca'], $producto['kilos'], $producto['fobUnit'], $producto['fobTotal'], $producto['idPlanta'], $esCambio);
						}
						if (($producto['ddjj'] != '0') && ($producto['estado'] != 'BORRAR')){
							//es apicola y tiene ddjj
							if ($idDetalle == 0){
								$idDetalle = $producto['idDetalle'];
							}
							guardarDDJJ($idDetalle, $producto['ddjj'],$borraDDJJ);
							$borraDDJJ = 0;
						}else{
							if(($producto['estado'] == 'BORRAR')&&($producto['idDetalle']!='')){
								autorizacionesBorrarProducto($producto['idDetalle']);
							}
						}
					}else{
						$mensaje = "Algunos de los productos no se pudieron guardar";
					}
				}
				
				if (($_SESSION['tipo_acceso'] == 1) && ($_POST['nroAutorizacion'] == 0)){
					darNumeroAutorizacion($ret); //DA EL NÚMERO MÁS TARDE..
				}
				
				autorizacionesLacteosCalculaArancel($ret,$_POST['kilosTotalAGuardar']); //idAut y KilosTotal				
				if ($mensaje == ""){
					$_SESSION['verde'] = "La autorizacion ha sido guardada";
					$_SESSION['recargaAut'] = $ret;
				}else{
					$_SESSION['rojo'] = $mensaje;
				}
			}else{
				switch ($ret){
					case -1:
						$_SESSION['rojo'] = "No está autorizado para realizar los cambios efectuados";
						break;				
					case -3:
						$_SESSION['rojo'] = "No se han podido guardar los datos, debido a que la autorización tiene un proceso pendiente";
						break;
					case -5:
						$_SESSION['rojo'] = "El número que desea dar de alta ya existe para el año de la autorización";
						break;
				}
			}		
			header('Location: lacteos-autorizaciones.php');
		break;

	//buscador Paises
	case 'autocompletarPaises': //MODELO PAISES
		require("../model/paises.php");
		$paises = paisesRetornaSimilares($_POST['term']);
		echo(json_encode(utf8_encode_all($paises)));
		break;

	case 'buscarAutorizaciones':
		$par1 = $_POST['numAutorizacion'];
		$par2 = $_POST['empresa'];
		$par3 = $_POST['anio'];
		$par4 = $_POST['estado'];
		$par5 = $_POST['destino'];
		$par6 = $_POST['numRef'];
		$autorizaciones = autorizacionesBuscarDatos($par1,$par2,$par3,$par4,$par5,$par6,$_SESSION['id_usuario']);
		echo(json_encode(utf8_encode_all($autorizaciones)));
		break;

	case 'traerAutorizacion':
		$autorizacion = array();		
		//ver si tiene pais y planta ok
			//autorización ok = 1, mal = 0
		$esOk = autorizacionesLacteosVerificaHabPaisYPlantas($_POST['id_autorizacion']);				
		if ($esOk == 1){			
			$autorizacion[0] = autorizacionesRetornaDatos($_POST['id_autorizacion']);				
			$plantasAutorizacion = autorizacionesRetornaPlantas($_POST['id_autorizacion']);			
			$productosAutorizacion = autorizacionesRetornaProductosAfectados($_POST['id_autorizacion']);			
			$autorizacion[0]['plantas'] = $plantasAutorizacion['plantas'];
			$autorizacion[0]['plantasPuedeBorrar'] = $plantasAutorizacion['puedeBorrar'];
			$autorizacion[0]['cantProductos'] = count($productosAutorizacion);
			$autorizacion[0]['productos'] = $productosAutorizacion;
			$autorizacion[0]['ddjjs'] = AutorizacionesLacteosRetornaDdjjMiel($_POST['id_autorizacion']);
			$autorizacion[0]['estaOk'] = $esOk;
		}else{
			//autorización con país deshabilitado
			$autorizacion[0]['estaOk'] = $esOk;
			//info autorización			
			$autorizacion[0]['datos'] = autorizacionesRetornaDatos($_POST['id_autorizacion']);						
			$autorizacion[0]['plantas'] = autorizacionesRetornaPlantasDatos($_POST['id_autorizacion']);
			$autorizacion[0]['productos'] = autorizacionesRetornaProductosAfectados($_POST['id_autorizacion']);			
		}		
		echo(json_encode(utf8_encode_all($autorizacion[0])));
		break;

	case 'verificarPuedeCambiarPais':
		$aux = autorizacionesPuedeCambiarPais($_POST['id_autorizacion']);
		echo $aux;
		break;
		
	case 'validarAnulacion':
		$ret = autorizacionesPuedeModificar($_POST['id_autorizacion'], $_SESSION['id_usuario']); //SI DEVUELVE 0 no se puede anular porque tiene cambios pendientes
		if ($ret != "-"){
			echo utf8_encode($ret); //NO SE PUEDE ANULAR PORQUE TIENE CAMBIOS VIGENTES
		}else{		
			//llamo a anular
			autorizacionesCambiarEstado($_POST['id_autorizacion'], "ANULADA");
			echo "0";
		}
		break;

	case 'prorrogarAutorizacion':
		$ret = autorizacionesProrrogar($_POST['id_autorizacion']); //SI DEVUELVE 0 no se puede prorrogar
		echo $ret;
		break;

	case 'verificaNecesitaProvisorio':
		$ret = paisesVerificaNecesitaProvisorio($_POST['id_pais']);
		if ($ret == 0){echo "NO";}else{echo "SI";}
		break;

	case 'hayCircuitoInterno':
		$ret = autorizacionesLacteosNoHayCircuitoAbierto($_POST['id_autorizacion']);
		echo ($ret);		
		break;
		
	case 'retornaPlantasParaProvisorio':
		$ret = autorizacionesRetornaPlantasParaProvisorio($_POST['id_autorizacion']);
		echo (json_encode(utf8_encode_all($ret)));
		break;

	case 'retornaSaldosProductos':
		$ret = autorizacionesRetornaSaldosProductos($_POST['id_autorizacion']);
		echo (json_encode(utf8_encode_all($ret)));
		break;
		
	case 'hayInspeccionesParaPuerto':	
		require ("../model/inspeccionPuerto.php");
		$inspecciones = inspeccionesPuertoRetornaBusqueda('NULL','NULL','NULL','NULL','NULL',$_POST['idAutorizacion'],$_SESSION['id_usuario']);	
		//$inspecciones = autorizacionesLacteosRetornaInspecciones($_POST['idAutorizacion']);		
		if (count($inspecciones) > 0){
			$_SESSION['idAutorizacionParaPuerto'] = $_POST['idAutorizacion'];
			echo "1";			
		}else{
			echo "0";
		}
		break;
	/*
	case 'cuponesRetornaAfectados':
		require ("../model/cupones.php");
		$ret = cuponesYPagosRetornaCuponesAfectados($_POST['idAutorizacion'], "AUTORIZACIONES");				
		echo (json_encode(utf8_encode_all($ret)));
		break;
	
	case 'cuponesRetornaDisponibles':
		require ("../model/cupones.php");	
		$ret = array();		
		$ret['cuponesArancel'] = cuponesYPagosRetornaCuponesDisponibles($_POST['idEmpresa'], $_POST['arancel']); //ARANCEL
		$ret['cuponesRequeridos'] = cuponesYPagosRetornaCuponesDisponibles($_POST['idEmpresa'], 2); //REQUERIDOS
		$ret['cuponesCopias'] = cuponesYPagosRetornaCuponesDisponibles($_POST['idEmpresa'], 1010820); //COPIAS		
		echo (json_encode(utf8_encode_all($ret)));
		break;
	
	case 'cuponesRetornaValores':
		require ("../model/cupones.php");
		$ret = autorizacionLacteosRetornaValoresCupones($_POST['idAutorizacion']);		
		echo (json_encode(utf8_encode_all($ret)));
		break;
		
	case 'cuponesRetornaAbonados':
		require ("../model/cupones.php");
		$ret = tramitesTotalCuponesPagos($_POST['idAutorizacion'], 'AUTORIZACIONES');		
		echo (json_encode(utf8_encode_all($ret)));
		break;
		
	case 'cuponesConfirmar':
		require ("../model/cupones.php");		
		$ret = cuponesAfectarAPago($_POST['idPagoCupon'], $_POST['idCupones']);
		$ret = 1;//borrar
		echo $ret;
		break;
	*/
	//CERTIFICADO
	case 'puedeEmitirCertificado':
	/* llamar AutorizacionesLacteosRetInspeccionesParaCertificados  */
		$ret = autorizacionesPuedeEmitirCertificado($_POST['idAutorizacion']);		
		//	ok = 1
		// errores = 2 3 ó 4
		switch ($ret){
			case '1':				
				echo "1**ok";
				break;
			case '2':
				echo "2**No se han realizado todos los provisorio correspondientes.";
				break;
			case '3':
				echo "3**La empresa no se encuentra habilitada, o alguna de las plantas afectadas no est&aacute; habilitada, o hay operaciones pendientes vinculadas con la autorizaci&oacute;n.";
				break;
			case '4':
				echo "4**La inspecci&oacute;n de puerto o planta asociada no se ha realizado o no ha sido autorizada por el inspector correspondiente";
				break;
		}
		break;
		
	case 'retornaInspeccionesCertificado':
		$ret = autorizacionesLacteosRetInspeccionesParaCertificados($_POST['idAutorizacion']);		
		echo(json_encode(utf8_encode_all($ret)));
		break;
		
	case 'irACertificados':
		$_SESSION['idAut'] = $_POST['idAutorizacion'];
		$_SESSION['inspecciones'] = $_POST['inspecciones']; //#id#id#..
		echo "1";
		break;
	
	case 'recargar':
		$_SESSION['recargaAut'] = $_POST['idAut'];
		echo "1";
		break;
	
	case 'verificarCambios':
		$ret = autorizacionesLacteosRetornaCambios($_POST['idAut']);
		echo(json_encode(utf8_encode_all($ret)));
		break;
	
	case 'traerRenapas': //MODELO EMPRESAS
		require("../model/empresas.php");
		$renapas = empresasRenapaRetornaDatos($_POST['term']);
		echo(json_encode(utf8_encode_all($renapas)));
		break;
	
	default:
		header('Location: lacteos-autorizaciones.php');
		break;
	}
}else{

	//INSPECCIÓN PLANTA
	if (isset($_GET['inspec'])){
		$_SESSION['idAut'] = $_GET['inspec'];
		header('Location: inspeccionPlanta.php');
		return false;
	}

	//IMPRIMIR AUTORIZACION (normal o prorrogada)
	if (isset($_GET['id']) && isset($_GET['opc'])){		
		if ($_GET['id'] != 0){
			require("../classes/exportarAPDF.php");
			switch($_GET['opc']){
				case 'a':					
					imprimirAutorizacion($_GET['id']);
					break;
				case 'p':			
					imprimirAutorizacionProrrogada($_GET['id']);
					break;
				default:					
					imprimirCambioAutorizacion($_GET['id'], $_GET['opc']);
					break;
			}
		}
		return false;
	}
	//IMPRIMIR PROVISORIO	
	if (isset($_GET['autorizacion']) && (isset($_GET['planta']) && isset($_GET['pais']))){
		require("../classes/exportarAPDF.php");
		require("../model/moduloPDF.php");
		imprimirProvisorio($_GET['autorizacion'],$_GET['planta'],$_GET['pais'],$_GET['ca'],$_GET['em']);
		return false;
	}

	$tipoUrgencia = tipoUrgenciaRetornaDatos();
	/* buscador */
		$anios = admRetornaAniosProcesados();
		$estados = admRetornaEstadosProcesados("AUTORIZACIONES");
		$presentacionMiel = presentacionesMielRetornaTipos();
	/* fin buscador */
	switch ($_SESSION['perfil']){
			case 2:
				$_SESSION['ruta'] = "Lácteos | Autorizaciones";
				break;
			case 10:
				$_SESSION['ruta'] = "Apícola | Autorizaciones";
				break;
			case 11:
				$_SESSION['ruta'] = "Lácteos/Apícola | Autorizaciones";
				break;
			default:
				$_SESSION['ruta'] = "Autorizaciones de Exportación";
				break;
	}
	$contenido = 'lacteos-autorizaciones.php';
	require('../view/layout.php');	
}
?>