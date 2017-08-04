var myurl = 'relevamiento_plan_prevencion';
var min_year = new Date().getFullYear() - 1;
var max_year = new Date().getFullYear() + 1;

var tableOptions =	{		
						"sPaginationType": "full_numbers",															 
						"iDisplayLength": 10,
						"aoColumns":	[
											{"bSearchable": true},
											{"bSearchable": true},
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
										"sZeroRecords": "No se encuentran Formularios para este Periodo.",
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
					
var tableActividadesOptions =	{		
						"sPaginationType": "full_numbers",															 
						"iDisplayLength": 10,
						"aoColumns":	[
											{"bSortable": true},
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
var tableReporteOptions =	{		
						"sPaginationType": "full_numbers",															 
						"iDisplayLength": 10,
						"aoColumns":	[
											{"bSortable": false},
											{"bSortable": false},
											{"bSortable": false},
											{"bSortable": false},
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
										"sZeroRecords": "No se encuentran Reportes disponibles.",
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


if(document.getElementById("tablaReporte") != null) {
	$("#tablaReporte").dataTable(tableReporteOptions);
}
if(document.getElementById("tablaActividadEconomica") != null) {
	$("#tablaActividadEconomica").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tablaAnual") != null) {
	$("#tablaAnual").dataTable(tableOptions).fnSort([[0, 'asc']]);
}
if(document.getElementById("tablaPlanificacion") != null) {
	$("#tablaPlanificacion").dataTable(tableOptions).fnSort([[0, 'asc']]);
}
if(document.getElementById("tablaEjecucion") != null) {
	$("#tablaEjecucion").dataTable(tableOptions).fnSort([[0, 'asc']]);
}

if(document.getElementById("tabla1-0") != null) {
	$("#tabla1-0").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tabla2-1") != null) {
	$("#tabla2-1").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tabla2-2") != null) {
	$("#tabla2-2").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tabla2-3") != null) {
	$("#tabla2-3").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tabla3-1") != null) {
	$("#tabla3-1").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tabla3-2") != null) {
	$("#tabla3-2").dataTable(tableOptions).fnSort([[0, 'desc']]);
}
if(document.getElementById("tabla3-3") != null) {
	$("#tabla3-3").dataTable(tableOptions).fnSort([[0, 'desc']]);
}

$(document).ready(function(){

	$( function() {
		$( document ).tooltip({
			show: {
				effect: "highlight",
				delay: 750
			}
		});
	});
	$("#tabsTipoPlanilla" ).tabs({ active: 0 });
	$("#tabsTipoPlanillaTotal" ).tabs({ active: 0 });
	
	jQuery(function($) {
		$("#cmbOrganismo").change(function(){
			$("#txtOrganismoId").val($("#cmbOrganismo").val());
			cargarTablaActividades();
		});
		$("#cmbAnio").change(function(){
			buscarFormulario(1);
			$(".selectedyear").each(function() {
				$(this).text($("#cmbAnio").val());
			});
		});
	});
	
	cargarTablaActividades();
	
});

function crearFormulario(ID_PERSONA, ID_TIPO, ID_PERIODO){
	var parametros = {
		"accion":			'crearFormulario',
		"id_persona":		ID_PERSONA,
		"id_organismo":		$("#cmbOrganismo").val(),
		"anio":				$("#cmbAnio").val(),
		"id_tipo":			ID_TIPO,
		"id_periodo":		(ID_PERIODO == 0 ? 0 : $("#periodoFormulario").val())
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			editarFormulario(response,1);
		}else{
			mostrarDialogo("#dialog", "Problemas al Realizar Creación", "exclamation", "<p class='invalido'><b>No se ha podido crear el Formulario.</b></p>", "", "");
		}
	});
}

function refreshDatatable(id, options, sort){
	if(id != null){
		var rows = new Array();
		var table = $("#"+id).dataTable(options);
		if(table.fnSettings() != null) {
			$('#'+id+' > tbody > tr').each(function() {
				rows.push($(this));
			});
			$('#'+id+' > tbody').empty();
			var settings = table.fnSettings();
			var records = settings.fnRecordsTotal();
			for (i=0; i<=records; i++) {
				table.fnDeleteRow(0,null,true);
			}
			table.fnDestroy();
			rows.forEach(function(row) {
				$('#'+id+' > tbody').append(row);
			});
			table = $('#'+id).dataTable(options);
			if(sort != null){
				table.fnSort(sort);
			}
		}
	}
}

function buscarFormulario(ID_TIPO){
	var parametros = {
		"accion":		'buscarFormulario',
		"id_persona":	$("#txtActualId").val(),
		"id_organismo":	$("#cmbOrganismo").val(),
		"id_tipo":		ID_TIPO,
		"id_periodo":	'null',
		"anio":			$("#cmbAnio").val()
	};

	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		var data = $.parseJSON(response);
		if (ID_TIPO == 1){
			$('#tablaAnual > tbody').empty();
			$.each(data, function(idx, elem){
				$('#tablaAnual > tbody').append(armarFilaTablaFormularios(elem.ID, elem.ANIO, elem.ESTADO, elem.NOMBRE_ESTADO, elem.FECHA_VENCIMIENTO));
			});
			refreshDatatable("tablaAnual", tableOptions, [[0, 'asc']]);
			buscarFormulario(ID_TIPO + 1);
		}
		if (ID_TIPO == 2){
			$('#tablaPlanificacion > tbody').empty();
			$.each(data, function(idx, elem){
				$('#tablaPlanificacion > tbody').append(armarFilaTablaFormularios(elem.ID, elem.ID_PERIODO, elem.ESTADO, elem.NOMBRE_ESTADO, elem.FECHA_VENCIMIENTO));
			});
			refreshDatatable("tablaPlanificacion", tableOptions, [[0, 'asc']]);
			buscarFormulario(ID_TIPO + 1);
		}
		if (ID_TIPO == 3){
			$('#tablaEjecucion > tbody').empty();
			$.each(data, function(idx, elem){
				$('#tablaEjecucion > tbody').append(armarFilaTablaFormularios(elem.ID, elem.ID_PERIODO, elem.ESTADO, elem.NOMBRE_ESTADO, elem.FECHA_VENCIMIENTO));
			});
			refreshDatatable("tablaEjecucion", tableOptions, [[0, 'asc']]);
			reporteFormularios(1, 0)
		}
	});
}

function reporteFormularios(ID_TIPO, ID_PERIODO){
	var parametros = {
		"accion":		'reporteFormularios',
		"id_tipo":		ID_TIPO,
		"id_periodo":	ID_PERIODO,
		"anio":			$("#cmbAnio").val()
	};

	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});

	XHR.done(function(response){
		var data = $.parseJSON(response);
		
		var tabla = "tabla"+ID_TIPO+"-"+ID_PERIODO;
		
		$('#'+tabla+' > tbody').empty();
		$.each(data, function(idx, elem){
			$('#'+tabla+' > tbody').append(armarFilaTablaFormulariosTotal(elem.ID, elem.ESTADO, elem.NOMBRE_ORGANISMO, elem.ID_TIPO, elem.ID_PERIODO));
		});
		refreshDatatable(tabla, tableOptions, [[0, 'desc']]);
		
		if(!(ID_TIPO == 3 && ID_PERIODO == 3)){
			reporteFormularios(((ID_TIPO == 1 || ID_PERIODO == 3) ? ID_TIPO+1 : ID_TIPO), (ID_PERIODO < 3 ? ID_PERIODO+1 : 1));
		}
	});
}


function verFormulario(ID_FORMULARIO){
	var form = $('<form action="visualizacion_plan_prevencion" method="post">' +
	'<input type="hidden" name="id_formulario" value="' + ID_FORMULARIO + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
}

function verReporte(ANIO, ID_TIPO, ID_PERIODO){
	var form = $('<form action="visualizacion_plan_prevencion" method="post">' +
	'<input type="hidden" name="anio" value="' + ANIO + '" />' +
	'<input type="hidden" name="id_tipo" value="' + ID_TIPO + '" />' +
	'<input type="hidden" name="id_periodo" value="' + ID_PERIODO + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
}

function convertirFecha(fecha){
	return fecha.replace( /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1T$4:$5:$6");
}

function armarFilaTablaFormularios(ID_FORMULARIO, PERIODO, ESTADO, NOMBRE_ESTADO, VENCIMIENTO){
	var EDITAR = 1;
	var VER = 1;
	var retorno = '';
	var DATE_FECHA_BAJA = new Date(convertirFecha(VENCIMIENTO));
	var DATE_HOY = new Date();
	
	retorno += '<tr>';
	retorno += '<td align="center"'+ (DATE_FECHA_BAJA <= DATE_HOY ? ' class="invalido"' : '') +'>'+PERIODO+'</td>';
	retorno += '<td'+ (DATE_FECHA_BAJA <= DATE_HOY ? ' class="invalido"' : '') +'>'+NOMBRE_ESTADO+' - VENCIMIENTO '+VENCIMIENTO+(DATE_FECHA_BAJA <= DATE_HOY ? ' (VENCIDO)' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1	? ' class="imagecel"	title="Finalizar Formulario"	onclick="mostrarDialogo(\'#dialog\', \'Finalizar Formulario\', \'question\', \'<p><b>¿Desea marcar el Formulario como finalizado?</b><br>Una vez realizado esta accion el Formulario no podrá volver a ser editado.</p>\', \'SiNo\', \'finalizarFormulario('+ID_FORMULARIO+','+document.getElementById('txtActualId').value+');\');"'	: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-ok"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1	? ' class="imagecel"	title="Editar Formulario"		onclick="editarFormulario(\''+ID_FORMULARIO+'\',\'0\');"'		: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-pencil"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1	? ' class="imagecel"	title="Eliminar Formulario"		onclick="mostrarDialogo(\'#dialog\', \'Eliminar Formulario\', \'question\', \'<p><b>¿Desea eliminar el Formulario?</b><br>Esta accion no es reversible.</p>\', \'SiNo\', \'eliminarFormulario('+ID_FORMULARIO+','+document.getElementById('txtActualId').value+');\');"'	: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-trash"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(VER == 1 || EDITAR == 1		? ' class="imagecel"	title="Visualizar Formulario"	onclick="verFormulario(\''+ID_FORMULARIO+'\')"'			: '')+'>'+(VER == 1 || EDITAR == 1	? '<span class="glyphicon glyphicon-eye-open"></span>' : '')+'</td>';
	retorno += '</tr>';

	return retorno;
}

function armarFilaTablaFormulariosTotal(ID_FORMULARIO, ESTADO, NOMBRE_ORGANISMO, ID_TIPO, ID_PERIODO){
	var EDITAR = 1;
	var VER = 1;
	var retorno = '';

	retorno += '<tr>';
	retorno += '<td align="center">'+(ESTADO == null ? "-" : ESTADO)+'</td>';
	retorno += '<td>'+NOMBRE_ORGANISMO+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1					? ' class="imagecel"	title="Finalizar Formulario"	onclick="mostrarDialogo(\'#dialog\', \'Finalizar Formulario\', \'question\', \'<p><b>¿Desea marcar el Formulario como finalizado?</b><br>Una vez realizado esta accion el Formulario no podrá volver a ser editado.</p>\', \'SiNo\', \'finalizarFormulario('+ID_FORMULARIO+','+document.getElementById('txtActualId').value+');\');"'	: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-ok"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1					? ' class="imagecel"	title="Editar Formulario"		onclick="editarFormulario(\''+ID_FORMULARIO+'\',\'0\');"'		: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-pencil"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1					? ' class="imagecel"	title="Eliminar Formulario"		onclick="mostrarDialogo(\'#dialog\', \'Eliminar Formulario\', \'question\', \'<p><b>¿Desea eliminar el Formulario?</b><br>Esta accion no es reversible.</p>\', \'SiNo\', \'eliminarFormulario('+ID_FORMULARIO+','+document.getElementById('txtActualId').value+');\');"'	: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-trash"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO != null && (VER == 1 || EDITAR == 1)	? ' class="imagecel"	title="Visualizar Formulario"	onclick="verFormulario(\''+ID_FORMULARIO+'\')"'			: '')+'>'+(ESTADO != null && (VER == 1 || EDITAR == 1)	? '<span class="glyphicon glyphicon-eye-open"></span>' : '')+'</td>';
	retorno += '</tr>';

	return retorno;
}


function editarFormulario(ID_FORMULARIO, NUEVO){
	var form = $('<form action="edicion_plan_prevencion" method="post">' +
	'<input type="hidden" name="id_formulario" value="' + ID_FORMULARIO + '" />' +
	'<input type="hidden" name="nuevo" value="' + NUEVO + '" />' +
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
			mostrarDialogo("#dialog", "Formulario Eliminado", "ok", "<p><b>El Formulario ha sido eliminado correctamente.</b></p>", "", "", "buscarFormulario(1);");
		}else{
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar el Formulario.</b></p>", "", "");
		}
	});
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
				mostrarDialogo("#dialog", "Actividad Económica Vinculada", "ok", "<p><b>La Actividad Económica se ha vinculado correctamente.</b></p>", "", "", "cargarTablaActividades();");
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
			mostrarDialogo("#dialog", "Actividad Económica Desvinculada", "ok", "<p><b>La Actividad Económica se ha desvinculado correctamente.</b></p>", "", "", "cargarTablaActividades();");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Desvincular Actividad Económica", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Actividad Económica. Está siendo utilizado el grupo de esta Actividad Económica para formularios de la SRT.</b></p>", "", "");
		}else{
			mostrarDialogo("#dialog", "Problemas al Desvincular Actividad Económica", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Actividad Económica.</b></p>", "", "");
		}
	});
}

function cargarTablaActividades(){
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
		$('#tablaActividadEconomica > tbody').empty();
		var data = $.parseJSON(response);
		$.each(data, function(idx, elem){
			$('#tablaActividadEconomica > tbody').append(armarFilaTablaActividad(elem.ID, elem.NOMBRE));
		});
		$('#tablaActividadEconomica > tbody').append(armarFilaTablaActividad('', ''));
		refreshDatatable("tablaActividadEconomica", tableActividadesOptions, [[0, 'desc']]);
		buscarFormulario(1);
	});
}

function armarFilaTablaActividad(ID, NOMBRE){

	var retorno = '';

	retorno += '<tr>';
	retorno += '<td align="center">'+ID+'</td>';
	retorno += '<td>'+NOMBRE+'</td>';
	retorno += '<td align="center" class="imagecel" '+(NOMBRE != '' || ID != ''	? 'title="Eliminar Actividad Económica" onclick="mostrarDialogo(\'#dialog\', \'Desvincular Actividad Económica\', \'question\', \'<p><b>¿Desea desvincular la Actividad Económica del Organismo?</b></p>\', \'SiNo\', \'eliminarActividadEconomica('+parseInt(ID)+');\');"><span class="glyphicon glyphicon-trash"></span>' : 'title="Añadir Actividad Económica" onclick="mostrarDialogo(\'#dialog\', \'Vincular Actividad Económica\', \'question\', \'<p><b>Ingrese el CIIU de la Actividad Económica a vincular:</b><br><br><input type=\\\'text\\\' class=\\\'longtextinput\\\' id=\\\'idActividadEconomica\\\' placeholder=\\\'Ingrese CIIU o texto para buscar...\\\' /></p>\', \'AceptarCancelar\', \'nuevaActividadEconomica();\', \'\', \'crearAutocomplete();\');"><span class="glyphicon glyphicon-plus"></span>')+'</td>';
	retorno += '</tr>';
	
	return retorno;
}

function actualizarCuatrimestre(id_tabla){
	$('#periodoFormulario').val($('#'+id_tabla+' tr').length - $('#'+id_tabla+' tr .dataTables_empty').length);
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
        minLength:	3,
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