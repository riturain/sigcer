<?php //MODELO MARCAS 

function marcasRegistraDatos($idMarca, $marca){
	$db = new SQL2K();
	$params = array(
        '@IdMarca' => array(
			'is_out' => false,
            'value' => $idMarca,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Marca' => array(
			'is_out' => false,
            'value' => strtoupper($marca),
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('MarcasRegistraDatos', $params);
	$db->disconnect();
	return $result;
}

function MarcasRetornaDatos($idUsuario = 0){
	$db = new SQL2K();
	$params = array(
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('MarcasRetornaDatosSegunUsuario',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function marcasYPlantasRegistraDatos($idMarca = 0, $idPlanta = 0,$idProducto = 0){
	

	$db = new SQL2K();
	$params = array(
        '@IdPlanta' => array(
			'is_out' => false,
            'value' => $idPlanta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $idProducto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdMarca' => array(
			'is_out' => false,
            'value' => $idMarca,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true, 
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$result = $db->execute('PlantasElaboradorasYProductosRegDatos', $params);
	$db->disconnect();
	return $result;
}

function MarcasYPlantasRetornaDatos($idMarca = 0, $idUsuario = 0){

	$db = new SQL2K();
		$params = array(
		'@IdMarca' => array(
			'is_out' => false,
            'value' => $idMarca,
            'type' => SQLSRV_PHPTYPE_INT
		),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
		)
	);
	$res = $db->execute('MarcasRetornaQuienElabora',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function marcasYPlantasAsocBorrarDatos($idMarca,$idPlanta,$idProducto){	

	$db = new SQL2K();
	$params = array(
        '@IdPlanta' => array(
			'is_out' => false,
            'value' => $idPlanta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $idProducto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdMarca' => array(
			'is_out' => false,
            'value' => $idMarca,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => true, 
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PlantasElaboradorasYProductosBorrar', $params);
	$db->disconnect();
	return $result;

}

function ProductosRetornaSimilares($producto){

		$db = new SQL2K();
		$params = array(
		'@Parametro' => array(
			'is_out' => false,
            'value' => $producto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		)
	);
	$res = $db->execute('ProductosRetornaSimilares',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;

}
?>