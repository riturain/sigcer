<?php // MODELO países

function pasosFronterizosRetornaTodos(){
	$db = new SQL2K();
	$params = array();		
	$res = $db->execute('PasosFronterizosRetornaTodos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function pasosFronterizosRetornaViasTransporte($idPaso = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPaso' => array(
			'is_out' => false,
            'value' => $idPaso,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PasosFronterizosRetornaViasTransporte',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function pasosFronterizosRegistraDatos($idPaso = 0, $paso = ''){
	$db = new SQL2K();
	$params = array(
        '@IdPaso' => array(
			'is_out' => false,
            'value' => $idPaso,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Paso' => array(
			'is_out' => false,
            'value' => $paso,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PasosFronterizosRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function pasosFronterizosAsignaTransporte($idPaso = 0, $idVias = ''){
	$db = new SQL2K();
	$params = array(
        '@IdPaso' => array(
			'is_out' => false,
            'value' => $idPaso,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdTransportes' => array(
			'is_out' => false,
            'value' => $idVias,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PasosFronterizosAsignaTransporte', $params);
	$db->disconnect();
	return $result;
}
?>