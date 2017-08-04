<?php //AUTOLOGIN CONTROLLER 
$session->destroy();
require('model/login.php');
$datos = usuariosInfoLog('jpablo');

$session->setValue('id_usuario',5);
$session->setValue('verde','Logueado como usuario senasa');
$session->setValue('perfil',$datos['IdPerfil']);
$session->setValue('nyap',$datos['Usuario']);
$session->setValue('tipo_usuario',$datos['Tipo']); //( "EMPRESA" | "DESPACHANTE" | "ADMINISTRADOR" )	
$session->setValue('UID',0);
$session->setValue('loginType','WEB');
$session->setValue('tipo_acceso',$datos['TipoAcceso']); //1 - ADMINISTRADOR | 2 - EMPRESA | 3 - INSPECTOR PUERTO | 4 - INSPECTOR DE PLANTA | 5 - CERTIFICADOS | 0 - SOLO CONSULTA
    
$session->setValue('ruta','auto_login');
menuPorTipoDeAcceso();

header('Location: '.get_url('template'));
die();


//$variables['titulo'] = 'Auto login';
//renderizar('template.php',$variables);
?>