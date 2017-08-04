<?php // MODELO resolucion108

function resolucion108RetornaPlantasPosibles($flag,$idempresa){
	$db = new SQL2K();
	$params = array(
        '@Vigente' => array(
			'is_out' => false,
            'value' => $flag,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idempresa,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('Resolucion108RetornaPlantasSegunEstado',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}


function guardardatosResolucion108($fecha,$listado){
	$db = new SQL2K();
	$params = array(
        '@Fecha' => array(
			'is_out' => false,
            'value' => $fecha,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@ListadoPlantaPais' => array(
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
	$result = $db->execute('PlantasElaboradorasResolucion108',$params);
	$db->disconnect();
	return $result;
}
?>