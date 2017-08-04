<?php // MODELO países

function paisesRetornaDatos($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PaisesRetornaDatos',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaSimilares($term){
	$db = new SQL2K();
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $term,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('PaisesRetornaSimilares',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaGrupos(){
	$db = new SQL2K();	
	$res = $db->execute('PaisesRetornaGrupos');
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaViasTransporte($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PaisesRetornaViasTransporte',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaPicsCertificados($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PaisesRetornaPicsCertificados',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaPasosFronterizos($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PaisesRetornaPasosFronterizos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaPlantillas($idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PaisesRetornaPlantillas',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function plantillasRetornaTipos(){
	$db = new SQL2K();
	$params = array();		
	$res = $db->execute('PlantillasRetornaTipos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function plantillasBuscarDatos($nombre = 'null', $tipoPlantilla = 0){	
	$db = new SQL2K();
	$params = array(    
		'@Nombre' => array(
			'is_out' => false,
            'value' => $nombre,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $tipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('PlantillasBuscarDatos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
//------------- LOS GUARDAR -------------------

function paisesRegistraDatos($idPais = 0, $idGrupo = 0, $llevaProvisorio = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdGrupo' => array(
			'is_out' => false,
            'value' => $idGrupo,
			'type' => SQLSRV_PHPTYPE_INT
        ),
		'@LlevaProvisorio' => array(
			'is_out' => false,
            'value' => $llevaProvisorio,
/* bit */   'type' => SQLSRV_SQLTYPE_BIT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PaisesRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function paisesRegistraViaTransporte($idPais = 0, $idTransportes = ''){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdTransportes' => array(
			'is_out' => false,
            'value' => $idTransportes,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PaisesRegistraViaTransporte', $params);
	$db->disconnect();
	return $result;
}

function paisesRegistraPic($idPais = 0, $idPics = ''){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdPics' => array(
			'is_out' => false,
            'value' => $idPics,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PaisesRegistraPic', $params);
	$db->disconnect();
	return $result;
}

function paisesRegistraPasoFronterizo($idPais = 0, $idPasos = ''){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdPasos' => array(
			'is_out' => false,
            'value' => $idPasos,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PaisesRegistraPasoFronterizo', $params);
	$db->disconnect();
	return $result;
}

function paisesRegistraPlantilla($idPais = 0, $idPlantillas = ''){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdPlantillas' => array(
			'is_out' => false,
            'value' => $idPlantillas,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PaisesRegistraPlantilla', $params);
	$db->disconnect();
	return $result;
}
?>