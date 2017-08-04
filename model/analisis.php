<?php //MODELO ANALISIS 

function analisisRetornaTodos(){
	$db = new SQL2K();	
	$res = $db->execute('AnalisisRetornaTodos');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function analisisRetornaTipos(){
	$db = new SQL2K();	
	$result = $db->execute('AnalisisTiposRetornaTodos');
	$res = $db->fetchAllRow($result);
	$db->disconnect();	
	$tam = sizeof($res);
	for ($i = 0; $i < $tam; $i++){
		if ($res[$i][0] == 1){
			$res[$i][0] = 'M';
		}else{
			$res[$i][0] = 'F';
		}
	}	
	return $res;
}

function analisisRetornaTraducciones($idAnalisis){
	$db = new SQL2K();			
	$params = array(
        '@IdAnalisis' => array(
			'is_out' => false,
            'value' => $idAnalisis,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('AnalisisRetornaTraducciones', $params);
	$result = $db->fetchAllRow($res);    
	$db->disconnect();
	return $result;
}

function analisisRegistraDatos($idAnalisis,$analisis,$tipo){	
	$db = new SQL2K();			
	$params = array(
        '@IdAnalisis' => array(
			'is_out' => false,
            'value' => $idAnalisis,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Analisis' => array(
			'is_out' => false,
            'value' => $analisis,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
    $res = $db->execute('AnalisisRegistraDatos', $params);
	if ($idAnalisis == 0){
		$arr = $db->fetchAllRow($res);		
		$result = $arr[0][0];
	}else{
		$result = $idAnalisis;
	}
	$db->disconnect();		
	return $result; 
}

function analisisRegistraTraducciones($idAnalisis,$idIdioma,$texto){
	$db = new SQL2K();
	$params = array(
        '@IdAnalisis' => array(
			'is_out' => false,
            'value' => $idAnalisis,
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
    $res = $db->execute('AnalisisRegistraTraducciones', $params);			
	$db->disconnect();
	return $res;
}

function analisisRetornaSimilares($analisisDesc){
	$db = new SQL2K();			
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $analisisDesc,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )	
    );	
    $res = $db->execute('AnalisisRetornaSimilares', $params);
	$result = $db->fetchAllRow($res);
	$long = count($result);// por si devuelve más de uno, me quedo con el último.. mmm
	$ret = $result[$long-1][0];//id insertado
	$db->disconnect();
	return $ret;
}

function borrarTraduccion($id){	
	$tabla = "TraduccionesAnalisis";
	$where = "IdTraduccion = ".$id;	
	$res = borrarRegistro($tabla,$where);	
	return $res;
}
?>