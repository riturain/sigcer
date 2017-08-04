<?php //MODELO PROVISORIOS 

function provisoriosRetornaAprobNoAprob($aprobado = 0, $numero = 0, $empresa = 'null', $planta = 'null', $idPais = 0){
	$db = new SQL2K();
	$params = array(
        '@Aprobado' => array(	//0 para traer los pendientes, 1 para traer los aprobados
			'is_out' => false,
            'value' => $aprobado,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Numero' => array(		//numero autorizacion
			'is_out' => false,
            'value' => $numero,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Empresa' => array(
			'is_out' => false,
            'value' => $empresa,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Planta' => array(
			'is_out' => false,
            'value' => $planta,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );		
	$res = $db->execute('ProvisoriosRetornaAprobNoAprob',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function provisoriosAprobar($idUsuario = 0, $idsProvisorios = ""){
// tipo #numero#numero#
	$db = new SQL2K();
	$params = array(	
        '@IdsProvisorios' => array(
			'is_out' => false,
            'value' => $idsProvisorios,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),	
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('ProvisoriosAprobar', $params);
	$db->disconnect();
	return $result;
}

?>