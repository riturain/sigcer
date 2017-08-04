<?php // MODELO plantasyexportadores

function RetornaExportadoresAsociados($idplanta){
	$db = new SQL2K();
	$params = array(
		'@IdPlanta' => array(
			'is_out' => false,
            'value' => $idplanta,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('PlantasElaboradorasRetornaExportadores',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}


function guardardatosExportadoresAsociados($idplanta,$fecha,$kilos,$listado){
	$db = new SQL2K();
	$params = array(
		'@IdPlanta' => array(
			'is_out' => false,
            'value' => $idplanta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Fecha' => array(
			'is_out' => false,
            'value' => $fecha,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@MaxKilos' => array(
			'is_out' => false,
            'value' => $kilos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@ListadoExportadores' => array(
			'is_out' => false,
            'value' => $listado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('PlantasElaboradorasRegistraEmpresasAsociadas',$params);
	$db->disconnect();
	return $result;
}


function buscadorPlantas($quebuscar){
	$db = new SQL2K();
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $quebuscar,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('PlantasElaboradorasRetornaPorDenominacion',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function buscadorExportadores($idplanta,$parametro){
	$db = new SQL2K();
	$params = array(
		 '@IdPlanta' => array(
			'is_out' => false,
            'value' => $idplanta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Parametro' => array(
			'is_out' => false,
            'value' => $parametro,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('PlantasElaboradorasRetornaExpPosibles',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

?>