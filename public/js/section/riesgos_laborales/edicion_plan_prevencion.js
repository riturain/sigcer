var myurl = 'edicion_plan_prevencion';
var fromurl = 'relevamiento_plan_prevencion';

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

if(document.getElementById("tablaEstablecimientosProvincia") != null) {
	$("#tablaEstablecimientosProvincia").dataTable(tableOptions).fnSort([[0, 'desc']]);
}

function verFormulario(ID_FORMULARIO){
	var form = $('<form action="visualizacion_plan_prevencion" method="post">' +
	'<input type="hidden" name="id_formulario" value="' + ID_FORMULARIO + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
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
	
    $(".numericinput").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
			return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
        }
    });
	$(".numericinput").keyup(function () {
        if ($(this).val() == "") {
			$(this).val(0);
        }else{
			$(this).val(parseInt($(this).val()));
		}
    });
	
	for (i = 0; i <= 9; i++){
		if(document.getElementById("cantidadCuits"+i) != null){
			resetearCuits(0, $("#cantidadCuits"+i).val() == 0);
		}
	}
	
	$("#cantidadCuits0").focusout(function(){resetearCuits(0, $(this).val() == 0)});
	$("#cantidadCuits1").focusout(function(){resetearCuits(1, $(this).val() == 0)});
	$("#cantidadCuits2").focusout(function(){resetearCuits(2, $(this).val() == 0)});
	$("#cantidadCuits3").focusout(function(){resetearCuits(3, $(this).val() == 0)});
	$("#cantidadCuits4").focusout(function(){resetearCuits(4, $(this).val() == 0)});
	$("#cantidadCuits5").focusout(function(){resetearCuits(5, $(this).val() == 0)});
	$("#cantidadCuits6").focusout(function(){resetearCuits(6, $(this).val() == 0)});
	$("#cantidadCuits7").focusout(function(){resetearCuits(7, $(this).val() == 0)});
	$("#cantidadCuits8").focusout(function(){resetearCuits(8, $(this).val() == 0)});
	$("#cantidadCuits9").focusout(function(){resetearCuits(9, $(this).val() == 0)});
	
	$("#cantidadCuits0").keyup(function(){if($(this).val() > 0){resetearCuits(0, $(this).val() == 0)}});
	$("#cantidadCuits1").keyup(function(){if($(this).val() > 0){resetearCuits(1, $(this).val() == 0)}});
	$("#cantidadCuits2").keyup(function(){if($(this).val() > 0){resetearCuits(2, $(this).val() == 0)}});
	$("#cantidadCuits3").keyup(function(){if($(this).val() > 0){resetearCuits(3, $(this).val() == 0)}});
	$("#cantidadCuits4").keyup(function(){if($(this).val() > 0){resetearCuits(4, $(this).val() == 0)}});
	$("#cantidadCuits5").keyup(function(){if($(this).val() > 0){resetearCuits(5, $(this).val() == 0)}});
	$("#cantidadCuits6").keyup(function(){if($(this).val() > 0){resetearCuits(6, $(this).val() == 0)}});
	$("#cantidadCuits7").keyup(function(){if($(this).val() > 0){resetearCuits(7, $(this).val() == 0)}});
	$("#cantidadCuits8").keyup(function(){if($(this).val() > 0){resetearCuits(8, $(this).val() == 0)}});
	$("#cantidadCuits9").keyup(function(){if($(this).val() > 0){resetearCuits(9, $(this).val() == 0)}});
	
	$("#cantidadAvisoObras0").keyup(function(){$("#cantidadEstablecimientos0").val(parseInt($("#cantidadAvisoObras0").val()) +  parseInt($("#cantidadGrupoBasico0").val()));});
	$("#cantidadAvisoObras1").keyup(function(){$("#cantidadEstablecimientos1").val(parseInt($("#cantidadAvisoObras1").val()) +  parseInt($("#cantidadGrupoBasico1").val()));});
	$("#cantidadAvisoObras2").keyup(function(){$("#cantidadEstablecimientos2").val(parseInt($("#cantidadAvisoObras2").val()) +  parseInt($("#cantidadGrupoBasico2").val()));});
	$("#cantidadAvisoObras3").keyup(function(){$("#cantidadEstablecimientos3").val(parseInt($("#cantidadAvisoObras3").val()) +  parseInt($("#cantidadGrupoBasico3").val()));});
	$("#cantidadAvisoObras4").keyup(function(){$("#cantidadEstablecimientos4").val(parseInt($("#cantidadAvisoObras4").val()) +  parseInt($("#cantidadGrupoBasico4").val()));});
	$("#cantidadAvisoObras5").keyup(function(){$("#cantidadEstablecimientos5").val(parseInt($("#cantidadAvisoObras5").val()) +  parseInt($("#cantidadGrupoBasico5").val()));});
	$("#cantidadAvisoObras6").keyup(function(){$("#cantidadEstablecimientos6").val(parseInt($("#cantidadAvisoObras6").val()) +  parseInt($("#cantidadGrupoBasico6").val()));});
	$("#cantidadAvisoObras7").keyup(function(){$("#cantidadEstablecimientos7").val(parseInt($("#cantidadAvisoObras7").val()) +  parseInt($("#cantidadGrupoBasico7").val()));});
	$("#cantidadAvisoObras8").keyup(function(){$("#cantidadEstablecimientos8").val(parseInt($("#cantidadAvisoObras8").val()) +  parseInt($("#cantidadGrupoBasico8").val()));});
	$("#cantidadAvisoObras9").keyup(function(){$("#cantidadEstablecimientos9").val(parseInt($("#cantidadAvisoObras9").val()) +  parseInt($("#cantidadGrupoBasico9").val()));});
	
	$("#cantidadGrupoBasico0").keyup(function(){$("#cantidadEstablecimientos0").val(parseInt($("#cantidadAvisoObras0").val()) +  parseInt($("#cantidadGrupoBasico0").val()));});
	$("#cantidadGrupoBasico1").keyup(function(){$("#cantidadEstablecimientos1").val(parseInt($("#cantidadAvisoObras1").val()) +  parseInt($("#cantidadGrupoBasico1").val()));});
	$("#cantidadGrupoBasico2").keyup(function(){$("#cantidadEstablecimientos2").val(parseInt($("#cantidadAvisoObras2").val()) +  parseInt($("#cantidadGrupoBasico2").val()));});
	$("#cantidadGrupoBasico3").keyup(function(){$("#cantidadEstablecimientos3").val(parseInt($("#cantidadAvisoObras3").val()) +  parseInt($("#cantidadGrupoBasico3").val()));});
	$("#cantidadGrupoBasico4").keyup(function(){$("#cantidadEstablecimientos4").val(parseInt($("#cantidadAvisoObras4").val()) +  parseInt($("#cantidadGrupoBasico4").val()));});
	$("#cantidadGrupoBasico5").keyup(function(){$("#cantidadEstablecimientos5").val(parseInt($("#cantidadAvisoObras5").val()) +  parseInt($("#cantidadGrupoBasico5").val()));});
	$("#cantidadGrupoBasico6").keyup(function(){$("#cantidadEstablecimientos6").val(parseInt($("#cantidadAvisoObras6").val()) +  parseInt($("#cantidadGrupoBasico6").val()));});
	$("#cantidadGrupoBasico7").keyup(function(){$("#cantidadEstablecimientos7").val(parseInt($("#cantidadAvisoObras7").val()) +  parseInt($("#cantidadGrupoBasico7").val()));});
	$("#cantidadGrupoBasico8").keyup(function(){$("#cantidadEstablecimientos8").val(parseInt($("#cantidadAvisoObras8").val()) +  parseInt($("#cantidadGrupoBasico8").val()));});
	$("#cantidadGrupoBasico9").keyup(function(){$("#cantidadEstablecimientos9").val(parseInt($("#cantidadAvisoObras9").val()) +  parseInt($("#cantidadGrupoBasico9").val()));});
	
	$("#accordion").accordion({});
	$('.ui-accordion-content').attr('style', function(i, style){
		return style.replace(/height[^;]+;?/g, '');
	});
});

function resetearCuits(grupo, sino){
	if(sino == true){
		$("#cantidadCubiertos"+grupo).val(0);
		$("#cantidadExamenesMedicos"+grupo).val(0);
		$("#cantidadCapacitaciones"+grupo).val(0);
		$("#cantidadVisitas"+grupo).val(0);
		$("#cantidadRar"+grupo).val(0);
		$("#cantidadRgrl"+grupo).val(0);
		$("#cantidadGrupoBasico"+grupo).val(0);
		$("#cantidadAvisoObras"+grupo).val(0);
		$("#cantidadEstablecimientos"+grupo).val(0);
	}
	$("#cantidadCubiertos"+grupo).prop('disabled', sino);
	$("#cantidadExamenesMedicos"+grupo).prop('disabled', sino);
	$("#cantidadCapacitaciones"+grupo).prop('disabled', sino);
	$("#cantidadVisitas"+grupo).prop('disabled', sino);
	$("#cantidadRar"+grupo).prop('disabled', sino);
	$("#cantidadRgrl"+grupo).prop('disabled', sino);
	$("#cantidadGrupoBasico"+grupo).prop('disabled', sino);
	$("#cantidadAvisoObras"+grupo).prop('disabled', sino);
}

function obtenerProvincias(){
	var parametros = {
		"accion":			'obtenerProvincias',
		"term":				''
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		var selected = false;
		var combo = '<select name="cmbProvincias" class="dropdown-toggle longtextinput" id="cmbProvincias">';
		var data = $.parseJSON(response);
		$.each(data, function(idx, elem){
			combo += '<option value="'+elem.ID+'" '+(selected == false ? 'selected="selected"' : '')+'>' + elem.DESCRIPCION + '</option>';
			selected = true;
		});
		combo += '</select>';
		
		mostrarDialogo('#dialog', 'Selección de Provincia', 'info', '<p><b>Seleccione la Provincia que desea vincular:</b><br><br>'+combo+'</p>', 'AceptarCancelar', 'nuevaProvincia("cmbProvincias");');
	});
}

function nuevaProvincia(elemento){
	var ID = $("#"+elemento+" option:selected").val();
	if(document.getElementById("idFilaProvincia"+ID) == null){
		var parametros = {
			"accion":			'guardarProvincia',
			"id_formulario":	$("#txtFormularioId").val(),
			"id_provincia":		ID,
			"establecimientos":	'0'
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			if (response == 1){
				var fila = '';
				fila += '<tr id="idFilaProvincia'+ID+'">';
				fila += '<td align="center" class="shortcolumn">'+ID+'</td>';
				fila += '<td id="nombreProvincia'+ID+'">'+$("#"+elemento+" option:selected").text()+'</td>';
				fila += '<td id="cantidadEstablecimientosProvincia'+ID+'" align="center" class="imagecel" onclick="editarCantidadProvincia(\'cantidadEstablecimientosProvincia'+ID+'\');">0</td>';
				fila += '<td align="center" class="imagecel" onclick="mostrarDialogo(\'#dialog\', \'Desvincular Provincia\', \'question\', \'<p><b>¿Desea desvincular la Provincia del Organismo?</b></p>\', \'SiNo\', \'eliminarProvincia('+ID+');\');"><span class="glyphicon glyphicon-trash"></span></td>';
				fila += '</tr>';
				$('#tablaEstablecimientosProvincia > tbody').append(fila);
				refreshDatatable("tablaEstablecimientosProvincia", tableOptions, [[0, 'desc']]);
			}else if (response == -1){
				mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido vincular la Provincia al Formulario.</b></p>", "", "");
			}else if (response == -2){
				mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido vincular la Provincia al Formulario.</b><br>Usted no dispone permisos para realizar esta acción.</p>", "", "");
			}
		});
	}
}

function eliminarProvincia(id){
	var parametros = {
		"accion":			'eliminarProvincia',
		"id_formulario":	$("#txtFormularioId").val(),
		"id_provincia":		id
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			if(document.getElementById("idFilaProvincia"+id) != null){
				$("#idFilaProvincia"+id).remove();
				refreshDatatable("tablaEstablecimientosProvincia", tableOptions, [[0, 'desc']]);
			}
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Desvincular Provincia", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Provincia al Formulario.</b></p>", "", "");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Desvincular Provincia", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Provincia al Formulario.</b><br>Usted no dispone permisos para realizar esta acción.</p>", "", "");
		}
	});
}

function editarCantidadProvincia(id){
	var input = '<input type="text" class="longtextinput" value="'+$('#'+id).text()+'" id="txtCantidadProvinciaInput" placeholder="Nº (Obligatorio)" maxlength="11"/>';
	mostrarDialogo('#dialog', 'Cantidad de Establecimientos', 'info', '<p><b>Ingrese la cantidad de establecimientos de esta provincia:</b><br><br>'+input+'</p>', 'AceptarCancelar', 'guardarCantidadProvincia("'+id+'","txtCantidadProvinciaInput");');
    
	$("#txtCantidadProvinciaInput").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
			return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
        }
    });
	
	$("#txtCantidadProvinciaInput").keyup(function () {
        if ($(this).val() == "") {
			$(this).val(0);
        }else{
			$(this).val(parseInt($(this).val()));
		}
    });
}

function guardarCantidadProvincia(idCelda, idInput){
	var parametros = {
		"accion":			'guardarProvincia',
		"id_formulario":	$("#txtFormularioId").val(),
		"id_provincia":		idCelda.substring(33),
		"establecimientos":	$('#'+idInput).val()
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			$('#'+idCelda).text($('#'+idInput).val());
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Desvincular Provincia", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Provincia al Formulario.</b></p>", "", "");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Desvincular Provincia", "exclamation", "<p class='invalido'><b>No se ha podido desvincular la Provincia al Formulario.</b><br>Usted no dispone permisos para realizar esta acción.</p>", "", "");
		}
	});
}

function guardarFormulario(){
	var parametros = {
		"accion":				'guardarFormulario',
		"id_formulario":		$("#txtFormularioId").val(),
		"dependientes":			$("#cantidadDependientes").val(),
		"contratados":			$("#cantidadContratados").val(),
		"examenes_medicos":		$("#cantidadExamenesMedicos").val(),
		"monto_visitas":		$("#montoVisitas").val(),
		"monto_capacitacion":	$("#montoCapacitacion").val(),
		"monto_examen_medico":	$("#montoExamenMedico").val()
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			guardarActividad();
		}else {
			mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido guardar el Formulario.</b></p>", "", "");
		}
	});
}

function guardarActividad(){
	var errores = 0;
	var i = 0;
	for(i = 0; i < 10; i++){
		if(document.getElementById("cantidadCuits"+i) != null){
			var parametros = {
				"accion":			'guardarActividad',
				"id_formulario":	$("#txtFormularioId").val(),
				"id_grupo":			i,
				"cuits":			$("#cantidadCuits"+i).val(),
				"cubiertos":		$("#cantidadCubiertos"+i).val(),
				"establecimientos":	$("#cantidadEstablecimientos"+i).val(),
				"visitas":			$("#cantidadVisitas"+i).val(),
				"examenes_medicos":	$("#cantidadExamenesMedicos"+i).val(),
				"capacitaciones":	$("#cantidadCapacitaciones"+i).val(),
				"rar":				$("#cantidadRar"+i).val(),
				"rgrl":				$("#cantidadRgrl"+i).val(),
				"grupo_basico":		$("#cantidadGrupoBasico"+i).val(),
				"aviso_obras":		$("#cantidadAvisoObras"+i).val()
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
		}
	}
	if (errores > 0) {
		mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se han podido guardar los valores de un Grupo CIIU.</b></p>", "", "");
	}
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

function redireccionar(){
	window.location.href = window.location.href.replace(myurl, fromurl);
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