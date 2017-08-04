var myurl = 'relevamiento_riesgos_laborales';
var min_year = new Date().getFullYear() - 2;
var max_year = new Date().getFullYear() + 2;

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
										"sZeroRecords": "No se encuentran DDJJ para esta entidad específica.",
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
if(document.getElementById("tablaOrganismo") != null) {
	var oTable1 = $("#tablaOrganismo").dataTable(tableOptions);
	oTable1.fnSort( [[0, 'asc']] ); 
}
if(document.getElementById("tablaEdificio") != null) {
	var oTable2 = $("#tablaEdificio").dataTable(tableOptions);
	oTable2.fnSort( [[0, 'asc']] ); 
}
if(document.getElementById("tablaAmbito") != null) {
	var oTable3 = $("#tablaAmbito").dataTable(tableOptions);
	oTable3.fnSort( [[0, 'asc']] ); 
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

	jQuery(function($) {
		$("#cmbOrganismo").change(function(){
			localStorage.setItem('cmbOrganismo', $(this).val());
			buscarPartido(document.getElementById('txtActualId').value, localStorage.getItem('cmbPartido'));
		});
		$("#cmbPartido").change(function(){
			localStorage.setItem('cmbPartido', $(this).val());
			buscarLocalidad(document.getElementById('txtActualId').value, $(this).val(), localStorage.getItem('cmbLocalidad'));
		});
		$("#cmbLocalidad").change(function(){
			localStorage.setItem('cmbLocalidad', $(this).val());
			cargarTablaOrganismo();
			if(document.getElementById("cmbEdificio") != null) {
				buscarEdificio(document.getElementById('txtActualId').value, $("#cmbPartido").val(), $(this).val(), localStorage.getItem('cmbEdificio'));
			}
		});
		$("#cmbEdificio").change(function(){
			localStorage.setItem('cmbEdificio', $(this).val());
			cargarTablaEdificio();
			if(document.getElementById("cmbAmbito") != null) {
				buscarAmbito(document.getElementById('txtActualId').value, $("#cmbOrganismo").val(), $(this).val(), localStorage.getItem('cmbAmbito'));
			}
		});
		$("#cmbAmbito").change(function(){
			localStorage.setItem('cmbAmbito', $(this).val());
			cargarTablaAmbito();
		});
	});
	
	inicializarCombos();
});

function inicializarCombos(){
	if(localStorage.getItem('cmbOrganismo') == "" || localStorage.getItem('cmbOrganismo') == "null" || localStorage.getItem('cmbOrganismo') === null || localStorage.getItem('cmbOrganismo') == null){
		localStorage.setItem('cmbOrganismo', 'null');
		localStorage.setItem('cmbPartido', 'null');
		localStorage.setItem('cmbLocalidad', 'null');
		localStorage.setItem('cmbEdificio', 'null');
		localStorage.setItem('cmbAmbito', 'null');
		buscarOrganismo	(document.getElementById('txtActualId').value, document.getElementById('txtActualId').value, document.getElementById('txtOrganismoId').value);
	}else{
		buscarOrganismo	(document.getElementById('txtActualId').value, document.getElementById('txtActualId').value, localStorage.getItem('cmbOrganismo'));
	}
}

function cargarTablaOrganismo(){
	if(document.getElementById("tablaOrganismo") != null && oTable1.fnSettings() != null) {
		$('#tablaOrganismo > tbody').empty();
		var oSettings = oTable1.fnSettings();
		var iTotalRecords = oSettings.fnRecordsTotal();
		for (i=0;i<=iTotalRecords;i++) {
			oTable1.fnDeleteRow(0,null,true);
		}
		oTable1.fnDestroy();
		$('#txtMaxIdO').prop("value","");

		if ($("#cmbOrganismo").val() != '' && $("#cmbPartido").val() != '' && $("#cmbLocalidad").val() != ''){
			var parametros = {
				"accion":		'buscarDDJJ',
				"id_ddjj":		'null',
				"id_persona":	$("#txtActualId").val(),
				"id_localidad":	$("#cmbLocalidad").val(),
				"id_partido":	$("#cmbPartido").val(),
				"id_organismo":	$("#cmbOrganismo").val(),
				"id_edificio":	'null',
				"id_ambito":	'null',
				"periodo":		'null',
				"nivel":		'O'
			};
			var XHR = $.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post'
			});
			XHR.done(function(response){
				var data = $.parseJSON(response);
				$.each(data, function(idx, elem){
					$('#tablaOrganismo > tbody').append(armarFilaTabla(elem.ID, elem.PERIODO, elem.VERSION, elem.ESTADO, elem.NOMBRE_ESTADO, elem.VER_ORGANISMO, elem.EDICION_ORGANISMO, elem.ORGANISMOS_PROPIOS, elem.ID_CREADOR));
					$('#txtMaxIdO').prop("value",elem.ID);
				});
				
				oTable1 = $("#tablaOrganismo").dataTable(tableOptions);
				oTable1.fnSort( [[0, 'asc']] );
			});
		}else{
			oTable1 = $("#tablaAmbito").dataTable(tableOptions);
			oTable1.fnSort( [[0, 'asc']] );
		}
	}
}

function cargarTablaEdificio(){
	if(document.getElementById("tablaEdificio") != null && oTable2.fnSettings() != null) {
		$('#tablaEdificio > tbody').empty();
		var oSettings = oTable2.fnSettings();
		var iTotalRecords = oSettings.fnRecordsTotal();
		for (i=0;i<=iTotalRecords;i++) {
			oTable2.fnDeleteRow(0,null,true);
		}
		oTable2.fnDestroy();
		$('#txtMaxIdE').prop("value","");
		
		if ($("#cmbOrganismo").val() != '' && $("#cmbPartido").val() != '' && $("#cmbLocalidad").val() != '' && $("#cmbEdificio").val() != ''){
			var parametros = {
				"accion":		'buscarDDJJ',
				"id_ddjj":		'null',
				"id_persona":	$("#txtActualId").val(),
				"id_localidad":	$("#cmbLocalidad").val(),
				"id_partido":	$("#cmbPartido").val(),
				"id_organismo":	$("#cmbOrganismo").val(),
				"id_edificio":	$("#cmbEdificio").val(),
				"id_ambito":	'null',
				"periodo":		'null',
				"nivel":		'E'
			};
			var XHR = $.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post'
			});
			XHR.done(function(response){
				var data = $.parseJSON(response);
				$.each(data, function(idx, elem){
					if (elem.ID_EDIFICIO == $("#cmbEdificio").val() || (elem.ID_EDIFICIO == null && $("#cmbEdificio").val() == "null")){
						$('#tablaEdificio > tbody').append(armarFilaTabla(elem.ID, elem.PERIODO, elem.VERSION, elem.ESTADO, elem.NOMBRE_ESTADO, elem.VER_EDIFICIO, elem.EDICION_EDIFICIO, elem.EDIFICIOS_PROPIOS, elem.ID_CREADOR));
						$('#txtMaxIdE').prop("value",elem.ID);
					}
				});
				
				oTable2 = $("#tablaEdificio").dataTable(tableOptions);
				oTable2.fnSort( [[0, 'asc']] );
			});
		}else{
			oTable2 = $("#tablaEdificio").dataTable(tableOptions);
			oTable2.fnSort( [[0, 'asc']] );
		}
	}
}


function cargarTablaAmbito(){
	if(document.getElementById("tablaAmbito") != null && oTable3.fnSettings() != null) {
		$('#tablaAmbito > tbody').empty();
		var oSettings = oTable3.fnSettings();
		var iTotalRecords = oSettings.fnRecordsTotal();
		for (i=0;i<=iTotalRecords;i++) {
			oTable3.fnDeleteRow(0,null,true);
		}
		oTable3.fnDestroy();
		$('#txtMaxIdA').prop("value","");
		
		if ($("#cmbOrganismo").val() != '' && $("#cmbPartido").val() != '' && $("#cmbLocalidad").val() != '' && $("#cmbEdificio").val() != '' && $("#cmbAmbito").val() != ''){
			var parametros = {
				"accion":		'buscarDDJJ',
				"id_ddjj":		'null',
				"id_persona":	$("#txtActualId").val(),
				"id_localidad":	$("#cmbLocalidad").val(),
				"id_partido":	$("#cmbPartido").val(),
				"id_organismo":	$("#cmbOrganismo").val(),
				"id_edificio":	$("#cmbEdificio").val(),
				"id_ambito":	$("#cmbAmbito").val(),
				"periodo":		'null',
				"nivel":		'A'
			};
			var XHR = $.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post'
			});
			XHR.done(function(response){
				var data = $.parseJSON(response);
				$.each(data, function(idx, elem){
					if ((elem.ID_AMBITO == $("#cmbAmbito").val() || (elem.ID_AMBITO == null && $("#cmbAmbito").val() == "null")) && (elem.ID_EDIFICIO == $("#cmbEdificio").val() || (elem.ID_EDIFICIO == null && $("#cmbEdificio").val() == "null"))){
						$('#tablaAmbito > tbody').append(armarFilaTabla(elem.ID, elem.PERIODO, elem.VERSION, elem.ESTADO, elem.NOMBRE_ESTADO, elem.VER_AMBITO, elem.EDICION_AMBITO, elem.AMBITOS_PROPIOS, elem.ID_CREADOR));
						$('#txtMaxIdA').prop("value",elem.ID);
					}
				});
				
				oTable3 = $("#tablaAmbito").dataTable(tableOptions);
				oTable3.fnSort( [[0, 'asc']] );
			});
		}else{
			oTable3 = $("#tablaAmbito").dataTable(tableOptions);
			oTable3.fnSort( [[0, 'asc']] );
		}
	}
}


function armarFilaTabla(ID_DDJJ, PERIODO, VERSION, ESTADO, NOMBRE_ESTADO, VER, EDITAR, PROPIOS, CREADOR){
	
	if(EDITAR == 1 && PROPIOS == 1 && CREADOR != $("#txtActualId").val()){
		EDITAR = 0;
	}
	

	var retorno = '';
	
	retorno += '<tr>';
	retorno += '<td align="center">'+PERIODO+'</td>';
	retorno += '<td>'+(VERSION > 1 ? '(R'+(VERSION-1)+') ' : '')+NOMBRE_ESTADO+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1	? ' class="imagecel"	title="Finalizar DDJJ"	onclick="mostrarDialogo(\'#dialog\', \'Finalizar DDJJ\', \'question\', \'<p><b>¿Desea marcar la DDJJ como finalizada?</b><br>Una vez realizado esta accion la DDJJ no podrá volver a ser editada.</p>\', \'SiNo\', \'finalizarDDJJ('+ID_DDJJ+','+document.getElementById('txtActualId').value+');\');"'	: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-ok"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1	? ' class="imagecel"	title="Editar DDJJ"		onclick="editarDDJJ(\''+ID_DDJJ+'\',\'0\');"'		: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-pencil"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(ESTADO == 'P' && EDITAR == 1	? ' class="imagecel"	title="Eliminar DDJJ"	onclick="mostrarDialogo(\'#dialog\', \'Eliminar DDJJ\', \'question\', \'<p><b>¿Desea eliminar la DDJJ?</b><br>Esta accion no es reversible.</p>\', \'SiNo\', \'eliminarDDJJ('+ID_DDJJ+','+document.getElementById('txtActualId').value+');\');"'	: '')+'>'+(ESTADO == 'P' && EDITAR == 1	? '<span class="glyphicon glyphicon-trash"></span>' : '')+'</td>';
	retorno += '<td align="center"'+(VER == 1 || EDITAR == 1		? ' class="imagecel"	title="Visualizar DDJJ"	onclick="verDDJJ(\''+ID_DDJJ+'\')"'			: '')+'>'+(VER == 1 || EDITAR == 1	? '<span class="glyphicon glyphicon-eye-open"></span>' : '')+'</td>';
	retorno += '</tr>';

	return retorno;
}

function buscarOrganismo(ID_PERSONA, ID_PADRE, ID_ORGANISMO){
	$('#cmbOrganismo').empty();
	var parametros = {
		"accion":		'buscarDatosOrganismo',
		"id_persona":	ID_PERSONA,
		"id_padre":		ID_PADRE,
		"id_organismo":	ID_ORGANISMO,
		"term":			''
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		$('#cmbOrganismo').empty();
		var data = $.parseJSON(response);
		$.each(data, function(idx, elem){
			$('#cmbOrganismo').append('<option value="'+elem.ID_ORGANISMO+'">'+elem.JURISDICCION+'</option>');
		});
		busquedaComboGenerica("cmbOrganismo",ID_ORGANISMO);
		$('#cmbOrganismo').change();
	});
}

function buscarPartido(ID_PERSONA, ID_PARTIDO){
	$('#cmbPartido').empty();
	var parametros = {
		"accion":			'buscarDatosPartido',
		"id_persona":		ID_PERSONA,
		"permiso_edicion":	'1',
		"id_partido":		'null',
		"term":				''
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		$('#cmbPartido').empty();
		var data = $.parseJSON(response);
		$.each(data, function(idx, elem){
			$('#cmbPartido').append('<option value="'+elem.ID_PARTIDO+'">'+elem.DESCRIPCION+'</option>');
		});
		busquedaComboGenerica("cmbPartido",ID_PARTIDO);
		$('#cmbPartido').change();
	});
}

function buscarLocalidad(ID_PERSONA, ID_PARTIDO, ID_LOCALIDAD){
	$('#cmbLocalidad').empty();
	if (ID_PARTIDO != 'null'){
		var parametros = {
			"accion":			'buscarDatosLocalidad',
			"id_persona":		ID_PERSONA,
			"permiso_edicion":	'1',
			"id_partido":		ID_PARTIDO,
			"id_localidad":		'null',
			"term":				''
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			$('#cmbLocalidad').empty();
			var data = $.parseJSON(response);
			$.each(data, function(idx, elem){
				$('#cmbLocalidad').append('<option value="'+elem.ID_LOCALIDAD+'">'+elem.DESCRIPCION+'</option>');
			});
			busquedaComboGenerica("cmbLocalidad", ID_LOCALIDAD);
			$('#cmbLocalidad').change();
		});
	}else{
		$('#cmbLocalidad').change();
	}
}

function buscarEdificio(ID_PERSONA, ID_PARTIDO, ID_LOCALIDAD, ID_EDIFICIO){
	$('#cmbEdificio').empty();
	if (ID_LOCALIDAD != 'null'){
		var parametros = {
			"accion":			'buscarDatosEdificio',
			"id_persona":		ID_PERSONA,
			"permiso_edicion":	'1',
			"id_partido":		ID_PARTIDO,
			"id_localidad":		ID_LOCALIDAD,
			"id_edificio":		'null',
			"term":				''
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			$('#cmbEdificio').empty();
			var data = $.parseJSON(response);
			$.each(data, function(idx, elem){
				$('#cmbEdificio').append('<option value="'+elem.ID+'">' + elem.NOMBRE + ': ' + elem.CALLE+' Nº '+elem.ALTURA+ (elem.ENTRE_CALLE_A != null ? ' E/ ' + elem.ENTRE_CALLE_A + (elem.ENTRE_CALLE_B != null ? ' Y '+ elem.ENTRE_CALLE_B : '') : '') + '</option>');
			});
			if($('#cmbEdificio option[value="null"]').length == 0){
				$('#cmbEdificio').append('<option value="null">(NUEVO EDIFICIO)</option>');
			}
			busquedaComboGenerica("cmbEdificio", ID_EDIFICIO);
			$('#cmbEdificio').change();
		});
	}else{
		if($('#cmbEdificio option[value="null"]').length == 0){
			$('#cmbEdificio').append('<option value="null">(NUEVO EDIFICIO)</option>');
		}
		$('#cmbEdificio').change();
	}
}

function buscarAmbito(ID_PERSONA, ID_ORGANISMO, ID_EDIFICIO, ID_AMBITO){
	$('#cmbAmbito').empty();
	if (ID_EDIFICIO != 'null'){
		var parametros = {
			"accion":			'buscarDatosAmbito',
			"id_persona":		ID_PERSONA,
			"permiso_edicion":	'1',
			"id_organismo":		ID_ORGANISMO,
			"id_edificio":		ID_EDIFICIO,
			"id_ambito":		'null',
			"term":				''
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			$('#cmbAmbito').empty();
			var data = $.parseJSON(response);
			$.each(data, function(idx, elem){
				$('#cmbAmbito').append('<option value="'+elem.ID+'">PISO ' + elem.PISO + (elem.OFICINA != null ? ', OFICINA ' + elem.OFICINA : '' ) + ', TURNO ' + elem.NOMBRE_TURNO + '</option>');
			});
			if($('#cmbAmbito option[value="null"]').length == 0){
				$('#cmbAmbito').append('<option value="null">(NUEVO ÁMBITO)</option>');
			}
			busquedaComboGenerica("cmbAmbito",ID_AMBITO);
			$('#cmbAmbito').change();
		});
	}else{
		if($('#cmbAmbito option[value="null"]').length == 0){
			$('#cmbAmbito').append('<option value="null">(NUEVO ÁMBITO)</option>');
		}
		$('#cmbAmbito').change();
	}
}

function busquedaComboGenerica(cmb, id){
	var existe = false;
	for (i = 0; i < document.getElementById(cmb).length; ++i){
		if (document.getElementById(cmb).options[i].value == id && id != 'null'){
			existe = true;
			document.getElementById(cmb).options[i].selected = true;
		}
	}
	if (existe == false && document.getElementById(cmb).length > 0){
		document.getElementById(cmb).options[0].selected = true;
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
			mostrarDialogo("#dialog", "DDJJ Finalizada", "ok", "<p><b>La DDJJ ha sido finalizada correctamente.</b></p>", "", "");
			cargarTablaOrganismo();
			cargarTablaEdificio();
			cargarTablaAmbito();
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
			mostrarDialogo("#dialog", "DDJJ Eliminada", "ok", "<p><b>La DDJJ ha sido eliminada correctamente.</b></p>", "", "");
			cargarTablaOrganismo();
			cargarTablaEdificio();
			cargarTablaAmbito();
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar la DDJJ.</b></p>", "", "");
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar la DDJJ.</b><br>Usted no dispone permisos para realizar esta acción.</p>", "", "");
		}
	});
}

function nuevaDDJJ(ID_PERSONA, REVISION, NIVEL){
	if($("#periodoDDJJ").val() >= min_year && $("#periodoDDJJ").val() <= max_year){
		var parametros = {
			"accion":			'nuevaDDJJ',
			"id_persona":		ID_PERSONA,
			"revision":			REVISION,
			"id_localidad":		$("#cmbLocalidad").val(),
			"id_partido":		$("#cmbPartido").val(),
			"id_organismo":		$("#cmbOrganismo").val(),
			"id_edificio":		$("#cmbEdificio").val(),
			"id_ambito":		$("#cmbAmbito").val(),
			"nivel":			NIVEL,
			"periodo":			$("#periodoDDJJ").val()
		};
		var XHR = $.ajax({
			data:		parametros,
			url:		myurl,
			type:		'post'
		});
		XHR.done(function(response){
			if (response > 0){
				if ($("#txtMaxId"+NIVEL).val() != ""){
					mostrarDialogo("#dialog", "Clonar DDJJ", "question", "<p><b>¿Desea inicializar la DDJJ con los datos de la última DDJJ creada?</p>", "SiNo", "clonarDDJJ("+$("#txtMaxId"+NIVEL).val()+", "+response+")", "editarDDJJ("+response+",1);");
				}else{
					editarDDJJ(response,1);
				}
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
	}else{
		mostrarDialogo("#dialog", "Periodo Inválido", "exclamation", "<p class='invalido'><b>El periodo de la DDJJ no es válido.</b><br>Debe ingresar un año válido entre "+min_year+" y "+max_year+".</p>", "", "");
	}
}

function clonarDDJJ(ID_ORIGEN, ID_DESTINO){
	var parametros = {
		"accion":		'clonarDDJJ',
		"id_origen":	ID_ORIGEN,
		"id_destino":	ID_DESTINO,
		"rectificar":	'0'
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			editarDDJJ(ID_DESTINO,1);
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Clonar DDJJ", "exclamation", "<p class='invalido'><b>No se han podido copiar los datos de la DDJJ anterior.</b></p>", "", "editarDDJJ("+ID_DESTINO+",1);");
		}
	});
}


function verDDJJ(ID_DDJJ){
	var form = $('<form action="visualizacion_riesgos_laborales" method="post">' +
	'<input type="hidden" name="id_ddjj" value="' + ID_DDJJ + '" />' +
	'</form>');
	$('body').append(form);
	form.submit();
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