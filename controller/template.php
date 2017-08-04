<?php //TEMPLATE CONTROLLER 
$session->setValue('ruta','template');

$variables['titulo'] = 'Título del template';
renderizar('template.php',$variables);
?>