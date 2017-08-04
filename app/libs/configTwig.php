<?php 
  function renderizar($view,$variable){
		require('twig/lib/Twig/Autoloader.php');
		
		Twig_Autoloader::register();
		$loader = new Twig_Loader_Filesystem('./view/');
		$twig = new Twig_Environment($loader, array('debug' => true));
		$twig->addExtension(new Twig_Extension_Debug());

		$template = $twig->loadTemplate( $view );
		$template->display($variable);
	}

	function imprimirPdf($pagina, $imprime, $datos) {
		require('pdf/dompdf_config.inc.php');
		require('twig/lib/Twig/Autoloader.php');
		Twig_Autoloader::register();
		$loader = new Twig_Loader_Filesystem('./view/');
		$twig = new Twig_Environment($loader, array());
		$dompdf = new DOMPDF();
		$dompdf->set_paper("A4", "portrait");
		$html = $twig->render($pagina, $datos);
		$dompdf->load_html($html);
		ini_set("memory_limit","1024M");
		$dompdf->render();
		$dompdf->stream($imprime);
	}
?>
