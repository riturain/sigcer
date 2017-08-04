<?php //INSPECCION PUERTO CONTROLLER 
@session_start();
$_SESSION['archivo'] = "inspeccionPuerto";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
//require("../model/inspeccionPlanta.php");
require("../model/inspeccionPuerto.php");
require("../model/lacteos-autorizaciones.php");


if (isset($_GET['id'])){
	require("../classes/exportarAPDF.php");
	imprimirInspeccionPuerto($_GET['id']);
	//$datosImpresion = inspeccionesRetornaDatosImpPuerto($_GET['id']);
	//$productosImpresion = inspeccionesRetornaProductosAfectadosImpPuerto($_GET['id']);
	//$contenedoresImpresion = inspeccionesVerContenedoresImpPuerto($_GET['id']);	
	return false;
}
if (isset($_POST['accion'])){
	switch($_POST['accion']){
		case 'guardarInspeccion':			
			//$_SESSION['POST'] = $_POST;
			//$_POST['idInspeccion'];
			//$_POST['idAutorizacion'];
			//$_POST['estado'];
			//$_POST['buque'];
			//$_POST['fechaPedido'];
			//$_POST['paraElDia'];
			//$_POST['hora'];
			//$_POST['idTerminal'];
			//$_POST['observaciones'];
			//$_POST['patenteChasis'];
			//$_POST['patenteTractor'];
			//$_POST['consolidaEn'];
			//$_POST['requerido'];
			//$_POST['cantProductos'];
			//$_POST['cantContenedores'];
			//$_POST["prodIns$x"];
			//$_POST["contIns$x"];
			
			if ((!isset($_POST['paraElDia'])) || (!isset($_POST['hora']))){
				$_SESSION['rojo'] = "No se han cargado todos los campos. No puede guardar la Inspección";
				header('Location: inspeccionPuerto.php');
				exit();
			}			
			
			if ((!isset($_POST['idInspeccionPuerto'])) || ($_POST['idInspeccionPuerto'] == '')){
				$_POST['idInspeccionPuerto'] = 0;
			}
			
			$idInspeccion = $_POST['idInspeccion']; //PLANTA
			$idInspeccionPuerto = $_POST['idInspeccionPuerto'];
			$_SESSION['idAut'] = $_POST['idAutorizacion'];			
			$_SESSION['tipoInsp'] = "PUERTO";
			$_SESSION['inspeccion_estado'] = "viendo";			
			
			if (isset($_POST['verificado'])){ $verificado = $_POST['verificado']; }else{ $verificado = "";}
			if (isset($_POST['fechaPedido'])){ $fechaPedido = $_POST['fechaPedido']; }else{ $fechaPedido = "";}
			if (isset($_POST['paraElDia'])){ $fechaInspeccion = $_POST['paraElDia']; }else{ $fechaInspeccion = "";}
			if (isset($_POST['hora'])){ $hora = $_POST['hora']; }else{ $hora = "";}
			if (isset($_POST['observaciones'])){ $observaciones = $_POST['observaciones']; }else{ $observaciones = "";}
			
			if (isset($_POST['requerido'])){ $requeridos = $_POST['requerido']; }else{ $requeridos = 0;}
			if($_SESSION['tipo_acceso'] == 2){
				$requeridos = 0;
			}
			
			if (isset($_POST['idTerminal'])){ $idTerminal = $_POST['idTerminal']; }else{ $idTerminal = "";}
			if (isset($_POST['consolidaEn'])){ $consolidaEn = $_POST['consolidaEn']; }else{ $consolidaEn = "";}
			if (isset($_POST['patenteTractor'])){ $patenteTractor = $_POST['patenteTractor']; }else{ $patenteTractor = "";}
			if (isset($_POST['patenteChasis'])){ $patenteChasis = $_POST['patenteChasis']; }else{ $patenteChasis = "";}
			if (isset($_POST['buque'])){ $buque = $_POST['buque']; }else{ $buque = "";}
			
			$cantProductos 		= $_POST['cantProductos'];
			$cantContenedores 	= $_POST['cantContenedores'];
			$cantContenedoresUser 	= $_POST['cantContenedoresUser'];
			
			//$idUsuario = $_SESSION['id_usuario'];
			//$verifica = "";
			//
			//if($_SESSION['tipo_acceso'] != '3'){
			//	$observaciones = "";
			//}else{
			//	$verifica = $_POST['verificado'];
			//}
			
			//CONTROL USUARIO VERIFICA
			$idUsuarioVerifica = 0;
			$verifica = "";
			
			//es nueva, no es inspector ni senasa
			if (($idInspeccionPuerto == 0)&&($_SESSION['tipo_acceso'] != '3')&&($_SESSION['tipo_acceso'] != '1')){
				$idUsuarioVerifica = 0;	
				$verifica = "";
			//si es senasa solo guardo el inspector del combo
			}elseif($_SESSION['tipo_acceso'] == '1'){
				if ((isset($_POST['inspectorCombo'])) && ($_POST['inspectorCombo'] != "")){
					$idUsuarioVerifica = $_POST['inspectorCombo'];
				}else{
					$idUsuarioVerifica = 0;
				}
				$verifica = "";
			//si es inspector guardo el usuario logueado y su verificado
			}elseif ($_SESSION['tipo_acceso'] == '3'){			
				$idUsuarioVerifica = $_SESSION['id_usuario'];
				$verifica = $_POST['verificado'];
			}
			
			$idIns = inspeccionesPuertoRegistraDatos(
				$idInspeccion,
				$idInspeccionPuerto,
				$_SESSION['id_usuario'],
				$idUsuarioVerifica,
				$verifica,
				$fechaPedido,
				$fechaInspeccion,
				$hora,
				$observaciones,
				$requeridos,
				$idTerminal,
				$consolidaEn,
				$patenteTractor,
				$patenteChasis,
				$buque,
				$cantContenedoresUser
			);
			
			if ($idIns != 0){

				// BORRAR PRODUCTOS ANTES DE INSERTAR
				if (isset($_POST['productosABorrar'])&&($_POST['productosABorrar'] != "")){
					$array = explode('**',$_POST['productosABorrar']);
					$longArr = count($array);			
					for ($l = 0; $l<$longArr; $l++){
						borrarProducto($array[$l]);
					}			
				}
				// BORRAR CONTENEDORES ANTES DE INSERTAR
				if (isset($_POST['contenedoresABorrar'])&&($_POST['contenedoresABorrar'] != "")){
					$array = explode('**',$_POST['contenedoresABorrar']);
					$longArr = count($array);			
					for ($l = 0; $l<$longArr; $l++){
						borrarContenedor($array[$l]);
					}
				}
			
				//	InspeccionesRegistraProductos 
				for($x=0; $x<$cantProductos; $x++){
					$p = devolverProducto($_POST["prodIns$x"]);					
					
					inspeccionesRegistraProductos(
						$p['detalleInsp'],
						$idIns,
						$p['idDetalleAut'],
						$p['Por'],
						$p['Envases'],
						$p['Unidades'],
						$p['Kilos'],
						"PUERTO"
					);
				}
				// InspeccionesRegistraContenedores 
				for($x=0; $x<$cantContenedores; $x++){
					$c = devolverContenedor($_POST["contIns$x"]);
		
					inspeccionesRegistraContenedores(
						$c['detalleCont'],
						$idIns,
						$c['Contenedor'],
						$c['Precinto'], 
						$c['idDetalle'],
						"PUERTO"
					);
				}
				
				if ($idInspeccionPuerto == 0){
					$operacion = "ALTA";
				}else{
					$operacion = "CAMBIO";	
				}
				
				if (($_SESSION['tipo_acceso'] != 2)){
					if ((isset($_POST['inputarRequeridos'])) && ($_POST['inputarRequeridos'] == "si")){
						$res = calcularRequerido($_POST['fechaPedido'],$_POST['paraElDia'],$idIns,$_SESSION['id_usuario'],$requeridos,$operacion);
					}
				}else{
					$res = calcularRequerido($_POST['fechaPedido'],$_POST['paraElDia'],$idIns,$_SESSION['id_usuario'],$requeridos,$operacion);
				}
				//para la recarga
				$_SESSION['idInsp'] = $idIns;
				$_SESSION['verde'] = "Se guardaron los cambios de la inspección correctamente.";
			}else{
				//si es inspector y no pudo grabar la inspección la vuelvo a traer
				if ($_SESSION['tipo_acceso'] == '3'){
					$_SESSION['idInsp'] = $idInspeccionPuerto;
				}
				$_SESSION['rojo'] = "No se han podido guardar los cambios de la inspección.";				
			}
			header('Location: inspeccionPuerto.php');
		break;		
			
		case 'buscarInspecciones':
			$par1 = $_POST['numInspeccion'];
			$par2 = $_POST['numAutorizacion'];
			$par3 = $_POST['empresa'];
			$par4 = $_POST['idTerminal'];			
			$par5 = $_POST['fecha'];			
			$inspecciones = inspeccionesPuertoRetornaBusqueda($par1,$par2,$par3,$par4,$par5,'NULL',$_SESSION['id_usuario']);			
			echo(json_encode(utf8_encode_all($inspecciones)));
			
			break;	
		
		case 'traerInspeccion':
			$_SESSION['idAut'] = $_POST['idAutorizacion'];
			$_SESSION['idInsp'] = $_POST['idInspeccion'];
			switch($_POST['tipoB']){
				case 0: 
					$_SESSION['tipoInsp'] = "PLANTA";
					$_SESSION['inspeccion_estado'] = "nuevo";
					break;
				case 1: 
					$_SESSION['tipoInsp'] = "PUERTO";
					$_SESSION['inspeccion_estado'] = "viendo";
					break;
			}
			// recarga JAVASCRIPT
			break;

		case 'puedeModificar':
			//inspector de planta es = 3 || es Senasa es = 1

			//verifica que la autorización esté vigente ($ret = 1)
			$ret = autorizacionesLacteosPuedeModificarDerivado($_POST['idAutorizacion']);

			if ($ret == 1){
				//devuelve 1 si está firmada
				$estadoTramite = comprobarEstadoTramite($_POST['idInspeccion'],"PUERTO");

				//si no es senasa ni inspector de planta y está firmada => NO PUEDE MODIFICAR
				$estados = array(5, 6);//firmado, entregado
				if (($_SESSION['tipo_acceso'] != 1) && ($_SESSION['tipo_acceso'] != 3) && (in_array($estadoTramite, $estados))){
					$ret = 3;// está verificada y está firmada no se puede modificar
				}

				//si no es senasa ni inspector y está verificada => NO PUEDE MODIFICAR
				if (($ret == 1) && ($_SESSION['tipo_acceso'] != 1) && ($_SESSION['tipo_acceso'] != 3) && ($_POST['verificado'] != '')){
					$ret = 2; //2 = La inspección no puede ser modificada por la empresa porque el inspector ya la verificó
				}
			}
			echo $ret;
			break;
		
		case 'verificaSiTieneCambios':
			$ret = verificaSiTieneCambios($_POST['idInspeccion'], "INSPECCIONESPUERTO");
			echo $ret;
			break;
			
		case 'anularInspeccion':
			$ret = inspeccionesAnular($_POST['idInspeccion'], $_POST['motivo'], 'PUERTO');			
			echo $ret;
			break;
		
		case 'esInspector':
			if ($_SESSION['tipo_acceso'] == 3){ //inspector de puerto es = 3
				echo 1;
			}else{
				echo 0;
			}
			break;
		
		case 'esSenasa':
			if ($_SESSION['tipo_acceso'] == 1){ //es Senasa es = 1
				echo 1;
			}else{
				echo 0;
			}
			break;
			
		case 'verificaInspectorParaModif':
			if (($_SESSION['tipo_acceso'] == 1) || ($_SESSION['tipo_acceso'] == 3)) { //senasa o inspector puerto
				echo 1;
			}else{
				echo 0;
			}
			break;
		/*	
		case 'cuponesRetornaAfectados':
			require ("../model/cupones.php");
			$ret = cuponesYPagosRetornaCuponesAfectados($_POST['idInspeccion'],"INSPECCIONESPUERTO");			
			echo (json_encode(utf8_encode_all($ret)));
			break;
			
		case 'cuponesRetornaDisponibles':		
			require ("../model/cupones.php");
			$ret = array();			
			$ret['cuponesRequeridos'] = cuponesYPagosRetornaCuponesDisponibles($_POST['idEmpresa'], 2); //REQUERIDOS			
			echo (json_encode(utf8_encode_all($ret)));
			break;
		
		case 'cuponesRetornaValores':
			require ("../model/cupones.php");
			$ret = inspeccionesRetornaValoresCupones($_POST['idInspeccion'],"PUERTO");
			echo (json_encode(utf8_encode_all($ret)));
			break;	
		
		case 'cuponesRetornaAbonados':
			require ("../model/cupones.php");
			$ret = tramitesTotalCuponesPagos($_POST['idInspeccion'], 'INSPECCIONESPUERTO');
			echo (json_encode(utf8_encode_all($ret)));
			break;
			
		case 'cuponesConfirmar':
			require ("../model/cupones.php");
			$ret = cuponesAfectarAPago($_POST['idPagoCupon'], $_POST['idCupones']);
			$ret = 1;//borrar
			echo $ret;
			break;
		*/
		case 'traerBuques':
			$buques = buquesRetornaPorTerminalEnOptions($_POST['idTerminal']);
			echo $buques;
			break;
	}
}else{	
	$estadoInsp = 'nuevo';
	if (isset($_SESSION['inspeccion_estado'])){
		$estadoInsp = $_SESSION['inspeccion_estado'];
		unset($_SESSION['inspeccion_estado']);
	}
	$openS = false;
	//if seteada $_SESSION['idAutorizacionParaPuerto'] -> busco las inspecciones de planta y las muestro 
	if(isset($_SESSION['idAutorizacionParaPuerto'])){
		$resultadosBusqueda = inspeccionesPuertoRetornaBusqueda('NULL','NULL','NULL','NULL','NULL',$_SESSION['idAutorizacionParaPuerto'],$_SESSION['id_usuario']);		
		$openS = true;
		unset($_SESSION['idAutorizacionParaPuerto']);
	}	
	if(isset($_SESSION['idAut'])){
		//info autorización
		$autorizacion = array();
		$autorizacion['datos'] = autorizacionesRetornaDatos($_SESSION['idAut']);
		$ret = autorizacionesRetornaPlantas($_SESSION['idAut']);		
		$autorizacion['plantas'] = autorizacionesRetornaPlantasPosibles($autorizacion['datos']['IdEmpAut'], $autorizacion['datos']['IdPais'], $_SESSION['id_usuario']);
		$autorizacion['plantasId'] = $ret['plantas'];		
		$autorizacion['productos'] = autorizacionesRetornaProductosAfectados($_SESSION['idAut']);
		//productos para inspeccion
		$productosParaInspec = autorizacionesRetornaProdParaInspeccion($_SESSION['idAut']);
	
		if(isset($_SESSION['idInsp'])){
			$datosInsp = inspeccionesVerDatos($_SESSION['idInsp'], $_SESSION['tipoInsp']);
			//$_SESSION['debug'][] = $datosInsp;	
			if((isset($autorizacion['datos']['IdTransporte'])) && ($autorizacion['datos']['IdTransporte'] == 2)){
				$buques = buquesRetornaPorTerminal($datosInsp['IdTerminal']);
			}
			$productosInsp = inspeccionesVerProductos($_SESSION['idInsp'], $_SESSION['idAut'],$_SESSION['tipoInsp']);
	
			$prodSeleccionados = array();			
			foreach($productosInsp as $aux){
				$prodSeleccionados[] = $aux['IdDetalleProdAut'];				
			}
			$contenedoresInsp = inspeccionesVerContenedores($_SESSION['idInsp'],$_SESSION['tipoInsp']);
	
			unset($_SESSION['idInsp']);
			unset($_SESSION['tipoInsp']);
		}	
		unset($_SESSION['idAut']);
	}

	//si es usuario senasa busco los inspectores
	if ($_SESSION['tipo_acceso'] == 1){ //si es senasa
		require("../model/inspectores.php");
		$losinspectores = inspectoresRetornaTodos();	
	}else{
		$losinspectores = array();
	}
	
	//$tipoUrgencia = tipoUrgenciaRetornaDatos();
	$terminales = inspeccionesRetornaTerminales();
	$maxKContenedor = retornaMaxKilosPorContenedor();
	//datos de la página
	$_SESSION['ruta'] = "Inspecciones de Puerto";
	$contenido = 'inspeccionPuerto.php';
	require('../view/layout.php');
}
?>