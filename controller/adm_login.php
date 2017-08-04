<?php //LOGIN CONTROLLER 
@session_start();
$_SESSION['archivo'] = 'adm_login';

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

if ((isset($_POST['accion'])) && ($_POST['accion'] == 'change_login')){
	require("../classes/sql2k.php");
	require("../model/login.php");
	@session_destroy();
	@session_start();	
	$_SESSION = array();
	$_SESSION['logueado'] = 1;
	switch ($_POST['tipo']){
		case'senasa': 
			//senasa
			$_SESSION['id_usuario'] = 5;
			$datos = usuariosInfoLog('jpablo');
			$_SESSION['verde'] = 'Logueado como usuario senasa';
			
			$_SESSION['perfil'] = $datos['IdPerfil']; 			
			$_SESSION['nyap'] = $datos['Usuario'];
			$_SESSION['tipo_usuario'] = $datos['Tipo'];  //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
			$_SESSION['UID'] = 0;	//CUIT
			$_SESSION['loginType'] = 'WEB';
			$_SESSION['tipo_acceso'] = $datos['TipoAcceso']; //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 0 - SOLO CONSULTA			
			break;
		case'empresa':
			//empresa
			$_SESSION['id_usuario'] = 23;
			$datos = usuariosInfoLog('jcordiviola');		
			$_SESSION['verde'] = 'Logueado como usuario de empresa';
			
			$_SESSION['perfil'] = $datos['IdPerfil']; 			
			$_SESSION['nyap'] = $datos['Usuario'];
			$_SESSION['tipo_usuario'] = $datos['Tipo'];  //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
			$_SESSION['UID'] = 0;	//CUIT
			$_SESSION['loginType'] = 'WEB';
			$_SESSION['tipo_acceso'] = $datos['TipoAcceso']; //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 0 - SOLO CONSULTA			
			break;
		case'inspector_planta': 
			//inspector planta
			$_SESSION['id_usuario'] = 33;
			$datos = usuariosInfoLog('marobba');
			$_SESSION['verde'] = 'Logueado como inspector de planta';
			
			$_SESSION['perfil'] = $datos['IdPerfil']; 			
			$_SESSION['nyap'] = $datos['Usuario'];
			$_SESSION['tipo_usuario'] = $datos['Tipo'];  //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
			$_SESSION['UID'] = 0;	//CUIT
			$_SESSION['loginType'] = 'WEB';
			$_SESSION['tipo_acceso'] = $datos['TipoAcceso']; //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 0 - SOLO CONSULTA			
			break;
		case'inspector_puerto': 
			//inspector puerto
			$_SESSION['id_usuario'] = 19;
			$datos = usuariosInfoLog('noreb');
			$_SESSION['verde'] = 'Logueado como inspector de puerto';
			
			$_SESSION['perfil'] = $datos['IdPerfil']; 			
			$_SESSION['nyap'] = $datos['Usuario'];
			$_SESSION['tipo_usuario'] = $datos['Tipo'];  //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
			$_SESSION['UID'] = 0;	//CUIT
			$_SESSION['loginType'] = 'WEB';
			$_SESSION['tipo_acceso'] = $datos['TipoAcceso']; //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 0 - SOLO CONSULTA			
			break;
		case'inspector_frontera': 
			//inspector frontera
			//$_SESSION['id_usuario'] = ;
			//$datos = usuariosInfoLog('');
			$_SESSION['amarillo'] = 'Falta definir login de inspector de frontera';
			break;		
	}
	//busca los menues para el usuario
	menuPorTipoDeAcceso();
	
}else{		

	//MUESTRO FORMULARIO 
	$_SESSION['ruta']= 'Login admin';	
	$contenido = 'adm_login.php';
	require('../view/layout.php');
	
}

?>