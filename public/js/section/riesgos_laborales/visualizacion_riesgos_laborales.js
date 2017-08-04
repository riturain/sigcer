var myurl = 'visualizacion_riesgos_laborales';
var fromurl = 'relevamiento_riesgos_laborales';

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

function finalizarDDJJ(ID_DDJJ, ID_PERSONA){
	var parametros = {
		"accion":		'finalizarDDJJ',
		"id_ddjj":		ID_DDJJ,
		"id_persona":	ID_PERSONA
		
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			mostrarDialogo("#dialog", "DDJJ Finalizada", "ok", "<p><b>La DDJJ ha sido finalizada correctamente.</b></p>", "", "redireccionar();");
		}else if (response == 0){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b><br>La DDJJ no existe.</p>", "", "");
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b></p>", "", "");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b><br>Los datos de la entidad no están completos.</p>", "", "");
		}else if (response == -3){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b><br>No se han respondido todas las consultas del cuestionario.</p>", "", "");
		}else if (response == -4){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b><br>Usted no dispone permisos para realizar esta acción.</p>", "", "");
		}else if (response == -5){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b><br>Existe otra DDJJ para este periodo con estado Finalizado.</p>", "", "");
		}else if (response == -6){
			mostrarDialogo("#dialog", "Problemas al Realizar Finalización", "exclamation", "<p class='invalido'><b>No se ha podido finalizar la DDJJ.</b><br>Existen anexos que no se han completado.</p>", "", "");
		}
	});
}

function revisionarDDJJ(ID_PERSONA, REVISION, ID_LOCALIDAD, ID_PARTIDO, ID_ORGANISMO, ID_EDIFICIO, ID_AMBITO, NIVEL, PERIODO, ID_ORIGEN){
	var parametros = {
		"accion":			'nuevaDDJJ',
		"id_persona":		ID_PERSONA,
		"revision":			REVISION,
		"id_localidad":		ID_LOCALIDAD,
		"id_partido":		ID_PARTIDO,
		"id_organismo":		ID_ORGANISMO,
		"id_edificio":		ID_EDIFICIO,
		"id_ambito":		ID_AMBITO,
		"nivel":			NIVEL,
		"periodo":			PERIODO
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			clonarDDJJ(ID_ORIGEN, response);
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Creación", "exclamation", "<p class='invalido'><b>No se ha podido crear la DDJJ.</b><br>Ya existe una DDJJ para este periodo.</p>", "", "");
		}else if (response == -3){
			mostrarDialogo("#dialog", "Problemas al Realizar Creación", "exclamation", "<p class='invalido'><b>No se ha podido crear la DDJJ.</b><br>No se encuentra el cuestionario correspondiente.</p>", "", "");
		}else if (response == -4){
			mostrarDialogo("#dialog", "Problemas al Realizar Creación", "exclamation", "<p class='invalido'><b>No se ha podido crear la DDJJ.</b><br>Usted no tiene permisos de edición de DDJJ para la entidad seleccionada.</p>", "", "");
		}else{
			mostrarDialogo("#dialog", "Problemas al Realizar Creación", "exclamation", "<p class='invalido'><b>No se ha podido crear la DDJJ.</b></p>", "", "");
		}
	});

}

function clonarDDJJ(ID_ORIGEN, ID_DESTINO){
	var parametros = {
		"accion":		'clonarDDJJ',
		"id_origen":	ID_ORIGEN,
		"id_destino":	ID_DESTINO,
		"rectificar":	'1'
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			mostrarDialogo("#dialog", "Revisión Creada", "ok", "<p><b>La Revision ha sido creada correctamente.</b><br>Será redireccionado a la pantalla de edición.</p>", "", "editarDDJJ("+ID_DESTINO+",0);");
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Crear Revisión", "exclamation", "<p class='invalido'><b>No se han podido copiar los datos de la DDJJ anterior.</b></p>", "", "");
		}
	});
}


function eliminarDDJJ(ID_DDJJ, ID_PERSONA){
	var parametros = {
		"accion":		'eliminarDDJJ',
		"id_ddjj":		ID_DDJJ,
		"id_persona":	ID_PERSONA
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			mostrarDialogo("#dialog", "DDJJ Eliminada", "ok", "<p><b>La DDJJ ha sido eliminada correctamente.</b></p>", "", "redireccionar();");
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar la DDJJ.</b></p>", "", "");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar la DDJJ.</b><br>Usted no dispone permisos para realizar esta acción.</p>", "", "");
		}
	});
}

function redireccionar(){
	window.location.href = window.location.href.replace(myurl, fromurl);
}

function editarDDJJ(ID_DDJJ, NUEVA){
	var form = $('<form action="edicion_riesgos_laborales" method="post">' +
	'<input type="hidden" name="id_ddjj" value="' + ID_DDJJ + '" />' +
	'<input type="hidden" name="nueva" value="' + NUEVA + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
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
