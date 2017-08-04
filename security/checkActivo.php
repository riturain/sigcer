<?php //verifica que tengas cargos activos , el IdLey devuelve la ley a la que pertence si esta activo
if((!$session->existe('id_ley')) || ($session->getValue('id_ley') == -1)){
	$session->setValue('amarillo','No tiene nigun cargo activo');
	header('Location: '.get_url('home'));
	die();
}
?>