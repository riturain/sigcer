<?php // PARAMETROS GET
	$params = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
	$_GET = array(); // es necesario borrar el $_GET?
	if ($params != ""){
		$gets = explode('&',$params);
		foreach($gets as $each){
			$aux = explode('=',$each);
			if (count($aux) == 2){
				$_GET[$aux[0]] = $aux[1];
			}
		}
		unset($gets);
	}
	unset($params);	
	
	//echo "<pre>";
	//print_r($_GET);
	//echo "</pre>";
	//return false;
?>