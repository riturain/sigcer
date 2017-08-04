<?php // MODEL CONSULTAS

function PaisesRetortaTodos(){
	$db = new SQL2K();
	$params = array(
        '@Parametro' => array(
			'is_out' => false,
            'value' => '',
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )		
    );	
    $res = $db->execute('PaisesRetornaSimilares', $params);
	$result = $db->fetchAllRow($res);    
	$db->disconnect();
	return $result;
}


function EjecutaProcAlmSinParametro($nombre){
	
	$db = new SQL2K();
	$res = $db->execute($nombre);
	$result = $db->fetchAllRow($res);    
	$db->disconnect();
	return $result;	
	
}


function consultasRetornaProductosPosibles($term){
	$db = new SQL2K();	
	$params = array(	
        '@Parametro' => array(
			'is_out' => false,
            'value' => $term,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('ConsultasRetornaProductosPosibles',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();		
	return $result;
}

function admEjecutaConsulta($tipo = "", $groupBy = "", $mostrarProductos = 0, $idElaborador = "",
							$idExportador = "", $idPais = "", $idVia = "", $idPaso = "", $idAduana = "",
							$estado = "", $anio = "", $kilos = "", $idDespachante = "", $idGrupo = "",
							$idSubGrupo = "", $idProducto = "", $f1 = "", $f2 = ""){
	$db = new SQL2K();	
	$params = array(	
        '@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@GroupBy' => array(
			'is_out' => false,
            'value' => $groupBy,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@MostrarProductos' => array(
			'is_out' => false,
            'value' => $mostrarProductos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdElaborador' => array(
			'is_out' => false,
            'value' => $idElaborador,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdExportador' => array(
			'is_out' => false,
            'value' => $idExportador,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdVia' => array(
			'is_out' => false,
            'value' => $idVia,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPaso' => array(
			'is_out' => false,
            'value' => $idPaso,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAduana' => array(
			'is_out' => false,
            'value' => $idAduana,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Estado' => array(
			'is_out' => false,
            'value' => $estado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Anio' => array(
			'is_out' => false,
            'value' => $anio,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Kilos' => array(
			'is_out' => false,
            'value' => $kilos,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdDespachante' => array(
			'is_out' => false,
            'value' => $idDespachante,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdGrupo' => array(
			'is_out' => false,
            'value' => $idGrupo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdSubGrupo' => array(
			'is_out' => false,
            'value' => $idSubGrupo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdProducto' => array(
			'is_out' => false,
            'value' => $idProducto,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Fecha1' => array(
			'is_out' => false,
            'value' => $f1,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Fecha2' => array(
			'is_out' => false,
            'value' => $f2,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('AdmEjecutaConsulta',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();		
	return $result;
}	
?>