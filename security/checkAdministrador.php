<?php
if((!($session->getValue('id_usuario') === '28509842' )) 	//LEANDRO
	&& (!($session->getValue('id_usuario') === '23215769' )) //RODRIGO
	){
	
	$session->setValue('rojo',"No sos administrador");
	header('Location: '.get_url('home'));
	die();
}
?>