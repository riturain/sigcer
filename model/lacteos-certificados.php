<?php //CERTIFICADOS MODEL 

function autorizacionesRetornaProdParaCertificado($idAutorizacion = 0){
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

function paisesRetornaPicAMostrar($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('PaisesRetornaPicAMostrar',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function retornaNumPics($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('PaisesRetornaPicAMostrar',$params);
	$res = $db->fetchAllAssoc($res);
	$db->disconnect();
	$result = array();
	foreach ($res as $each){
		$result[] = $each['CodRequisito'];
	}	
	return $result;
}

function retornaNumPicsPDF($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('PaisesRetornaPicImpresion',$params);
	$res = $db->fetchAllAssoc($res);
	$db->disconnect();
	$result = array();
	foreach ($res as $each){
		$result[] = $each['CodRequisito'];
	}	
	return $result;
}



function certificadosRetornaProdInspSelec($inspecciones = "", $idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@Inspecciones' => array(
			'is_out' => false,
            'value' => $inspecciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaProdInspSelec',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadosRetornaProdAfectados($idCert = 0){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaProdAfectados',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadoRetornaBusqueda($numCert = 'null', $numAut = 'null', $empre = 'null', $anio = 'null', $estado = 'null', $destino = 'null', $idUsuario = 0){
	$db = new SQL2K();
	$params = array(        
		'@NumAutorizacion' => array(
			'is_out' => false,
            'value' => $numAut,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Empresa' => array(
			'is_out' => false,
            'value' => $empre,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Anio' => array(
			'is_out' => false,
            'value' => $anio,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Estado' => array(
			'is_out' => false,
            'value' => $estado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPais' => array(
			'is_out' => false,
            'value' => $destino,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@NumCertificado' => array(
			'is_out' => false,
            'value' => $numCert,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$_SESSION['debug'] = $params;
	$res = $db->execute('CertificadosBuscarDatosWeb',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function firmantesRetornaDatos($tipo){
	$db = new SQL2K();
	$params = array(    
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('FirmantesRetornaDatos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}

function certificadosRetornaFirmantesWeb($idCert){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaFirmantesWeb',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;	
}
	
function certificadosRetornaContInspSelec($inspecciones = "", $idAutorizacion = 0){	
	$db = new SQL2K();
	$params = array(    
		'@Inspecciones' => array(
			'is_out' => false,
            'value' => $inspecciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CertificadosRetornaContInspSelec',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}

function certificadosRetornaContProdAfectados($idCert = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CertificadosRetornaContProdAfectados',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}

function certificadosRetornaDatosWeb($idCert){
	$db = new SQL2K();
	$params = array(    
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('certificadosRetornaDatosWeb',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadoPorCuentaYOrdenRetornaSimilares($idUsuario = 0, $texto=' ', $quebuscar='PORCUENTAYORDEN'){
	$db = new SQL2K();
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tabla' => array(
			'is_out' => false,
            'value' => $quebuscar,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		),		
		'@Param' => array(
			'is_out' => false,
            'value' => $texto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		)
    );	
	$res = $db->execute('BuscadorWebPorUsuario', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function certificadoImportadoresRetornaSimilares($idUsuario = 0, $texto=' ', $quebuscar='IMPORTADORES'){
	$db = new SQL2K();
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tabla' => array(
			'is_out' => false,
            'value' => $quebuscar,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		),		
		'@Param' => array(
			'is_out' => false,
            'value' => $texto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		)
    );	
	$res = $db->execute('BuscadorWebPorUsuario', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function certificadosRetornaProductosParaLotes($inspecciones = "", $idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(    
		'@Inspecciones' => array(
			'is_out' => false,
            'value' => $inspecciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CertificadosRetornaProductosParaLotes',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}

function certificadosRetornaLotesWeb($idCert){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaLotesWeb',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadosRetornaTransporteInspeccion($idIns = 0,$idAut = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdInspeccion' => array(
			'is_out' => false,
            'value' => $idIns,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAut,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CertificadosRetornaTransporteInspeccion',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result['Buque'];	
}

function certificadosVerificaSiEsCambio($idCertificado){
	$db = new SQL2K();	
	$params = array(
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('CertificadosVerificaSiEsCambio',$params);
	$db->disconnect();
	return $result;
}

function certificadosABMWeb($idCertificado = 0, $idAutorizacion = 0, $idImportador = 0, $estado = '', $fecha = '', $transitoPor = '', $desde = '', $hasta = '', $unTerritorial = '',
							$buque = '', $bl = '', $fechaSalida = '', $puestoFronterizo = '', $puertoDescarga = '', $fechaDescarga = '', $condAlmac = '', $obs = '', $copiasEmpresa = 0,
							$requeridos = 0, $kgBrutos = 0, $consumoAnimal = 0, $idUsuario = 0, $referencia = '', $piePagina  = '', $anulaReemplaza = 0, $tresIdiomas = 0, $idPorCuentaDe = 0){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdImportador' => array(
			'is_out' => false,
            'value' => $idImportador,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Estado' => array(
			'is_out' => false,
            'value' => $estado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Fecha' => array(
			'is_out' => false,
            'value' => $fecha,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@TransitoPor' => array(
			'is_out' => false,
            'value' => $transitoPor,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Desde' => array(
			'is_out' => false,
            'value' => $desde,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Hasta' => array(
			'is_out' => false,
            'value' => $hasta,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@UnTerritorial' => array(
			'is_out' => false,
            'value' => $unTerritorial,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Buque' => array(
			'is_out' => false,
            'value' => $buque,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@BL' => array(
			'is_out' => false,
            'value' => $bl,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@FechaSalida' => array(
			'is_out' => false,
            'value' => $fechaSalida,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@PuestoFronterizo' => array(
			'is_out' => false,
            'value' => $puestoFronterizo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@PuertoDescarga' => array(
			'is_out' => false,
            'value' => $puertoDescarga,
            'type' => SQLSRV_SQLTYPE_TEXT
        ),
		'@FechaDescarga' => array(
			'is_out' => false,
            'value' => $fechaDescarga,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@CondAlmac' => array(
			'is_out' => false,
            'value' => $condAlmac,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Obs' => array(
			'is_out' => false,
            'value' => $obs,
            'type' => SQLSRV_SQLTYPE_TEXT
        ),
		'@CopiasEmpresa' => array(
			'is_out' => false,
            'value' => $copiasEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Requeridos' => array(
			'is_out' => false,
            'value' => $requeridos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@KgBrutos' => array(
			'is_out' => false,
            'value' => $kgBrutos,
			'type' => SQLSRV_PHPTYPE_INT
        ),		
		'@ConsumoAnimal' => array(
			'is_out' => false,
            'value' => $consumoAnimal,
			'type' => SQLSRV_SQLTYPE_BIT
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Referencia' => array(
			'is_out' => false,
            'value' => $referencia,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@PiePagina' => array(
			'is_out' => false,
            'value' => $piePagina,
            'type' => SQLSRV_SQLTYPE_TEXT
        ),
		'@EsReemplazo' => array(
			'is_out' => false,
            'value' => $anulaReemplaza,
			'type' => SQLSRV_SQLTYPE_BIT
        ),
		//@TresIdiomas bit,
		'@TresIdiomas' => array(
			'is_out' => false,
            'value' => $tresIdiomas,
			'type' => SQLSRV_SQLTYPE_BIT
        ),
		//@IdPorCuentaDe int = 0,
		'@IdPorCuentaDe' => array(
			'is_out' => false,
            'value' => $idPorCuentaDe,
            'type' => SQLSRV_PHPTYPE_INT
        ),		
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('CertificadosABMWeb', $params);
	$db->disconnect();
	return $result;
}

function certificadosRegistraProdWeb($idCert,$inspecciones,$idAutorizacion){
	$db = new SQL2K();
	$params = array(    
		'@Inspecciones' => array(
			'is_out' => false,
            'value' => $inspecciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('CertificadosRegistraProdWeb',$params);	
	$params = array(
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$db->execute('CertificadosActualizaEstadoAutorizacion',$params);	
	$db->disconnect();
	return $result;	
}

function certificadosRegistraInspecciones($idCert,$inspecciones,$idAutorizacion){
	$db = new SQL2K();
	$params = array(    
		'@Inspecciones' => array(
			'is_out' => false,
            'value' => $inspecciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('CertificadosRegistraInspecciones',$params);	
	$db->disconnect();
	return $result;	
}

function certificadosRegistraLotes($idLote = 0, $idCert = 0, $idProductoAut = 0, $lote = "", $fechaElab = '', $fechaEmpaque = '', $fechaVto = '', $cant = 0, $esCambio = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdLote' => array(
			'is_out' => false,
            'value' => $idLote,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdProductoAut' => array(
			'is_out' => false,
            'value' => $idProductoAut,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Lote' => array(
			'is_out' => false,
            'value' => $lote,
            'type' => SQLSRV_PHPTYPE_STRING(100)	//SQLSRV_SQLTYPE_TEXT
        ),
		'@FechaElab' => array(
			'is_out' => false,
            'value' => $fechaElab,
            'type' => SQLSRV_PHPTYPE_STRING(100) //SQLSRV_SQLTYPE_TEXT
        ),
		'@FechaEmpaque' => array(
			'is_out' => false,
            'value' => $fechaEmpaque,
            'type' => SQLSRV_PHPTYPE_STRING(100) //SQLSRV_SQLTYPE_TEXT
        ),
		'@FechaVto' => array(
			'is_out' => false,
            'value' => $fechaVto,
            'type' => SQLSRV_PHPTYPE_STRING(100) //SQLSRV_SQLTYPE_TEXT
        ),
		'@Cantidad' => array(
			'is_out' => false,
            'value' => $cant,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@EsCambio' => array(
			'is_out' => false,
            'value' => $esCambio,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('CertificadosRegistraLotes',$params);	
	$db->disconnect();
	return $result;	
}

function certificadosRegistraFirmantes($idCert = 0, $idFirmante = 0, $idFirmante2 = 0){		
	$db = new SQL2K();
	$params = array(		
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdFirmantePrimario' => array(
			'is_out' => false,
            'value' => $idFirmante,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdFirmanteSecundario' => array(
			'is_out' => false,
            'value' => $idFirmante2,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('CertificadosRegistraFirmantes',$params);	
	$db->disconnect();
	return $result;	
}

function certificadosRegistraDatosEmpresa($idCert = 0, $idPorCuenta = 0, $tresIdiomas = 0){
	$db = new SQL2K();
	$params = array(		
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdPorCuenta' => array(
			'is_out' => false,
            'value' => $idPorCuenta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@TresIdiomas' => array(
			'is_out' => false,
            'value' => $tresIdiomas,
			'type' => SQLSRV_SQLTYPE_BIT
        )
    );	
	$result = $db->execute('CertificadosRegistraDatosEmpresa',$params);	
	$db->disconnect();
	return $result;
}

function certificadosBorrarLote($idLote){
//BORRAR LOTES CARGADOS DEL CERTIFICADO
	$tabla = "CertificadosYLotes";
	$where = "IdLote = ".$idLote;
	$result = borrarRegistro($tabla,$where);	
	return $result;
}

function certificadosRetornaObservaciones($idCert = 0){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CertificadosRetornaObservaciones',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	$observada = "";
	if (count($result) > 0){
		$observada = "<label class='observada' >Observada</label>";
	}else{
		$observada = "<label class='observada' >No Observada</label>";
	}
	return $observada;
}

function certificadosVerificaModelosWeb($idInspecciones = "", $idAut = 0){
	$db = new SQL2K();
	$params = array(    
		'@Inspecciones' => array(
			'is_out' => false,
            'value' => $idInspecciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAut,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('CertificadosVerificaModelosWeb',$params);
	$db->disconnect();
	return $result;
}

function certificadosAnular($idCert = 0, $idUsuario = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('CertificadosAnular',$params);
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

function parametrosAnalisisRetornaDatos($idCert = 0, $idDetalleProductoAut = 0){
	$db = new SQL2K();
	$params = array(
        '@IdDetalleProductoAut' => array(
			'is_out' => false,
            'value' => $idDetalleProductoAut,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('ParametrosAnalisisRetornaDatos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadosRegistraAnalisis($idDetalle = 0,$idCertificado = 0, $idProductoAut = 0, $idAnalisis = 0, $valor = ''){
	$db = new SQL2K();
	$params = array(	
        '@IdDetalle' => array(
			'is_out' => false,
            'value' => $idDetalle,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@idProductoAut' => array(
			'is_out' => false,
            'value' => $idProductoAut,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@idAnalisis' => array(
			'is_out' => false,
            'value' => $idAnalisis,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Valor' => array(
			'is_out' => false,
            'value' => $valor,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),	
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('CertificadosRegistraAnalisis', $params);
	$db->disconnect();
	return $result;	
}

// IMPRIMIR ------------------------------------------------------------

// -----------
// -----------	
// --------CAMBIOS

function imprimirAnexoCertificado($idCert = 0, $idCambio = 0, $idPais = 0, $tresIdiomas = 0, $esConsumoAnimal = 0, $esMuestra = 0){
	//Qué modelo imprimir?
	$modelo = moduloPdfRetornaModeloAImprimir($idPais,1,$idCert,$tresIdiomas); // 
	
	//levanto la plantilla con el nombre de modelo
	$elementosPlantillaGuardada = plantillasRetornaDetalles($modelo);
	
	$ret_cat = moduloPdfRetornaTablasPosibles('ANEXOS'); //TABLA LOTESANEXOS
	$categorias = array();
	foreach($ret_cat as $each){
		$categorias[] = $each['Tabla'];
	}
	$aux = 'original';
	$codigo = "";
	foreach ($elementosPlantillaGuardada as $each){
		
		$ok = true;
		
		//valido ConsumoAnimal
		if (($each['Consumo'] == 'ANIMAL') && ($esConsumoAnimal == 0)){			
			//NO SE IMPRIME SI ES CONSUMO ANIMAL
			$ok = false;
		}
		if (($ok) && (($each['Consumo'] == 'HUMANO') && ($esConsumoAnimal == 1))){
			//NO SE IMPRIME PORQUE ES PARA CONSUO HUMANO Y EL CERTIFICADO ES CONSUMO ANIMAL
			$ok = false;			
		}
		//valido Si va para la muestra
		if (($ok) && (($each['Alcance'] == 'MUESTRAS') && ($esMuestra == 0))){
			//NO SE IMPRIME SI NO ES MUESTRA
			$ok = false;			
		}
		//valido Si no va para la muestra
		if (($ok) && (($each['Alcance'] == 'MUESTRASNO') && ($esMuestra == 1))){
			//NO SE IMPRIME EN LAS MUESTRAS
			$ok = false;			
		}
		
		$tachado = false;
		if ($each['Filtros'] != 0){
			//chequear filtros
			$ret = certificadosDeterminaImpresionOpcional($each['IdDetallePlantilla'], $idCert);
			if ($ret == 0){
				$ok = false; //no se muestra (0)
			}else{//es 1 o 2
				if ($ret == 2){
					$tachado = true;
				}
			}
		}
		if ($ok){
			if($tachado){
				$each['DetalleHtml'] = "<div class='tachado'>".$each['DetalleHtml']."</div>";
			}
			$each['DetalleHtml'] = str_replace('\\', '', $each['DetalleHtml']);
			/** VERIFICA SI ES TABLA **/				
			if (in_array($each['Rotulo'], $categorias)){
				$items = certificadosRetornaTablaImpresion($each['Rotulo'], $idCambio, $aux);
				$aux = 'cambios';
				if(count($items) == 0){
					$each['DetalleHtml'] = "";
				}else{
					//ver si reemplazar etiquetas en la cabecera
					$each['DetalleHtml'] = reemplazarDatosFilaBody($each['DetalleHtml'],$items);
				}
			}
			/** **/
			$codigo .= $each['DetalleHtml'];
		}
	}
	$codigo = transformarCodigo($codigo);
	
	//Traer los datos para completar el modelo 
	$datos = certificadosAnexosRetornaDatosImprimir($idCambio);
	$aux = array();
	foreach($datos as $each){
		if ($each['ElCampo'] == "NumeroCertificado"){
			$numeroCert = $each['Valor'];
		}
		if ($each['Valor'] != ""){
			$codigo = str_replace("#".$each['ElCampo']."#", $each['Valor'], $codigo);
		}
		$aux[$each['ElCampo']] = $each['Valor'];
	}
	$datos = $aux;
	//$_SESSION['dd'] = $datos;
	
	//marca de agua
	$retCircuito = admNoHayCircuitoAbierto($idCert ,'CERTIFICADOS');
	if (($retCircuito == 0) || (($datos['NumeroCertificado'] == 0) || ($_SESSION['tipo_acceso'] == 2))){
		$_SESSION['marcaAgua'] = true;
	}
		
	//Traer leyendas
	$leyendas = certificadosRetornaTraduccionesImpresion();		
	foreach ($leyendas as $each){ //va?
		$codigo = str_replace("#".$each['Rotulo']."#", $each['Traduccion'], $codigo);		
	}
	
	//imprimir el modelo	
	
	//creamos codigo de barra	
	$codeBar = "../classes/barcode/ANE".$_SESSION['id_usuario']."-".$numeroCert.".gif";
	$anio = $datos['AnioAut'];
	$idCode = zerofill($datos['NumeroCertificado'], 8);
	$code = "ANE".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");
	$codeBar = str_replace('..','',$codeBar);
	imprimirDeModulo($codigo,0,0, $codeBar, 'Anexo Certificado',false,$idCert);
}

function certificadosAnexosRetornaDatosImprimir($idAnexo = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAnexo' => array(
			'is_out' => false,
            'value' => $idAnexo,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('CertificadosAnexosRetornaDatosImprimir', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}

function certificadosAnexosLotesImprimir($idAnexo = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAnexo' => array(
			'is_out' => false,
            'value' => $idAnexo,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('CertificadosAnexosLotesImprimir', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}

function certificadosAnexosLotesOriginalesImprimir($idAnexo = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAnexo' => array(
			'is_out' => false,
            'value' => $idAnexo,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('CertificadosAnexosLotesOriginalesImprimir', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}
	
function certificadosRetornaAnexos($idCertificado = 0){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('CertificadosRetornaAnexos', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}

function certificadosImprimeWeb ($idCert){ //VARIABLES PDF 
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosImprimeWeb',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadosRetornaContParaImpresion ($idCert){ //CONTENEDORES PARA PDF
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaContParaImpresion',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadosRetornaProdImprimir ($idCert){ //PRODUCTOS PARA PDF
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaProdImprimir',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function imprimirCertificado($idCert,$idPais){
	//levantamos datos
	$pdfVars = certificadosImprimeWeb($idCert);
	
	$pdfProductos = certificadosRetornaProdImprimir($idCert);
	
	$pdfContenedores = certificadosRetornaContParaImpresion($idCert);
	
	$pdfLotes = certificadosRetornaLotesWeb($idCert);
	
	//creamos codigo de barra
	$codeBar = "../classes/barcode/FA4".$_SESSION['id_usuario']."-".$pdfVars['NumCert'].".gif";
	$anio = $pdfVars['AñoAutorizacion'];
	$idCode = zerofill($pdfVars['NumCert'], 8);
	$code = "FA4".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");	
	//seteamos variables
	$codeBar = str_replace('..','',$codeBar);
	
	
	$urgencia = $pdfVars['TipoTramite'];
	$numAut = $pdfVars['NumAutorizacion'];
	$anio = $pdfVars['AñoAutorizacion'];
	$exportador = $pdfVars['Exportador'];
	$numRegEmpre = $pdfVars['NroRegistro'];
	
	$productos = $pdfProductos;//foreach
		
	$lotes = $pdfLotes; //foreach

	//$pdfContenedores
	$contenedores = "";
	$precintos = "";
	foreach ($pdfContenedores as $each){
		$contenedores .= "$each[Contenedor],";
		$precintos .= "$each[Precinto],";
	}
	if (($contenedores != "") && ($precintos != "")){
		$contenedores = substr($contenedores,0,strlen($contenedores)-1);//saco la última coma
		$precintos = substr($precintos,0,strlen($precintos)-1);//saco la última coma
	}
	
	$pics = retornaNumPicsPDF($idPais); //ordernados para PDF
	
	$kilos = $pdfVars['KgBrutos'];
	$desde = $pdfVars['Desde'];
	$destino = $pdfVars['Pais'];//Hasta
	$transito = $pdfVars['TransitoPor'];
	$buque = $pdfVars['Buque'];
	$blGuia = $pdfVars['Vapor'];
	$fechaSalida = $pdfVars['FSalida'];
	$condiciones = $pdfVars['CondAlmac'];
	$unidadTerritorial = $pdfVars['UnTerritorial'];
	$observaciones = $pdfVars['Observaciones'];
	$copias = $pdfVars['CopiasEmpresa'];
	$importador = $pdfVars['Importador'];		
	$puestoFront = $pdfVars['PuestoFronterizoDestino'];
	$puertoDeDescarga = $pdfVars['PuertoDescarga'];
	$fechaDeDescarga = $pdfVars['FDescarga'];
	
	$fechaPedido = $pdfVars['FPedido'];
	
	//llamamos al codigo
	require("../archivosPDF/CERTIFICADOS/formuACLyA4.php");
	$contenido = cargarCodigoHTML($contenido,'estiloPDFaclyaA4');
	//exportamos a pdf -> mandamos codigo para unlink	
	exportarAPDFOficio($contenido, "Formulario ACLyA 4",$codeBar, traerCuve($idCert,'CERTIFICADOS'));
	//echo $contenido;
}


// -----------
// -----------
//------------ IMPRIMIR SANITARIO ---------------------

function imprimirCertificadoSanitario($idCert,$idPais,$tresIdiomas,$esConsumoAnimal,$esMuestra){	
		//Qué modelo imprimir?
		$modelo = moduloPdfRetornaModeloAImprimir($idPais,1,$idCert,$tresIdiomas); // 1 = Certificado
		//levanto la plantilla con el nombre de modelo		
		$elementosPlantillaGuardada = plantillasRetornaDetalles($modelo);		
		
		$ret_cat = moduloPdfRetornaTablasPosibles('CERTIFICADOS');
		$categorias = array();
		foreach($ret_cat as $each){
			$categorias[] = $each['Tabla'];
		}		
		$codigo = "";
		$tipoAnalisis = 'F';//inicializo
		
		foreach ($elementosPlantillaGuardada as $each){
			
			$ok = true;
			
			//valido ConsumoAnimal
			if (($each['Consumo'] == 'ANIMAL') && ($esConsumoAnimal == 0)){			
			//NO SE IMPRIME SI ES CONSUMO ANIMAL
			$ok = false;
			}
			if (($ok) && (($each['Consumo'] == 'HUMANO') && ($esConsumoAnimal == 1))){
				//NO SE IMPRIME PORQUE ES PARA CONSUO HUMANO Y EL CERTIFICADO ES CONSUMO ANIMAL
				$ok = false;			
			}
			//valido Si va para la muestra
			if (($ok) && (($each['Alcance'] == 'MUESTRAS') && ($esMuestra == 0))){
				//NO SE IMPRIME SI NO ES MUESTRA
				$ok = false;			
			}
			//valido Si no va para la muestra
			if (($ok) && (($each['Alcance'] == 'MUESTRASNO') && ($esMuestra == 1))){
				//NO SE IMPRIME EN LAS MUESTRAS
				$ok = false;			
			}			
			
			$tachado = false;
			if ($each['Filtros'] != 0){
				//chequear filtros
				$ret = certificadosDeterminaImpresionOpcional($each['IdDetallePlantilla'], $idCert);
				if ($ret == 0){
					$ok = false; //no se muestra (0)
				}else{//es 1 o 2
					if ($ret == 2){
						$tachado = true;
					}
				}
			}
			if ($ok){
				if($tachado){
					$each['DetalleHtml'] = "<div class='tachado'>".$each['DetalleHtml']."</div>";
				}
				$each['DetalleHtml'] = str_replace('\\', '', $each['DetalleHtml']);
				/** VERIFICA SI ES TABLA **/				
				if (in_array($each['Rotulo'], $categorias)){
					$items = certificadosRetornaTablaImpresion($each['Rotulo'], $idCert, $tipoAnalisis);
					if ($each['Rotulo'] == 'ANALISISCERTIFICADOS'){
						$each['DetalleHtml'] = armarTablaAnalisis($each['DetalleHtml'],$items,$tipoAnalisis);
						$tipoAnalisis = 'M';//cambia para el próximo paso
					}else{
						//ver si reemplazar etiquetas en la cabecera
						$each['DetalleHtml'] = reemplazarDatosFilaBody($each['DetalleHtml'],$items);
					}
				}
				/** **/
				$codigo .= $each['DetalleHtml'];
			}
		}
		$codigo = transformarCodigo($codigo);
		//Traer los datos para completar el modelo 
		$datos = certificadosRetornaDatosParaImprimir($idCert);			
		foreach($datos as $key => $value){
			$codigo = str_replace("#".$key."#", $value, $codigo);
		}
		//marca de agua
		$retCircuito = admNoHayCircuitoAbierto($idCert ,'CERTIFICADOS');
		if (($retCircuito == 0) || (($datos['NumCert'] == 0) || ($_SESSION['tipo_acceso'] == 2))){
			$_SESSION['marcaAgua'] = true;
		}else{
			$_SESSION['marcaAgua'] = false;		
		}
		//Traer leyendas
		$leyendas = certificadosRetornaTraduccionesImpresion();		
		foreach ($leyendas as $each){
			if (($datos['NumeroCertR'] == 0) && (stristr($each['Rotulo'], 'ANULA'))){
				$codigo = str_replace("#".$each['Rotulo']."#", "", $codigo);				
			}else{
				$codigo = str_replace("#".$each['Rotulo']."#", $each['Traduccion'], $codigo);				
			}
		}
		if ($datos['NumeroCertR'] != 0){
			//#NumeroCertR#
			$codigo = str_replace("#NumeroCertR#", $datos['NumeroCertR'], $codigo);
			//#FechaCertificadoR#
			$codigo = str_replace("#FechaCertificadoR#", $datos['FechaCertificadoR'], $codigo);
		}
		//imprimir el modelo		
		
		//creamos codigo de barra
		$codeBar = "../classes/barcode/SAN".$_SESSION['id_usuario']."-".$datos['NumCert'].".gif";
		$anio = $datos['AñoAutorizacion'];
		$idCode = zerofill($datos['NumCert'], 8);
		$code = "SAN".$anio.$idCode;	//lo usa sample-gd
		require("../classes/barcode/sample-gd.php");
		$codeBar = str_replace('..','',$codeBar);
		imprimirDeModulo($codigo,$datos['CopiasEmpresa'],$datos['IdVia'], $codeBar, 'Certificado Sanitario',true,$idCert);
}

function certificadosRetornaDatosParaImprimir($IdCertificado = 0){
	$db = new SQL2K();
	$params = array(	 
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $IdCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaDatosParaImprimir',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();	
	return $result;
}

function certificadosRetornaTraduccionesImpresion(){
	$db = new SQL2K();
	$params = array();
	$res = $db->execute('CertificadosRetornaTraduccionesImpresion',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();	
	return $result;
}

function certificadosDeterminaImpresionOpcional($idDetPlantilla = 0, $idCertificado = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdDetallePlantilla' => array(
			'is_out' => false,
            'value' => $idDetPlantilla,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$ret = $db->execute('CertificadosDeterminaImpresionOpcional',$params);
	$db->disconnect();
	/* 0 = va, 1 = no va, 2 = tachado */
	return $ret;
}

function certificadosRetornaTablaImpresion($nombreTabla = '', $idCert = 0, $tipo = ''){
	$db = new SQL2K();
	$params = array(
        '@NombreTabla' => array(
			'is_out' => false,
            'value' => $nombreTabla,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Identificador' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
	);	
	$res = $db->execute('CertificadosRetornaTablaImpresion',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}	

function reemplazarDatosFilaBody($codigo,$items){
	/*
		busca <tbody> hasta </tbody>
		y copia el <tr>...</tr> interior para copiarlo, reemplazar los datos y replicarlo
	*/
	$posini = strpos($codigo,"|tbody¬");
	$posfin = strpos($codigo,"|/tbody¬");
	
	$contenidoFinal = substr($codigo, 0, $posini + 7); //corto la primera parte (incluye "|tbody¬"
	$cantHasta = strlen($codigo)-$posfin+1;
	$contenidoAuxFin = substr($codigo, $posfin, $cantHasta); //corto la última parte (incluye "|/tbody¬"
	$cantHasta = $posfin - ($posini + 7);
	$contenidoTr = substr($codigo, $posini + 7,$cantHasta); //el tr	
	
	
	foreach($items as $element){
		$fila = $contenidoTr;
		foreach($element as $key => $value){
			$fila = str_replace('#'.$key.'#', $value, $fila);
		}
		$contenidoFinal .= $fila;
	}
	$contenidoFinal .= $contenidoAuxFin;
	return $contenidoFinal;
}

function armarTablaAnalisis($codigo,$items,$tipoAnalisis){	
	//procesar $codigo y devolver las etiquetas de traducciones de analisis 
	$etiquetas = array();
	$pos = strpos($codigo, '#');
	while($pos){
		//copiar hasta el sig #
		$codigo = substr($codigo,($pos+1),(strlen($codigo)-$pos));
		$pos = strpos($codigo, '#');
		$et = substr($codigo,0,$pos);
		$etiquetas[] = $et;
		$codigo = substr($codigo,($pos+1),(strlen($codigo)-$pos));
		$pos = strpos($codigo, '#');
	}
	//fin procesar $codigo	
	
	switch ($tipoAnalisis){
	case 'F':
		$desc = "Físico Químicos";
		break;
	case 'M':
		$desc = "Microbiológicos";
		break;
	}
	
	//preparo variables 
/**/$productos = array();
	$aux = $items[0]['RowID'];
/**/$analisis = array();
/**/$traducciones = array();
	$restan = array(); //unsetear, al principio carga todos los id de productos
	$restan[] = $items[0]['RowID']; //primer elemento
	//itero los productos y cargo las variables para armar la tabla
	
	foreach($items as $each){
		if ($each['RowID'] != $aux){
			$aux = $each['RowID'];
			//restan
			$restan[] = $each['RowID']; //entra cuando es distinto del elemento aux
		}
		//analisis armo listado total de análisis
		if (!in_array($each['IdAnalisis'], $analisis)){
			$analisis[] = $each['IdAnalisis'];
			foreach($etiquetas as $et){
				if(isset($each[$et])){
					$traducciones[$each['IdAnalisis']][] = $each[$et];
				}
			}		
		}
		$productos[$aux][] = $each;
	}
	unset($aux);	
	//recorro los productos y comparo los arreglos para armar los grupos de columnas
	$grupos = array();
	
	$indiceGrupo = 0;
	$it = array_shift($restan);
	$grupos[$indiceGrupo][] = $it;//guardo el primer elemento en la primera columna
	
	while (count($restan)>0){		
		foreach($restan as $key=>$value){
			$ret = compararAnalisisProducto($productos[$it], $productos[$value]);
			if ($ret){
				$grupos[$indiceGrupo][] = $value;
				unset($restan[$key]);
			}
		}
		if(count($restan) > 0){
			$it = array_shift($restan);//borro el primer elemento de restan para ubicarlo en el grupo
			$indiceGrupo++;
			$grupos[$indiceGrupo][] = $it;
		}
	}
	unset($restan);
	
	$codigo = "|div¬|table class=´estiloTablaDinamica´¬ |thead¬";
	$codigo .= "|tr¬
				|th¬ $desc |/th¬";
	
	foreach($grupos as $g){
		$codigo .="|th¬";
		foreach($g as $each){
			$codigo .= " ".$each.",";
		}
		$codigo = substr($codigo,0,(strlen($codigo)-1));//borro la última coma
		$codigo .= "|/th¬";
	}
	$codigo .= "|/tr¬";
	$codigo .= "|/thead¬ |tbody¬";
	//BODY----->
	$grupoAUX = 0;
	foreach($analisis as $each){
		$codigo .= "|tr¬";
		$codigo .= "|td¬ ";
		foreach ($traducciones[$each] as $trad){
			$codigo .= " ".$trad;
		}
		$codigo .= "|/td¬";
		foreach($grupos as $g){
			$codigo .= "|td¬";
			$codigo .= $productos[$g[0]][$grupoAUX]['Valor'];
			$codigo .= "|/td¬";
		}
		$codigo .="|/tr¬";		
		$grupoAUX++;
	}
	
	$codigo .= "|/tbody¬
	|/table¬|/div¬";
	
	return $codigo;
}

function compararAnalisisProducto($p1, $p2){
	//llegan dos arreglos	
	if (count($p1) == count($p2)){
		$ret = true;
		foreach($p1 as $each1){
			$esta = false;
			foreach($p2 as $each2){
				if(($each1['IdAnalisis'] == $each2['IdAnalisis']) && ($each1['Valor'] == $each2['Valor'])){
					$esta = true;
				}
			}
			if (!$esta){
				$ret = false;
			}		
		}
	}else{
		$ret = false;
	}
	return $ret;
}

// ----------------------------------------------- RUSIA O CHINA ---------------------------------
// ----------------------------------------------- RUSIA O CHINA ---------------------------------
// ----------------------------------------------- RUSIA O CHINA ---------------------------------
// ----------------------------------------------- RUSIA O CHINA ---------------------------------
// ----------------------------------------------- RUSIA O CHINA ---------------------------------

function imprimirRusiaChina($idCert,$idPais,$tresIdiomas,$esConsumoAnimal,$esMuestra){
	//Traer los datos para completar el modelo 
	$datos = certificadosRetornaDatosParaImprimir($idCert);

	//creamos codigo de barra
	$codeBar = "../classes/barcode/SAN".$_SESSION['id_usuario']."-".$datos['NumCert'].".gif";
	$anio = $datos['AñoAutorizacion'];
	$idCode = zerofill($datos['NumCert'], 8);
	$code = "SAN".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");
	$codeBar = str_replace('..','',$codeBar);
	
	if ($idPais == 130){
		//CHINA 130
		$nombreArchivo = "CHINA";
		$nombreCSS = "chinese.css";
		//sale $codigo = "...";
		require("../archivosPDF/chinaPDF.php");
	}else{
		//RUSIA 133
		$nombreArchivo = "RUSIA";
		$nombreCSS = "cyrillic.css";
		//sale $codigo = "...";
		require("../archivosPDF/rusiaPDF.php");
	}	
	
	foreach($datos as $key => $value){		
		$codigo = str_replace(utf8_encode("#".$key."#"), utf8_encode($value), $codigo);
	}
	
	//marca de agua
	$retCircuito = admNoHayCircuitoAbierto($idCert ,'CERTIFICADOS');
	if (($retCircuito == 0) || (($datos['NumCert'] == 0) || ($_SESSION['tipo_acceso'] == 2))){
		$_SESSION['marcaAgua'] = true;
	}else{
		$_SESSION['marcaAgua'] = false;		
	}
	
	if ($datos['NumeroCertR'] != 0){
		//#NumeroCertR#
		$codigo = str_replace("#NumeroCertR#", $datos['NumeroCertR'], $codigo);
		//#FechaCertificadoR#
		$codigo = str_replace("#FechaCertificadoR#", $datos['FechaCertificadoR'], $codigo);
	}	
	
	//Traer leyendas
	$leyendas = certificadosRetornaTraduccionesImpresion();		
	foreach ($leyendas as $each){
		if (($datos['NumeroCertR'] == 0) && (stristr($each['Rotulo'], 'ANULA'))){
			$codigo = str_replace(utf8_encode("#".$each['Rotulo']."#"), "", $codigo);				
		}else{
			$codigo = str_replace(utf8_encode("#".$each['Rotulo']."#"), utf8_encode($each['Traduccion']), $codigo);				
		}
	}	
	
	$codigoListo = cargarCodigoHTML($codigo,$nombreCSS);
	exportarAPDFOficio($codigoListo, $nombreArchivo ,$codeBar, traerCuve($idCert,'CERTIFICADOS'));
	exit();
}

//----------- FIN IMPRIMIR SANITARIO ---------------------
// -----------
// -----------