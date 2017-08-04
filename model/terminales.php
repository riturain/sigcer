<?php //MODELO terminales 

function terminalRegistraDatos($idTerminal,$terminal,$fechaVto){
	$db = new SQL2K();
	$params = array(
        '@IdTerminal' => array(
			'is_out' => false,
            'value' => $idTerminal,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Terminal' => array(
			'is_out' => false,
            'value' => $terminal,
            'type' => SQLSRV_PHPTYPE_STRING(300)
        ),
		'@FechaVto' => array(
			'is_out' => false,
            'value' => $fechaVto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('TerminalesRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function TerminalesRetornaTodas(){
	$db = new SQL2K();
	$params = array();
	$res = $db->execute('TerminalesRetornaTodas',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

?>