<?php //DEBUGGER
@session_start();
require("../model/modeloComun.php");
require("../classes/functions.php");



if (isset($_POST['accion'])){
	switch ($_POST['accion']){
		case 'inputVars':
			$_SESSION['debugger'] = array();
			$arr = explode("#",$_POST['cadena']);
			$i = 0;
			foreach($arr as $each){
				$arr2 = explode("**",$each);
				$_SESSION['debugger'][$i]['id'] = $arr2[0];
				$_SESSION['debugger'][$i]['value'] = $arr2[1];
				$_SESSION['debugger'][$i]['type'] = $arr2[2];
				$i++;
			}
			echo "1";
			break;
		case 'borrarDebug':
			$_SESSION['debugger'] = array();
			unset($_SESSION['debugger']);
			echo "1";
			break;
	}
}

?>