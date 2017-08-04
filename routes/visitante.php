<?php //RUTAS PARA EL USUARIO NO LOGUEADO

switch($seccion[0]){
    case 'auto_login': 
        include('controller/user/auto_login.php'); break;
	case 'inicio': 
		include('controller/template.php');
		break;
	case 'session':	
		include('controller/session.php'); 
		break;
	case 'template':	
		include('controller/template.php'); 
		break;
	default:
		header('Location: '.get_url('inicio'));
		die(); 
		break;
}
?>