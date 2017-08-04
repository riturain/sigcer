//FUNCIONES E INICIALIZACIONES GENERALES 

/**
*			
*	function alerta(msg,color)					<- Mensaje de alerta, se le puede enviar tanto mensaje como constante, y colores (red, green, yellow)
	
*	function loading() 							<- Abre el loading
*	function cerrarLoading() 					<- Cierra el loading		

*	function limpiarFormulario(idFormulario) 	<- Limpia el formulario enviado por parámetro 

*	function msgBox(title, icon, content, type, confirm_action, cancel_action) muestra un modal informativo dinámico. Ejemplo en /template

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuración de DataTable
//////////////////////////////////////////////////////////////////////////////////////////////////////
var dataTableOptions =	{		
							"responsive": true,
							"sPaginationType": "full_numbers",
							"iDisplayLength": 10,
							"bRetrieve": true,
							"bProcessing": true,
							"bDestroy": true,
							"bLengthChange": false,
							"bFilter": true,
							"bPaginate": true,
							"bInfo":false,
							"bAutoWidth": false,
							"oLanguage": {
											"sZeroRecords": "No se encuentran registros.",
											"sInfo": "Resultados del _START_ al _END_, de un total de _TOTAL_",
											"sInfoEmpty": "Mostrando 0 registros",
											"sInfoFiltered": "(Filtrado de _MAX_ registros)",
											"sSearch": "",
											"oPaginate": {
															"sFirst":    "<i class='material-icons'>&#xE020;</i>",
															"sLast":     "<i class='material-icons'>&#xE01F;</i>",
															"sNext":     "<i class='material-icons'>&#xE044;</i>",
															"sPrevious": "<i class='material-icons'>&#xE045;</i>"
											}
							}
						};


var datepicker_format = 'dd-mm-yyyy';
var datepicker_min = undefined;
var datepicker_max = undefined;
var datepicker_disable = undefined;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuración del Tour
//////////////////////////////////////////////////////////////////////////////////////////////////////
var tour;
var steps = [];
var tourInterval;
var latestTopScroll = 0;
var deltaTopScroll = 5;
var headerHeight = 50;
var currentZoom = 1;

 $(document).ready(function(){
 	//////////////////////////////////////////////////////////////////////////////////////////////////////
	// Importado de funciones
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	
	cerrarLoading();

	$(document).ajaxSend(function(event, xhr, options){
		if (options.data == undefined){
			options.data = 'is_ajax=1';
		}else{
			options.data += (options.data.length > 0 ? "&" : "") + 'is_ajax=1';			
		}
		if(options.url.toLowerCase().indexOf("ignoreloading=true") < 0 && options.data != undefined && options.data.toLowerCase().indexOf("ignoreloading=true") < 0){
			loading();
		}
	}).ajaxComplete(function(event, xhr, options){
		if(xhr.responseText.toLowerCase().indexOf("&forceredirect=") >= 0){
			window.location.replace(xhr.responseText.split('&forceredirect=')[1]+"?redirect=1");
		}
		if(options.url.toLowerCase().indexOf("ignoreloading=true") < 0 && options.data != undefined && options.data.toLowerCase().indexOf("ignoreloading=true") < 0){
			cerrarLoading();
		}		
	});

    //////////////////////////////////////////////////////////////////////////////////////////////////////
	//VOLVER ARRIBA 
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	$(window).scroll(function(){
		if(checkMobile() == true){
			if ($('.top-mobile-bar').hasClass("top-mobile-bar-hidden")  == true && ($(this).scrollTop() <= headerHeight || ($(this).scrollTop() > headerHeight - $('.top-mobile-bar').height() && latestTopScroll > $(this).scrollTop() + deltaTopScroll))){
				$('.top-mobile-bar').removeClass("top-mobile-bar-hidden");
			}else if($('.top-mobile-bar').hasClass("top-mobile-bar-hidden") == false && (latestTopScroll < $(this).scrollTop() - deltaTopScroll)){
				$('.top-mobile-bar').addClass("top-mobile-bar-hidden");
			}
			latestTopScroll = $(this).scrollTop();
		}else{
			if ($(this).scrollTop() > $("#header").height() + deltaTopScroll){
				$('.volverarriba').css('opacity', '0.3');
			}else{
				$('.volverarriba').css('opacity', '0');
			}
		}
	});
	
	$(document).on("click",".volverarriba",function(e){
		$("html, body").stop().animate({ scrollTop: 0 }, "slow");
	});

	$(document).on("click","#home-shortcut",function(e){
		window.location.href = "home";
	});
		
	$(".collapsible-header a").click(function (event) {
		return false;
    });
	
	var menu = JSON.parse(sessionStorage.getItem('menu'));
    if (menu != null) {
        $('#' + menu.itemSeleccionado).children('a').addClass('itemSelected').css('color', '#9aca3c');
        $('#' + menu.itemSeleccionado + ' ul').css('display', 'block');
        $('#' + menu.subitemSeleccionado).children('a').addClass('itemSelected');
    }

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//INICIALIZACION COLAPSABLE
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $('.button-collapse').sideNav({
      menuWidth: $(".side-nav").width(), // Default is 240
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
	
	$("#search-menu").click(function(){
		$("#search-menu-input").focus();
		return false;
	});
	$("#search-menu-input").keyup(function(e){
		if (e.keyCode == 13){
			entrarMenu();
		}else{
			filtrarMenu();
		}
	});
	$("#boton-menu li a").click(function(){
		$("#search-menu-input").val("");
		filtrarMenu();
	});
	
	$("#slide-out li ul li .collapsible-header").click(function(){
		var clicked = $(this);
		$("#slide-out li ul li .collapsible-header").each(function( index ) {
			if($(this)[0] != clicked[0]){
				$(this).removeClass("active");
			}
		});
		$("#slide-out li .collapsible").each(function( index ) {
			if ($(this).has(clicked).length <= 0) {
				$(this).collapsible({accordion: true});
				$(this).collapsible({accordion: false});
			}
		});
	});

	//
	$(document).on('click', '#toast-container .toast .row .s8 i', function() {
		$(this).parent().parent().parent().fadeOut(function(){
			$(this).remove();
		});
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//INICIALIZACION MODAL y DATATABLE
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.modal').modal({closeOnClick: true});
	
	initializeDataTable();
	
	iniciarMaterialize();
	
	$('ul li img[src*="fa fa-"]').each(function(index) {
		reemplazarImagenIcono($(this));
	});
	
	//cerrarLoading();
	//Levanta mensajes de alerta
	mensajeCarga = $('#mensajeCarga');
	if(mensajeCarga.text() != "" ){
		tipo = $('#mensajeCarga').attr('name');
		mensaje = mensajeCarga.text();
		alerta(mensaje,tipo);
	}
	
	document.addEventListener('keyup', keyboardshortcut, false);
});

if(inIframe()){
	window.top.location.href = window.location.href;
}

function initializeDataTable(){
	if ($(".datatable").length > 0){
		$(".datatable").dataTable(dataTableOptions);
	}

	$(".dataTables_filter label input").keyup(function(){
		if($("#"+$(this).attr("aria-controls")+" tbody tr td").hasClass("dataTables_empty")){
			$("#"+$(this).attr("aria-controls")+" thead").hide();
			$("#"+$(this).attr("aria-controls")+"_paginate").hide();
		}else{
			$("#"+$(this).attr("aria-controls")+" thead").show();
			$("#"+$(this).attr("aria-controls")+"_paginate").show();
		}
	});
	
	$(".dataTables_filter label input[type=text]").each(function( index ) {
		$(this).attr("placeholder", "Buscar...");
	});
	
	$(".datatable").css("width", "");
	$(".datatable th").css("width", "");
	$(".datatable td").css("width", "");
	$(".dataTables_wrapper").remove(".dataTables_length");
	$(".dataTables_wrapper").remove(".dataTables_info");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function alerta(msg,color), mensaje de alerta, se le puede enviar tanto mensaje como constante, y colores (red, green, yellow)
//////////////////////////////////////////////////////////////////////////////////////////////////////
function alerta(msg, type){
	var color = "white";
	var title = "Alerta";
	var icon = "&#xE88F;";
	switch(type) {
		case "error":
			icon = "&#xE888;";
			color = "red";
			title = "Error";
			break;
		case "warning":
			icon = "&#xE002;";
			color = "amber darken-1";
			title = "Precaución";
			break;
		case "info":
			icon = "&#xE88F;";
			color = "light-blue";
			title = "Información";
			break;
		case "done":
			icon = "&#xE876;";
			color = "green darken-1";
			title = "Correcto";
			break;
	} 
	
	var dialog = "";
	dialog += "			<div class='row'>";
	dialog += "				<div class='col s4 center-align "+color+"'>";
	dialog += "					<i class='medium material-icons'>"+icon+"</i>";
	dialog += "				</div>";
	dialog += "				<div class='col s8 black-text'>";
	dialog +=					"<b>"+title+":</b><br>"+msg;
	dialog += "					<i class='fa fa-window-close' aria-hidden='true'></i>";
	dialog += "				</div>";
	dialog += "			</div>";
	Materialize.toast(dialog, DELAY_MESSAGE);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function loading() abre el loading
//function cerrarLoading() cierra el loading
//////////////////////////////////////////////////////////////////////////////////////////////////////
function cerrarLoading(){
	$("#loading").hide();
}

function loading(){
	$( "#loading" ).show();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function limpiarFormulario(idFormulario) limpia el formulario enviado por parámetro 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function limpiarFormulario(idFormulario){
	document.getElementById(idFormulario).reset();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function msgBox(title, icon, content, type, confirm_action, cancel_action) muestra un modal informativo dinámico. Ejemplo en /template
//////////////////////////////////////////////////////////////////////////////////////////////////////
function msgBox(title, icon, content, type, confirm_action, cancel_action){
	var buttons = "";
	var dialog = "";

	switch(icon) {
		case "error":
			icon = "&#xE000;";
			break;
		case "warning":
			icon = "&#xE002;";
			break;
		case "done":
			icon = "&#xE86C;";
			break;
		case "question":
			icon = "&#xE887;";
			break;
		default:
			icon = "&#xE88F;";
			break;
	} 
	
	
	if(document.getElementById("msgbox") != null) {
		$("#msgbox").empty();
	}else{
		$("body").append("<div id='msgbox' class='modal'></div>");
	}
	
	switch(type) {
		case "YesNo":
			buttons += '<a class="modal-action modal-close waves-effect btn-flat waves-red" name="no" value="no" onclick="'+cancel_action+'">No</a>';
			buttons += '<a class="modal-action modal-close waves-effect btn-flat waves-green" name="si" value="si" onclick="'+confirm_action+'">Si</a>';
			break;
		case "ConfirmCancel":
			buttons += '<a class="modal-action modal-close waves-effect btn-flat waves-red" name="cancelar" value="cancelar" onclick="'+cancel_action+'">Cancelar</a>';
			buttons += '<a class="modal-action modal-close waves-effect btn-flat waves-green" name="aceptar" value="aceptar" onclick="'+confirm_action+'">Aceptar</a>';
			break;
		default:
			buttons += '<a class="modal-action modal-close waves-effect btn-flat waves-green" name="aceptar" value="aceptar" onclick="'+confirm_action+'">Aceptar</a>';
	} 


	dialog += "		<div class='modal-content'>";
	dialog += "			<div class='row'>";
	dialog += "				<div class='col s12'>";
	dialog += "					<h3>"+title+"</h3>";
	dialog += "				</div>";
	dialog += "			</div>";
	dialog += "			<div class='row'>";
	dialog += "				<div class='col s12 m2 l2 center-align'>";
	dialog += "					<i class='large material-icons'>"+icon+"</i>";
	dialog += "				</div>";
	dialog += "				<div class='col s12 m10 l10'>";
	dialog +=					content;
	dialog += "				</div>";
	dialog += "			</div>";
	dialog += "		</div>";
	dialog += "		<div class='modal-footer'>";
	dialog += 			buttons;
	dialog += "		</div>";

	
	$("#msgbox").append(dialog);
	$("#msgbox").modal({
		dismissible: false, 
		opacity: 0.4,
		inDuration: 100,
		outDuration: 100,
		startingTop: '4%',
		endingTop: '10%',
		ready: function(modal, trigger) {},
		complete: function() {}
	});
	$("#msgbox").modal("open");
}


function filtrarMenu() {
	var filtro = limpiarBusqueda($("#search-menu-input").val());
	$("#slide-out li").each(function( index ) {
		if(index > 4 && $(this).text() != "" && $(this).hasClass("li-submenu") == false && $(this).hasClass("hide-on-large-only") == false && $(this).hasClass("divider") == false){
			if(limpiarBusqueda($(this).text()).indexOf(filtro) > -1){
				$(this).show();
			}else{
				$(this).hide();
			}
		}
	});
}

function entrarMenu() {
	var firstRessult = $('#slide-out li:not([style="display: none;"]):not(.divider):not(.li-submenu) a.waves-effect').eq(1).focus();
	if(firstRessult.hasClass("collapsible-header")){
		firstRessult.siblings(".collapsible-body").children("ul").children("li").eq(0).children().children().click();
	}else{
		firstRessult.children().click();
	}
}

function limpiarBusqueda(cadena){
	var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
	for (var i = 0; i < specialChars.length; i++) {
	   cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
	}   
	cadena = cadena.toLowerCase();
	cadena = cadena.replace(/ /g,"_");
	cadena = cadena.replace(/á/gi,"a");
	cadena = cadena.replace(/é/gi,"e");
	cadena = cadena.replace(/í/gi,"i");
	cadena = cadena.replace(/ó/gi,"o");
	cadena = cadena.replace(/ú/gi,"u");
	cadena = cadena.replace(/ñ/gi,"n");
	return cadena.toUpperCase();
}

function iniciarMaterialize(){
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//INICIALIZACION DATEPICKER
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.datepicker').pickadate({
		selectMonths: true,
		selectYears: 6,
        labelMonthNext: 'Mes siguiente',
        labelMonthPrev: 'Mes anterior',
        labelMonthSelect: 'Selecciona un mes',
        labelYearSelect: 'Selecciona un año',
        monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
        monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
        weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
        weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
        weekdaysLetter: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
        format: datepicker_format,
        min: datepicker_min,
        max: datepicker_max,
		disable: datepicker_disable,
		onSet: function( arg ){
			if ( 'select' in arg ){
				this.close();
			}
		}
	});
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//INICIALIZACION SELECT
    //////////////////////////////////////////////////////////////////////////////////////////////////////
	$('select').material_select();
	$('.collapsible').collapsible();

    Materialize.updateTextFields();
	
	$(".select-dropdown li").click(function (event) {
		$(this).parent().parent().children("input").removeClass("invalid");
	});
	$('input[name^="captcha"]').focusout(function () {
		$("img.imagen-captcha").removeClass("active");
	});
	$('input[name^="captcha"]').focus(function () {
		$("img.imagen-captcha").addClass("active");
	});
	$("a.recargar-captcha").click(function (event) {
		recargarCaptcha();
	});

	$('.carousel').carousel();
	$('.carousel.carousel-slider').carousel({fullWidth: true});


}

function reemplazarImagenIcono(node){
	padre = node.parent();
	icono = node.attr("src");
	texto = padre.children('span').text();
	padre.children('span').remove();
	node.remove();
	padre.append('<i class="'+icono+'"></i><span>'+texto+'</span>');
}

function inIframe () {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
}

function setInputValid(selector){
	if ($(selector).is("select")) {
		$(selector).closest(".input-field").children(".select-wrapper").children("input").addClass("valid");
	}else{
		$(selector).addClass("valid");
	}
	setTimeout(function () { removeInputValidation(selector); }, REDIRECT_DELAY);
}

function setInputInvalid(selector){
	if ($(selector).is("select")) {
		$(selector).closest(".input-field").children(".select-wrapper").children("input").addClass("invalid");
	}else{
		$(selector).addClass("invalid");
	}
	setTimeout(function () { removeInputValidation(selector); }, REDIRECT_DELAY);
}

function removeInputValidation(selector){
	if ($(selector).is("select")) {
		$(selector).closest(".input-field").children(".select-wrapper").children("input").removeClass("invalid");
		$(selector).closest(".input-field").children(".select-wrapper").children("input").removeClass("valid");
	}else{
		$(selector).removeClass("invalid");
		$(selector).removeClass("valid");
	}
}

function zoomIn() {
	if(currentZoom < 1.5){
		currentZoom += 0.25; 
		$('.zoomable').css('MozTransform','scale(' + currentZoom + ')');
		$('.zoomable').css('zoom', ' ' + currentZoom * 100 + '%');
	}
}

function zoomOut() {
	if(currentZoom > 0.5){
		currentZoom -= 0.25; 
		$('.zoomable').css('MozTransform','scale(' + currentZoom + ')');
		$('.zoomable').css('zoom', ' ' + currentZoom * 100 + '%');
	}
}
function refreshDataTable(selector, options, sort){
	if(selector != null){
		$(selector).dataTable(options == null ? dataTableOptions : options).fnDestroy();
		$(selector+" > tbody > tr").removeClass("odd").removeClass("even");
		var table = $(selector).dataTable(options == null ? dataTableOptions : options);
		table.fnDraw();
		if(sort != null){
			table.fnSort(sort);
		}
		initializeDataTable();
	}
}

function disablePaginationDataTable(value){
	$('.dataTable').each(function() {
		var options = $(this).dataTable().fnSettings();
		$(this).removeClass("odd").removeClass("even");
		$(this).dataTable().fnDestroy();
		options.bPaginate = !value;
		$(this).dataTable(options).fnDraw();
	});
	initializeDataTable();
}

function imprimir(nombre, estilos){
	var pageHeight = 2206;
	var pageMarginTop = 134;
	var currentPageHeight = pageMarginTop;
	var unprintableSelector = ".container .unprintable, .container .btn:not(td), .container .botonera, .container .dataTables_paginate, .container .picker, .container .btn-floating, .container .dataTables_filter, .container .pagination, .container .caret, .tab > a:not(.active) ";
	var collapsibleBody = Array();
	var collapsibleHeader = Array();
	var unprintableElements = Array();
	var content = '';
	
	disablePaginationDataTable(true);

	$('.collapsible-header').each(function(index) {
		collapsibleHeader[index] = $(this).hasClass("active");
		$(this).removeClass("active");
	});
	$('.collapsible-body').each(function(index) {
		if ($(this).css("display") != "block"){
			collapsibleBody[index] = $(this).css("display");
			$(this).css("display","block");
		}
	});
	$(unprintableSelector).each(function(index) {
		unprintableElements[index] = $(this).css("display");
		$(this).css("display", "none");
	});
	
	content += '<!DOCTYPE html>';
	content += '<html lang="es-ES">';
	content += '<head>';
	content += '<title>Portal sigcer - Imprimir</title>';
	content += '<meta charset="ISO-8859-1" />';
	content += '<meta name="description" content="Ministerio de Coordinación y Gestión Pública - sigcer - PORTAL">';
	content += '<meta name="author" content="sigcer - PORTAL - RRHH">';
	content += '<link rel="icon" type="image/png" href="./public/images/favicon.ico?v='+Math.floor((Math.random() * 1000) + 1)+'" />';
	content += '<link rel="stylesheet" href="./public/css/jquery.dataTables.css?v='+Math.floor((Math.random() * 1000) + 1)+'" />';
	content += '<link rel="stylesheet" href="./public/js/jquery.validate/jquery.validate.css?v='+Math.floor((Math.random() * 1000) + 1)+'" />';
	content += '<link rel="stylesheet" href="./public/css/font-awesome.min.css?v='+Math.floor((Math.random() * 1000) + 1)+'"/>';
	content += '<link rel="stylesheet" href="./public/css/materialize/materialize.min.css?v='+Math.floor((Math.random() * 1000) + 1)+'" />';
	content += '<link rel="stylesheet" href="./public/css/sigcer/sigcer-materialize.css?v='+Math.floor((Math.random() * 1000) + 1)+'" />';
	content += '<link rel="stylesheet" href="./public/css/loaders.min.css?v='+Math.floor((Math.random() * 1000) + 1)+'">';
	content += '<link rel="stylesheet" href="./public/css/previsualizacion.css?v='+Math.floor((Math.random() * 1000) + 1)+'">';
	
	estilos.forEach(function(item, index){
		content += '<link rel="stylesheet" href="'+ (base_path + directory != '' ? base_path + directory : '') + '/public/css/' + item + '" type="text/css"/>';
	});
	
	content += '</head>';
	content += '<body onload="$(\'.tap-target\').tapTarget(\'open\');setTimeout(function(){$(\'.tap-target\').tapTarget(\'close\');},5000);">';
	
	content += '<div class="zoomable">';
	content += '<div class="container">';
	$(".printable").each(function( index ) {
		
		if(currentPageHeight + $(this).outerHeight(true) > pageHeight){
			content += '</div>';
			content += '<div class="container">';
			currentPageHeight = pageMarginTop;
		}
		content += $(this).get(0).outerHTML.replace('type="number"', 'type="text"').replace("type='number'", "type='text'");
		currentPageHeight += $(this).outerHeight(true);
		
	});
	content += '</div>';
	content += '</div>';
	
	content += '<div id="print-preview-overlay" class="grab"></div>';
	content += '<div class="fixed-action-btn">';
	content += '<a id="printmenu" class="waves-effect waves-light btn-floating btn-large pulse tooltipped" data-position="left" data-delay="50" data-tooltip="Imprimir" onclick="generarPDF(\''+nombre+'\');"><i class="large material-icons">print</i></a>';
	content += '<div class="tap-target" data-activates="printmenu">';
	content += '<div class="tap-target-content">';
	content += '<h6 class="white-text">Descargar PDF</h6>';
	content += '<p class="white-text">Cuando esté listo presione el botón imprimir.<br>Guarde el archivo PDF y abralo para poder imprimirlo.</p>';
	content += '</div>';
	content += '</div>';
	if(isMobile == false){
		content += '<ul>';
		content += '<li><a class="waves-effect waves-light btn-floating tooltipped red" data-position="left" data-delay="50" data-tooltip="Cerrar" onclick="window.close();"><i class="material-icons">close</i></a></li>';
		content += '<li><a class="waves-effect waves-light btn-floating tooltipped blue" data-position="left" data-delay="50" data-tooltip="Acercar" onclick="zoomIn();"><i class="material-icons">zoom_in</i></a></li>';
		content += '<li><a class="waves-effect waves-light btn-floating tooltipped blue" data-position="left" data-delay="50" data-tooltip="Alejar" onclick="zoomOut();"><i class="material-icons">zoom_out</i></a></li>';
		content += '</ul>';
	}
	content += '</div>';
	content += '</body>';

	content += '<script language="javascript" src="./public/js/jquery-1.8.3.min.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	//content += '<script language="javascript" src="./public/js/jquery.dataTables.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	//content += '<script language="javascript" src="./public/js/jquery.validate/jquery.validate.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/maskedinput.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/validadorMaterialize.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/materialize.min.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/commons.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/funcionesMaterialize.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/materialize-autocomplete.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';

	content += '<script language="javascript" src="./public/js/impresiones.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/html2canvas.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	content += '<script language="javascript" src="./public/js/jspdf.min.js?v='+Math.floor((Math.random() * 1000) + 1)+'"></script>';
	
	content += '</html>';
	
	var ventana = window.open('','Imprimir');
	ventana.document.open();
	ventana.document.write(content);
	ventana.document.close();
	
	$(unprintableSelector).each(function(index) {
		$(this).css("display", unprintableElements[index]);
	});
	$('.collapsible-body').each(function(index) {
		if (collapsibleBody[index] != null){
			$(this).css("display",collapsibleBody[index]);
		}
	});
	$('.collapsible-header').each(function(index) {
		if(collapsibleHeader[index] == true){
			$(this).addClass("active");
		}
	});
	
	disablePaginationDataTable(false);
}

function initializeTour(){
	tour = new Tour	({
						name: "tour",
						steps:[],
						container: "body",
						animation: true,
						smartPlacement: true,
						keyboard: true,
						storage: window.localStorage,
						debug: false,
						backdrop: true,
						backdropContainer: 'body',
						backdropPadding: 0,
						redirect: true,
						orphan: false,
						duration: false,
						delay: false,
						basePath: "",
						template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='end'><i class='fa fa-times' aria-hidden='true'></i>Finalizar</button><button class='btn btn-default' data-role='next'><i class='fa fa-chevron-right' aria-hidden='true'></i>Siguiente</button><button class='btn btn-default' data-role='prev'><i class='fa fa-chevron-left' aria-hidden='true'></i>Anterior</button></div></div>",
						afterGetState:		function (key, value) {},
						afterSetState:		function (key, value) {},
						afterRemoveState:	function (key, value) {},
						onStart:			function (tour) {},
						onEnd:				function (tour) {},
						onShow:				function (tour) {tourOnShow();},
						onShown:			function (tour) {tourOnShow();},
						onHide:				function (tour) {tourOnHide();},
						onHidden:			function (tour) {tourOnHide();},
						onNext:				function (tour) {},
						onPrev:				function (tour) {},
						onPause:			function (tour, duration) {tourOnHide();},
						onResume:			function (tour, duration) {tourOnShow();},
						onRedirectError:	function (tour) {}
	});
};

function calculateOverlay(){
	if($('.tour-overlay').length > 0 && $('.tour-backdrop.top').length > 0 && $('.tour-backdrop.left').length > 0 && $('.tour-backdrop.bottom').length > 0 && $('.tour-backdrop.right').length > 0) {
		$(".tour-overlay").css("top", $(".tour-backdrop.top").outerHeight(true) + "px");
		$(".tour-overlay").css("left", $(".tour-backdrop.left").outerWidth(true) + "px");
		$(".tour-overlay").css("height", $(".tour-backdrop.bottom").offset().top - $(".tour-backdrop.top").outerHeight(true)  + "px");
		$(".tour-overlay").css("width", $(".tour-backdrop.right").offset().left - $(".tour-backdrop.left").outerWidth(true)  + "px");
	}else{
		tourOnHide();
	}
}

function tourOnShow(){
	if($('.tour-overlay').length == 0) {
		$("body").append("<div class='tour-overlay' name='tour-overlay' id='tour-overlay'></div>");
		$(".tour-overlay, .tour-backdrop, .popover-title, .popover-content, .tour-overlay").click(function (event) {
			return false;
		});
		tourInterval = setInterval(function () {$(".tour-overlay").toggleClass("highlight");}, 3000);
	}
	calculateOverlay();
}

function tourOnHide(){
	clearInterval(tourInterval); 
	$(".tour-overlay").remove();
	$(".tour-backdrop").remove();
}

function openHelp(title){
	if(document.getElementById("dialoghelp") == null) {
		$("body").append("<div id='dialoghelp' class='modal'></div>");
		
		var dialog = "";
		dialog += "		<div class='modal-content'>";
		dialog += "			<div class='row'>";
		dialog += "				<div class='col s12'>";
		dialog += "					<h3>Ayuda sobre: "+title+"</h3>";
		dialog += "				</div>";
		dialog += "			</div>";
		dialog += "			<div class='row'>";
		dialog += "				<div class='col s12'>";
		dialog += 					"Lamentablemente esta página no posee ayuda todavía.";
		dialog += "				</div>";
		dialog += "			</div>";
		dialog += "		</div>";
		dialog += "		<div class='modal-footer'>";
		dialog += "			<a class='modal-action modal-close waves-effect btn-flat waves-green' name='aceptar' value='aceptar'>Aceptar</a>";
		dialog += "		</div>";
		
		$("#dialoghelp").append(dialog);
		$("#dialoghelp").modal({
			dismissible: true, 
			opacity: 0.4,
			inDuration: 100,
			outDuration: 100,
			startingTop: '4%',
			endingTop: '10%',
			ready: function(modal, trigger) {},
			complete: function() {}
		});
	}

	if(typeof createTour != 'undefined'){
		createTour();
	}
	if(steps.length > 0 && typeof createTour != 'undefined'){
		if($('.tour-overlay').length == 0 && $(".tour-backdrop").length == 0) {
			tour.end();
			tour.setCurrentStep(0);
			tour.init();
			tour.start(true);
		}
	}else{
		$("#dialoghelp").modal("open");
	}
}

function keyboardshortcut(e) {
	//console.log(e.keyCode);
	var F2 = 113;
	var F9 = 120;
	var ESC = 27;
	
	if (e.keyCode == F2 && $(".tour-overlay").length == 0 && $(".tour-backdrop").length == 0 && $(".modal-overlay").length == 0){
			$("#boton-menu a").click();
			$("#search-menu-input").focus();
    }
	if (e.keyCode == F9) {
		$("#sidenav-overlay").click();
		$("body").click();
		if ($(".tour-overlay").length == 0 && $(".tour-backdrop").length == 0 && $(".modal-overlay").length == 0){
			$(".bot_help i").click();
		}
    }
	if (e.keyCode == ESC) {
		$(".popover.tour .popover-navigation .btn:nth-of-type(1)").click();
		$("#sidenav-overlay").click();
		$("body").click();
    }
}