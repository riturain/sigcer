<?php
@session_start();
require("../security/checkBrowser.php");
// login JOSSO
//verificar si no está logueado ya
if ((isset($_SESSION['logueado'])) && ($_SESSION['logueado'] == 1)){
	header('Location: home.php');
	return false;
}

#JOSSO trae :
#	- los datos del usuario,
# 	- los datos de los roles que tiene 

    // librería de josso
	require("../classes/josso-php-inc/josso.php");
	
    // Luego de esto, ya estás conectado, solo resta obtener los datos del usuario
    // Login del usuario:
    $user = $josso_agent->getUserInSession();	
	
    if (isset($user)){
		// Nombre completo del usuario
		//$nombre = $user->getProperty('user.description');
		
		// Login del usuario:
		$usuario_josso = $user->getName();
		
		// Roles a los que pertenece
		if ($josso_agent->isUserInRole('SISTEMA_SIGCER_LACTEOS') == false){
		//NO TIENE PERMISOS
			$_SESSION['rojo'] = "No tiene permisos, usuario ".$usuario_josso;
			header('Location: error.php');
			return false;
		}else{
		//PUEDE ENTRAR
		//SE SETEAN LAS VARIABLES DE USUARIO
			require("../classes/sql2k.php");
			require("../model/login.php");
		
			$datos = usuariosInfoLog($usuario_josso);
			if (isset($datos['Idusuario'])){
				$_SESSION['logueado'] = 1;
				$_SESSION['id_usuario'] = $datos['Idusuario'];//5; //USUARIO DE PRUEBA - JUAN P BONICALZI
				$_SESSION['perfil'] = $datos['IdPerfil']; 
				$_SESSION['nyap'] = $datos['Usuario'];
				$_SESSION['tipo_usuario'] = $datos['Tipo'];  //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
				$_SESSION['UID'] = $datos['CUIT'];
				$_SESSION['loginType'] = 'JOSSO';
				$_SESSION['tipo_acceso'] = $datos['TipoAcceso']; //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 0 - SOLO CONSULTA
				menuPorTipoDeAcceso();
				header('Location: home.php');
			}else{
				$_SESSION['rojo'] = "No encuentra usuario SIGCER: ".$usuario_josso;
				header('Location: error.php');
				return false;
			}		
			return false;
		}
    } else {		
		jossoRequestLogin();
    }
?>
