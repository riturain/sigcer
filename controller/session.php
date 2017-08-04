<?php @session_start(); ?>
<!DOCTYPE html>
<html lang='es-ES'>
<head>
	<meta charset="iso-8859-1" />
</head>
<body>
<pre>
<?php print_r($_SESSION); ?> 
<?php $_SESSION['debug'] = array(); ?> 
</pre>
	
</body>
</html>
