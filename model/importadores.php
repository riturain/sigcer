<?php //MODELO IMPORTADORES 

function importadoresRegistraDatos($idImportador, $importador){
	//ImportadoresRegistraDatos 
	//@IdImportador int = 0,
	//@Importador varchar(500),
	//@Res int output
		// -1 ya existe | LastID ok | UpdatedID ok | 0 error
	$db = new SQL2K();
	$params = array(
        '@IdImportador' => array(
			'is_out' => false,
            'value' => $idImportador,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Importador' => array(
			'is_out' => false,
            'value' => $importador,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('ImportadoresRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function importadoresRetornaDatos($idUsuario = 0){
	//ImportadoresRetornaDatos -> CURSOR
	//@IdUsuario int = 0
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('ImportadoresRetornaDatos',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function importadoresRetornaSimilares($idUsuario, $importador){
	//ImportadoresRetornaSimilares -> CURSOR
	//@IdUsuario int = 0,
    //@Importador varchar(500)
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		),
		'@Importador' => array(
			'is_out' => false,
            'value' => $importador,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		)
	);
	$res = $db->execute('ImportadoresRetornaSimilares',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function importadoresRetornaTodos(){
	//ImportadoresRetornaTodos -> CURSOR
	$db = new SQL2K();
	$res = $db->execute('ImportadoresRetornaTodos');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function importadoresYEmpresasRegistraDatos($idImportador = 0, $idEmpresa = 0){
//PARA GUARDAR LAS EMPRESAS ASOCIADAS AL IMPORTADOR
	//ImportadoresYEmpresasRegistraDatos ->
	//@IdImportador int = 0,
	//@IdEmpresa int = 0,
	//@Res int output
		// 0 error | 1 ok
	$db = new SQL2K();
	$params = array(
        '@IdImportador' => array(
			'is_out' => false,
            'value' => $idImportador,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false, 
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('ImportadoresYEmpresasRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function importadoresYEmpresasRetornaDatos($idImportador = 0, $idUsuario = 0){
//PARA CUANDO HACÉS CLICK EN EL IMPORTADOR -> te trae las empresas de abajo (SOLO LOS ID)
	//ImportadoresYEmpresasRetornaDatos -> CURSOR (idImportador, idEmpresa, NroRegistro, RazonSocial)
	//@IdImportador int = 0
	$db = new SQL2K();
		$params = array(
		'@IdImportador' => array(
			'is_out' => false,
            'value' => $idImportador,
            'type' => SQLSRV_PHPTYPE_INT
		),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('ImportadoresYEmpresasRetornaDatos',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function importadoresYEmpresaAsocBorrarDatos($id,$idEmpresa){	
//BORRAR DATOS DE IMPORTADOR-EMPRESA
	$tabla = "ImportadoresYEmpresas";
	$where = "IdImportador = ".$id." and IdEmpresa = ".$idEmpresa;	
	$result = borrarRegistro($tabla,$where);	
	return $result;
}
?>