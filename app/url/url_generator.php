<?php
	//para los assets, js, css, images, fonts
	function get_public_url($file){
		$folders = '';
		foreach($GLOBALS['seccion'] as $each){
			if ($folders != ''){
				$folders .= '../';				
			}else{
				$folders = '/';
			}
		}
		$file = trim($file,'/');

		if (strpos($file,'public') === false){
			$file = 'public/'.$file;
		}

		$site = ($GLOBALS['base_path'] == '')? '' : $GLOBALS['base_path'].'/';

		echo $folders.$site.$file;
	}

	//para todas las url comunes, por las subcarpetas
	function get_url($location){
		$location = trim($location,'/');
		$site = ($GLOBALS['base_path'] == '')? '' : '/'.$GLOBALS['base_path'];
		
		return 'http://'.$_SERVER['HTTP_HOST'].$site.'/'.$location;		
	}


?>