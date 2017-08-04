var myurl = 'edicion_riesgos_laborales';
var fromurl = 'relevamiento_riesgos_laborales';
var ddjj_items_cambios = new Array();
var ddjj_anexo_cambios = new Array();

var tableOptions =	{		
						"sPaginationType": "full_numbers",															 
						"iDisplayLength": 10,
						"aoColumns":	[
											{"bSortable": false},
											{"bSortable": false},
											{"bSortable": false},
											{"bSortable": false}
										],
						"bRetrieve": true,
						"bProcessing": true,
						"bDestroy": true,
						"bLengthChange": false,
						"bFilter": false,
						"bPaginate": false,
						"bInfo":false,
						"bAutoWidth": false,
						"oLanguage": {
										"sZeroRecords": "No se encuentran Actividades Económicas para este Organismo.",
										"sInfo": "Resultados del _START_ al _END_, de un total de _TOTAL_",
										"sInfoEmpty": "Mostrando 0 registros",
										"sInfoFiltered": "(Filtrado de _MAX_ registros)",
										"sSearch": "Buscar: ",
										"oPaginate": {
														"sFirst":    "Primero",
														"sLast":     "Último",
														"sNext":     "Siguiente",
														"sPrevious": "Anterior"
										}
						}
};

if(document.getElementById("tablaActividadEconomica") != null) {
	var oTable1 = $("#tablaActividadEconomica").dataTable(tableOptions);
	oTable1.fnSort( [[0, 'desc']] );
}

$(document).ready(function(){
	if($(".tablaCuestionario").length != 0) {
		$(".tablaCuestionario").dataTable({		
			"sPaginationType": "full_numbers",															 
			"iDisplayLength": 10,
			"aoColumns": [
				{"bSearchable": true},
				{"bSearchable": true},
				{"bSortable": false},
				{"bSortable": false},
				{"bSortable": false},
				{"bSortable": false},
				{"bSortable": false}
							],
	        "bLengthChange": false,
    	    "bFilter": false,
			"bPaginate": false,
			"bInfo":false,
        	"bAutoWidth": false,
	                "oLanguage": {
    	                "sZeroRecords": "no hay registros",
        	            "sInfo": "Resultados del _START_ al _END_, de un total de _TOTAL_",
	                    "sInfoEmpty": "Mostrando 0 registros",
    	                "sInfoFiltered": "(Filtrado de _MAX_ registros)",
        	            "sSearch": "Buscar: ",
						"oPaginate": {
							"sFirst":    "Primero",
							"sLast":     "Último",
							"sNext":     "Siguiente",
							"sPrevious": "Anterior"
						}
	                }
		});
	}
	if($(".tablaAnexo").length != 0) {
		$(".tablaAnexo").dataTable({		
			"sPaginationType": "full_numbers",															 
			"iDisplayLength": 10,
			"aoColumns": [
				{"bSearchable": true},
				{"bSearchable": true},
				{"bSortable": false},
				{"bSortable": false},
				{"bSortable": false}
							],
	        "bLengthChange": false,
    	    "bFilter": false,
			"bPaginate": false,
			"bInfo":false,
        	"bAutoWidth": false,
	                "oLanguage": {
    	                "sZeroRecords": "no hay registros",
        	            "sInfo": "Resultados del _START_ al _END_, de un total de _TOTAL_",
	                    "sInfoEmpty": "Mostrando 0 registros",
    	                "sInfoFiltered": "(Filtrado de _MAX_ registros)",
        	            "sSearch": "Buscar: ",
						"oPaginate": {
							"sFirst":    "Primero",
							"sLast":     "Último",
							"sNext":     "Siguiente",
							"sPrevious": "Anterior"
						}
	                }
		});
	}

	$("#accordion").accordion({
		
	});
	
	
	$(".itemanexo").change(function(){
		var item_regex = $(this).attr("name").match(/itemanexo-(\d*)-(\d*)-(\d*)/);
		var item = new Array();
		item = [item_regex[1], item_regex[2], item_regex[3], $(this).val()];
		ddjj_anexo_cambios.push(item);
	});
	
	$(".itemcuestionario").change(function(){
		var item_regex = $(this).attr("name").match(/custionario-(\d*)-(\d*)/);
		var item = new Array();
		item = [item_regex[1], item_regex[2], $(this).val()];
		ddjj_items_cambios.push(item);
		if (document.getElementById("habilita"+item_regex[2]) != null){
			if ($(this).val() == 1){
				$("#habilita"+item_regex[2]).show();
			}else{
				$("#habilita"+item_regex[2]).hide();
			}
		}
	});
	
	$( function() {
		$( document ).tooltip({
			show: {
				effect: "highlight",
				delay: 750
			}
		});
	});
	
	cargarTablaActividades();
	
	$('.ui-accordion-content').attr('style', function(i, style){
		return style.replace(/height[^;]+;?/g, '');
	});

	if (document.getElementById("DatosEdificioD") != null){
		if (document.getElementById("txtEdificioId").value == 'null'){
			startEdit('DatosEdificio','BotonEditarEdificio','BotonGuardarEdificio',false);
		}
	}
	
	if (document.getElementById("DatosAmbitoB") != null){
		if (document.getElementById("txtAmbitoId").value == 'null'){
			startEdit('DatosAmbito','BotonEditarAmbito','BotonGuardarAmbito',false);
		}
	}
	var autocompleteOptions = {
		source: function( request, response ) {
			var parametros = {
				"accion":		'callesRelacionadas',
				"term":			 request.term
			};
			$.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post',
				dataType:	'json',
				success:	function( data ) {
								response( $.map( data, function( item ) {
									return {
										label:		item['CALLE'],
										value:		item['CALLE']
									};
								}));
							}
			});
        },
        minLength:	5,
		delay:		200,
        autoFocus:	true
    };
	
	
	$("#edificioCalle").autocomplete(autocompleteOptions);
	$("#edificioEntreCalleA").autocomplete(autocompleteOptions);
	$("#edificioEntreCalleB").autocomplete(autocompleteOptions);
	
	CheckearVisibilidadBotones();
	habilitarAnexos();
});

function habilitarAnexos() {
	$("fieldset.anexo").each(function( index ) {
		var item_regex = $(this).attr("name").match(/habilita(\d*)/);
		var pregunta = "custionario-"+$("#txtDDJJId").val()+"-"+item_regex[1];
		if (document.getElementsByName(pregunta).length > 0 ){
			if($('input[name='+pregunta+']:checked').val() > 0){
				$(this).show();
			}else{
				$(this).hide();
			}
		}
	});
}


function comprobarDatosEdificio(){
	//TODO: avisar que se van a modificar los datos de todas las DDJJ que usen el edificio antes de guardar.

	if ($("#edificioCalle").val().length > 0 && $("#edificioAltura").val().length > 0 && $("#edificioCP").val().length > 0 && $("#edificioNombre").val().length > 0 && $("#edificioTrabajadores").val().length > 0 && $("#edificioSuperficie").val().length > 0){
		$("#dialog").empty();
		$("#dialog").attr('title', "Datos Similares Encontrados");
		$("#dialog").append("<p><b>Se han encontrado edificios similares de acuerdo a los datos ingresados:</b><br><br>Seleccione un Edificio de los mostrados debajo si desea utilizarlo, o de lo contrario seleccione la ultima opción si desea crear uno nuevo.</p><hr>");

		var parametros = {
			"accion":		'buscarEdificioSimilar',
			"id_partido":	$("#txtPartidoId").val(),
			"id_localidad":	$("#txLocalidadId").val(),
			"nombre":		$("#edificioNombre").val(),
			"calle":		$("#edificioCalle").val(),
			"altura":		$("#edificioAltura").val(),
			"entre_calle_a":$("#edificioEntreCalleA").val(),
			"entre_calle_b":$("#edificioEntreCalleB").val()
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			var data = $.parseJSON(response);
			$.each(data, function(idx, elem){
				if(elem.ID != $("#txtEdificioId").val()){
					$('#dialog').append(armarEdificioSeleccionable(elem.ID, elem.ID_LOCALIDAD, elem.ID_PARTIDO, elem.NOMBRE, elem.CALLE, elem.ALTURA, elem.CP, elem.ENTRE_CALLE_A, elem.ENTRE_CALLE_B, elem.LATITUD, elem.LONGITUD, elem.TRABAJADORES, elem.SUPERFICIE));
				}
			});
			var cantidad = $('div.seleccionable').length;
			var altura = (cantidad > 1 ? 460 : 340);
			if(cantidad > 0){
				$('#dialog').append(armarEdificioSeleccionable(0, 0, 0, "", "", 0, 0, "", "", 0, 0, 0, 0));
				$("#dialog").dialog({
					title: "Datos Similares Encontrados",
					dialogClass: 'fixed-dialog',
					resizable: false,
					height: altura,
					width: 640,
					modal: true,
					closeOnEscape: false,
					open: function(event, ui) {
						$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
					},
					buttons: {}
				});
			}else{
				guardarDatosEdificio();
			}
		});
	}else{
		mostrarDialogo("#dialog", "Problemas al Guardar Datos", "exclamation", "<p class='invalido'><b>Los datos del formulario no están completos.</b><br>Revise los datos ingresados y vuelva a intentarlo.</p>", "", "");
	}
}


function armarEdificioSeleccionable(ID, ID_LOCALIDAD, ID_PARTIDO, NOMBRE, CALLE, ALTURA, CP, ENTRE_CALLE_A, ENTRE_CALLE_B, LATITUD, LONGITUD, TRABAJADORES, SUPERFICIE){

	var retorno = '';
	
	if(ID == 0){
		retorno += '<div class="br seleccionable" onclick="guardarDatosEdificio();">';
		retorno += '<div class="rowdiv">';
		retorno += '<b>Utilizar mis datos.</b>';
		retorno += '</div>';
		retorno += '</div>';
	}else{
		retorno += '<div class="br seleccionable" onclick="cambiarDatosEdificio('+ID+', \''+NOMBRE+'\', \''+CALLE+'\', '+ALTURA+', '+CP+', \''+ENTRE_CALLE_A+'\', \''+ENTRE_CALLE_B+'\', '+TRABAJADORES+', '+SUPERFICIE+');">';
		retorno += '<div  class="rowdiv">';
		retorno += '<label class="shortlabel">CALLE:</label>';
		retorno += '<div class="textinput preview">'+CALLE+'</div>';
		retorno += '<label class="shortlabel">ALTURA:</label>';
		retorno += '<div class="numericinput preview">'+ALTURA+'</div>';
		retorno += '<label class="shortlabel">C.P.:</label>';
		retorno += '<div class="numericinput preview">'+CP+'</div>';
		retorno += '</div>';
		retorno += '<div  class="rowdiv">';
		retorno += '<label class="shortlabel">ENTRE CALLE:</label>';
		retorno += '<div class="textinput preview">'+ENTRE_CALLE_A+'</div>';
		retorno += '<label class="shortlabel">Y CALLE:</label>';
		retorno += '<div class="textinput preview">'+ENTRE_CALLE_B+'</div>';
		retorno += '</div>';
		retorno += '<div class="rowdiv">';
		retorno += '<label class="shortlabel">ESTABLECIMIENTO:</label>';
		retorno += '<div class="textinput preview">'+NOMBRE+'</div>';
		retorno += '<label class="shortlabel">TRABAJADORES:</label>';
		retorno += '<div class="numericinput preview">'+TRABAJADORES+'</div>';
		retorno += '<label class="shortlabel">SUPERFICIE:</label>';
		retorno += '<div class="numericinput preview">'+SUPERFICIE+'</div>';
		retorno += '</div>';
		retorno += '</div>';
	}

	return retorno;
}

function cambiarDatosEdificio(ID, NOMBRE, CALLE, ALTURA, CP, ENTRE_CALLE_A, ENTRE_CALLE_B, TRABAJADORES, SUPERFICIE){
	$("#txtEdificioId").val(ID);
	$("#edificioNombre").val(NOMBRE);
	$("#edificioCalle").val(CALLE);
	$("#edificioAltura").val(ALTURA);
	$("#edificioCP").val(CP);
	$("#edificioEntreCalleA").val(ENTRE_CALLE_A);
	$("#edificioEntreCalleB").val(ENTRE_CALLE_B);
	$("#edificioTrabajadores").val(TRABAJADORES);
	$("#edificioSuperficie").val(SUPERFICIE);
		
	guardarDatosEdificio();
}


function guardarDatosEdificio(){
	if ($("#dialog").hasClass('ui-dialog-content')) {
		$("#dialog").dialog("close");
	}
	var parametros = {
		"accion":		'guardarDatosEdificio',
		"id_edificio":	$("#txtEdificioId").val(),
		"id_localidad":	$("#txLocalidadId").val(),
		"id_partido":	$("#txtPartidoId").val(),
		"nombre":		$("#edificioNombre").val(),
		"calle":		$("#edificioCalle").val(),
		"altura":		$("#edificioAltura").val(),
		"cp":			$("#edificioCP").val(),
		"entre_calle_a":$("#edificioEntreCalleA").val(),
		"entre_calle_b":$("#edificioEntreCalleB").val(),
		"latitud":		"null",
		"longitud":		"null",
		"trabajadores":	$("#edificioTrabajadores").val(),
		"superficie":	$("#edificioSuperficie").val()
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			$("#txtEdificioId").val(response);
			startEdit('DatosEdificio','BotonEditarEdificio','BotonGuardarEdificio',true);
			guardarDDJJ();
		}else {
			mostrarDialogo("#dialog", "Problemas al Guardar Datos", "exclamation", "<p class='invalido'><b>No se han podido guardar los datos del Edificio.</b><br>Revise los datos ingresados y vuelva a intentarlo.</p>", "", "");
		}
	});
}

function guardarDatosAmbito(){
	if ($("#ambitoPiso").val().length > 0){
		var parametros = {
			"accion":		'guardarDatosAmbito',
			"id_ambito":	$("#txtAmbitoId").val(),
			"id_organismo":	$("#txtOrganismoId").val(),
			"id_edificio":	$("#txtEdificioId").val(),
			"piso":			$("#ambitoPiso").val(),
			"oficina":		$("#ambitoOficina").val(),
			"turno":		$("#ambitoTurno").val()
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			if (response > 0){
				$("#txtAmbitoId").val(response);
				startEdit('DatosAmbito','BotonEditarAmbito','BotonGuardarAmbito',true);
				guardarDDJJ();
			}else {
				mostrarDialogo("#dialog", "Problemas al Guardar Datos", "exclamation", "<p class='invalido'><b>No se han podido guardar los datos del Ámbito Laboral.</b><br>Revise los datos ingresados y vuelva a intentarlo.</p>", "", "");
			}
		});
	}else{
		mostrarDialogo("#dialog", "Problemas al Guardar Datos", "exclamation", "<p class='invalido'><b>Los datos del formulario no están completos.</b><br>Revise los datos ingresados y vuelva a intentarlo.</p>", "", "");
	}
}

function guardarDDJJ(){
	var parametros = {
		"accion":		'guardarDDJJ',
		"id_persona":	$("#txtActualId").val(),
		"id_ddjj":		$("#txtDDJJId").val(),
		"id_edificio":	(document.getElementById("txtEdificioId") != null ? $("#txtEdificioId").val() : 'null'),
		"id_ambito":	(document.getElementById("txtAmbitoId") != null ? $("#txtAmbitoId").val() : 'null')
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			guardarItemsDDJJ();
			guardarItemsAnexo();
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido guardar la DDJJ.</b><br>Hay datos que no corresponden al nivel de DDJJ que se intenta guardar.</p>", "", "");
		}else {
			mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido guardar la DDJJ.</b></p>", "", "");
		}
		CheckearVisibilidadBotones();
	});
	CheckearVisibilidadBotones();
}

function startEdit(containerID, buttonStart, buttonEnd, disableInputs){
	if(containerID != ""){
		var container = document.getElementById(containerID).children;
		for(var i = 0; i < container.length; i++) {
			if(container[i].tagName == 'INPUT' || container[i].tagName == 'SELECT') {
				container[i].disabled = disableInputs;
			}else if(container[i].id == buttonStart || container[i].id == buttonEnd) {
				if (container[i].id == buttonStart){
					if(disableInputs == true){
						document.getElementById(buttonStart).className = "button";
					}else{
						document.getElementById(buttonStart).className = "button none";
					}
				}else if (container[i].id == buttonEnd){
					if(disableInputs == true){
						document.getElementById(buttonEnd).className = "button none";
					}else{
						document.getElementById(buttonEnd).className = "button";
					}
				}
			}else{
				startEdit(container[i].id, buttonStart, buttonEnd, disableInputs);
			}
		}
	}
}

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

function verDDJJ(ID_DDJJ){
	var form = $('<form action="visualizacion_riesgos_laborales" method="post">' +
	'<input type="hidden" name="id_ddjj" value="' + ID_DDJJ + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
}

function guardarItemsAnexo(){
	var errores = 0;
	ddjj_anexo_cambios.forEach(function(item, index){
		var parametros = {
			"accion":		'guardarItemAnexoDDJJ',
			"id_ddjj":		item[0],
			"id_anexo":		item[1],
			"id_item":		item[2],
			"valor":		item[3]
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			if (response <= 0){
				errores += 1;
			}
		});
	});
	if (errores <= 0) {
		ddjj_anexo_cambios = new Array();
	}else{
		mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido guardar un Item del Anexo de la DDJJ.</b></p>", "", "");
	}
}

function guardarItemsDDJJ(){
	var errores = 0;
	ddjj_items_cambios.forEach(function(item, index){
		var parametros = {
			"accion":		'guardarItemDDJJ',
			"id_ddjj":		item[0],
			"id_item":		item[1],
			"valor":		item[2]
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			if (response <= 0){
				errores += 1;
			}
		});
	});
	if (errores <= 0) {
		ddjj_items_cambios = new Array();
	}else{
		mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido guardar un Item de la DDJJ.</b></p>", "", "");
	}
}

function nuevaActividadEconomica(){
	if($("#idActividadEconomica").val() >= 0 && $("#idActividadEconomica").val() <= 999999){
		var parametros = {
			"accion":			'nuevaActividadEconomica',
			"id_organismo":		$("#txtOrganismoId").val(),
			"id_actividad":		$("#idActividadEconomica").val()
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			if (response > 0){
				cargarTablaActividades();
				mostrarDialogo("#dialog", "Actividad Económica Vinculada", "ok", "<p><b>La Actividad Económica se ha vinculado correctamente.</b></p>", "", "");
			}else{
				mostrarDialogo("#dialog", "Problemas al Vincular Actividad Económica", "exclamation", "<p class='invalido'><b>No se encuentra una Actividad Económica con el Código ingresado.</b></p>", "", "");
			}
		});
	}else{
		mostrarDialogo("#dialog", "Problemas al Vincular Actividad Económica", "exclamation", "<p class='invalido'><b>No se encuentra una Actividad Económica con el Código ingresado.</b></p>", "", "");
	}
}

function eliminarActividadEconomica(CIIU){

	var parametros = {
		"accion":			'eliminarActividadEconomica',
		"id_organismo":		$("#txtOrganismoId").val(),
		"id_actividad":		CIIU
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			cargarTablaActividades();
			mostrarDialogo("#dialog", "Actividad Económica Desvinculada", "ok", "<p><b>La Actividad Económica se ha desvinculado correctamente.</b></p>", "", "");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Desvincular Actividad Económica", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Actividad Económica. Está siendo utilizado el grupo de esta Actividad Económica para formularios de la SRT.</b></p>", "", "");
		}else{
			mostrarDialogo("#dialog", "Problemas al Desvincular Actividad Económica", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Actividad Económica.</b></p>", "", "");
		}
	});
}

function marcarActividadPrincipal(CIIU){

	var parametros = {
		"accion":			'marcarActividadPrincipal',
		"id_organismo":		$("#txtOrganismoId").val(),
		"id_actividad":		CIIU
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			cargarTablaActividades();
		}else{
			mostrarDialogo("#dialog", "Problemas al Marcar Actividad Económica Principal", "exclamation", "<p class='invalido'><b>No se ha podido marcar la Actividad Económica como Principal.</b></p>", "", "");
		}
	});
}


function cargarTablaActividades(){
	if(document.getElementById("tablaActividadEconomica") != null && oTable1.fnSettings() != null) {
		$('#tablaActividadEconomica > tbody').empty();
		var oSettings = oTable1.fnSettings();
		var iTotalRecords = oSettings.fnRecordsTotal();
		for (i=0;i<=iTotalRecords;i++) {
			oTable1.fnDeleteRow(0,null,true);
		}
		oTable1.fnDestroy();
		if ($("#txtOrganismoId").val() != ''){
			var parametros = {
				"accion":		'obtenerActividadesOrganismo',
				"id_organismo":	$("#txtOrganismoId").val()
			};
			var XHR = $.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post'
			});
			XHR.done(function(response){
				var data = $.parseJSON(response);
				$.each(data, function(idx, elem){
					$('#tablaActividadEconomica > tbody').append(armarFilaTabla(elem.ID, elem.NOMBRE, elem.PRINCIPAL));
				});
				$('#tablaActividadEconomica > tbody').append(armarFilaTabla('', '', null));
				
				oTable1 = $("#tablaActividadEconomica").dataTable(tableOptions);
				oTable1.fnSort( [[0, 'desc']] );
			});
		}else{
			oTable1 = $("#tablaAmbito").dataTable(tableOptions);
			oTable1.fnSort( [[0, 'desc']] );
		}
	}
}

function armarFilaTabla(ID, NOMBRE, PRINCIPAL){

	var retorno = '';

	retorno += '<tr>';
	retorno += '<td align="center">'+ID+'</td>';
	retorno += '<td>'+NOMBRE+'</td>';
	retorno += '<td align="center" '+(NOMBRE != '' || ID != ''	? 'class="imagecel" title="Marcar como Actividad Económica Principal" onclick="marcarActividadPrincipal('+ID+');">'+(PRINCIPAL == 1 ? '<span class="glyphicon glyphicon-ok"></span>' : '') : '>' )+'</td>';
	retorno += '<td align="center" class="imagecel" '+(NOMBRE != '' || ID != ''	? 'title="Eliminar Actividad Económica" onclick="mostrarDialogo(\'#dialog\', \'Desvincular Actividad Económica\', \'question\', \'<p><b>¿Desea desvincular la Actividad Económica del Organismo?</b></p>\', \'SiNo\', \'eliminarActividadEconomica('+ID+');\');"><span class="glyphicon glyphicon-trash"></span>' : 'title="Añadir Actividad Económica" onclick="mostrarDialogo(\'#dialog\', \'Vincular Actividad Económica\', \'question\', \'<p><b>Ingrese el CIIU de la Actividad Económica a vincular:</b><br><br><input type=\\\'text\\\' class=\\\'longtextinput\\\' id=\\\'idActividadEconomica\\\' placeholder=\\\'Ingrese CIIU o texto para buscar...\\\' /></p>\', \'AceptarCancelar\', \'nuevaActividadEconomica();\', \'\', \'crearAutocomplete();\');"><span class="glyphicon glyphicon-plus"></span>')+'</td>';
	retorno += '</tr>';
	
	return retorno;
}

function CheckearVisibilidadBotones(){
	if (document.getElementById("DatosEdificioD") != null){
		if (document.getElementById("DatosAmbitoB") != null){
			if($("#txtAmbitoId").val() != "null"){
				$("#DatosEdificioD").hide();
			}else{
				$("#DatosEdificioD").show();
			}
			
			if($("#txtEdificioId").val() == "null"){
				$("#DatosAmbitoB").hide();
			}else{
				$("#DatosAmbitoB").show();
			}
		}

	}
}

function crearAutocomplete(){
	$("#idActividadEconomica").autocomplete({
		source: function( request, response ) {
			var parametros = {
				"accion":		'buscarActividadEconomica',
				"term":			document.getElementById('idActividadEconomica').value
			};
			$.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post',
				dataType:	'json',
				success:	function( data ) {
								response( $.map( data, function( item ) {
									return {
										label:		item['ID'] + ': ' + item['NOMBRE'],
										value:		item['ID']
									};
								}));
							}
			});
        },
        minLength:	6,
		delay:		1000,
        autoFocus:	true,
        select:		function( event, ui ) {
						$('#idActividadEconomica').prop("value",ui.item.label);
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