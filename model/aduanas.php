<?php
// MODELO ADUANAS
header('Content-Type: text/html; charset=ISO-8859-1');
function aduanasRetornaTodas(){	
	$db = new SQL2K();	
	$res = $db->execute('AduanasRetornaTodas');	
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function aduanasRegistraDatos($id_aduana = 0, $aduana = ""){	
	$db = new SQL2K();			
	$params = array(
        '@IdAduana' => array(
			'is_out' => false,
            'value' => $id_aduana,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Aduana' => array(
			'is_out' => false,
            'value' => strtoupper($aduana),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        ),
    ); 	
    $result = $db->execute('AduanasRegistraDatos', $params);
	$db->disconnect();
	return $result;
}
?>