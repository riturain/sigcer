<?php //MODELO CUPONES

// ---------------- CUPONES
function cuponesYPagosRetornaCuponesAfectados($idAutorizacion = 0, $tipoTramite){
/*
	@TipoTramite nvarchar(90),	// AUTORIZACION , MUESTRA,...
	@IdTramite int = 0
*/
	$db = new SQL2K();
	$params = array(
        '@TipoTramite' => array(
			'is_out' => false,
            'value' => $tipoTramite,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@IdTramite' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CuponesYPagosRetornaCuponesAfectados',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function cuponesYPagosRetornaCuponesDisponibles($idEmpresa = 0, $rubro = 0){
/*
	@IdEmpresa int = 0, //
	@Rubro int = 0		// RUBRO 2 = REQUERIDOS, RUBRO 1010820 = COPIAS, CUALQUIER OTRO = ARANCEL (LO SACO DEL CAMPO ARANCEL)
*/
	$db = new SQL2K();
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Rubro' => array(
			'is_out' => false,
            'value' => $rubro,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('CuponesYPagosRetornaCuponesDisponibles',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function autorizacionLacteosRetornaValoresCupones($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionLacteosRetornaValoresCupones',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function tramitesTotalCuponesPagos($idAutorizacion = 0, $tipoTramite){
	$db = new SQL2K();
	$params = array(
        '@IdTramite' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@TipoTramite' => array(
			'is_out' => false,
            'value' => $tipoTramite,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('TramitesTotalCuponesPagos',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function cuponesAfectarAPago($idPagoCupon = 0, $idCupones){
	$db = new SQL2K();
	$params = array(
        '@IdPagoCupon' => array(
			'is_out' => false,
            'value' => $idPagoCupon,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdCupones' => array(
			'is_out' => false,
            'value' => $idCupones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),		
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('CuponesAfectarAPago', $params);
	$db->disconnect();
	return $result;
}

function certificadosRetornaValoresCupones($idCert = 0){
	$db = new SQL2K();
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('CertificadosRetornaValoresCupones',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function inspeccionesRetornaValoresCupones($idInspeccion,$tipo){
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
	$res = $db->execute('InspeccionesRetornaValoresCupones',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}
?>