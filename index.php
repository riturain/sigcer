<?php
require('app/config.php');

if ($ambiente == 'DESA'){
	error_reporting(E_ALL);
	ini_set('display_errors','On');
}

require('app/bootstrap.php');

// SEGURIDAD:
if (!isset($seccion[0])){
	header('Location: '.get_url('error/404'));
	die();
}else{
	//si no son los public (assets) (css,js,..)..
	//error_log("section ".$seccion[0]." - ".$session->getValue('id_usuario'), 0);
	if (($seccion[0] != 'favicon.ico') && ($seccion[0] != 'public')){
		if ($session->existe('id_usuario')){
			//log_url($session->getValue('id_usuario'), $session->getValue('id_persona'), $session->getValue('id_organismo'), $seccion[0]);
			switch($session->getValue('tipo_acceso')){
				/*	
				$_SESSION['tipo_acceso']		
					1 - ADMINISTRADOR 
					2 - EMPRESA 
					3 - INSPECTOR PUERTO 
					4 - INSPECTOR DE PLANTA 
					5 - CERTIFICADOS 
					0 - SOLO CONSULTA
				*/
				case 1://admin
					include("routes/administrador.php");
					break;
				case 2://empresa
					include("routes/empresa.php");
					break;
				case 3://puerto
					include("routes/puerto.php");
					break;
				case 4://planta
					include("routes/planta.php");
					break;
				case 5://certificado
					include("routes/certificado.php");
					break;
				default:
					$session->destroy();
					echo "Error : perfil inexistente";
					break;
			}
		}else{
			//no logueado
			include('routes/visitante.php');
		}
	}		
}
?>