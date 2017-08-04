<?php //CONSULTAS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "consultas";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../model/consultas.php");
require("../model/empresas.php");
include("../classes/functions.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
	case 'autocompletarEmpresas': //MODELO EMPRESAS
		$empresas = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
		echo(json_encode(utf8_encode_all($empresas)));
		break;
	case 'autocompletarProductos':
		$productos = consultasRetornaProductosPosibles($_POST['term']);
		echo(json_encode(utf8_encode_all($productos)));
		break;
	}
}elseif ((isset($_POST['verDatos'])) || (isset($_POST['exportarAExcel'])) || (isset($_POST['verGrafCol'])) || (isset($_POST['verGrafLine']))){
	$_SESSION['rePost'] = $_POST;
	if (isset($_POST['exportarAExcel'])){
		$_SESSION['rePost']['excel'] = 1;
	}
	if (isset($_POST['verGrafCol'])){
		$_SESSION['rePost']['graficoCol'] = 1;
	}
	if (isset($_POST['verGrafLine'])){
		$_SESSION['rePost']['graficoLine'] = 1;
	}
	header('Location: consultas.php');
	return false;
	
}else{
	
	$hayGrafico = 0;
	
	if (isset($_SESSION['rePost'])){
		$rp = $_SESSION['rePost'];
		unset($_SESSION['rePost']);
		
//VER CONSULTA ----------------------------------------------------------
		$tipo = $rp['tipoTramite'];//tipo trámite		

		//valores
		if ((isset($rp['idElaborador'])) && ($rp['idElaborador'] != "")){$idElaborador = $rp['idElaborador'];}else{$idElaborador = 'NULL';}
		if ((isset($rp['idExportador'])) && ($rp['idExportador'] != "")){$idExportador = $rp['idExportador'];}else{$idExportador = 'NULL';}
		if ((isset($rp['fpais'])) && ($rp['fpais'] != "")){$idPais = $rp['fpais'];}else{$idPais = 'NULL';}
		if ((isset($rp['ftransporte'])) && ($rp['ftransporte'] != "")){$idVia = $rp['ftransporte'];}else{$idVia = 'NULL';}
		if ((isset($rp['fpaso'])) && ($rp['fpaso'] != "")){$idPaso = $rp['fpaso'];}else{$idPaso = 'NULL';}
		if ((isset($rp['faduana'])) && ($rp['faduana'] != "")){$idAduana = $rp['faduana'];}else{$idAduana = 'NULL';}
		if ((isset($rp['festado'])) && ($rp['festado'] != "")){$estado = $rp['festado'];}else{$estado = 'NULL';}
		if ((isset($rp['fanio'])) && ($rp['fanio'] != "")){$anio = $rp['fanio'];}else{$anio = 'NULL';}
		if ((isset($rp['fkilos'])) && ($rp['fkilos'] != "")){$kilos = $rp['fkilos'];}else{$kilos = 'NULL';}
		if ((isset($rp['fdespachante'])) && ($rp['fdespachante'] != "")){$idDespachante = $rp['fdespachante'];}else{$idDespachante = 'NULL';}
		if ((isset($rp['fgrupo'])) && ($rp['fgrupo'] != "")){$idGrupo = $rp['fgrupo'];}else{$idGrupo = 'NULL';}
		if ((isset($rp['fsubgrupo'])) && ($rp['fsubgrupo'] != "")){$idSubGrupo = $rp['fsubgrupo'];}else{$idSubGrupo = 'NULL';}
		if ((isset($rp['idProducto'])) && ($rp['idProducto'] != "")){$idProducto = $rp['idProducto'];}else{$idProducto = 'NULL';}
		if ((isset($rp['f1'])) && ($rp['f1'] != "")){ $f1 = $rp['f1']; }else{ $f1 = 'NULL'; }
		if ((isset($rp['f2'])) && ($rp['f2'] != "")){ $f2 = $rp['f2'];}else{ $f2 = 'NULL'; }
	
		if ((isset($rp['incproductos'])) && ($rp['incproductos'] != "")){$mostrarProductos = 1;}else{$mostrarProductos = 0;}	
	
		$groupBy = "";
		//checkboxes
		if (isset($rp['elaborador'])){ 	if ($groupBy == ""){ $groupBy = $rp['elaborador'];	}else{ $groupBy .= ",".$rp['elaborador'];}}
		if (isset($rp['exportador'])){ 	if ($groupBy == ""){ $groupBy = $rp['exportador'];	}else{ $groupBy .= ",".$rp['exportador'];}}
		if (isset($rp['pais'])){ 		if ($groupBy == ""){ $groupBy = $rp['pais'];		}else{ $groupBy .= ",".$rp['pais'];}}
		if (isset($rp['transporte'])){ 	if ($groupBy == ""){ $groupBy = $rp['transporte'];	}else{ $groupBy .= ",".$rp['transporte'];}}
		if (isset($rp['aduana'])){ 		if ($groupBy == ""){ $groupBy = $rp['aduana'];		}else{ $groupBy .= ",".$rp['aduana'];}}
		if (isset($rp['paso'])){ 		if ($groupBy == ""){ $groupBy = $rp['paso'];		}else{ $groupBy .= ",".$rp['paso'];}}
		if (isset($rp['estado'])){ 		if ($groupBy == ""){ $groupBy = $rp['estado'];		}else{ $groupBy .= ",".$rp['estado'];}}
		if (isset($rp['anio'])){ 		if ($groupBy == ""){ $groupBy = $rp['anio'];		}else{ $groupBy .= ",".$rp['anio'];}}
		if (isset($rp['despachante'])){ if ($groupBy == ""){ $groupBy = $rp['despachante'];	}else{ $groupBy .= ",".$rp['despachante'];}}
		if (isset($rp['grupo'])){ 		if ($groupBy == ""){ $groupBy = $rp['grupo'];$mostrarProductos = 1;		}else{ $groupBy .= ",".$rp['grupo'];}}
		if (isset($rp['subgrupo'])){ 	if ($groupBy == ""){ $groupBy = $rp['subgrupo'];$mostrarProductos = 1;	}else{ $groupBy .= ",".$rp['subgrupo'];}}
		if ($groupBy == ""){ $groupBy = 'NULL';}
			
		$result = admEjecutaConsulta($tipo,$groupBy,$mostrarProductos,$idElaborador,$idExportador,$idPais,$idVia,$idPaso,$idAduana,$estado,$anio,$kilos,$idDespachante,$idGrupo,$idSubGrupo,$idProducto,$f1,$f2);		
		
		
		if ((isset($rp['excel'])) && ($rp['excel'] == 1)){
			if (count($result)>0){
				require("../classes/exportarAExcel.php");//usa $result que ya debe estar cargado				
			}
		}
		if ((isset($rp['graficoCol'])) && ($rp['graficoCol'] == 1)){
			if (($groupBy != 'NULL') && (count($result)>0)){
				$hayGrafico = 1;
			}
		}
		if ((isset($rp['graficoLine'])) && ($rp['graficoLine'] == 1)){
			if (($groupBy != 'NULL') && (count($result)>0)){
				$hayGrafico = 2;
			}
		}
	}
	
	//datos de relleno
	$paises = PaisesRetortaTodos();
	$tiposconsulta = EjecutaProcAlmSinParametro('AdmRetornaTipoConsultas');
	$viastransporte = EjecutaProcAlmSinParametro('ViasTransporteRetornaTodas');
	$aduanas = EjecutaProcAlmSinParametro('AduanasRetornaTodas');
	$pasos  = EjecutaProcAlmSinParametro('PasosFronterizosRetornaTodos');
	$anios = EjecutaProcAlmSinParametro('AdmRetornaAñosProcesados');
	$despachantes = EjecutaProcAlmSinParametro('DespachantesRetornaTodos');
	$estados = EjecutaProcAlmSinParametro('AdmRetornaTodosLosEstados');
	$grupos = EjecutaProcAlmSinParametro('GruposRetornaTodos');
	$subgrupos = EjecutaProcAlmSinParametro('SubGruposRetornaTodos');
	
	//datos de la pagina
	$_SESSION['ruta'] = "Consultas";
	$contenido = 'consultas.php';
	require('../view/layout.php');
}

?>