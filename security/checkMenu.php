<?php
function puedeAcceder(){
	$uri = explode("/", $_SERVER['REQUEST_URI']);
	$pag = explode("?",$uri[2]);

	foreach($GLOBALS['session']->getValue('menu_portal') as $each){		
		if (strpos($each['ENLACE'], $pag[0]) !== false){

			return true;		
		}
	}
	return false;
}

if (($session->getValue('id_usuario') != 28509842) && ($session->getValue('id_usuario') != 23215769)){		
	if(!puedeAcceder()){		
		$session->setValue('rojo','No tenés permisos para acceder a la página que solicitaste');
		header('Location: '.get_url('home'));
		die();
	}
}



?>