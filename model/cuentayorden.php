<?php //MODELO IMPORTADORES 

function cuentayordenRegistraDatos($idcuentayorden, $cuentayorden){
		// -1 ya existe | LastID ok | UpdatedID ok | 0 error
	$db = new SQL2K();
	$params = array(
        '@IdDetalle' => array(
			'is_out' => false,
            'value' => $idcuentayorden,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@PorCuenta' => array(
			'is_out' => false,
            'value' => $cuentayorden,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PorCuentaYOrdenRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function cuentayordenRetornaDatos($idUsuario = 0){
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('EmpresasRetornaPorCuentaYOrdenSegunUsuario',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function cuentayordenYEmpresasRegistraDatos($idcuentayorden = 0, $idEmpresa = 0){

		// 0 error | 1 ok
	$db = new SQL2K();
	$params = array(
        '@IdDetalle' => array(
			'is_out' => false,
            'value' => $idcuentayorden,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true, 
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('EmpresasPorCuentaYOrdenRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function cuentayordenYEmpresasRetornaDatos($idcuentayorden = 0, $idUsuario = 0){
//PARA CUANDO HACÉS CLICK EN EL IMPORTADOR -> te trae las empresas de abajo (SOLO LOS ID)
	//ImportadoresYEmpresasRetornaDatos -> CURSOR (idImportador, idEmpresa, NroRegistro, RazonSocial)
	//@IdImportador int = 0
	$db = new SQL2K();
		$params = array(
		'@IdDetalle' => array(
			'is_out' => false,
            'value' => $idcuentayorden,
            'type' => SQLSRV_PHPTYPE_INT
		),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('EmpresasPorCuentaYOrdenRetornaEmpresasAsociadas',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function cuentayordenYEmpresaAsocBorrarDatos($id,$idEmpresa){	

	$tabla = "EmpresasPorCuentaYOrden";
	$where = "IdDetalle = ".$id." and IdEmpresa = ".$idEmpresa;	
	$result = borrarRegistro($tabla,$where);	
	return $result;
}
?>