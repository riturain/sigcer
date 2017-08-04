<?php //MODELO EMPRESAS

//DATOS DE EMPRESA
function empresasRetornaDatosSegunUsuario($idUsuario = 0, $texto=' ', $quebuscar='EMPRESA'){
	$db = new SQL2K();
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Tabla' => array(
			'is_out' => false,
            'value' => $quebuscar,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		),		
		'@Param' => array(
			'is_out' => false,
            'value' => $texto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		)
    );	
	$res = $db->execute('BuscadorWebPorUsuario', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//DESPACHANTES
function empresasRetornaDespachantesSegunUsuario($idUsuario = 0, $idEmpresa = 0){
	$db = new SQL2K();
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
		)
    );	
	$res = $db->execute('EmpresasRetornaDespachantesSegunUsuario', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;	
}

// TRAER RENAPA PARA DDJJ
function empresasRenapaRetornaDatos($parametro = ''){
	$db = new SQL2K();
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $parametro,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('EmpresasRenapaRetornaDatos', $params);	
	$result = $db->fetchAllRow($res);	
	$db->disconnect();
	return $result;
}


?>