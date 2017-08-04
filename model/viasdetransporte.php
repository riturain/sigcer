<?php //MODELO VIAS DE TRANSPORTE 

function ViasdeTransporteRetornaTodas(){
	$db = new SQL2K();
	$res = $db->execute('ViasTransporteRetornaTodas');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function ViasdetransporteRetornaTraducciones($idTransporte){
	$db = new SQL2K();			
	$params = array(
        '@IdVia' => array(
			'is_out' => false,
            'value' => $idTransporte,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('ViasTransporteRetornaTraducciones', $params);
	$result = $db->fetchAllRow($res);    
	$db->disconnect();
	return $result;
}

function viasdeTransporteRegistraDatos($idTransporte,$transporte,$tipo,$limite){	
	$db = new SQL2K();			
	$params = array(
        '@IdTransporte' => array(
			'is_out' => false,
            'value' => $idTransporte,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Transporte' => array(
			'is_out' => false,
            'value' => strtoupper($transporte),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Via' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Limite' => array(
			'is_out' => false,
            'value' => $limite,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
    $res = $db->execute('ViasTransporteRegistraDatos', $params);
	if ($idTransporte == 0){
		$arr = $db->fetchAllRow($res);		
		$result = $arr[0][0];
	}else{
		$result = $idTransporte;
	}
	$db->disconnect();		
	return $result; 
}

function viasdetransporteRegistraTraducciones($idTraduccion,$idTransporte,$idIdioma,$texto){
	$db = new SQL2K();
	$params = array(
		'@IdTraduccion' => array(
			'is_out' => false,
            'value' => $idTraduccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdTransporte' => array(
			'is_out' => false,
            'value' => $idTransporte,
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
    $res = $db->execute('ViasTransporteRegistraIdioma', $params);			
	$db->disconnect();
	return $res;
}

function borrarTraduccion($id){	
	$tabla = "TraduccionesViasTransporte";
	$where = "IdTraduccion = ".$id;	
	$res = borrarRegistro($tabla,$where);	
	return $res;
}
?>