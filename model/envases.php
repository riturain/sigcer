<?php //MODELO ENVASES 

function envasesRetornaTodos(){
	$db = new SQL2K();	
	$res = $db->execute('EnvasesRetornaTodos');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function envasesRetornaTraducciones($idEnvase){

	$db = new SQL2K();			
	$params = array(
        '@IdEnvase' => array(
			'is_out' => false,
            'value' => $idEnvase,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('EnvasesRetornaTraducciones', $params);
	$result = $db->fetchAllRow($res);    
	$db->disconnect();
	return $result;
}

function envasesRegistraDatos($idEnvase,$envase){	
	$db = new SQL2K();			
	$params = array(
        '@IdEnvase' => array(
			'is_out' => false,
            'value' => $idEnvase,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Envase' => array(
			'is_out' => false,
            'value' => strtoupper($envase),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	
    $res = $db->execute('EnvasesRegistraDatos', $params);
	if ($idEnvase == 0){
		$arr = $db->fetchAllRow($res);		
		$result = $arr[0][0];
	}else{
		$result = $idEnvase;
	}
	$db->disconnect();		
	return $result; //DEVUELVE 0 si falla o IdAnalisis insertado
}

function envasesRegistraTraducciones($idEnvase,$idIdioma,$texto,$idtraduccion){
	$db = new SQL2K();			
	$params = array(
		'@IdTraduccion' => array(
			'is_out' => false,
            'value' => $idtraduccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdEnvase' => array(
			'is_out' => false,
            'value' => $idEnvase,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdIdioma' => array(
			'is_out' => false,
            'value' => $idIdioma,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Texto' => array(
			'is_out' => false,
            'value' => $texto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('EnvasesRegistraIdioma', $params);			
	$db->disconnect();
	return $res;
}

function borrarTraduccion($id){
	$tabla = "TraduccionesEnvases";
	$where = "IdTraduccion = ".$id;
	$res = borrarRegistro($tabla,$where);	
	return $res;
}
?>