<?php  //INSPECCION PUERTO MODEL 
//BUSCAR
function inspeccionesPuertoRetornaBusqueda($numero = 'NULL',$numAut = 'NULL',$empresa = 'NULL',$idTerminal = 'NULL', $fecha = 'NULL',$idAutorizacion = 'NULL',$idUsuario = 0){
	$db = new SQL2K();
	$params = array(
        '@Numero' => array(
			'is_out' => false,
            'value' => $numero,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@NumAut' => array(
			'is_out' => false,
            'value' => $numAut,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Empresa' => array(
			'is_out' => false,
            'value' => $empresa,
            'type' => SQLSRV_PHPTYPE_STRING(150)
        ),
		'@IdTerminal' => array(
			'is_out' => false,
            'value' => $idTerminal,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Fecha' => array(
			'is_out' => false,
            'value' => $fecha,
            'type' => SQLSRV_PHPTYPE_STRING(10)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('InspeccionesPuertoRetornaBusqueda',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

//RELLENAR
function autorizacionesRetornaProdParaInspeccion($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AutorizacionesRetornaProdParaInspeccion',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
//RELLENAR
function inspeccionesRetornaTerminales(){
	$db = new SQL2K();	
	$res = $db->execute('InspeccionesRetornaTerminales');
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
function retornaMaxKilosPorContenedor(){
	$db = new SQL2K();	
	$res = $db->execute('InspeccionesVerMaxKilosContenedores');
	$result = $db->fetchAssoc($res);
	$db->disconnect();	
	return $result['MaxKilosContenedor'];
}


//VER
function inspeccionesVerDatos($idInspeccion = 0, $tipo){
//	@Tipo = 'PUERTO'
	$db = new SQL2K();
	$params = array(
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('InspeccionesVerDatos',$params);
	$result = $db->fetchAssoc($res);	
	$db->disconnect();
	//SI ES PLANTA -> LIMPIO = ['FechaInsp'],['Hora'],['Requerido'],['Observaciones']
	if ($tipo == "PLANTA"){
		$result['FechaInsp'] = "";
		$result['Hora'] = "";
		$result['Requeridos'] = 0;
		$result['Observaciones'] = "";
	}
	return $result;	
}
//VER
function inspeccionesVerProductos($idInspeccion,$idAutorizacion,$tipo){
	$db = new SQL2K();
	$params = array(
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	if ($tipo == "PLANTA"){
		$res = $db->execute('InspeccionesVerProductos',$params);
	}else{
		$res = $db->execute('InspeccionesPuertoVerProductos',$params);
	}
	$result = $db->fetchAllAssoc($res);
	if ($tipo == "PLANTA"){
		$cant = count($result);
		for ($i = 0; $i < $cant; $i++){
			$result[$i]['IdDetalle'] = 0;
		}
	}
	$db->disconnect();
	return $result;
}
//VER
function inspeccionesVerContenedores($idInspeccion,$tipo){
	$db = new SQL2K();
	$params = array(
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('InspeccionesVerContenedores',$params);
	$result = $db->fetchAllAssoc($res);
	if ($tipo == "PLANTA"){
		$cant = count($result);
		for ($i = 0; $i < $cant; $i++){
			$result[$i]['IdContenedor'] = 0;
		}
	}
	$db->disconnect();
	return $result;
}
//VER
function devolverProducto($concatenado){	
	$array = explode('**',$concatenado);
	$result = array();
	$result['idProdExportado']	= $array[0];
	$result['idDetalleAut']		= $array[1];
	$result['Kilos'] 			= $array[2];	
	$result['Unidades'] 		= $array[3];
	$result['Envases'] 			= $array[4];		
	$result['Nombre'] 			= $array[5];
	$result['Por'] 				= $array[6];
	$result['detalleInsp']		= $array[7];
	return $result;
}
//VER
function devolverContenedor($concatenado){	
	$array = explode('**',$concatenado);
	$result = array();
	$result['Contenedor'] 	= $array[0];
	$result['Precinto'] 	= $array[1];
	$result['Producto'] 	= $array[2];	
	$result['idProducto'] 	= $array[3];
	$result['idDetalle'] 	= $array[4];		
	$result['detalleCont']	= $array[5];
	return $result;
}
//MODIFICAR
function autorizacionesLacteosPuedeModificarDerivado($idAutorizacion){
	//@IdAutorizacion int = 0,
	//@Res int output
	$db = new SQL2K();
	$params = array(	
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),	
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesLacteosPuedeModificarDerivado', $params);
	$db->disconnect();
	return $result;
}
//MODIFICAR
function verificaSiTieneCambios($idTramite = 0, $tipo){
	$db = new SQL2K();
	$params = array(	
        '@IdTramite' => array(
			'is_out' => false,
            'value' => $idTramite,
            'type' => SQLSRV_PHPTYPE_INT
        ),	
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),	
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('VerificaSiTieneCambios', $params);
	$db->disconnect();
	return $result;
}

//GUARDAR
function inspeccionesPuertoRegistraDatos($idInspeccion = 0, 
										$idInspeccionPuerto = 0, 
										$idUsuario = 0, $idUsuarioVerifica = 0, $verifica,
										$fechaPedido, $fechaInspeccion = "", $hora = "", $observaciones = "", 
										$requeridos = 0,$idTerminal = 0,$consolidaEn = "",$patenteTractor = "",$patenteChasis = "",
										$buque = "", $nroContenedores = 0){										
	$db = new SQL2K();	
	$params = array(
		'@IdInspeccionPuerto' => array(
			'is_out' => false,
            'value' => $idInspeccionPuerto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@FechaPedido' => array(
			'is_out' => false,
            'value' => $fechaPedido,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Fecha' => array(
			'is_out' => false,
            'value' => $fechaInspeccion,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Hora' => array(
			'is_out' => false,
            'value' => $hora,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Observaciones' => array(
			'is_out' => false,
            'value' => $observaciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Requeridos' => array(
			'is_out' => false,
            'value' => $requeridos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuarioVerifica' => array(
			'is_out' => false,
            'value' => $idUsuarioVerifica,
            'type' => SQLSRV_PHPTYPE_INT
        ),		
		'@Verificado' => array(
			'is_out' => false,
            'value' => $verifica,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdTerminal' => array(
			'is_out' => false,
            'value' => $idTerminal,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@ConsolidaEn' => array(
			'is_out' => false,
            'value' => $consolidaEn,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@PatenteTractor' => array(
			'is_out' => false,
            'value' => $patenteTractor,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@PatenteChasis' => array(
			'is_out' => false,
            'value' => $patenteChasis,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Buque' => array(
			'is_out' => false,
            'value' => $buque,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@NroContenedores' => array(
			'is_out' => false,
            'value' => $nroContenedores,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('InspeccionesPuertoRegistraDatos',$params);
	$db->disconnect();
	return $result;
}
//GUARDAR
function inspeccionesRegistraProductos($idDetalle = 0, $idInspeccion = 0, $idDetAut = 0, $por = "", $envases, $unidades, $kilos, $tipo = ""){
	$db = new SQL2K();
	$params = array(
	//@IdDetalle int = 0, -NUEVA en CERO	
        '@IdDetalle' => array(
			'is_out' => false,
            'value' => $idDetalle,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdInspeccion int = 0,
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdDetAut int = 0,
		'@IdDetAut' => array(
			'is_out' => false,
            'value' => $idDetAut,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Por varchar(50),
		'@Por' => array(
			'is_out' => false,
            'value' => $por,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Envases numeric(18,4),
		'@Envases' => array(
			'is_out' => false,
            'value' => $envases,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Unidades numeric(18,4),
		'@Unidades' => array(
			'is_out' => false,
            'value' => $unidades,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Kilos numeric(18,4),		
		'@Kilos' => array(
			'is_out' => false,
            'value' => $kilos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Res int output
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('InspeccionesRegistraProductos', $params);
	$db->disconnect();
	return $result;
}
//GUARDAR
function inspeccionesRegistraContenedores($idContenedor = 0, $idInspeccion = 0, $contenedor = "", $precinto = "", $prodRel = 0, $tipo = ""){
	$db = new SQL2K();
	$params = array(
	//@IdContenedor int = 0,
        '@IdContenedor' => array(
			'is_out' => false,
            'value' => $idContenedor,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdInspeccion int = 0,
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Contenedor varchar(100),
		'@Contenedor' => array(
			'is_out' => false,
            'value' => $contenedor,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Precinto  varchar(100),
		'@Precinto' => array(
			'is_out' => false,
            'value' => $precinto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@ProdRel  int = 0,	
		'@ProdRel' => array(
			'is_out' => false,
            'value' => $prodRel,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Res int output
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('InspeccionesRegistraContenedores', $params);
	$db->disconnect();
	return $result;
}
//GUARDAR
function borrarProducto($id){	
	$tabla = "InspeccionesPuertoYProductos";
	$where = "IdDetalle = ".$id;
	$res = borrarRegistro($tabla,$where);	
	return $res;
}
//GUARDAR
function borrarContenedor($id){
	$tabla = "InspeccionesPuertoYContenedores";
	$where = "IdContenedor = ".$id;
	$res = borrarRegistro($tabla,$where);	
	return $res;
}
//GUARDAR
function calcularRequerido($fechaPedido = "",$fecha = "",$idInspeccion = 0,$idUsuario = 0, $requeridos = 0, $operacion  = ""){	
	$tipo = "INSPECCIONESPUERTO";
	
	$db = new SQL2K();
	$params = array(
		'@FechaPedido' => array(
			'is_out' => false,
            'value' => $fechaPedido,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Fecha' => array(
			'is_out' => false,
            'value' => $fecha,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Operacion' => array(
			'is_out' => false,
            'value' => $operacion,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@RequeridosOriginales' => array(
			'is_out' => false,
            'value' => $requeridos,
            'type' => SQLSRV_PHPTYPE_INT
        ),		
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('CalcularRequeridos',$params);
	$db->disconnect();
	return $result;
}

//ANULAR
function inspeccionesAnular($idInspeccion = 0, $motivo, $tipo){
	$db = new SQL2K();
	$params = array(	
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),	
		'@MotivoAnula' => array(
			'is_out' => false,
            'value' => $motivo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),		
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('InspeccionesAnular', $params);
	$db->disconnect();
	return $result;
}

function buquesRetornaPorTerminal($idTerminal = 0){
	$db = new SQL2K();
	$params = array(
        '@IdTerminal' => array(
			'is_out' => false,
            'value' => $idTerminal,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('BuquesRetornaPorTerminal',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
function buquesRetornaPorTerminalEnOptions($terminal){
	$buques = buquesRetornaPorTerminal($terminal);
	$ret = "<option value=''> Elegir.. </option>
	";
	foreach($buques as $b){
		$ret .= utf8_encode("<option value='$b[IdBuque]'>$b[Buque]</option>
		");
	}
	return $ret;
}

// ---------- IMPRIMIR INSPECCION PUERTO -----------
function inspeccionesRetornaDatosImpPuerto($idInspeccion = 0){	
	$db = new SQL2K();
	$params = array(	
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);
	$res = $db->execute('InspeccionesPuertoRetornaDatosImpresion', $params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}
function inspeccionesRetornaProductosAfectadosImpPuerto($idInspeccion = 0){
	$db = new SQL2K();
	$params = array(	
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);
	$res = $db->execute('InspeccionesPuertoRetornaProductosAfectados', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}
function inspeccionesVerContenedoresImpPuerto($idInspeccion = 0){
	$db = new SQL2K();
	$params = array(	
        '@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idInspeccion,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);
	$res = $db->execute('InspeccionesPuertoContenedoresPrint', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}
/**/
function imprimirInspeccionPuerto($idInspeccion){
		
	$retorna = codigoPDFExportarInspPuerto($idInspeccion);
	$codigoListo = cargarCodigoHTML($retorna['codigo'],"estiloPDFInspeccionPuerto");
	
	exportarAPDFOficio($codigoListo, "Inspeccion de Puerto",$ret['codeBar'], traerCuve($idInspeccion,'INSPECCIONESPUERTO'));
}

function codigoPDFExportarInspPuerto($idInspeccion,$codeBar){
	$datos = inspeccionesRetornaDatosImpPuerto($idInspeccion);	
	
	$_SESSION['marcaAgua'] = false;
	
	if (($datos['NumAutorizacion'] == 0) || ($datos['NumInspeccion'] == 0) || ($_SESSION['tipo_acceso'] == 2)){
		$_SESSION['marcaAgua'] = true;		
	}else{
		if ($datos['Verificado'] != 'CONFORME'){
			$_SESSION['marcaAgua'] = true;			
		}else{		
			$retCircuito = admNoHayCircuitoAbierto($idInspeccion ,'INSPECCIONESPUERTO');
			if (($retCircuito == 0) && ($_SESSION['tipo_acceso'] != 4)){			
				$_SESSION['marcaAgua'] = true;
			}
		}
	}
	
	$productos = inspeccionesRetornaProductosAfectadosImpPuerto($idInspeccion);
	$contenedores = inspeccionesVerContenedoresImpPuerto($idInspeccion);
	$codeBar = "../classes/barcode/INS".$_SESSION['id_usuario']."-".$idInspeccion.".gif";
	$codigo = "";
	$anio = substr($datos['FechaInsp'],-4);
	$idCode = zerofill($datos['NumInspeccion'], 8);	
	$code = "PUE".$anio.$idCode;
	require("../classes/barcode/sample-gd.php");
	require("../archivosPDF/codigoInspeccionPuerto.php");	
	$codeBar = str_replace('..','',$codeBar);
	
	$ret = array();
	$ret['codigo'] = $codigo;
	$ret['codeBar'] = $codeBar;	
	return $ret;
}
/**/
?>