<?php // MODEL AUDITORIA 
function bitacoraRetornaTablas(){
	$db = new SQL2K();	
	$res = $db->execute('BitacoraRetornaTablas');
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

function bitacoraRetornaDatos($n = 0, $a = 2000, $t = ''){
	$db = new SQL2K();			
	$params = array(
        '@Numero' => array(
			'is_out' => false,
            'value' => $n,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Anio' => array(
			'is_out' => false,
            'value' => $a,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tipo' => array(
			'is_out' => false,
            'value' => $t,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
    $res = $db->execute('BitacoraRetornaDatos', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function bitacoraRetornaDetalle($idBit){
	$db = new SQL2K();			
	$params = array(
        '@IdBitacora' => array(
			'is_out' => false,
            'value' => $idBit,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
    $res = $db->execute('BitacoraRetornaDetalle', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
?>