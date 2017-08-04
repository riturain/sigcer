<?php // MODEL USUARIOS 

function perfilesRetornaTodos(){
	$db = new SQL2K();	
	$res = $db->execute('PerfilesRetornaTodos');
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function usuariosRetornaTodos($param = ''){
	$db = new SQL2K();			
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )		
    );	
    $res = $db->execute('UsuariosRetornaTodos', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function usuariosRetornaInfo($id_usuario){
	$db = new SQL2K();			
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosRetornaInfo', $params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function usuariosRetornaEmpresasAsociadas($id_usuario){
	$db = new SQL2K();			
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosRetornaEmpresasAsociadas', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function usuariosRetornaPlantasAsociadas($id_usuario){
	$db = new SQL2K();			
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosRetornaPlantasAsociadas', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function usuariosRetornaVinculos($id_usuario){
	$db = new SQL2K();			
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosRetornaVinculos', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

//-------------------- LOS GUARDAR ---------------------------

function usuariosRegistraDatos($idUsuario = 0, $usuario = "", $correo = "", $nyap = "", $idPerfil = 0, $iniciales = "", $cuit = ""){
	$db = new SQL2K();
	$params = array(
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Usuario' => array(
			'is_out' => false,
            'value' => $usuario,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Correo' => array(
			'is_out' => false,
            'value' => $correo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Nombre' => array(
			'is_out' => false,
            'value' => $nyap,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPerfil' => array(
			'is_out' => false,
            'value' => $idPerfil,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Iniciales' => array(
			'is_out' => false,
            'value' => $iniciales,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Cuit' => array(
			'is_out' => false,
            'value' => $cuit,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosRegistraDatos', $params);			
	$db->disconnect();
	return $res;
}

function usuariosYRelacionesRegistraDatos($idUsuario = 0, $relaciones = ""){
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Relaciones' => array(
			'is_out' => false,
            'value' => $relaciones,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosYRelacionesRegistraDatos', $params);			
	$db->disconnect();
	return $res;
}
	
function usuariosYPlantasRegistraDatos($idUsuario = 0, $empresas = ""){
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Empresas' => array(
			'is_out' => false,
            'value' => $empresas,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosYPlantasRegistraDatos', $params);			
	$db->disconnect();
	return $res;
}

function usuariosYEmpresasExportadorasRegistraDatos($idUsuario = 0, $empresas = ""){
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Empresas' => array(
			'is_out' => false,
            'value' => $empresas,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('UsuariosYEmpresasExportadorasRegistraDatos', $params);			
	$db->disconnect();
	return $res;
}
?>