<?php //RUTAS PARA EL USUARIO INSPECTOR DE PLANTA
switch($seccion[0]){
	case 'home': include('controller/home.php'); break;
	default: 
		error_log('Entra a default: '.$seccion[0].' - usuario:'.$session->getValue('id_usuario'),0);
		header('Location '.get_url('error/404')); 
		die();
		break;
}
?>
