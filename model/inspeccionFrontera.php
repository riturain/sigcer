<?php //CERTIFICADOS MODEL 

function inspeccionesFronteraRetornaDatos($dInspeccionFrontera){
	//busca los datos de una inspección de Frontera (devuelve = IdInspeccionFrontera IdUsuario Estado IdCertificado Fecha
	$db = new SQL2K();
	$params = array(
        '@IdInspeccionFrontera' => array(
			'is_out' => false,
            'value' => $dInspeccionFrontera,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('InspeccionesFronteraRetornaDatos',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function inspeccionesFronteraBuscaDatos($numCert = 'null', $numAut = 'null', $empre = 'null', $anio = 'null', $destino = 'null'){
	//busca inspecciones de frontera por parámetros de búsqueda
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
		'@IdPais' => array(
			'is_out' => false,
            'value' => $destino,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@NumCertificado' => array(
			'is_out' => false,
            'value' => $numCert,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('InspeccionesFronteraBuscaDatos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
	

function  inspeccionesFronteraABMWeb($idInsFrontera = 0, $idCertificado = 0, $idUsuario = 0, $estado = ''){
//registra una inspección de frontera
// si idInsFrontera = 0 -> NUEVA, sino UPDATE
	$db = new SQL2K();		
	$params = array(       
		'@IdInspeccionFrontera' => array(
			'is_out' => false,
			'value' => $idInsFrontera,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdCertificado' => array(
			'is_out' => false,
			'value' => $idCertificado,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuario' => array(
			'is_out' => false,
			'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Estado' => array(
			'is_out' => false,
            'value' => $estado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),		
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('InspeccionesFronteraABMWeb', $params);	
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

function certificadosRetornaParaInspFrontera($numCert = 'null', $numAut = 'null', $empre = 'null', $anio = 'null', $destino = 'null'){
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
		'@IdPais' => array(
			'is_out' => false,
            'value' => $destino,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@NumCertificado' => array(
			'is_out' => false,
            'value' => $numCert,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('CertificadosRetornaParaInspFrontera',$params);
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
	
function certificadosRetornaDatosEmpresaWeb($idCert){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('CertificadosRetornaDatosEmpresaWeb',$params);
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
