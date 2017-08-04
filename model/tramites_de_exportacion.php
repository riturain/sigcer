<?php //TRAMITES DE EXPORTACION MODEL
function tramitesExportacionNumeraAutomatico(){
	$db = new SQL2K();	
	$res = $db->execute('TramitesExportacionNumeraAutomatico');
	$db->disconnect();
	return $res;	
}

function tramitesExportacionRetornaTree($id_usuario = 0, $anio = 0, $mes = 0){
	$db = new SQL2K();	
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Anio' => array(
			'is_out' => false,
            'value' => $anio,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Mes' => array(
			'is_out' => false,
            'value' => $mes,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);
	$res = $db->execute('TramitesExportacionRetornaTree',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function admRetornaAniosProcesados(){
	$db = new SQL2K();	
	$res = $db->execute('AdmRetornaAñosProcesados');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function tramitesExportacionRetornaListadoTramites($id_circuito = 0, $tramite = "", $year = 2015, $month = 1){
	$db = new SQL2K();			
	$params = array(
        '@IdCircuito' => array(
			'is_out' => false,
            'value' => $id_circuito,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tramite' => array(
			'is_out' => false,
            'value' => $tramite,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $_SESSION['id_usuario'],
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Anio' => array(
			'is_out' => false,
            'value' => $year,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Mes' => array(
			'is_out' => false,
            'value' => $month,
            'type' => SQLSRV_PHPTYPE_INT
        )
		
    );	
    $res = $db->execute('TramitesExportacionRetornaListadoTramites', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function tramitesExportacionRetornaDetalle($idTramite = 0, $tipo = ""){
	$db = new SQL2K();			
	$params = array(
        '@IdTramiteBuscado' => array(
			'is_out' => false,
            'value' => $idTramite,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
    $res = $db->execute('TramitesExportacionRetornaDetalle', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function admPasaDeCircuito($circuitoActual = "", $idTramite = 0, $tipo = '', $motivoRechazo = 'NULL', $inspector = 0){
	$db = new SQL2K();			
	$params = array(
        '@CircuitoActual' => array(
			'is_out' => false,
            'value' => $circuitoActual,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
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
		'@MotivoRechazo' => array(
			'is_out' => false,
            'value' => $motivoRechazo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),		
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    ); 	
    $result = $db->execute('AdmPasaDeCircuito', $params);
	
	if ($inspector != 0){
		$tipo = ($tipo == "INSPECCIONES DE PLANTA")? 'INSPECCIONESPLANTA' : 'INSPECCIONESPUERTO';
		$params = array(			
			'@IdInspeccion' => array(
				'is_out' => false,
				'value' => $idTramite,
				'type' => SQLSRV_PHPTYPE_INT
			),
			'@Tipo' => array(
				'is_out' => false,
				'value' => $tipo,
				'type' => SQLSRV_PHPTYPE_STRING(80)
			),
			'@IdInspector' => array(
				'is_out' => false,
				'value' => $inspector,
				'type' => SQLSRV_PHPTYPE_STRING(100)
			)
		);
		$db->execute('InspeccionAsignaInspector', $params);
	}
	$db->disconnect();
	return $result;
}

function estaVerificada($idTramite, $tipo){
	$tipo = ($tipo == "INSPECCIONES DE PLANTA")? 'INSPECCIONESPLANTA' : 'INSPECCIONESPUERTO';
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
    $result = $db->execute('InspeccionesEstaVerificada', $params);
	$db->disconnect();
	return $result;	
}

function certificadosRetornaDocumentacion($idCert = 0){
	$db = new SQL2K();			
	$params = array(
        '@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
    $res = $db->execute('CertificadosRetornaDocumentacion', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function certificadosRegistraDocumentacion($idCert = 0,$idsDocs = ""){
	$db = new SQL2K();			
	$params = array(
		'@IdCertificado' => array(
			'is_out' => false,
            'value' => $idCert,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Documentacion' => array(
			'is_out' => false,
            'value' => $idsDocs,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    ); 	
    $result = $db->execute('CertificadosRegistraDocumentacion', $params);
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosRetornaIdAsociado($id_tramite, $tipo){
	$db = new SQL2K();			
	$params = array(
		'@IdTramite' => array(
			'is_out' => false,
            'value' => $id_tramite,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    ); 	
    $result = $db->execute('AutorizacionesLacteosRetornaIdAsociado', $params);
	$res = $db->fetchAssoc($result);
	$db->disconnect();
	return $res['IdAutorizacion'];
}

//-------- CODIGO DE BARRAS
function admTraerTramitePorCodigoDeBarras($codeBar,$id_usuario){
	$db = new SQL2K();			
	$params = array(
        '@CodigoBarra' => array(
			'is_out' => false,
            'value' => $codeBar,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    ); 	
    $result = $db->execute('AdmTraerTramitePorCodigoDeBarras', $params);
	$res = $db->fetchAssoc($result);
	$db->disconnect();
	return $res;
}

function buscarTramitesPorTerm($param,$id_usuario){
	$db = new SQL2K();			
	$params = array(
        '@Numero' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    ); 	
    $result = $db->execute('AdmRetornaBusquedaPorNumero', $params);
	$res = $db->fetchAllAssoc($result);
	$db->disconnect();
	return $res;
}

?>