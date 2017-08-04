<?php //RUTAS DE ERROR 

if (!isset($seccion[1])){
	header('Location: '.get_url('error/404'));
	die();
}
switch($seccion[1]){
	case '000':	include('view/error/000.php'); break;
	case '400':	include('view/error/400.php'); break;
	case '401':	include('view/error/401.php'); break;
	case '403':	include('view/error/403.php'); break;
	case '404':	include('view/error/404.php'); break;
	case '500':	include('view/error/500.php'); break;
}
?>
