<?php // MODEL PRODUCTOS 

function productosRetornaSimilares($param = ''){
	$db = new SQL2K();			
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )		
    );	
    $res = $db->execute('ProductosRetornaSimilares', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function productosRetornaDatos($id_producto){
	$db = new SQL2K();			
	$params = array(
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $id_producto,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('ProductosRetornaDatos', $params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}

function productosRetornaSubGrupos(){
	$db = new SQL2K();	
	$res = $db->execute('ProductosRetornaSubGrupos');
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function productosRegistraTraducciones($idTraduccion = 0, $idProducto = 0, $idIdioma = 0, $traduccion = ''){
	$db = new SQL2K();
	$params = array(
        '@IdTraduccion' => array(
			'is_out' => false,
            'value' => $idTraduccion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $idProducto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdIdioma' => array(
			'is_out' => false,
            'value' => $idIdioma,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Detalle' => array(
			'is_out' => false,
            'value' => $traduccion,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('TraduccionesRegistraDatos', $params);			
	$db->disconnect();
	return $res;
}

function traduccionesRetornaDatos($id_producto = 0){
	$db = new SQL2K();			
	$params = array(
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $id_producto,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('TraduccionesRetornaDatos', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function productosRegistraAnalisis($idParametro = 0, $idProducto = 0, $idAnalisis = 0, $valor = ''){
	$db = new SQL2K();
	$params = array(
        '@IdParametro' => array(
			'is_out' => false,
            'value' => $idParametro,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $idProducto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdAnalisis' => array(
			'is_out' => false,
            'value' => $idAnalisis,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Valor' => array(
			'is_out' => false,
            'value' => $valor,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('ProductosRegistraAnalisis', $params);			
	$db->disconnect();
	return $res;
}

function productosRetornaAnalisis($id_producto = 0){
	$db = new SQL2K();			
	$params = array(
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $id_producto,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('ProductosRetornaAnalisis', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function analisisRetornaTodos(){
	$db = new SQL2K();	
	$res = $db->execute('AnalisisRetornaTodos');
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function productosRegistraDatos($idProducto,$idSubGrupo,$producto){
	$db = new SQL2K();
	$params = array(
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $idProducto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdSubGrupo' => array(
			'is_out' => false,
            'value' => $idSubGrupo,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Producto' => array(
			'is_out' => false,
            'value' => $producto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('ProductosRegistraDatos', $params);			
	$db->disconnect();
	return $res;
}

function borrarTraduccion($id){	
	$tabla = "Traducciones";
	$where = "IdTraduccion = ".$id;	
	$res = borrarRegistro($tabla,$where);	
	return $res;
}

function borrarAnalisis($id){	
	$tabla = "ParametrosAnalisis";
	$where = "IdParametro = ".$id;	
	$res = borrarRegistro($tabla,$where);	
	return $res;
}

//-- PLANTAS Y MARCAS
function marcasRetornaSimilares($param = ''){
	$db = new SQL2K();
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )		
    );	
    $res = $db->execute('MarcasRetornaSimilares', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}

function productosRetornaPlantasElabora($id_producto = 0){
	$db = new SQL2K();			
	$params = array(
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $id_producto,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('ProductosRetornaPlantasElabora', $params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	/*
	IdDetalle
	IdPlanta
	IdProducto
	IdMarca
	Activo
	Denominacion
	Marca
	Registro
	*/
	return $result;
}

function plantasElaboradorasYProductosRegDatos($id_planta = 0, $id_producto = 0, $id_marca = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPlanta' => array(
			'is_out' => false,
            'value' => $id_planta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $id_producto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdMarca' => array(
			'is_out' => false,
            'value' => $id_marca,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('PlantasElaboradorasYProductosRegDatos', $params);			
	$db->disconnect();
	return $res;
}

function plantasElaboradorasYProductosBorrar($id_planta = 0, $id_producto = 0, $id_marca = 0){
	$db = new SQL2K();
	$params = array(
        '@IdPlanta' => array(
			'is_out' => false,
            'value' => $id_planta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProducto' => array(
			'is_out' => false,
            'value' => $id_producto,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdMarca' => array(
			'is_out' => false,
            'value' => $id_marca,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )		
    );	
    $res = $db->execute('PlantasElaboradorasYProductosBorrar', $params);			
	$db->disconnect();
	return $res;
}

?>