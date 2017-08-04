<?php //RUTAS PARA EL USUARIO ADMINISTRADOR
switch($seccion[0]){        
    case '':
    case 'auto_login': 
        include('controller/user/auto_login.php'); break;
	case 'home': 
        include('controller/home.php'); break;
	case 'session':	
		include('controller/session.php'); 	break;
	case 'template':	
		include('controller/template.php'); break;
    case 'mis_tramites':
        include('controller/tramites_de_exportacion.php'); break;
	default: 
		error_log('Entra a default: '.$seccion[0].' - usuario:'.$session->getValue('id_usuario'),0);
		header('Location '.get_url('error/404')); 
		die();
		break;
}
?>