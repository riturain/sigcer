<?php //MODELO DESPACHANTES 

function despachantesRegistraDatos($idDespachante, $elDespachante, $elTeldesp, $elMaildesp){

	$db = new SQL2K();
	$params = array(
        '@IdDespachante' => array(
			'is_out' => false,
            'value' => $idDespachante,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Despachante' => array(
			'is_out' => false,
            'value' => strtoupper($elDespachante),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Telefonos' => array(
			'is_out' => false,
            'value' => strtoupper($elTeldesp),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Correo' => array(
			'is_out' => false,
            'value' => strtoupper($elMaildesp),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('DespachantesRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function despachantesRetornaDatos($idUsuario = 0){
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('DespachanteRetornaDatosSegunUsuario',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function despachantesYEmpresasRegistraDatos($idDespachante = 0, $idEmpresa = 0){

	$db = new SQL2K();
	$params = array(
        '@IdDespachante' => array(
			'is_out' => false,
            'value' => $idDespachante,
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
	$result = $db->execute('DespachantesyPlantasRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function despachantesYEmpresasRetornaDatos($idDespachante = 0){

	$db = new SQL2K();
		$params = array(
		'@IdDespachante' => array(
			'is_out' => false,
            'value' => $idDespachante,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('DespachantesYPlantasRetornaDatos',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function despachantesYEmpresaAsocBorrarDatos($id,$idEmpresa){	

	$tabla = "DespachantesEmpresasExportadoras";
	$where = "IdDespachante = ".$id." and IdEmpresa = ".$idEmpresa;	
	$result = borrarRegistro($tabla,$where);	
	return $result;
}
?>