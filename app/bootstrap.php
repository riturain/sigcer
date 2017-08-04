<?php
//$_SESSION
//PARA USAR DENTRO DE UNA FUNCIÓN LLAMAR CON $GLOBALS
require("app/user/session.php");
$session = new Session();

global $session; // para que Twig pueda acceder a la session
$variables['session'] = $GLOBALS['session'];

//librería para detectar ip y navegador
require ("app/user/ip_manager.php");

//genera las url de la carpeta public: images, js, css, etc
require("app/url/url_generator.php");
$ver = rand(1,9999);

//chequea que sea navegador compatible HTML5
// (saca internet explorer viejo y firefox viejo)
require ("security/checkBrowser.php");

//DEFAULT TIME ZONE
date_default_timezone_set("America/Argentina/Buenos_Aires"); 

//URLS
// devuelve $_GET (ex: pagina/home?x=1&j='abc')
require("app/url/index_get.php");

// parsea la url y devuelve $seccion en forma de array
// $seccion[0] = nombre de sección
// $seccion[1] = nombre de sección interna (subsección)
// $seccion[..]
require("app/url/index_sections.php");


//para obligar a recachear los archivos
$variables['ver'] = rand(1,9999);
//path de la configuracion
$variables['base_path'] = $base_path;
if($session->existe('rutas')){
    $variables['menu'] = $session->getValue('rutas');
}else{
    $variables['menu'] = array();
}

/*
//traigo el menu seteado en la session
require('app/url/url_funciones.php');

//Guardamos url de acceso para generar redirecion
$paginasIgnoradasUrlReferer = paginasIgnoradasUrlReferer();
if (!in_array($_SERVER['REQUEST_URI'], $paginasIgnoradasUrlReferer)) {
    if (!isset($_SESSION['refererUrl'])) {
        $_SESSION['refererUrl'] = $_SERVER['REQUEST_URI'];
    }
}

if ((!$session->existe('apyn')) || ($session->getValue('apyn') == '')){
    $variables['usuario_top'] = strtolower($session->getValue('id_usuario'));
}else{
    $variables['usuario_top'] = strtolower($session->getValue('apyn'));
}
*/

$variables['isMobile'] = checkMobile();
$variables['id_usuario'] = $session->getValue('id_usuario');
//database
require ("app/database/sql2k.php");

//configuración de twig (renderizar)
require("app/libs/configTwig.php");

//FUNCION PROXIMAMENTE VA A VOLAR porque la usan los dos menú debería haberla puesto en otro archivo.
/**
 * getItemMenu
 *
 * Retorna el nombre del item del menú sólo con caracteres permitidos
 *
 * @param string $item Cadena con el nombre del menu que recupera de la BD
 * @return string $itm Retorna un string con caracteres permitidos (sin espacios/sin barras,)
 */
function getItemMenu($item)
{
    $item = strtolower($item);
    $item = str_replace("/", "-", $item);
    $item = str_replace(" ", "-", $item);
    return $item;
}

function changeLocation($location){
	if(isset($_POST['is_ajax']) || isset($_GET['is_ajax'])){
		echo("&forceredirect=".$location);
	}else{
		header("Location: ".$location);
		die();
	}
}

?>