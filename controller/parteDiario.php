<?php //parteDiaro CONTROLLER
@session_start();
$_SESSION['archivo'] = "parteDiario";
require("../classes/sql2k.php");
require("../model/modeloComun.php");
require("../security/checkUser.php");
require("../classes/functions.php");
require("../model/parteDiario.php");

if (isset($_POST['accion'])){	
	switch ($_POST['accion']){
		case 'imprimir':
			//begin validación 
			require("../classes/validador.php");			
			$desde = $_POST['desde'];
			$hasta = $_POST['hasta'];
			$quebusca = $_POST['quebusca'];			
			$ok = false;
			if (validarFechaEntre($desde, $desde, $hasta)){
				$ok = true;
			}			
			if ($ok){
				$inspector = intval($_POST['inspector']);
				if ($inspector == 0){
					$ok = false;
				}
			}
			$tipo = intval($_POST['tipo']);//todas = 1, no_firmadas = 0
			//end validación
			
			if ($ok){
				$_SESSION['imp']['a'] = $desde;
				$_SESSION['imp']['b'] = $hasta;
				$_SESSION['imp']['c'] = $inspector;
				$_SESSION['imp']['d'] = $tipo;
				$_SESSION['imp']['e'] = $quebusca;
				echo "1";
			}else{
				echo "0";
			}			
			break;
		case 'buscarInspecciones':
			//begin validación 
			require("../classes/validador.php");			
			$desde = $_POST['desde'];
			$hasta = $_POST['hasta'];			
			$ok = false;
			if (validarFechaEntre($desde, $desde, $hasta)){
				$ok = true;
			}			
			if ($ok){
				$inspector = intval($_POST['inspector']);				
			}
			$tipo = intval($_POST['tipo']);//todas = 1, no_firmadas = 0
			//end validación
			
			if ($ok){
				$quebusca = $_POST['quebusca'];
				$inspecciones = buscarInspeccionesParteDiario($desde,$hasta,$inspector,$tipo,$quebusca);
				echo(json_encode(utf8_encode_all($inspecciones)));				
			}else{
				echo "0";
			}			
			break;
		default:
			$_SESSION['amarillo'] = 'No hay una opción para eso';
			header('Location: parteDiario.php');
			break;
	}
}else{
	if (isset($_SESSION['imp'])){
		$desde = $_SESSION['imp']['a'];
		$hasta = $_SESSION['imp']['b'];
		$inspector = $_SESSION['imp']['c'];
		$tipo = $_SESSION['imp']['d'];
		$quebusca = $_SESSION['imp']['e'];
		unset($_SESSION['imp']);
		imprimir($desde,$hasta, $inspector,$tipo,$quebusca);		
	}
	
	if ($_SESSION['tipo_acceso'] == 1){
		require("../model/inspectores.php");
		$inspectores = inspectoresRetornaTodos();		
	}
	
	$_SESSION['ruta'] = "Parte Diario";
	$contenido = 'parteDiario.php';
	require('../view/layout.php');
}
?>