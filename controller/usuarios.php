<?php //USUARIOS CONTROLLER 
@session_start();
$_SESSION['archivo'] = "usuarios";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/usuarios.php");

if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		
		case 'guardarUsuario': // Guardar Usuario				
				require("../classes/validador.php");
				$ret = esCuit($_POST['cuit']);
				if ($ret){
					$idUsuario = usuariosRegistraDatos($_POST['id_usuario'],$_POST['usuario'],$_POST['correo'],$_POST['nyap'],$_POST['perfil'],$_POST['iniciales'],$_POST['cuit']);
					if ($idUsuario == 0){
						//el usuario ya existe
						$_SESSION['rojo'] = 'El usuario: '.$_POST['usuario'].' ya existe';
					}else{
						if ($idUsuario < 0){
							$_SESSION['rojo'] = 'El cuit ingresado pertenece a otro usuario';
						}else{
							//VALIDAR LISTAS
							
							usuariosYEmpresasExportadorasRegistraDatos($idUsuario, $_POST['listadoEmpreAsociadas']);
							usuariosYPlantasRegistraDatos($idUsuario, $_POST['listadoPlantaAsociadas']);
							usuariosYRelacionesRegistraDatos($idUsuario, $_POST['listadoUserAsociadas']);
							
							$_SESSION['verde'] = 'Se ha guardado el usuario: '.$_POST['usuario'];							
						}
					}
				}else{				
					$_SESSION['rojo'] = 'El CUIT '.$_POST['cuit'].' NO ES VÁLIDO';
				}
				$_SESSION['traerIdUsuario'] = $_POST['id_usuario'];
				header('Location: usuarios.php');
				return false;
				break;
		
		case 'buscarUsuarios':
			$usuarios = usuariosRetornaTodos($_POST['term']);
			echo (json_encode(utf8_encode_all($usuarios)));
			break;
		
		case 'traerUsuario':
			$datos = usuariosRetornaInfo($_POST['id']);
			echo (json_encode(utf8_encode_all($datos)));
			break;
		
		case 'traerEmpresas': 
			$empresas = usuariosRetornaEmpresasAsociadas($_POST['id_usuario']);
			echo (json_encode(utf8_encode_all($empresas)));
			break;
		
		case 'traerPlantas':
			$plantas = usuariosRetornaPlantasAsociadas($_POST['id_usuario']);
			echo (json_encode(utf8_encode_all($plantas)));
			break;
			
		case 'traerVinculos':
			$vinculos = usuariosRetornaVinculos($_POST['id_usuario']);
			echo (json_encode(utf8_encode_all($vinculos)));
			break;
		
		case 'autocompletarEmpresas': //MODELO EMPRESAS
			require("../model/empresas.php");
			$empreAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'EMPRESA');
			echo (json_encode(utf8_encode_all($empreAuto)));
			break;
		
		case 'autocompletarPlantas': //MODELO EMPRESAS
			require("../model/empresas.php");
			$plantasAuto = empresasRetornaDatosSegunUsuario($_SESSION['id_usuario'], $_POST['term'], 'PLANTA');
			echo (json_encode(utf8_encode_all($plantasAuto)));
			break;
	}
}else{
	
	if (isset($_SESSION['traerIdUsuario'])){
		$usuarioGuardado = $_SESSION['traerIdUsuario'];
		unset($_SESSION['traerIdUsuario']);
	}
	
	//datos de relleno
	$perfiles = perfilesRetornaTodos();
	
	//datos de la página
	$_SESSION['ruta'] = "Usuarios";
	$contenido = 'usuarios.php';
	require('../view/layout.php');
}
?>