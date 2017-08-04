<?php

function tienePermisosDeAcceso($archivo){
	$db = new SQL2K();	
	$params = array(
        '@Ruta' => array(
			'is_out' => false,
            'value' => $archivo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPerfil' => array(
			'is_out' => false,
            'value' => $_SESSION['tipo_acceso'],
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('RutasYPermisosRetornaAccesos',$params);
	$result = $db->fetchAssoc($res);	
	$db->disconnect();
	$permisos = explode('#', $result['Permisos']);
	$ret = false;
	foreach ($permisos as $each){
		if ($each == $_SESSION['tipo_acceso']){
			$ret = true;
		}
	}
	return $ret;
}

function admNoHayCircuitoAbierto($idTramite = 0, $tipo = ''){
//PARA MARCAS DE AGUA
	$db = new SQL2K();	
	$params = array(
        '@IdTramite' => array(
			'is_out' => false,
            'value' => $idTramite,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        ),
    );	
	$res = $db->execute('AdmNoHayCircuitoAbierto',$params);	
	$db->disconnect();	
	return $res;
}

function comprobarEstadoTramite($idTramite,$tipo){
/*
	SOLICITUD = 1
	INGRESADO = 2
	RECHAZADO = 3
	NUMERADO = 7
	FIRMADO = 5
	ENTREGADO = 6 
*/
	$db = new SQL2K();	
	$params = array(
        '@IdTramite' => array(
			'is_out' => false,
            'value' => $idTramite,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AdmRetornaUltimoEstadoTramite',$params);	
	$db->disconnect();	
	return $res;	
}

function IdiomasRetornaTodos(){
	$db = new SQL2K();
	$res = $db->execute('IdiomasRetornaTodos');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function borrarRegistro($tabla,$where){ // borra de una $tabla con $where
	$db = new SQL2K();	
	$params = array(
        '@Tabla' => array(
			'is_out' => false,
            'value' => $tabla,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Where' => array(
			'is_out' => false,
            'value' => $where,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Res' => array(
            'is_out' => true,
			'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        ),
    );	
	$res = $db->execute('BorrarRegistro',$params);	
	$db->disconnect();	
	return $res;
}


function utf8_encode_all($dat) // -- It returns $dat encoded to UTF8 
{ 
  if (is_string($dat)) return utf8_encode($dat); 
  if (!is_array($dat)) return $dat; 
  $ret = array(); 
  foreach($dat as $i=>$d) $ret[$i] = utf8_encode_all($d); 
  return $ret; 
} 
/* ....... */ 

function utf8_decode_all($dat) // -- It returns $dat decoded from UTF8 
{ 
  if (is_string($dat)) return utf8_decode($dat); 
  if (!is_array($dat)) return $dat; 
  $ret = array(); 
  foreach($dat as $i=>$d) $ret[$i] = utf8_decode_all($d); 
  return $ret; 
} 
/* ....... */

function traerCuve($idTramite,$tipo){
	$db = new SQL2K();	
	$params = array(
        '@IdTramite' => array(
			'is_out' => false,
            'value' => $idTramite,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('AdmRetornaNumeroCuve',$params);
	$result = $db->fetchRow($res);
	$db->disconnect();
	
	return $result['0'];
}

?>