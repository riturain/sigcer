<?php //TRÁMITES DE EXPORTACIÓN CONTROLLER 

$session->setValue('archivo','tramites_de_exportacion');
require('model/modeloComun.php');
//require('security/checkUser.php');
require('model/tramites_de_exportacion.php');

if (isset($_POST['accion'])){
	switch($_POST['accion']){
		case 'numerarAuto':
			tramitesExportacionNumeraAutomatico();
			echo "1";
			break;		
		case 'traerListadoTramites':
			require("../classes/validador.php");
			if (	validarNumeroEntre($_POST['month'], 1, 12) 
				&&	validarSoloNumeros($_POST['id_circuito'])
				&&  validarNumeroEntre($_POST['year'], 2005, 2030)
				&&  validarCaracteresEntre(utf8_decode($_POST['tramite']), 1, 200)
				){
				$ret = tramitesExportacionRetornaListadoTramites($_POST['id_circuito'], utf8_decode($_POST['tramite']),$_POST['year'],$_POST['month']);
				echo (json_encode(utf8_encode_all($ret)));
			}else{
				$session->setValue('rojo','Violación de entrada de datos');
				echo '-1';
			}
			break;
		case 'cargarTramite':
			$ret = tramitesExportacionRetornaDetalle($_POST['idT'],utf8_decode($_POST['tipo']));
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'cambiarEstado':			
			if (($session->getValue('tipo_acceso') == 1) || ($session->getValue('tipo_acceso') == 4) || ($session->getValue('tipo_acceso') == 3)){
				$ret = admPasaDeCircuito(utf8_decode($_POST['circuito_actual']), $_POST['id_tramite'], utf8_decode($_POST['tipo']), utf8_decode($_POST['motivo_rechazo']),$_POST['opcionalInspector']);
				$session->setValue('verde','Se actualizó el circuito del trámite');
				echo "1";
			}else{
				echo "0";
			}
			break;
		case 'traerDocumentacionCertificado':
			$ret = certificadosRetornaDocumentacion($_POST['id_tramite']);
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'guardarDocumentos':
			if ($session->getValue('tipo_acceso') == 1){				
				$ret = certificadosRegistraDocumentacion($_POST['id_tramite'], $_POST['idsDocs']);
				if ($ret == 1){
					$session->setValue('verde','Se actualizó el circuito del trámite');
				}
				echo $ret;				
			}else{
				echo "0";
			}
			break;
		case 'visualizarTramite':
			//$_POST['id_tramite']			
			$tipo = utf8_decode($_POST['tipo']);
			switch ($tipo){
				case 'SOLICITUD DE EXPORTACIÓN':
					//Autorizaciones
					$session->setValue('recargaAut',$_POST['id_tramite']); 
					echo "lacteos-autorizaciones.php";
					break;
				case 'MUESTRAS SIN VALOR COMERCIAL':
					//Muestras
					$session->setValue('recargaAut',$_POST['id_tramite']);
					echo "lacteos-muestras.php";
					break;
				case 'INSPECCIONES DE PLANTA':
					//Inspecciones Planta
					$session->setValue('idAut',autorizacionesLacteosRetornaIdAsociado($_POST['id_tramite'], 'INSPECCIONESPLANTA'));
					$session->setValue('idInsp',$_POST['id_tramite']);
					echo "inspeccionPlanta.php";
					break;
				case 'INSPECCIONES DE PUERTO':
					//Inspecciones Puerto
					$session->setValue('idAut',autorizacionesLacteosRetornaIdAsociado($_POST['id_tramite'], 'INSPECCIONESPUERTO'));
					$session->setValue('idInsp',$_POST['id_tramite']);
					$session->setValue('tipoInsp',"PUERTO");
					$session->setValue('inspeccion_estado',"viendo");
					echo "inspeccionPuerto.php";
					break;
				case 'CERTIFICADOS SANITARIOS':
					//Certificados
					$session->setValue('idAut',autorizacionesLacteosRetornaIdAsociado($_POST['id_tramite'], 'CERTIFICADOS'));
					$session->setValue('idCert',$_POST['id_tramite']);
					echo "lacteos-certificados.php";
					break;
			}
			break;
		case 'traerPorCodigoBarras':
			$ret = admTraerTramitePorCodigoDeBarras($_POST['codeBar'],$session->getValue('id_usuario'));
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'buscarTramites':
			$ret = buscarTramitesPorTerm($_POST['param'],$session->getValue('id_usuario'));
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'traerInspectores':
			require("../model/inspectores.php");
			$ret = inspectoresRetornaTodos();
			echo (json_encode(utf8_encode_all($ret)));
			break;
		case 'estaVerificada':
			$ret = estaVerificada($_POST['id_tramite'], utf8_decode($_POST['tipo']));
			echo $ret;
			break;
		case 'recargaTree':
            $session->setValue('tramites',array('month' => $_POST['month'], 'year' => $_POST['year']));
			echo 1;
			break;
	}
}else{

	//numerar Automático
	tramitesExportacionNumeraAutomatico();

	
	if ($session->existe('tramites')){
		$variables['year'] = $session->getValue('tramites')['year'];
		$variables['month'] = $session->getValue('tramites')['month'];
		$session->delete('tramites');
	}else{
		$variables['year'] = date('Y', strtotime('-0 year'));
		$variables['month'] = date('m', strtotime('-0 month'));		
	}
	
	//datos de relleno
	$variables['tree'] = tramitesExportacionRetornaTree($session->getValue('id_usuario'),$variables['year'],$variables['month']);	
	
	$variables['years'] = admRetornaAniosProcesados();
	
    
	//datos de la página
	$session->setValue('ruta','Trámites de Exportación');
    $variables['titulo'] = 'Mis Trámites';
	renderizar('mis_tramites.php',$variables);
}
?>