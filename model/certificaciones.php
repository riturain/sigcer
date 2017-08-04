<?php //MODEL CERTIFICACIONES

function textoCertificacionesRetornaDatos($tipoPlantilla = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $tipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('TextoCertificacionesRetornaDatos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
	
}

function textoCertificacionesRegistraDatos($idCertificacion = 0,$texto = "", $idTipoPlantilla = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdCertificacion' => array(
			'is_out' => false,
            'value' => $idCertificacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Texto' => array(
			'is_out' => false,
            'value' => $texto,
            'type' => SQLSRV_SQLTYPE_TEXT
        ),
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $idTipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('TextoCertificacionesRegistraDatos',$params);
	$db->disconnect();
	return $result;	
}

?>