<?php //MODELO BUQUES 

function BuquesRegistraDatos($idBuque, $idTerminal,$Buque){
	$db = new SQL2K();
	$params = array(
        '@IdBuque' => array(
			'is_out' => false,
            'value' => $idBuque,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdTerminal' => array(
			'is_out' => false,
            'value' => $idTerminal,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Buque' => array(
			'is_out' => false,
            'value' => $Buque,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('BuquesRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function BuquesRetornaTodos(){
	$db = new SQL2K();
	$params = array();
	$res = $db->execute('BuquesRetornaTodos',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function TerminalesRetornaTodas(){
	$db = new SQL2K();
	$params = array();
	$res = $db->execute('TerminalesRetornaTodas',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

?>