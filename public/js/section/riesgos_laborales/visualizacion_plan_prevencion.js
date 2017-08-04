var myurl = 'visualizacion_plan_prevencion';
var fromurl = 'relevamiento_plan_prevencion';

$(document).ready(function(){

	$( function() {
		$( document ).tooltip({
			show: {
				effect: "highlight",
				delay: 750
			}
		});
	});
});


function redireccionar(){
	window.location.href = window.location.href.replace(myurl, fromurl);
}

function editarFormulario(ID_FORMULARIO, NUEVO){
	var form = $('<form action="edicion_plan_prevencion" method="post">' +
	'<input type="hidden" name="id_formulario" value="' + ID_FORMULARIO + '" />' +
	'<input type="hidden" name="nuevo" value="' + NUEVO + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
}

function descargar(TIPO, ANIO, ID_TIPO, ID_PERIODO, TIPO_ENVIO){
	var form = $('<form action="visualizacion_plan_prevencion" method="post">' +
	'<input type="hidden" name="accion" value="descargarFormulario" />' +
	'<input type="hidden" name="tipo" value="' + TIPO + '" />' +
	'<input type="hidden" name="anio" value="' + ANIO + '" />' +
	'<input type="hidden" name="id_tipo" value="' + ID_TIPO + '" />' +
	'<input type="hidden" name="id_periodo" value="' + ID_PERIODO + '" />' +
	'<input type="hidden" name="tipo_envio" value="' + TIPO_ENVIO + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
}

function finalizarFormulario(ID_FORMULARIO, ID_PERSONA){
	var parametros = {
		"accion":			'finalizarFormulario',
		"id_formulario":	ID_FORMULARIO,
		"id_persona":		ID_PERSONA
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			mostrarDialogo("#dialog", "Formulario Finalizado", "ok", "<p><b>El Formulario ha sido finalizado correctamente.</b></p>", "", "", "redireccionar();");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar el Formulario.</b><br>El campo Cantidad de C.U.I.T.s es 0 pero los demas campos tienen valor distinto a 0.</p>", "", "");
		}else if (response == -3){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar el Formulario.</b><br>El campo Cantidad de Establecimientos es menor a Cantidad de C.U.I.T.s.</p>", "", "");
		}else if (response == -4){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar el Formulario.</b><br>El campo Cantidad de Visitas es menor a Cantidad de Establecimientos.</p>", "", "");
		}else if (response == -5){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar el Formulario.</b><br>La sumatoria de Establecimientos por Provincia es distinto a la sumatoria de Establecimientos por C.U.I.T.s.</p>", "", "");
		}else{
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar el Formulario.</b></p>", "", "");
		}
	});
}

function eliminarFormulario(ID_FORMULARIO, ID_PERSONA){
	var parametros = {
		"accion":			'eliminarFormulario',
		"id_formulario":	ID_FORMULARIO,
		"id_persona":		ID_PERSONA
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			mostrarDialogo("#dialog", "Formulario Eliminado", "ok", "<p><b>El Formulario ha sido eliminado correctamente.</b></p>", "", "", "redireccionar();");
		}else{
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar el Formulario.</b></p>", "", "");
		}
	});
}

function mostrarDialogo(elemento, titulo, icono, contenido, tipo, funcionpositivo, funcionnegativo, funcioncarga){
	$(elemento).empty();
	$(elemento).attr('title', titulo);
	if(icono != ""){
		$(elemento).append('<span class="glyphicon glyphicon-'+icono+'-sign"></span>');
	}
	if(contenido != ""){
		$(elemento).append(contenido);
	}
	var botones;
	switch(tipo) {
		case "SiNo":
			botones =	{
							Si: function() {
								$( this ).dialog( "close" );
								if(funcionpositivo != ""){
									setTimeout(funcionpositivo, 10);
								}
							},
							No: function() {
								$( this ).dialog( "close" );
								if(funcionnegativo != ""){
									setTimeout(funcionnegativo, 10);
								}
							}
						}
			break;
		case "AceptarCancelar":
			botones =	{
							Aceptar: function() {
								$( this ).dialog( "close" );
								if(funcionpositivo != ""){
									setTimeout(funcionpositivo, 10);
								}
							},
							Cancelar: function() {
								$( this ).dialog( "close" );
								if(funcionnegativo != ""){
									setTimeout(funcionnegativo, 10);
								}
							}
						}
			break;
		default:
			botones =	{
							Aceptar: function() {
								$( this ).dialog( "close" );
								if(funcionnegativo != ""){
									setTimeout(funcionnegativo, 10);
								}
							}
						}
	} 

	$(elemento).dialog({
		title: titulo,
		dialogClass: 'fixed-dialog',
		resizable: false,
		height: 240,
		width: 640,
		modal: true,
		closeOnEscape: false,
		open: function(event, ui) {
			$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
		},
		buttons: botones
	});
	if(funcioncarga != ""){
		setTimeout(funcioncarga, 10);
	}
}

function imprimir(div, styles){
	var content = '';
	content += '<!DOCTYPE html>';
	content += '<html lang="es-ES">';
	content += '<head>';
	content += '<title>Portal sigcer - Imprimir</title>';
	content += '<meta charset="ISO-8859-1" />';
	content += '<meta name="description" content="Ministerio de Coordinación y Gestión Pública - sigcer - PORTAL">';
	content += '<meta name="author" content="sigcer - PORTAL - RRHH">';

	styles.forEach(function(item, index){
		content += '<link rel="stylesheet" href="'+ (document.getElementById("txtBasePath").value != '' ? '/' + document.getElementById("txtBasePath").value : '') + '/public/css/' + item + '" type="text/css"/>';
	});
	
	content += '<style>.unprintable{display:none;}</style>';
	content += '</head>';
	content += '<body style="background-color:#FFFFFF;min-width:960px;padding-left:4%;" onload="window.print()">';
	content += '<div id="header" style="width:87%;margin-left:3%;"><img src="/portal.mvc/public/images/printtop.png"/></div><br><hr style="margin-left:3%;width:87%;">';
	content += document.getElementById(div).innerHTML;
	content += '</body></html>';
	
	var ventana = window.open('','Imprimir');
	ventana.document.open();
	ventana.document.write(content);
	ventana.document.close();
	setTimeout(function(){ventana.close();},1000);
}
