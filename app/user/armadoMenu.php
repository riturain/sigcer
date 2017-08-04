<?php

class menuItem{
	public $id = "NOMBRE_MENU";
	public $texto = "TEXTO_MENU";
	public $enlace = "ENLACE";
	public $icono = "chevron-right";
	public $compatibilidad = "0";
	public $subItems = array();
}

$itemInicio = null;
$itemPerfil = null;
$itemCerrar = null;
$itemsTemporal = array();
$itemsSimples = array();
$itemsCompuestos = array();
$menu_portal = $session->getValue('menu_portal');

foreach ($menu_portal as $item_menu_portal){
	$item = new menuItem(); 
	$item->id = $item_menu_portal['NOMBRE_MENU'];
	$item->texto = $item_menu_portal['TEXTO_MENU'];
	$item->compatibilidad = $item_menu_portal['COMPATIBILIDAD'];
	
	if($item->compatibilidad == "1"){
		$item->enlace = "compatibilidad?compatible=".$item_menu_portal['ENLACE'];
	}else{
		$item->enlace = $item_menu_portal['ENLACE'];
	}
	
	
	switch ($item_menu_portal['NOMBRE_MENU']) {
		case "PORTAL.INICIO":
			$item->icono = "home";
			$itemInicio = $item;
			break;
		case "PORTAL.MIPERFIL":
			$item->icono = "id-card";
			$itemPerfil = $item;
			break;
		case "PORTAL.MISDATOS":
			$item->icono = "user";
			$itemPerfil->subItems[$item_menu_portal['NOMBRE_MENU']] = $item;
			break;
		case "PORTAL.MICLAVE":
			$item->icono = "key";
			$itemPerfil->subItems[$item_menu_portal['NOMBRE_MENU']] = $item;
			break;
		case "PORTAL.MI_CV":
			$item->icono = "clipboard";
			$itemPerfil->subItems[$item_menu_portal['NOMBRE_MENU']] = $item;
			break;
		case "PORTAL.SESION":
			$item->icono = "unlock-alt";
			$itemCerrar = $item;
			break;
		default:
			if($item_menu_portal['NOMBRE_PADRE'] != ""){
				if( array_key_exists($item_menu_portal['NOMBRE_PADRE'], $itemsTemporal)){
					$itemsTemporal[$item_menu_portal['NOMBRE_PADRE']]->icono = "bars";
					$itemsTemporal[$item_menu_portal['NOMBRE_PADRE']]->subItems[$item_menu_portal['NOMBRE_MENU']]=$item;
				}
			}else{
				$itemsTemporal[$item_menu_portal['NOMBRE_MENU']]=$item;
			}
	}
}

foreach	($itemsTemporal as $item){
	if($item->icono == "bars"){
		$itemsCompuestos[$item->id] = $item;
	}else{
		$itemsSimples[$item->id] = $item;
	}
}

//harcodear --------------------------------------------------------------
$itemOrganismo = null;
$itemAyuda = null;

$itemOrganismo = new menuItem(); 
$itemOrganismo->id = "PORTAL.CAMBIARORGANISMO";
$itemOrganismo->texto = "Cambiar Organismo";
$itemOrganismo->compatibilidad = "0";
$itemOrganismo->enlace = "check_organismo";
$itemOrganismo->icono = "sitemap";

$itemAyuda = new menuItem(); 
$itemAyuda->id = "PORTAL.EJECUTARTOUR";
$itemAyuda->texto = "Mostrar Paseo Interactivo";
$itemAyuda->compatibilidad = "0";
$itemAyuda->enlace = "javascript:ejecutarPaseoInicial(true);";
$itemAyuda->icono = "question-circle";

$variables['itemOrganismo'] = $itemOrganismo;
$variables['itemAyuda'] = $itemAyuda;
//------------------------------------------------------------------------


$variables['itemsSimples'] = $itemsSimples;
$variables['itemsCompuestos'] = $itemsCompuestos;
$variables['itemInicio'] = $itemInicio;
$variables['itemPerfil'] = $itemPerfil;
$variables['itemCerrar'] = $itemCerrar;
?>