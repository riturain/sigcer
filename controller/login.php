<?php //LOGIN CONTROLLER 
@session_start();
$_SESSION['archivo'] = 'login';
require("../classes/sql2k.php");
require("../model/login.php");

/*
DATOS DEL USUARIO LOGUEADO
==========================
* 	$_SESSION['logueado']			// si está logueado
*	$_SESSION['id_usuario']			// id del usuario (5, 7 .... )
*	$_SESSION['perfil']				// 1, 
*	$_SESSION['nyap']				// Juan Pablo Bonicalzi
*	$_SESSION['tipo_usuario']		// EMPRESA, DESPACHANTE, ADMINISTRADOR
*	$_SESSION['UID']				// CUIT
*	$_SESSION['loginType'] 			// ('AFIP' | 'JOSSO' | 'WEB*') (*)solo prueba

*   $_SESSION['tipo_acceso']		
*	1 - ADMINISTRADOR 
	2 - EMPRESA 
	3 - INSPECTOR PUERTO 
	4 - INSPECTOR DE PLANTA 
	5 - CERTIFICADOS 
	0 - SOLO CONSULTA
*/

# SI NO ESTABA LOGUEADO E INTENTÓ HACERLO
//if (!isset($_SESSION['logueado']) || isset($_POST['login'])){
if ((!isset($_SESSION['logueado'])) || ($_SESSION['logueado'] == 0)){
	//if (isset($_POST['login'])){
		//$_SESSION['logueado'] = 0;
		//valida login

		//if valida ok 
			$_SESSION['logueado'] = 1;
			
			//senasa
				$_SESSION['id_usuario'] = 5;
				$datos = usuariosInfoLog('jpablo');
			//empresa
				//$_SESSION['id_usuario'] = 23;
				//$datos = usuariosInfoLog('jcordiviola');
			//inspector planta
				//$_SESSION['id_usuario'] = 33;
				//$datos = usuariosInfoLog('marobba');
					//$_SESSION['id_usuario'] = 18;
					//$datos = usuariosInfoLog('CLYA'); //tipo_acceso = 0
			//inspector puerto
				//$_SESSION['id_usuario'] = 19;
				//$datos = usuariosInfoLog('noreb');
			//inspector frontera
				//$_SESSION['id_usuario'] = ;
				//$datos = usuariosInfoLog('');
		
		/**/$_SESSION['perfil'] = $datos['IdPerfil']; 
		/**/$_SESSION['nyap'] = $datos['Usuario'];
		/**/$_SESSION['tipo_usuario'] = $datos['Tipo'];  //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
			$_SESSION['UID'] = 0;	//CUIT
			$_SESSION['loginType'] = 'WEB';
			$_SESSION['tipo_acceso'] = $datos['TipoAcceso']; //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 6 INSPECTOR DE FRONTERA | 7 VETERINARIO DE CAMPO | 0 - SOLO CONSULTA			
		
	//}else{
	//	$_SESSION['logueado'] = 0;
	//}
}
# YA ESTABA LOGUEADO
if ($_SESSION['logueado'] == 1){	
	header('Location: home.php');
}else{
	//MUESTRO FORMULARIO DE LOGIN
	$_SESSION['ruta']= 'Autenticación de Usuarios';
	$contenido = 'login.php';
	require('../view/layout.php');
}
?>