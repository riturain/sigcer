<?php //ERRORES ?>
<?php @session_start(); ?>
<!DOCTYPE HTML>
<html lang="es-ES">
<head>
	<title><?php echo (isset($_SESSION['ruta']))? "Senasa | ".$_SESSION['ruta']: "Senasa"; ?></title>
	<meta charset="iso-8859-1"/>
	<link rel="stylesheet" href="../css/estilo.css"/>	
	<link rel="stylesheet" type="text/css" href="../css/reset.css"/>
	<link rel="stylesheet" type="text/css" href="../css/text.css"/>
	<link rel="stylesheet" type="text/css" href="../js/jquery-ui/jquery-ui-1.10.3.custom.min.css"/>	
</head>
<body>
	<div id="wrapper">
		<div id="header">
			<a href="../index.php"><div id="header_left"></div></a>
			
			<div id="header_right">
				<div id="header_line"></div>
				<div id="header_text">
					
					<h1><?php echo "SIGCER LÁCTEOS - SENASA"; ?></h1>
					<h2>Servicio Nacional de Sanidad y Calidad Agroalimentaria</h2>
				</div>				
			</div>
		</div>
		<div id="main">
		
		<?php
		echo "<div id='aviso'>";
		if (isset($_SESSION['rojo'])){ //MENSAJE DE ERROR
			echo "<div class='rojo' align='left'>".$_SESSION['rojo']."</div>";
			unset($_SESSION['rojo']);
		}else{
			echo "<div class='rojo' align='left'>Ha ocurrido un error al autenticar el usuario.</div>";
		}
		echo "</div>";
		?>

		</div>
		<div id="footer">
			<p>Servicio Nacional de Sanidad y Calidad Agroalimentaria - Dirección de Tecnología de la Información</p>
			<p>Av. Paseo Colón 367 - Piso 11 - Capital Federal - C1063ACD - Buenos Aires, Argentina </p>
		</div>		
	</div>	
</body>
</html>