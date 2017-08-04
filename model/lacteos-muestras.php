<?php // MODELO lacteos-autorizaciones 

//PAISES PARA EMPRESA
function autorizacionesRetornaPaisesPosibles($idEmpresa){
	$db = new SQL2K();
	$params = array(
        '@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		// 1 = muestras, 0 = autorizaciones
		'@esMuestra' => array(
			'is_out' => false,
            'value' => 1,
            'type' => SQLSRV_SQLTYPE_BIT
        )
    );	
	$res = $db->execute('AutorizacionesRetornaPaisesPosibles',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//PLANTAS PARA EMPRESA (MUESTRASRETORNAPLANTASPOSIBLES) <- devuelve todas las plantas de la empresa
function muestrasRetornaPlantasPosibles($idEmpresa = 0, $idUsuario = 0){
	$db = new SQL2K();
	$params = array(	
        '@IdEmpresa' => array(
			'is_out' => false,
            'value' => $idEmpresa,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('MuestrasRetornaPlantasPosibles',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}
	
//TIPOS DE URGENCIA	
function tipoUrgenciaRetornaDatos(){
	$db = new SQL2K();
	$res = $db->execute('TramitesRetornaTipoUrgencia');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//TRANSPORTES PARA PAIS
function transportesRetornaDatos($idPaso){
	$db = new SQL2K();
	$params = array(
        '@IdPaso' => array(
			'is_out' => false,
            'value' => $idPaso,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PasosRetornaViasTransporteHabilitadas', $params);	
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//PASOS FRONTERIZOS PARA PAIS Y TRANSPORTE
function pasosRetornaDatos($idPais){
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('PasosFronterizosRetornaSegunPais', $params);	
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//EXPORTADORES PARA PLANTAS
function autorizacionesRetornaExportadoresPosibles($plantas, $id_usuario = 0){	
	$db = new SQL2K();
	$params = array(
        '@Plantas' => array(
			'is_out' => false,
            'value' => $plantas,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $id_usuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaExportadoresPosibles', $params);	
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//LUGARES DE INSPECCIÓN POR EMPRESA EXPORTADORA
function autorizacionesRetornaLugaresInspPosibles($idExportador = 0){
	$db = new SQL2K();
	$params = array(
        '@IdExportador' => array(
			'is_out' => false,
            'value' => $idExportador,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaLugaresInspPosibles', $params);	
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}


//PRODUCTOS POSIBLES
function autorizacionesRetornaProductosPosibles($idPais = 0, $plantas, $term){
	$db = new SQL2K();	
	$params = array(	
	//pais = 0 para traer todas las productos sin importar país, para MUESTRAS
        '@IdPais' => array(
			'is_out' => false,
            'value' => 0,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Plantas' => array(
			'is_out' => false,
            'value' => $plantas,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Term' => array(
			'is_out' => false,
            'value' => $term,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('AutorizacionesRetornaProductosPosibles',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();		
	return $result;
}

function presentacionesMielRetornaTipos(){
	$db = new SQL2K();	
	$res = $db->execute('PresentacionesMielRetornaTipos');
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;	
}

//MARCAS POR PRODUCTO/PLANTA
function autorizacionesRetornaMarcasAsociadas($idProducto = 0, $idPlanta = 0, $term = ''){
/*
	@IdPlanta int = 0,
	@Test varchar(80)
*/
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
		'@Test' => array(
			'is_out' => false,
            'value' => $term,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('AutorizacionesRetornaMarcasAsociadas',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();		
	return $result;
}

function verificarCertificado($idAutorizacion){
	$db = new SQL2K();	
	$params = array(
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesLacteosRetornaCertificados',$params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();		
	return $result;	
}

//BUSCAR AUTORIZACIONES
function admRetornaAniosProcesados(){
	$db = new SQL2K();	
	$res = $db->execute('AdmRetornaAñosProcesados');
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function admRetornaEstadosProcesados($formulario){
	$db = new SQL2K();		
	$params = array(
		'@Formulario' => array(
			'is_out' => false,
            'value' => $formulario,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$res = $db->execute('AdmRetornaEstadosProcesados', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function autorizacionesBuscarDatos($numAutorizacion = 'null', $empresaStr = 'null', $anio = 'null', $estado = 'null', $idPais = 'null', $numRef = 'null', $idUsuario = 0){
	$db = new SQL2K();		
	$params = array(
        '@NumAutorizacion1' => array(
			'is_out' => false,
            'value' => $numAutorizacion,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Empresa' => array(
			'is_out' => false,
			'value' => $empresaStr,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Anio1' => array(
			'is_out' => false,
            'value' => $anio,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Estado' => array(
			'is_out' => false,
            'value' => $estado,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdPais1' => array(
			'is_out' => false,
            'value' => $idPais,                       
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@NumRef' => array(
			'is_out' => false,
            'value' => $numRef,                       
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		//esMuestra = 1 para diferenciar de Autorizaciones
        '@esMuestra' => array(
			'is_out' => false,            
            'value' => 1,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AutorizacionesBuscarDatos', $params);
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

//FIN BUSCAR AUTORIZACIONES

function viasTransporteRetornaLimite($idTransporte = 0){
	$esMuestra = 1; // es muestra
	$db = new SQL2K();	
	$params = array(
		'@IdTransporte' => array(
			'is_out' => false,
            'value' => $idTransporte,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@esMuestra' => array(
			'is_out' => false,
            'value' => $esMuestra,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('ViasTransporteRetornaLimite',$params);
	$result = $db->fetchRow($res);
	$db->disconnect();		
	return $result[0];
}

//ACCIONES
function autorizacionesLacteosVerificaSiEsCambio($idAutorizacion){
	$db = new SQL2K();	
	$params = array(
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesLacteosVerificaSiEsCambio',$params);
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosAbm($idAutorizacion = 0, $numero = 0, $fecha, $estado, $idElaborador = 0, $idExportador = 0, $fechaInsp, $idPlantaInsp = 0, $lugar, $dirVerificacion, $idPais = 0, $idTransporte = 0, $idAduana = 0, $idPaso = 0, $idDespachante = 0, $prorroga, $idUsuario = 0, $observada, $referencia, $arancel, $copias = 0, $requeridos = 0, $consumoAnimal, $urgencia = 'NORMAL'){
	$db = new SQL2K();
	$params = array(
	//@IdAutorizacion int = 0,
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
    //@Numero int = 0,
        '@Numero' => array(
			'is_out' => false,
            'value' => $numero,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Fecha varchar(10),
		'@Fecha' => array(
			'is_out' => false,
            'value' => $fecha,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Estado varchar(50),
		'@Estado' => array(
			'is_out' => false,
            'value' => $estado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@IdElaborador int = 0,
		'@IdElaborador' => array(
			'is_out' => false,
            'value' => $idElaborador,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdExportador int = 0,
		'@IdExportador' => array(
			'is_out' => false,
            'value' => $idExportador,
            'type' => SQLSRV_PHPTYPE_INT
        ),
    //@IdPlantaInsp int = 0,
		'@IdPlantaInsp' => array(
			'is_out' => false,
            'value' => $idPlantaInsp,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@FechaInsp varchar(10),
		'@FechaInsp' => array(
			'is_out' => false,
            'value' => $fechaInsp,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Lugar varchar(200),
		'@Lugar' => array(
			'is_out' => false,
            'value' => $lugar,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@DirVerificacion varchar(200),
		'@DirVerificacion' => array(
			'is_out' => false,
            'value' => $dirVerificacion,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@IdPais int = 0,
		'@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdTransporte int = 0,
		'@IdTransporte' => array(
			'is_out' => false,
            'value' => $idTransporte,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdAduana int = 0,
		'@IdAduana' => array(
			'is_out' => false,
            'value' => $idAduana,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdPaso int = 0,
		'@IdPaso' => array(
			'is_out' => false,
            'value' => $idPaso,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdDespachante int = 0,
		'@IdDespachante' => array(
			'is_out' => false,
            'value' => $idDespachante,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Prorrogada bit,
		'@Prorrogada' => array(
			'is_out' => false,
			'value' => $prorroga,
/* bit */   'type' => SQLSRV_PHPTYPE_INT
        ),
	//@IdUsuario int = 0,
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Observada bit,
		'@Observada' => array(
			'is_out' => false,
            'value' => $observada,
/* bit */   'type' => SQLSRV_SQLTYPE_BIT
        ),
	//@Referencia varchar(250),
		'@Referencia' => array(
			'is_out' => false,
            'value' => $referencia,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Arancel  numeric(18,4),
		'@Arancel' => array(
			'is_out' => false,
            'value' => $arancel,
/**/        'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Copias int = 0,
		'@Copias' => array(
			'is_out' => false,
            'value' => $copias,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@Requeridos int = 0,
		'@Requeridos' => array(
			'is_out' => false,
            'value' => $requeridos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
	//@ConsumoAnimal bit,
		'@ConsumoAnimal' => array(
			'is_out' => false,
            'value' => $consumoAnimal,
/* bit */   'type' => SQLSRV_SQLTYPE_BIT
        ),
	//esMuestra = 1 <-- para diferenciar de autorizaciones
        '@esMuestra' => array(
			'is_out' => false,
            'value' => 1,
            'type' => SQLSRV_SQLTYPE_BIT
        ),
	//@TipoTramite varchar(80),
		'@TipoTramite' => array(
			'is_out' => false,
            'value' => $urgencia,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
	//@Res int output
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesLacteosAbmWeb', $params); //cambió antes era AutorizacionesLacteosAbm
	$db->disconnect();
	return $result;
}

function darNumeroAutorizacion($idAut){
	$db = new SQL2K();		
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAut,            
            'type' => SQLSRV_PHPTYPE_INT
        )
	);
	$result = $db->execute('DarNumeroAutorizacion', $params); 
	$db->disconnect();
	return $result;
}

function autorizacionesRegistrarPlantaAsociada($idAutorizacion, $idPlanta){
$db = new SQL2K();		
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,            
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdPlanta' => array(
			'is_out' => false,
			'value' => $idPlanta,            
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('autorizacionesRegistrarPlantaAsociada', $params);	
	$db->disconnect();
	return $result;
}

function devolverProductoConArray($concatenado){	
	$array = explode('**',$concatenado);
	$result = array();
	$result['producto'] = $array[0];		if ($array[0] == '') return false;
	$result['idProducto'] = $array[1];		if ($array[1] < 1) return false;
	$result['planta'] = $array[2];			if ($array[2] == '') return false;
	$result['idPlanta'] = $array[3];		if ($array[3] < 1) return false;
	$result['por'] = $array[4];				if ($array[4] == '') return false;
	$result['cantEnvases'] = $array[5];	
	$result['claseEnvase'] = $array[6]; 
	$result['idClaseEnvase'] = $array[7]; 	if ($array[7] < 1) return false;
	$result['unidades'] = $array[8];		
	$result['marca'] = $array[9];			
	$result['idMarca'] = $array[10];		
	$result['kilos'] = $array[11];			
	$result['fobUnit'] = $array[12];		
	$result['fobTotal'] = $array[13];		
	$result['idDetalle'] = $array[14];		
	$result['estado'] = $array[15];
	$result['ddjj'] = $array[16];		//DDJJ
	return $result;
}

function AutorizacionesLacteosRetornaDdjjMiel($idAutorizacion = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,            
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$result = $db->execute('AutorizacionesLacteosRetornaDdjjMiel', $params);
	$res = $db->fetchAllAssoc($result);	
	$db->disconnect();
	$ddjjs = array();
	$cant = count($res);
	if ($cant > 0){
		$prodDDJJ = "";
		$actual = $res[0]['IdDetalle'];
		$fin = false; $i = 0;
		while (!$fin){
			if ($res[$i]['IdDetalle'] == $actual){
				if ($prodDDJJ != ""){
					$prodDDJJ .= "#";
				}
				$prodDDJJ .= "".$res[$i]['Empresa']."||".$res[$i]['IdEmpresaRenapa']."||".$res[$i]['Cantidad']."||".$res[$i]['NroFactura']."||".$res[$i]['Emisor']."";
			}else{
				$actual = $res[$i]['IdDetalle'];
				$ddjjs[$res[$i]['IdDetalle']] = $prodDDJJ;
				$prodDDJJ = "";
			}		
			if (($i+1) == $cant){
				$ddjjs[$res[$i]['IdDetalle']] = $prodDDJJ;
				$prodDDJJ = "";
				$fin = true;
			}
			$i++;
		}
	}
	return $ddjjs;
}

function autorizacionesLacteosRetornaProdConDdjj($idAutorizacion){
	$db = new SQL2K();	
	$params = array(
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('autorizacionesLacteosRetornaProdConDdjj',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();		
	return $result;		
}

function autorizacionesLacteosRetornaInfoProdDdjj($idDetalle){
	$db = new SQL2K();	
	$params = array(
		'@IdDetalle' => array(
			'is_out' => false,
            'value' => $idDetalle,
            'type' => SQLSRV_PHPTYPE_INT
       )
    );
	$res = $db->execute('AutorizacionesLacteosRetornaInfoProdDdjj',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();		
	return $result;		
}


function guardarDDJJ($idDetalle = 0, $cadenaMiel = "" ,$borraDDJJ = 0){	
	//$borrarDDJJ = 1 para borrar	
	$db = new SQL2K();		
	$params = array(
        '@IdDetalleProdAut' => array(
			'is_out' => false,
            'value' => $idDetalle,            
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@CadenaMiel' => array(
			'is_out' => false,
			'value' => $cadenaMiel,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),	
		'@BanderaBorrar' => array(
			'is_out' => false,
            'value' => $borrarDDJJ,
            'type' => SQLSRV_SQLTYPE_BIT
        ),	
	    '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('AutorizacionesLacteosRegistraDdjjMiel', $params);		
	$db->disconnect();
	return $result;	
}

function autorizacionesRegistrarProducto($idAutorizacion = 0, $idProducto = 0, $por, $cantEnvases = 0, $idClaseEnvase = 0, $unidades = 0, $idMarca = 0, $kilos, $fobUnit, $fobTotal, $idPlanta = 0, $esCambio = 0){
	$db = new SQL2K();		
	$params = array(
        '@IdDetalle' => array(
			'is_out' => false,
            'value' => 0,            
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdAutorizacion' => array(
			'is_out' => false,
			'value' => $idAutorizacion,            
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdProdExportado' => array(
			'is_out' => false,
            'value' => $idProducto,            
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Por' => array(
			'is_out' => false,
            'value' => $por,            
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@CantEnvases' => array(
			'is_out' => false,
            'value' => $cantEnvases,                       
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdEnvase' => array(
			'is_out' => false,
            'value' => $idClaseEnvase,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Unidades' => array(
			'is_out' => false,
            'value' => $unidades,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdMarca' => array(
			'is_out' => false,
            'value' => $idMarca,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Kilos' => array(
			'is_out' => false,
            'value' => $kilos,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@FobUnitario' => array(
			'is_out' => false,
            'value' => $fobUnit,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@FobTotal' => array(
			'is_out' => false,
            'value' => $fobTotal,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdPlanta' => array(
			'is_out' => false,
            'value' => $idPlanta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@EsCambio' => array(
			'is_out' => false,
            'value' => $esCambio,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('AutorizacionesLacteosRegistraProductos', $params);	
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosCalculaArancel($idAutorizacion = 0,$kilosTotal){ //idAut y KilosTotal
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),		
		'@KilosTotales' => array(
			'is_out' => false,
            'value' => $kilosTotal,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$db->execute('AutorizacionesLacteosCalculaArancel',$params);
	$db->disconnect();
	return $result;	
}

// traer autorización
function autorizacionesRetornaDatos($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesAsignaEstadoActual', $params);
	$res = $db->execute('AutorizacionesRetornaDatos', $params);	
	$result = $db->fetchAssoc($res);	
	$db->disconnect();
	return $result;		
}

// traer plantas de una autorización
function autorizacionesRetornaPlantas($idAutorizacion = 0){ 
	// retorna una arreglo con todas las plantas, en cada posición está toda la info dividida por ** -> hacer explode
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaPlantas', $params);	
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();	
	$plantas = "#";
	$puedeBorrar = "#";
	foreach($result as $planta){		
		$plantas .= $planta['IdPlanta']."#";
		if ($planta['PuedeBorrar']){
			$puedeBorrar .= $planta['IdPlanta']."#";		
		}
	}
	$retorno['plantas'] = $plantas;
	$retorno['puedeBorrar'] = $puedeBorrar;
	return $retorno;
}


function autorizacionesRetornaPlantasDatos($idAutorizacion = 0){ 
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaPlantas', $params);	
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

// traer productos de una autorización
function autorizacionesRetornaProductosAfectados($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaProductosAfectados', $params);	
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	$productos = array();
	$i=0;
	foreach($result as $p){		
		$producto = $p['IdProdExportado']."**".$p['Producto']."**".$p['IdPlanta']."**".$p['Denominacion']."**".$p['Registro']."**".$p['IdMarca']."**".$p['Marca']."**".$p['Por']."**".$p['IdEnvase']."**".$p['Envase']."**".$p['CantEnvases']."**".$p['Unidades']."**".$p['Kilos']."**".$p['FobUnitario']."**".$p['FobTotal']."**".$p['IdDetalle']."**".$p['PuedeBorrar']."**".$p['TieneHACCP']."**".$p['IdGrupo'];
		$productos["$i"] = $producto;
		$i++;
	}
	return $productos;	
}

function autorizacionesPuedeCambiarPais($idAutorizacion){
	/*
	@IdAutorizacion int = 0,
	@Res int output
	*/
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesPuedeCambiarPais', $params);	
	$db->disconnect();
	return $result;
}
function autorizacionesBorrarPorCambioPais($idAutorizacion){	
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$db->execute('AutorizacionesBorrarPorCambioPais',$params);	
	$db->disconnect();
	return true;
}

function paisesVerificaNecesitaProvisorio($idPais = 0){
//SI DEVUELVE FALSO ->DESHABILITA PROVISORIO
	$db = new SQL2K();
	$params = array(
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('PaisesVerificaNecesitaProvisorio', $params);
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosNoHayCircuitoAbierto($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesLacteosNoHayCircuitoAbierto', $params);
	$db->disconnect();
	return $result;
}

function autorizacionesRetornaPlantasParaProvisorio($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaPlantasParaProvisorio', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}

function autorizacionesVerificaEstadoPlantas($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesVerificaEstadoPlantas', $params);	
	$result = $db->fetchAllRow($res);	
	$db->disconnect();
	return $result;
}

function autorizacionesRetornaSaldosProductos($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaSaldosProductos', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}

function admRetornaTopesParaProrroga(){
	$db = new SQL2K();	
	$res = $db->execute('AdmRetornaTopesParaProrroga');
	$result = $db->fetchRow($res);
	$db->disconnect();
	return $result;	//[0]->45[1]->90
}

function autorizacionesValidaEstadoParaMod($idAutorizacion = 0, $idUsuario = 0){ 
//SI RETORNA 0 no se puede modificar porque tiene cambios pendientes
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
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
	$result = $db->execute('AutorizacionesValidaEstadoParaMod', $params);	
	$db->disconnect();
	return $result;
}

function autorizacionesPuedeModificar($idAutorizacion = 0, $idUsuario = 0){ 
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
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
	$result = $db->execute('AutorizacionesPuedeModificar', $params);	
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosRetornaCertificados($idAutorizacion = 0){
//SI RETORNA ALGO NO SE PUEDE ANULAR
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesLacteosRetornaCertificados', $params);	
	$result = $db->fetchAllRow($res);
	$db->disconnect();
	return $result;
}

function autorizacionesCambiarEstado($idAutorizacion = 0, $estado){
//PARA ANULAR UNA AUTORIZACION
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Estado' => array(
			'is_out' => false,
            'value' => $estado,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );
	$result = $db->execute('AutorizacionesCambiarEstado', $params);
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosValidaParaReplica($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesLacteosValidaParaReplica', $params);	
	$db->disconnect();
	return $result;
}

function autorizacionesProrrogar($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesProrrogar', $params);
	$db->disconnect();
	return $result;
}

function autorizacionesBorrarProducto($idDetalle){
	$db = new SQL2K();
	$params = array(
        '@IdDetalle' => array(
			'is_out' => false,
            'value' => $idDetalle,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesBorrarProducto', $params);
	$db->disconnect();
	return $result;
}

function provisoriosProcedimientoGeneral($idAutorizacion = 0, $idPlanta = 0, $idUsuario = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@IdPlanta' => array(
			'is_out' => false,
            'value' => $idPlanta,
            'type' => SQLSRV_PHPTYPE_INT
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
	$result = $db->execute('ProvisoriosProcedimientoGeneral', $params);
	$db->disconnect();
	return $result;
}

// --------------- IMPRESIONES -------------------

// -----------
// -----------	
// --------CAMBIOS
	
function autorizacionesLacteosRetornaCambios($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('autorizacionesLacteosRetornaCambios', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result;
}

function autorizacionesRetornaDatosParaImprimir($idAutorizacion = 0){
//retorna los datos originales de la autorización sin cambios
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$db->execute('AutorizacionesAsignaEstadoActual',$params);
	$res = $db->execute('AutorizacionesRetornaDatosParaImprimir', $params);	
	$result = $db->fetchAssoc($res);	
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosRetornaProductosImprimir($idAutorizacion = 0){
//retorna los productos originales de la autorización
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesLacteosRetornaProductosImprimir', $params);	
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	$productos = array();
	$i=0;
	foreach($result as $p){
		$producto = $p['Producto']."**".$p['Marca']."**".$p['Por']."**".$p['Envase']."**".$p['CantEnvases']."**".$p['Unidades']."**".$p['Kilos']."**".$p['FobUnitario']."**".$p['FobTotal']."**".$p['IdDetalle']."**".$p['Registro'];
		$productos["$i"] = $producto;
		$i++;
	}
	return $productos;
}

function autorizacionesLacteosRetornaCambioParaImprimir($idCambio){
	//RETORNA DATOS DE LA AUTORIZACION PARA EL PDF DE CAMBIOS
	$db = new SQL2K();
	$params = array(
        '@IdCambio' => array(
			'is_out' => false,
            'value' => $idCambio,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$db->execute('AutorizacionesLacteosPreparaCambioParaImprimir', $params);	 
	$res = $db->execute('AutorizacionesLacteosRetornaCambioParaImprimir', $params);	
	$result = $db->fetchAssoc($res);	
	$db->disconnect();
	return $result;	
}

function autorizacionesLacteosRetornaProductosImpCambio($idCambio){
	//RETORNA LOS PRODUCTOS DE LA AUTORIZACION PARA EL PDF DE CAMBIOS
	$db = new SQL2K();
	$params = array(
        '@IdCambio' => array(
			'is_out' => false,
            'value' => $idCambio,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesLacteosRetornaProductosImpCambio', $params);	
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	$productos = array();
	$i=0;
	foreach($result as $p){
		$producto = $p['Producto']."**".$p['Marca']."**".$p['Por']."**".$p['Envase']."**".$p['CantEnvases']."**".$p['Unidades']."**".$p['Kilos']."**".$p['FobUnitario']."**".$p['FobTotal']."**".$p['IdDetalle']."**".$p['Registro'];
		$productos["$i"] = $producto;
		$i++;
	}
	return $productos;	
}

function imprimirCambioAutorizacion($idAut, $idCambio){
	$datos = autorizacionesLacteosRetornaCambioParaImprimir($idCambio);	
	$productos = autorizacionesLacteosRetornaProductosImpCambio($idCambio);	
	
	$codeBar = "../classes/barcode/MUE".$_SESSION['id_usuario']."-".$datos['Numero'].".gif";
	$anio = substr($datos['Fecha'],-4);
	$idCode = zerofill($datos['Numero'], 8);
	$code = "MUE".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");
	$codigo = "";
  $codeBar = str_replace('..','',$codeBar);
	require("../archivosPDF/codigoMuestrasCambio.php");	
	$codigoListo = cargarCodigoHTML($codigo,"estiloPDFMuestrasCambio");//<-- COPIAS
	
	$retCircuito = admNoHayCircuitoAbierto($idAut ,'AUTORIZACIONES');
	if (($retCircuito == 0) || ($_SESSION['tipo_acceso'] == 2)){ //marca de agua
            $_SESSION['marcaAgua'] = true;	
	}	
	
	exportarAPDFOficio($codigoListo, "Formulario de Cambio",$codeBar, traerCuve($idAut,'AUTORIZACIONES'));
}

// -----------
// -----------
// --------AUTORIZACION NORMAL

function imprimirAutorizacion($idAutorizacion){		
	$ret = codigoPDFExportarAut($idAutorizacion);
	$codigoListo = cargarCodigoHTML($ret['codigo'],"estiloPDFMuestras");
		
	exportarAPDFOficio($codigoListo, "Muestra sin valor comercial",$ret['codeBar'], traerCuve($idAutorizacion,'AUTORIZACIONES'));
}

function codigoPDFExportarAut($idAutorizacion){
	$datos = autorizacionesRetornaDatosParaImprimir($idAutorizacion);

	//si tiene cambios = 1, sino 0
	$tiene_cambios = $datos['ConCambios'];		
	
	$retCircuito = admNoHayCircuitoAbierto($idAutorizacion ,'AUTORIZACIONES');
	if (($retCircuito == 0) || (($datos['Numero'] == 0) || ($_SESSION['tipo_acceso'] == 2))){
		$_SESSION['marcaAgua'] = true;
	}
	
	//$datosPlantas = autorizacionesRetornaPlantasPosibles($datos['IdEmpAut'],$datos['IdPais'],0);	
	
	//$idPlantas = autorizacionesRetornaPlantas($idAutorizacion);
	
	$productos = autorizacionesLacteosRetornaProductosImprimir($idAutorizacion);
	
	
	$codeBar = "../classes/barcode/MUE".$_SESSION['id_usuario']."-".$datos['Numero'].".gif";
	$anio = substr($datos['Fecha'],-4);
	$idCode = zerofill($datos['Numero'], 8);
	$code = "MUE".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");
	
	$codigo = "";
  $codeBar = str_replace('..','',$codeBar);
	require("../archivosPDF/codigoMuestras.php");
  //agregar DDJJ MIEL
	$prodsDDJJ = autorizacionesLacteosRetornaProdConDdjj($idAutorizacion);
	if (count($prodsDDJJ) > 0){
		require("../archivosPDF/ddjjmiel.php");
	}


	$ret = array();
	$ret['codigo'] = $codigo;
	$ret['codeBar'] = $codeBar;	
	return $ret;
}

// -----------
// -----------
// --------AUTORIZACION PRORROGA

function autorizacionesRetornaDatosParaImpProrroga($idAutorizacion = 0){	
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuarioActual' => array(
			'is_out' => false,
            'value' => $_SESSION['id_usuario'],
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$res = $db->execute('AutorizacionesRetornaDatosImprimeProrroga', $params);	
	$result = $db->fetchAllAssoc($res);	
	$db->disconnect();
	return $result[0];
}

function imprimirAutorizacionProrrogada($idAutorizacion){
	$ret = codigoPDFProrroga($idAutorizacion);
	$codigoListo = cargarCodigoHTML($ret['codigo'],"estiloPDFMuestraProrroga");	
	exportarAPDFOficio($codigoListo, "Solicitud de Prorrogacion",$ret['codeBar'], traerCuve($idAutorizacion,'AUTORIZACIONES'));
}
function codigoPDFProrroga($idAutorizacion){
	$datos = autorizacionesRetornaDatosParaImpProrroga($idAutorizacion);	
	
	$codeBar = "../classes/barcode/MUE".$_SESSION['id_usuario']."-".$datos['Numero'].".gif";
	$anio = substr($datos['Fecha'],-4);
	$idCode = zerofill($datos['Numero'], 8);
	$code = "MUE".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");
	
	$codigo = "";
        $codeBar = str_replace('..','',$codeBar);
	require("../archivosPDF/codigoMuestraProrrogada.php");	
	
	$retCircuito = admNoHayCircuitoAbierto($idAut ,'AUTORIZACIONES');
	if (($retCircuito == 0) || ($_SESSION['tipo_acceso'] == 2)){
		$_SESSION['marcaAgua'] = true;
	}
	
	$ret = array();
	$ret['codigo'] = $codigo;
	$ret['codeBar'] = $codeBar;	
	return $ret;
}

// -----------
// -----------	
// --------AUTORIZACION PROVISORIOS	

function imprimirProvisorio($idAutorizacion,$idPlanta,$idPais,$esConsumoAnimal,$esMuestra){
	
	$modelo = moduloPdfRetornaModeloAImprimir($idPais,3); //3 = provisorio	
	//levanto la plantilla con el nombre de modelo
	$elementosPlantillaGuardada = plantillasRetornaDetalles($modelo);
	
	$codigo = "";
	foreach ($elementosPlantillaGuardada as $each){
		$ok = true;
		//valido ConsumoAnimal
		if (($each['Consumo'] == 'ANIMAL') && ($esConsumoAnimal == 0)){			
		//NO SE IMPRIME SI ES CONSUMO ANIMAL
		$ok = false;
		}
		if (($ok) && (($each['Consumo'] == 'HUMANO') && ($esConsumoAnimal == 1))){
			//NO SE IMPRIME PORQUE ES PARA CONSUO HUMANO Y EL CERTIFICADO ES CONSUMO ANIMAL
			$ok = false;			
		}
		//valido Si va para la muestra
		if (($ok) && (($each['Alcance'] == 'MUESTRAS') && ($esMuestra == 0))){
			//NO SE IMPRIME SI NO ES MUESTRA
			$ok = false;			
		}
		//valido Si no va para la muestra
		if (($ok) && (($each['Alcance'] == 'MUESTRASNO') && ($esMuestra == 1))){
			//NO SE IMPRIME EN LAS MUESTRAS
			$ok = false;			
		}
		$tachado = false;
		if ($each['Filtros'] != 0){
			//chequear filtros
			$ret = provisoriosDeterminaImpresionOpcional($each['IdDetallePlantilla'], $idAutorizacion, $idPlanta);
			if ($ret == 0){
				$ok = false; //no se muestra (0)
			}else{// es 1 o 2
				if ($ret == 2){
					$tachado = true;
				}
			}
		}
		if ($ok){
			if($tachado){
				$each['DetalleHtml'] = "<div class='tachado'>".$each['DetalleHtml']."</div>";
			}
			$each['DetalleHtml'] = str_replace('\\', '', $each['DetalleHtml']);
			$codigo .= $each['DetalleHtml'];
		}
	}
	
	$codigo = transformarCodigo($codigo);
	//agrego logo
	$codigo = "<img src='".$_SERVER['DOCUMENT_ROOT']."/images/modelos/logoPDF.jpg' />".$codigo;
	//Traer los datos para completar el modelo 
	$datos = provisoriosRetornaDatosParaImprimir($idAutorizacion,$idPlanta);
	foreach($datos as $key => $value){
		$codigo = str_replace("#".$key."#", $value, $codigo);
	}
	
	$ret = provisoriosProcedimientoGeneral($idAutorizacion, $idPlanta, $_SESSION['id_usuario']);
	if (($ret == 0) || ($_SESSION['tipo_acceso'] == 2)){
		$_SESSION['marcaAgua'] = true;
	}

	//creamos codigo de barra
	$codeBar = "../classes/barcode/PRO".$_SESSION['id_usuario']."-".$datos['NumeroAut'].".gif";
	$anio = $datos['AnioAut'];
	$idCode = zerofill($datos['NumeroAut'], 8);
	$code = "PRO".$anio.$idCode;	//lo usa sample-gd
	require("../classes/barcode/sample-gd.php");
	
	imprimirDeModulo($codigo,0,0, $codeBar, "Provisorio $idAutorizacion-$idPlanta");
}

function provisoriosDeterminaImpresionOpcional($idDetPlantilla = 0, $idAutorizacion = 0, $idPlanta = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdDetallePlantilla' => array(
			'is_out' => false,
            'value' => $idDetPlantilla,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdPlanta' => array(
			'is_out' => false,
            'value' => $idPlanta,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$ret = $db->execute('ProvisoriosDeterminaImpresionOpcional',$params);
	$db->disconnect();
	/* 0 = va, 1 = no va, 2 = tachado */
	return $ret;
}

function provisoriosRetornaDatosParaImprimir($idAutorizacion = 0, $idPlanta = 0){
	$db = new SQL2K();
	$params = array(	 
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdPlanta' => array(
			'is_out' => false,
            'value' => $idPlanta,
            'type' => SQLSRV_PHPTYPE_INT
        )
	);	
	$res = $db->execute('ProvisoriosRetornaDatosParaImprimir',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();	
	return $result;
}

// -----------
// -----------
// ----------- INSPECCIONES

function autorizacionesLacteosPuedePedirInspeccion($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesLacteosPuedePedirInspeccion', $params);
	$db->disconnect();
	return $result;
}
	
	
function autorizacionesLacteosRetornaInspecciones($idAutorizacion){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AutorizacionesLacteosRetornaInspecciones',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

// -----------
// -----------
// ----------- CERTIFICADOS

function autorizacionesPuedeEmitirCertificado($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );
	$result = $db->execute('AutorizacionesPuedeEmitirCertificado', $params);
	$db->disconnect();
	return $result;	
}

function autorizacionesLacteosRetInspeccionesParaCertificados($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AutorizacionesLacteosRetInspeccionesParaCertificados',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function autorizacionesLacteosVerificaHabPaisYPlantas($idAutorizacion = 0){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AutorizacionesLacteosVerificaHabPaisYPlantas',$params);	
	$db->disconnect();
	return $res;
}

function AutorizacionesLacteosCompletaAltaWeb($idAutorizacion,$idUsuario){
	$db = new SQL2K();
	$params = array(
        '@IdAutorizacion' => array(
			'is_out' => false,
            'value' => $idAutorizacion,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Res' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('AutorizacionesLacteosCompletaAltaWeb',$params);	
	$db->disconnect();
	return $res;
	
}

?>