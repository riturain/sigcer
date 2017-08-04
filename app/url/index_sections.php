<?php // SECCION
//$base_path = ''; //WEB NAME o nombre del directorio de la web
$path = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$path = substr($path, strlen($base_path)+1);
$path = trim($path,'/');

//unset($base_path);
$urls = explode('/',$path);
unset($path);

$seccion = array();
foreach($urls as $each){
	if (($each != '') && ($each != 'index.php')){
		$seccion[] = $each;
	}else{
		$seccion[] = '';
	}
}

unset($urls);
?>