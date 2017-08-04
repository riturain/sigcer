<?php //MODELO MODULO PDF

function moduloPdfRetornaEstructuraTabla($tipo){	
	// TIPO = 'CERTIFICADOS' , ...
	$db = new SQL2K();
	$params = array(    
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$db->execute('ModuloPdfVerificaEstructuraTablas',$params);
	$res = $db->execute('ModuloPdfRetornaEstructuraTabla',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function moduloPdfRetornaTablasPosibles($tipo){		
	$db = new SQL2K();
	$params = array(    
		'@Tipo' => array(
			'is_out' => false,
            'value' => $tipo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('ModuloPdfRetornaTablasPosibles',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function plantillasRetornaTipos(){
	$db = new SQL2K();
	$params = array();		
	$res = $db->execute('PlantillasRetornaTipos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function plantillasRetornaCategorias(){
	$db = new SQL2K();
	$params = array();		
	$res = $db->execute('PlantillasRetornaCategorias',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

//GUARDAR
//valida para guardar
function plantillasValidaExistencia($idPlantilla = 0, $idTipoPlantilla = 0, $nombre = '',$idCategoria = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdPlantilla' => array(
			'is_out' => false,
            'value' => $idPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $idTipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Nombre' => array(
			'is_out' => false,
            'value' => $nombre,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdCategoria' => array(
			'is_out' => false,
            'value' => $idCategoria,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('PlantillasValidaExistencia',$params);
	$db->disconnect();
	return $result;
}

//registra datos cabecera plantilla
function plantillasRegistraDatos($idPlantilla = 0, $nombre = '', $idTipoPlantilla = 0, $idUsuario = 0,$idCategoria = 0){
	$db = new SQL2K();
	$params = array(    
		'@IdPlantilla' => array(
			'is_out' => false,
            'value' => $idPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Nombre' => array(
			'is_out' => false,
            'value' => $nombre,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $idTipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdUsuario' => array(
			'is_out' => false,
            'value' => $idUsuario,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdCategoria' => array(
			'is_out' => false,
            'value' => $idCategoria,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('PlantillasRegistraDatos',$params);
	$db->disconnect();
	return $result;
}

function plantillasRegistraLineaDetalle($idDetallePlantilla = 0, $idPlantilla = 0, $rotulo = '', $detalleHtml = '', $filtros = '0#', $consumoAnimal = "", $alcance = ""){
	$db = new SQL2K();
	$params = array(    
		'@IdDetallePlantilla' => array(
			'is_out' => false,
            'value' => $idDetallePlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdPlantilla' => array(
			'is_out' => false,
            'value' => $idPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
        '@Rotulo' => array(
			'is_out' => false,
            'value' => $rotulo,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@DetalleHtml' => array(
			'is_out' => false,
            'value' => $detalleHtml,
            'type' => SQLSRV_SQLTYPE_TEXT
        ),
		'@Filtros' => array(
			'is_out' => false,
            'value' => $filtros,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@ConsumoAnimal' => array(
			'is_out' => false,
            'value' => $consumoAnimal,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@Alcance' => array(
			'is_out' => false,
            'value' => $alcance,
			'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
        '@Res' => array(
			'is_out' => true,
            'value' => false,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$result = $db->execute('PlantillasRegistraLineaDetalle',$params);
	$db->disconnect();
	return $result;
}

function borrarDetalles($id){	
	$tabla = "DetallePlantilla";
	$where = "IdPlantilla = $id";	
	$res = borrarRegistro($tabla,$where);	
	return $res;
}

function plantillasBuscarDatos($nombre = 'null', $tipoPlantilla = 0){	
	$db = new SQL2K();
	$params = array(    
		'@Nombre' => array(
			'is_out' => false,
            'value' => $nombre,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        ),
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $tipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('PlantillasBuscarDatos',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function plantillasRetornaDatos($id = 0){
	$db = new SQL2K();
	$params = array(		
		'@IdPlantilla' => array(
			'is_out' => false,
            'value' => $id,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('PlantillasRetornaDatos',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();
	return $result;
}
	
function plantillasRetornaDetalles($id = 0){
	$db = new SQL2K();
	$params = array(		
		'@IdPlantilla' => array(
			'is_out' => false,
            'value' => $id,
            'type' => SQLSRV_PHPTYPE_INT
        )
    );	
	$res = $db->execute('PlantillasRetornaDetalles',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}


// ------------- SUBGRUPOS -------------
// ------------- SUBGRUPOS -------------
// ------------- SUBGRUPOS -------------
function subGrupoRetornaSimilares($param = ''){
	$db = new SQL2K();
	$params = array(		
		'@Parametro' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('SubGrupoRetornaSimilares',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}

function paisesRetornaSimilares($param = ''){
	$db = new SQL2K();
	$params = array(		
		'@Parametro' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(100)
        )
    );	
	$res = $db->execute('PaisesRetornaSimilares',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}
	
	
// ------------- IMPRIMIR -------------
// ------------- IMPRIMIR -------------
// ------------- IMPRIMIR -------------
	
function imprimirVistaPrevia($codigo){
	//borro los archivos que pudiera haber del mismo usuario	
	borrarTemporales();
	$codigo = transformarCodigo($codigo);
	//llamar a imprimir	
	imprimirDeModulo($codigo,0,0,null,null,false);
}

function transformarCodigo($codigo){
	//reemplaza LISTCERT y busca las certificaciones
	$codigo = reemplazaListCert($codigo);
	//reemplaza los #vertical#
	$codigo = reemplazarVerticales($codigo);
	//reemplaza los #invisible#
	$codigo = reemplazarInvisibles($codigo);
	//reemplazar encabezados tabla
	$codigo = reemplazaEncabezadosTabla($codigo);
        //reemplaza #cuadrito# por una imagen de un cuadrito
        $codigo = reemplazaCuadritos($codigo);
        //reemplaza las #diagonal# por id="diag*" class="diagonal" (dentro del TD)
        $codigo = reemplazaDiagonales($codigo);
	//convertir caracteres
		//$codigo = str_replace('|td¬#diagonal#|/td¬','|td class=´diag´ ¬&nbsp;|/td¬', $codigo);
		$codigo = str_replace('|', '<', $codigo);
		$codigo = str_replace('¬', '>', $codigo);
		$codigo = str_replace('´', '"', $codigo);
		$codigo = str_replace('\\', '', $codigo);
        
	return $codigo;
}

	
function imprimirDeModulo($codigo,$copias = 0,$via = 0, $codeBar = null, $nombreArchivo = null, $esConCopias = true, $idCert = null){	
	if ((!isset($nombreArchivo)) || ($nombreArchivo == null)){
		$nombreArchivo = 'Vista Previa';
	}
	
	if($_SESSION['tipo_acceso'] == 2){
		$codigoListo = cargarCodigoHTML($codigo,"moduloPDF");
		if ((isset($codeBar)) && ($codeBar != null)){			
			$codigoBarra = "<img src='".$_SERVER['DOCUMENT_ROOT'].$codeBar."' />";
			$codigoListo = $codigoListo.$codigoBarra;
		}
	}else{
		if ($esConCopias){
			$codigoListo = cargarCodigoHTMLconCopias($codigo,"moduloPDF",$copias,$via,$codeBar);
		}else{
			if ((isset($codeBar)) && ($codeBar != null)){                                
				$codigoBarra = "<img src='".$_SERVER['DOCUMENT_ROOT']."$codeBar' />";
			}else{
				$codigoBarra = "";
			}
			$codigoListo = cargarCodigoHTML($codigo.$codigoBarra,"moduloPDF");
		}
		//if ((isset($codeBar)) && ($codeBar != null)){
		//	$old = "</tr></table><br><table style='page-break-after:always;'>";
		//	$new = "<img src='$codeBar' /></tr></table><br><table style='page-break-after:always;'>";
		//	$codigoListo = str_replace($old, $new, $codigoListo);
		//	$old = "</body>";
		//	$new = "<img src='$codeBar' /></body>";
		//	$codigoListo = str_replace($old, $new, $codigoListo);
		//}
	}
	//$_SESSION['codigo_listo'] = $codigoListo;
	if ($idCert != null){
		exportarAPDFOficio($codigoListo, $nombreArchivo, $codeBar, traerCuve($idCert,'CERTIFICADOS'));			
	}else{
		exportarAPDFOficio($codigoListo, $nombreArchivo, $codeBar);
	}
}

function borrarTemporales(){
	//$archivo = '../images/temp/'.$_SESSION['id_usuario'].'vertical$i.png';
	$dir = '../images/temp/';
	if ($directorio = dir($dir)){		
		while ($fichero = $directorio->read()){
			if (!is_dir($fichero)){
				$info_fichero = pathinfo($fichero);
				$res = strpos($info_fichero['basename'], "$_SESSION[id_usuario]vertical");
				if($res !== FALSE){
					unlink($dir."".$info_fichero['basename']);
				}
			}
		}
	}	
}

function reemplazaListCert($codigo){
	$hayListCert = true;
	while ($hayListCert){
		$posListCert = strpos($codigo,"LISTCERT");
		if ($posListCert !== FALSE){
			$contenidoInicial = substr($codigo, 0, $posListCert); //corto la primera parte 
			$posListEnd = strpos($codigo, "LISTEND") + 7; //calcula la posición del último <td>
			$largo = strlen($codigo) - $posListEnd; //largo de la cadena
			$contenidoFinal =  substr($codigo, $posListEnd, $largo); //corto la primera parte 
			$listaCert = substr($codigo, $posListCert, ($posListEnd - $posListCert));
			
			$listaCert = str_replace('LISTCERT', '', $listaCert);
			$listaCert = str_replace('LISTEND', '', $listaCert);
			
			$certificaciones = moduloPdfRetornaCertificacionesParaImprimir($listaCert);			
			$certificacionesText = "";
			foreach ($certificaciones as $each){				
				$certificacionesText .= '<li>'.$each['TextoCert'].'</li>';
			}			
			$codigo = $contenidoInicial . $certificacionesText . $contenidoFinal;	
		}else{
			$hayListCert = false;
		}
	}	
	return $codigo;
}

function reemplazarVerticales($codigo){
	/* BUSCA #VERTICAL# PARA REEMPLAZAR POR "<img src='../images/temp/$_SESSION[id_usuario]vertical.png >' */	
	$hayVertical = true;
	$i = 1;
	
	while ($hayVertical){
		$posit = strpos($codigo,"#vertical#");
		
		if ($posit !== FALSE){
			$contenidoAuxiliar = substr($codigo, 0, $posit); //corto la primera parte 
			$posTD = strrpos($contenidoAuxiliar, "td"); //calcula la posición del último <td>
			unset($contenidoAuxiliar);
			if ($posTD !== FALSE){ //si o si
				$aux = substr($codigo, 0, $posTD);
				$aux = $aux."td style=´width: 20px;´ ";
				$aux = $aux.substr($codigo, ($posTD+2), (strlen($codigo)-$posTD));
				$codigo = $aux;
				unset($aux);
			}
			$posit = strpos($codigo,"#vertical#");
			$posit = $posit +strlen("#vertical#");
			$final = strpos($codigo,"|/td¬",$posit);			
			if ($final !== FALSE){			
				$textoAux = substr($codigo, ($posit), ($final-$posit));			
				$textoVertical = str_replace('|br /¬', '', $textoAux);
				$textoVertical = str_replace('&nbsp;', '', $textoVertical);
				imagenVertical($textoVertical, $i);			
				$codigo = str_replace("#vertical#".$textoAux,"|img src=´".$_SERVER['DOCUMENT_ROOT']."/images/temp/$_SESSION[id_usuario]vertical$i.png´ ¬",$codigo);
			}
		}else{
			$hayVertical = false;
		}
		$i++;
	}
	return $codigo;
}

function reemplazarInvisibles($codigo){
	/* BUSCA #INVISIBLE# PARA REEMPLAZAR por |td class=´invisibleCol´¬|/td¬*/
	$hayInvisible = true;
	while ($hayInvisible){
		$posit = strpos($codigo,"#invisible#"); 	
		if ($posit){			
			$contenidoAuxiliar = substr($codigo, 0, $posit); //corto la primera parte 
			$posTD = strrpos($contenidoAuxiliar, "¬"); //calcula la posición del último <td>
			unset($contenidoAuxiliar);
			if ($posTD){ //si o si
				$aux = substr($codigo, 0, $posTD);
				$aux = $aux." class=´invisibleCol´ ¬";
				$aux = $aux.substr($codigo, ($posTD+1), (strlen($codigo)-$posTD));
				$codigo = $aux;
				unset($aux);
			}
			$posit = strpos($codigo,"#invisible#");
			$largo = strlen("#invisible#");			
			
			$textoAux = substr($codigo, 0,$posit);
			$textoAux2 = substr($codigo,($posit+$largo),(strlen($codigo)-($posit+($largo))));			
			$codigo = $textoAux."".$textoAux2;
		}else{
			$hayInvisible = false;
		}
	}
	return $codigo;
}

function reemplazaEncabezadosTabla($codigo){
	/* BUSCA table style= PARA REEMPLAZAR por  table class='tablaFija' */
	/*
	table style=´height: 78px; border-color: #000;´ border=´1´ width=´521´ cellspacing=´0´ cellpadding=´0´¬
	table class=´tablaFija´¬
	*/
	$hayEncabezado = true;
	while ($hayEncabezado){
		$posit = strpos($codigo,"table style=");
		if ($posit){
			$pitutito = strpos($codigo,"¬",$posit);
			$textoAux = substr($codigo, 0,$posit);
			$textoAux = $textoAux."table class=´tablaFija´¬";
			$textoAux = $textoAux.substr($codigo,($pitutito+1),(strlen($codigo)-($pitutito)));			
			$codigo = $textoAux;
		}else{
			$hayEncabezado = false;
		}
	}
	return $codigo;
}

function reemplazaDiagonales($codigo){
    /* BUSCA #DIAGONAL# PARA REEMPLAZAR >#DIAGONAL# POR id='diagX' class='diagonal'> */	
	$hayDiagonal = true;
        $setJs = false;
	$i = 1;
	
	while ($hayDiagonal){
		$posit = strpos($codigo,"#diagonal#");
		
		if ($posit !== FALSE){
                        $setJs = true;
			$contenidoAuxiliar = substr($codigo, 0, $posit); //corto la primera parte 
			$posTD = strrpos($contenidoAuxiliar, "td"); //calcula la posición del último <td>
			unset($contenidoAuxiliar);
			if ($posTD !== FALSE){ //si o si
				$aux = substr($codigo, 0, $posTD);
				$aux = $aux."td id=´diag".$i."´ class=´diagonal´ valign=´top´ ";
				$aux = $aux.substr($codigo, ($posTD+2), (strlen($codigo)-$posTD));
				$codigo = $aux;
				unset($aux);
			}
			$posit = strpos($codigo,"#diagonal#");
			$posit = $posit +strlen("#diagonal#");
			$final = strpos($codigo,"|/td¬",$posit);			
			if ($final !== FALSE){			
				$textoAux = substr($codigo, ($posit), ($final-$posit));							
				$codigo = str_replace("#diagonal#".$textoAux,$textoAux,$codigo);
			}
		}else{
			$hayDiagonal = false;
		}
		$i++;
	}
        if ($setJs){
            
            $codigo = "
        <style>        
	td.diagonal{        
		background-image: url('".$_SERVER['DOCUMENT_ROOT']."/images/diagonal.png');
		background-repeat: no-repeat;		
		background-position: center;                
		text-align: left;                
		width: 1px;
		height 1px;
                font-size: 10px;
	}
	</style>
        ".$codigo."            
        <script>
	function getAncho(c) {return(c.offsetWidth);}
	function getAlto(c) {return(c.offsetHeight);}
	function diagonales(){	
            if (document.getElementById('diag1')){		
                var alto, ancho;
                var estilo = '';
                var x = 1;
                var fin = 0;
                while (fin == 0){		
                    if (document.getElementById('diag'+x)){			
                        ancho = (getAncho(document.getElementById('diag'+x)));
                        alto = (getAlto(document.getElementById('diag'+x)));					
                        estilo = ancho+'px '+alto+'px';                   
                        document.getElementById('diag'+x).style.backgroundSize= estilo;
                    }else{
                        fin = 1;
                    }
                    x++;
                }
            }
	}	
	document.onreadystatechange = diagonales();	
        </script>";
        }       
        
	return $codigo;
}

function reemplazaCuadritos($codigo){
    $imgCuadrito = '|img src=´'.$_SERVER['DOCUMENT_ROOT'].'/images/cuadrito.png´ />' ;
    $codigo = str_replace("#cuadrito#",$imgCuadrito,$codigo);
    return $codigo;
}
	
function imagenVertical($string,$nom='0'){
	$font = 3;
	$width = ImageFontWidth($font) * strlen($string) + 0;
	$height = ImageFontHeight($font) + 0; 
	$im = @imagecreate ($width,$height);
	$background_color = imagecolorallocate ($im, 255, 255, 255); //white background
	$text_color = imagecolorallocate ($im, 0, 0,0);//black text
	imagestring ($im, $font, 0, 0, $string, $text_color);
	$imgRotada = imagerotate($im, 90, 0);
	imagepng($imgRotada,"../images/temp/$_SESSION[id_usuario]vertical$nom.png");
}

/* --------------------------------------------------------------------------------------- */
function moduloPdfRetornaCertificacionesParaImprimir($param = ""){
	$db = new SQL2K();
	$params = array(
		'@Parametro' => array(
			'is_out' => false,
            'value' => $param,
            'type' => SQLSRV_PHPTYPE_STRING(200)
		)
	);
	$res = $db->execute('ModuloPdfRetornaCertificacionesParaImprimir',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();	
	return $result;
}

function certificacionesBuscaPorFiltro($filtro = "",$idtipoplantilla = 0){
	$db = new SQL2K();
	$params = array(
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $idtipoplantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@Parametro' => array(
			'is_out' => false,
            'value' => $filtro,
            'type' => SQLSRV_PHPTYPE_STRING(100)
		)
	);
	$res = $db->execute('TextoCertificacionesRetornaDatosPorFiltro',$params);
	$result = $db->fetchAllAssoc($res);
	$db->disconnect();
	return $result;
}


/* --------------------------------------------------------------------------------------- */
/* ------------------------------- PARA IMPRESIONES DESDE AFUERA ------------------------- */
/* --------------------------------------------------------------------------------------- */

function moduloPdfRetornaModeloAImprimir($idPais = 0,$idTipoPlantilla = 0, $idTramite = 0, $tresIdiomas = 0){
	// 1= SANITARIO, 3 = PROVISORIO		
	$db = new SQL2K();
	$params = array(	 
        '@IdPais' => array(
			'is_out' => false,
            'value' => $idPais,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@IdTipoPlantilla' => array(
			'is_out' => false,
            'value' => $idTipoPlantilla,
            'type' => SQLSRV_PHPTYPE_INT
        ),
		'@EsTresIdiomas' => array(
			'is_out' => false,
            'value' => $tresIdiomas,
/* bit */   'type' => SQLSRV_SQLTYPE_BIT
        ),
		'@IdTramite' => array(
			'is_out' => false,
            'value' => $idTramite,
/* bit */   'type' => SQLSRV_SQLTYPE_BIT
        )
	);	
	$res = $db->execute('ModuloPdfRetornaModeloAImprimir',$params);
	$result = $db->fetchAssoc($res);
	$db->disconnect();	
	return $result['IdPlantilla'];
}


	
?>