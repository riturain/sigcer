<?php
	if ($GLOBALS['session']->existe('rojo')){ //ex msg		
		$variable['msg_texto'] = $GLOBALS['session']->flash('rojo');
		$variable['msg_tipo'] = "error";	
	}	
	if ($GLOBALS['session']->existe('verde')){ //ex msg		
		$variable['msg_texto'] = $GLOBALS['session']->flash('verde');
		$variable['msg_tipo'] = "done";	
		
	}
	if ($GLOBALS['session']->existe('amarillo')){ //ex msg		
		$variable['msg_texto'] = $GLOBALS['session']->flash('amarillo');
		$variable['msg_tipo'] = "warning";	
			
	}
	if ($GLOBALS['session']->existe('celeste')){ //ex msg		
		$variable['msg_texto'] = $GLOBALS['session']->flash('celeste');
		$variable['msg_tipo'] = "info";			
		
	}
?>