<?php // MODELO parteDiario

function buscarInspeccionesParteDiario($desde = "",$hasta = "",$inspector = 1,$tipo = 1,$quebusca){
	$db = new SQL2K();
	$params = array(
		'@Desde' => array(
			'is_out' => false,
            'value' => $desde,
            'type' => SQLSRV_PHPTYPE_STRING(10)
        ),
		'@Hasta' => array(
			'is_out' => false,
            'value' => $hasta,
            'type' => SQLSRV_PHPTYPE_STRING(10)
        ),
        '@IdInspector' => array(
			'is_out' => false,
            'value' => $inspector,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Filtro' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@TipoBuscado' => array(
			'is_out' => false,
            'value' => $quebusca,
            'type' => SQLSRV_PHPTYPE_STRING(50)
        )
    );	
	$res = $db->execute('InspeccionesRetornaParteDiario',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function imprimir($desde,$hasta, $inspector,$tipo,$quebusca){
	$inspecciones = buscarInspeccionesParteDiario($desde,$hasta, $inspector,$tipo,$quebusca);
	$codigo = "";
	$inspector = "";
	if (count($inspecciones)>0){
		$inspector = $inspecciones[0]['Inspector'];
	}
	require("../archivosPDF/codigoParteDiario.php");
	require("../classes/exportarAPDF.php");
	
	$codigoListo = cargarCodigoHTML($codigo,"estiloPDFParteDiario");
	exportarAPDFOficio($codigoListo, "Parte diario de inspecciones",null, 0);
	
}

?>