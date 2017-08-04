<?php
/*

- Comprobar si existe el usuario
- Devolver los datos del usuario

*/
function usuariosInfoLog($user = ''){
	$db = new SQL2K();
	$params = array(	
        '@Usuario' => array(
			'is_out' => false,
            'value' => $user,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
	);
	$res = $db->execute('UsuariosInfoLog', $params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}


function admVerificaAccesoAfip($cuit, $cuits){	
	$db = new SQL2K();			
	$params = array(
        '@Cuit' => array(
			'is_out' => false,
            'value' => $cuit,
            'type' => SQLSRV_PHPTYPE_STRING(30)
        ),
        '@CuitsEmpresas' => array(
			'is_out' => false,
            'value' => $cuits,
            'type' => SQLSRV_PHPTYPE_STRING(500)
        )		
    ); 	
    $res = $db->execute('AdmVerificaAccesoAfip', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();	
	if (count($result)>0){	
		return $result[0][0];
	}else{
		return '0';
	}
}

function menuPorTipoDeAcceso(){
	$db = new SQL2K();	
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $GLOBALS['session']->getValue('id_usuario'),
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AdmRetornaMenu',$params);
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	$GLOBALS['session']->setValue('rutas',$result);
}

?>