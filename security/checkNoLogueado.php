<?php
//si est� logueado te manda a home
if($session->existe('id_usuario')){
	header('Location: '.get_url('home'));
	die();
}
?>