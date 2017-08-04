<?php //MODULO DE CERRAR SESION
	@session_start();
	
	if (isset($_SESSION['loginType'])){
		switch ($_SESSION['loginType']){
			case 'JOSSO':
				require("../classes/josso-php-inc/josso.php");
				@session_destroy();
				@session_start();	
				$_SESSION = array();
				jossoRequestLogoutForUrl("");				
				break;
			case 'AFIP':
				@session_destroy();
				@session_start();	
				$_SESSION = array();
				header('Location: http://www.afip.gov.ar');
				break;
			case 'WEB':
				@session_destroy();
				@session_start();	
				$_SESSION = array();
				$_SESSION['rojo'] = "Se cerró la sesión";
				header('Location: error.php');
		}
	}else{
		@session_destroy();
		@session_start();	
		$_SESSION = array();
		$_SESSION['rojo'] = "No está logueado";
		header('Location: error.php');
		exit();
	}
?>