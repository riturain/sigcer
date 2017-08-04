<?php //MODEL LOCALIDADES

function localidadesRetornaSimilares($term){
	$db = new SQL2K();
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $term,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('LocalidadesRetornaSimilares',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

?>