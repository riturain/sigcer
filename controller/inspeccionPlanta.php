<?php //INSPECCION PLANTA CONTROLLER
@session_start();
$_SESSION['archivo'] = "inspeccionPlanta";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/inspeccionPlanta.php");
require("../model/lacteos-autorizaciones.php");


if (isset($_GET['id'])){
	require("../classes/exportarAPDF.php");
	imprimirInspeccionPlanta($_GET['id']);
	//$datosImpresion = inspeccionesRetornaDatosImpPlanta($_GET['id']);
	//$productosImpresion = inspeccionesRetornaProductosAfectadosImpPlanta($_GET['id']);
	//$contenedoresImpresion = inspeccionesVerContenedoresImpPlanta($_GET['id']);
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

			//limpiar con htmlentities

			$idInspeccion 		= $_POST['idInspeccion'];
			$idAutorizacion 	= $_POST['idAutorizacion']; $_SESSION['idAut'] = $_POST['idAutorizacion'];
			$estado 			= $_POST['estado'];

			//CONTROL USUARIO VERIFICA
			$idUsuarioVerifica = 0;
			$verifica = "";
			
			//es nueva, no es inspector ni senasa
			if (($idInspeccion == 0)&&($_SESSION['tipo_acceso'] != '4')&&($_SESSION['tipo_acceso'] != '1')){
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
			}elseif ($_SESSION['tipo_acceso'] == '4'){
				$idUsuarioVerifica = $_SESSION['id_usuario'];
				$verifica = $_POST['verificado'];
			}

			$fechaPedido 		= $_POST['fechaPedido'];
			$fechaInspeccion 	= $_POST['paraElDia'];
			$hora 				= $_POST['hora'];

			$idTerminal 		= $_POST['idTerminal'];
			$consolidaEn 		= $_POST['consolidaEn'];
			$patenteChasis 		= $_POST['patenteChasis'];
			$patenteTractor 	= $_POST['patenteTractor'];
			$buque 				= $_POST['buque'];
			$observaciones 		= $_POST['observaciones'];

			if($_SESSION['tipo_acceso'] == 2){
				$requeridos = 0;
			}else{
				$requeridos = $_POST['requerido'];
			}

			$cantProductos 		= $_POST['cantProductos'];
			$cantContenedores 	= $_POST['cantContenedores'];
			$cantContenedoresUser 	= $_POST['cantContenedoresUser'];


			$idIns = inspeccionesPlantaRegistraDatos(
				$idInspeccion,
				$idAutorizacion,
				$estado,
				$buque,
				$fechaPedido,
				$fechaInspeccion,
				$hora,
				$idTerminal,
				$observaciones,
				$patenteChasis,
				$patenteTractor,
				$consolidaEn,
				$verifica,
				$requeridos,
				$cantContenedoresUser,
				$_SESSION['id_usuario'],
				$idUsuarioVerifica
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
					//['idProdExportado']
					//['idDetalleAut']
					//['Kilos']
					//['Unidades']
					//['Envases']
					//['Nombre']
					//['Por']
					//['detalleInsp']
					inspeccionesRegistraProductos(
						$p['detalleInsp'],
						$idIns,
						$p['idDetalleAut'],
						$p['Por'],
						$p['Envases'],
						$p['Unidades'],
						$p['Kilos'],
						"PLANTA"
					);
				}
				// InspeccionesRegistraContenedores
				for($x=0; $x<$cantContenedores; $x++){
					$c = devolverContenedor($_POST["contIns$x"]);
					//['Contenedor']
					//['Precinto']
					//['Producto'] 	-- NOMBRE
					//['idProducto'] -- NO SE USA
					//['idDetalle'] -- autorizacion
					//['detalleCont']
					inspeccionesRegistraContenedores(
						$c['detalleCont'],
						$idIns,
						$c['Contenedor'],
						$c['Precinto'],
						$c['idDetalle'],
						"PLANTA"
					);
				}

				if ($idInspeccion == 0){
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
				$_SESSION['verde'] = "Se guardó la inspección correctamente.";
			}else{
				//si es inspector y no pudo grabar la inspección la vuelvo a traer
				if ($_SESSION['tipo_acceso'] == '4'){
					$_SESSION['idInsp'] = $idInspeccion;
				}
				$_SESSION['rojo'] = "No se ha podido guardar la inspección.";
			}
			header('Location: inspeccionPlanta.php');
			return false;
		break;

		case 'buscarInspecciones':
			$par1 = $_POST['numInspeccion'];
			$par2 = $_POST['numAutorizacion'];
			$par3 = $_POST['empresa'];
			$par4 = $_POST['fecha'];
			$par5 = $_POST['idTerminal'];
			$inspecciones = inspeccionesRetornaBusqueda($par1,$par2,$par3,$par4,$par5,$_SESSION['id_usuario']);
			echo(json_encode(utf8_encode_all($inspecciones)));
			break;

		case 'traerInspeccion':
			$_SESSION['idAut'] = $_POST['idAutorizacion'];
			$_SESSION['idInsp'] = $_POST['idInspeccion'];			
			// recarga JAVASCRIPT
			break;

		case 'puedeModificar':
			//inspector de planta es = 4 || es Senasa es = 1

			//verifica que la autorización esté vigente ($ret = 1)
			$ret = autorizacionesLacteosPuedeModificarDerivado($_POST['idAutorizacion']);

			if ($ret == 1){
				//devuelve 1 si está firmada
				$estadoTramite = comprobarEstadoTramite($_POST['idInspeccion'],"PLANTA");

				//si no es senasa ni inspector de planta y está firmada => NO PUEDE MODIFICAR
				$estados = array(5, 6);//firmado, entregado
				if (($_SESSION['tipo_acceso'] != 1) && ($_SESSION['tipo_acceso'] != 4) && (in_array($estadoTramite, $estados))){
					$ret = 3;// está verificada y está firmada no se puede modificar
				}

				//si no es senasa ni inspector y está verificada => NO PUEDE MODIFICAR
				if (($ret == 1) && ($_SESSION['tipo_acceso'] != 1) && ($_SESSION['tipo_acceso'] != 4) && ($_POST['verificado'] != '')){
					$ret = 2; //2 = La inspección no puede ser modificada por la empresa porque el inspector ya la verificó
				}
			}
			echo $ret;
			break;

		case 'verificaSiTieneCambios':
			$ret = verificaSiTieneCambios($_POST['idInspeccion'], "INSPECCIONES");
			echo $ret;
			break;

		case 'verificaInspectorParaModif':
			if (($_SESSION['tipo_acceso'] == 1) || ($_SESSION['tipo_acceso'] == 4)){
				echo 1;
			}else{    
				echo 0;
			}
			break;
			
		case 'anularInspeccion':
			$ret = inspeccionesAnular($_POST['idInspeccion'], $_POST['motivo'],'PLANTA');
			echo $ret;
			break;

		case 'esInspector':			
			if ($_SESSION['tipo_acceso'] == 4){ //inspector de planta es = 4
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
		/*
		case 'cuponesRetornaAfectados':
			require ("../model/cupones.php");
			$ret = cuponesYPagosRetornaCuponesAfectados($_POST['idInspeccion'],"INSPECCIONES");
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
			$ret = inspeccionesRetornaValoresCupones($_POST['idInspeccion'],"PLANTA");
			echo (json_encode(utf8_encode_all($ret)));
			break;

		case 'cuponesRetornaAbonados':
			require ("../model/cupones.php");
			$ret = tramitesTotalCuponesPagos($_POST['idInspeccion'], 'INSPECCIONES');
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
			$datosInsp = inspeccionesVerDatos($_SESSION['idInsp'], 'PLANTA');
			//$_SESSION['datosInsp'] = $datosInsp;
			if((isset($autorizacion['datos']['IdTransporte'])) && ($autorizacion['datos']['IdTransporte'] == 2)){
				$buques = buquesRetornaPorTerminal($datosInsp['IdTerminal']);
			}

			$productosInsp = inspeccionesVerProductos($_SESSION['idInsp'], $_SESSION['idAut']);
			$prodSeleccionados = array();
			foreach($productosInsp as $aux){
				$prodSeleccionados[] = $aux['IdDetalleProdAut'];
			}
			$contenedoresInsp = inspeccionesVerContenedores($_SESSION['idInsp'],"PLANTA");

			unset($_SESSION['idInsp']);
		}
		unset($_SESSION['idAut']);
	}
	//if(isset($datosInsp)){echo "<pre>";print_r($datosInsp);echo "</pre>";}
	//if(isset($productosInsp)){echo "<pre>";print_r($productosInsp);echo "</pre>";}
	//if(isset($contenedoresInsp)){echo "<pre>";print_r($contenedoresInsp);echo "</pre>";}

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
	$_SESSION['ruta'] = "Verificaciones de Plantas";
	$contenido = 'inspeccionPlanta.php';
	require('../view/layout.php');
}
?>