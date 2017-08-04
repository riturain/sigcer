<?php
// MODELO INSPECTORES

function inspectoresRetornaTodos(){
        $db = new SQL2K();
        $res = $db->execute('InspectoresRetornaTodos');
        $result = $db->fetchAllAssoc($res);
        $db->disconnect();
        return $result;

}

function inspectoresRegistraDatos($IdInspector, $Inspector, $Telefonos, $Correo, $IdUsuario){
        $db = new SQL2K();
        $params = array(
        '@IdInspector' => array(
            'is_out' => false,
            'value' => $IdInspector,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Inspector' => array(
            'is_out' => false,
            'value' => $Inspector,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Telefonos' => array(
            'is_out' => false,
            'value' => $Telefonos,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Correo' => array(
            'is_out' => false,
            'value' => $Correo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@IdUsuario' => array(
            'is_out' => false,
            'value' => $IdUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
            'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        ),
    );
    $res = $db->execute('InspectoresRegistraDatos', $params);
    $db->disconnect();
    if ($res){
                $_SESSION['verde'] = 'Se han guardado los datos';
        }else{
                $_SESSION['rojo'] = 'Error en el servidor, datos NO guardados';
        }
    return $res;
}

function RetornaDatosSegunUsuario($parametro){
	$db = new SQL2K();
    $params = array(
        '@Parametro' => array(
            'is_out' => false,
            'value' => $parametro,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
	);
	$res = $db->execute('UsuariosPorParametro',$params);
    $result = $db->fetchAllRow($res);
    $db->disconnect();
    return $result;
}

?>