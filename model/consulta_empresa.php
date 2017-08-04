<?php // MODELO 
	
function empresasBuscarDatos($empresaStr = 'null'){
	$db = new SQL2K();		
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
			'value' => $empresaStr,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('EmpresasRetornaSimilares', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function empresaRetornaDatos($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaDatos', $params);
	$result = $db->fetchRow($res);
	$db->disconnect();
	return $result;
}

function empresaRetornaPlantas($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaPlantas', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function empresasRetornaProductos($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaProductosAsociados', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}


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

function EmpresasRetornaImportadores($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaImportadores', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function EmpresasRetornaDestinos($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaDestinos', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function EmpresasRetornaInfoRes108($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaInfoRes108', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function EmpresasRetornaExportadoresAsociados($IdEmpresaBuscada = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
			'value' => $IdEmpresaBuscada,            
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('EmpresasRetornaExportadoresAsociados', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

?>