var myurl = 'permisos_riesgos_laborales';

var mensajes = 		[
						"El permiso ha caducado",
						"El Usuario tiene permiso activo hasta la fecha",
						"El Usuario puede ver las DDJJ creadas",
						"El Usuario puede editar las DDJJ creadas",
						" por él mismo",
						"El Usuario puede delegar permisos a otros Usuarios",
						"Mostrar más información",
						"Editar Permisos de Usuario",
						"Eliminar Permisos de Usuario",
						"El Usuario no tiene permisos",
						"Ningún Permiso",
						"Ningún Privilegio",
						"Cualquier Sector"
					];

var etiquetas =		[
						"Sector Específico",
						"Organismo",
						"Edificio",
						"Ámbito",
						"Localidad",
						"Partido",
						"Ver",
						"Editar",
						"Delegar",
						"Ninguno"
					];

datepicker_format = 'dd/mm/yyyy';
datepicker_min = new Date();

$(document).ready(function(){
	$("#txtPersona").materialize_autocomplete({
		multiple: {
			enable: false
		},
		dropdown: {
			el: '#lstPersonas',
			itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" data-text="<%= item.label %>"><a href="javascript:void(0)"><%= item.label %></a></li>'
		},
		getData: function (value, callback){
			if(value.length >= 5){
				var parametros = {
					"accion":		'buscarPersona',
					"term":			value,
					"id_padre" :	document.getElementById('txtActualId').value
				};
				$.ajax({
					data:		parametros,
					url:		myurl,
					type:		'post',
					dataType:	'json',
					success:	function( data ) {
									var items = new Array();
									$.each(data, function( index, item ) {
										items.push({
											label:		item['CUIT'] + ': ' + item['APELLIDO'] + ', ' + item['NOMBRE'],
											value:		item['CUIT'] + ': ' + item['APELLIDO'] + ', ' + item['NOMBRE'],
											id:			item['ID_PERSONA'],
											nombre:		item['NOMBRE'],
											apellido:	item['APELLIDO']
										});
									});
									callback(value, items);
								}
				});
				$("#txtPersona").click();
			}
		},
		onSelect: function (item) {
				ocultarPermiso();
				$('#asignacionPermisos .tooltipped').tooltip('remove');
				$('#asignacionPermisos').hide();
				$('#txtPersonaId').prop("value",item.id);
				$('#txtPersona').prop("value",item.text);
				$('#personaPermiso').empty();
				$('#personaPermiso').html(item.text.split(":")[1].split(",")[0].toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) + " " + item.text.split(":")[1].split(",")[1].toLowerCase().replace(/\b\w/g, l => l.toUpperCase()));
				$('#txtPersonaId').trigger('change');
				goTo('#asignacionPermisos');
		},
		limit: 100,
		cacheable: false
    });
	$("#txtPersonaId").change(function(){
		$('#tablaPermisos').dataTable(dataTableOptions).fnDestroy();
		$('#tablaPermisos > tbody').empty();
		
		if ($("#txtActualId").val() != '' && $("#txtPersonaId").val() != ''){	
			var parametros = {
				"accion":		'buscarPermisosUsuario',
				"id_persona":	$("#txtPersonaId").val(),
				"id_padre" :	$("#txtActualId").val()
			};
			var XHR = $.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post'
			});
			XHR.done(function(response){
				var data = $.parseJSON(response);
				$.each(data, function(idx, elem){
					$('#tablaPermisos > tbody').append(armarFilaTabla(elem.ID, elem.ID_ORGANISMO, elem.ID_EDIFICIO, elem.ID_AMBITO, elem.ID_LOCALIDAD, elem.ID_PARTIDO, elem.FECHA_ALTA, elem.FECHA_BAJA, elem.VER_ORGANISMO, elem.VER_EDIFICIO, elem.VER_AMBITO, elem.EDICION_ORGANISMO, elem.EDICION_EDIFICIO, elem.EDICION_AMBITO, elem.ORGANISMOS_PROPIOS, elem.EDIFICIOS_PROPIOS, elem.AMBITOS_PROPIOS, elem.DELEGAR_ORGANISMOS, elem.DELEGAR_EDIFICIOS, elem.DELEGAR_AMBITOS, elem.NOMBRE_LOCALIDAD, elem.NOMBRE_PARTIDO, elem.NOMBRE_ORGANISMO, elem.NOMBRE_EDIFICIO, elem.NOMBRE_AMBITO));
				});
				$('#asignacionPermisos').show();
				$('#asignacionPermisos .tooltipped').tooltip({delay: 50});
				refreshDataTable("#tablaPermisos", dataTableOptions, [[0, 'asc']]);
				$('.chip, .datatable .btn').tooltip();
			});
		}
	});

	jQuery(function($) {
		$("#cmbPerfilesDefault").change(function(){
			if($(this).val() != '------'){
				var ver_organismo		= $(this).val().substring(0,1);
				var ver_edificio		= $(this).val().substring(1,2);
				var ver_ambito			= $(this).val().substring(2,3);
				var edicion_organismo	= $(this).val().substring(3,4);
				var edicion_edificio	= $(this).val().substring(4,5);
				var edicion_ambito		= $(this).val().substring(5,6);

				$("#chkVerOrganismo"	).prop("checked", (ver_organismo		== '1') ? true : false );
				$("#chkVerEdificio"		).prop("checked", (ver_edificio			== '1') ? true : false );
				$("#chkVerAmbito"		).prop("checked", (ver_ambito			== '1') ? true : false );
				$("#chkEditarOrganismo"	).prop("checked", (edicion_organismo	== '1') ? true : false );
				$("#chkEditarEdificio"	).prop("checked", (edicion_edificio		== '1') ? true : false );
				$("#chkEditarAmbito"	).prop("checked", (edicion_ambito		== '1') ? true : false );

				actualizarLista();

				$('#chkEditarOrganismo').trigger('change');
				$('#chkEditarEdificio').trigger('change');
				$('#chkEditarAmbito').trigger('change');
			}
		}).change();
	});
	
	jQuery(function($) {
		$("#cmbRolesDefault").change(function(){
			if($(this).val() != '------'){
				var organismos_propios	= $(this).val().substring(0,1);
				var edificios_propios	= $(this).val().substring(1,2);
				var ambitos_propios		= $(this).val().substring(2,3);
				var delegar_organismos	= $(this).val().substring(3,4);
				var delegar_edificios	= $(this).val().substring(4,5);
				var delegar_ambitos		= $(this).val().substring(5,6);

				$("#chkPropiasOrganismo").prop("checked", (organismos_propios	== '1') ? true : false );
				$("#chkPropiasEdificio"	).prop("checked", (edificios_propios	== '1') ? true : false );
				$("#chkPropiasAmbito"	).prop("checked", (ambitos_propios		== '1') ? true : false );
				$("#chkDelegarOrganismo").prop("checked", (delegar_organismos	== '1') ? true : false );
				$("#chkDelegarEdificio"	).prop("checked", (delegar_edificios	== '1') ? true : false );
				$("#chkDelegarAmbito"	).prop("checked", (delegar_ambitos		== '1') ? true : false );
				
				actualizarLista();
			}
		}).change();
	});

	jQuery(function($) {

		$("#cmbOrganismo").change(function(){
			$("#spanOrganismo").text($("#cmbOrganismo option:selected").text());
		}).change();
		$("#cmbPartido").change(function(){
			$("#spanPartido").text($("#cmbPartido option:selected").text());
			if(document.getElementById('txtPersonaId').value != ""){
				buscarLocalidad	(document.getElementById('txtActualId').value, $(this).val(), (document.getElementById('txtPermisolId').value > 0 ? document.getElementById('id_localidad_'+document.getElementById('txtPermisolId').value).value : 'null'));
			}
		}).change();
		$("#cmbLocalidad").change(function(){
			$("#spanLocalidad").text($("#cmbLocalidad option:selected").text());
			if(document.getElementById('txtPersonaId').value != ""){
				buscarEdificio(document.getElementById('txtActualId').value, $("#cmbPartido").val(), $(this).val(), (document.getElementById('txtPermisolId').value > 0 ? document.getElementById('id_edificio_'+document.getElementById('txtPermisolId').value).value : 'null'));
			}
		}).change();
		$("#cmbEdificio").change(function(){
			$("#spanEdificio").text($("#cmbEdificio option:selected").text());
			if(document.getElementById('txtPersonaId').value != ""){
				buscarAmbito(document.getElementById('txtActualId').value, $("#cmbOrganismo").val(), $(this).val(), (document.getElementById('txtPermisolId').value > 0 ? document.getElementById('id_ambito_'+document.getElementById('txtPermisolId').value).value : 'null'));
			}
		}).change();
		$("#cmbAmbito").change(function(){
			$("#spanAmbito").text($("#cmbAmbito option:selected").text());
		}).change();
	});
	
	jQuery(function($) {
		$("#chkVerOrganismo").change(function(){actualizarLista();}).change();
		$("#chkVerEdificio").change(function(){actualizarLista();}).change();
		$("#chkVerAmbito").change(function(){actualizarLista();}).change();
		$("#chkPropiasOrganismo").change(function(){actualizarLista();}).change();
		$("#chkPropiasEdificio").change(function(){actualizarLista();}).change();
		$("#chkPropiasAmbito").change(function(){actualizarLista();}).change();
		$("#chkDelegarOrganismo").change(function(){actualizarLista();}).change();
		$("#chkDelegarEdificio").change(function(){actualizarLista();}).change();
		$("#chkDelegarAmbito").change(function(){actualizarLista();}).change();
		$("#chkEditarOrganismo").change(function(){
			actualizarLista();
			habilitarHijo('chkEditarOrganismo','chkPropiasOrganismo');
		}).change();
		$("#chkEditarEdificio").change(function(){
			actualizarLista();
			habilitarHijo('chkEditarEdificio','chkPropiasEdificio');
		}).change();
		$("#chkEditarAmbito").change(function(){
			actualizarLista();
			habilitarHijo('chkEditarAmbito','chkPropiasAmbito');
		}).change();
	});
	
	jQuery(function($) {
		$("#chkVerOrganismo").click(function(){seleccionarCombo();});
		$("#chkVerEdificio").click(function(){seleccionarCombo();});
		$("#chkVerAmbito").click(function(){seleccionarCombo();});
		$("#chkEditarOrganismo").click(function(){seleccionarCombo();});
		$("#chkEditarEdificio").click(function(){seleccionarCombo();});
		$("#chkEditarAmbito").click(function(){seleccionarCombo();});
		$("#chkPropiasOrganismo").click(function(){seleccionarCombo();});
		$("#chkPropiasEdificio").click(function(){seleccionarCombo();});
		$("#chkPropiasAmbito").click(function(){seleccionarCombo();});
		$("#chkDelegarOrganismo").click(function(){seleccionarCombo();});
		$("#chkDelegarEdificio").click(function(){seleccionarCombo();});
		$("#chkDelegarAmbito").click(function(){seleccionarCombo();});
	});
	
		
	$('.tab a').click(function(){
		$('select').material_select();
	});
});

function goTo(selector){
	$(selector+' .tooltipped').tooltip({delay: 50});
	$(selector).show();
	$('html, body').animate({
		scrollTop: $(selector).offset().top + 'px'
	}, 'slow');
}


function actualizarLista(){
	var opciones = ["VerOrganismo", "VerEdificio", "VerAmbito", "EditarOrganismo", "EditarEdificio", "EditarAmbito", "PropiasOrganismo", "PropiasEdificio", "PropiasAmbito", "DelegarOrganismo", "DelegarEdificio", "DelegarAmbito"];
	opciones.forEach(function(entry) {
		if (document.getElementById("chk"+entry) != null && document.getElementById("chk"+entry).checked){
			document.getElementById("li"+entry).style.display = 'list-item';
		}else{
			document.getElementById("li"+entry).style.display = 'none';
		}
	});
}

function habilitarHijo(chkPadreId, chkHijoId){
	chkPadre = document.getElementById(chkPadreId).checked;
	chkHijo = document.getElementById(chkHijoId).checked;
	if (chkPadre == true){
		document.getElementById(chkHijoId).disabled= false;
	}else{
		document.getElementById(chkHijoId).disabled= true;
	}
}

function habilitarEspecifico(chkId, combosId){
	chk = document.getElementById(chkId).checked;	
	combosId.forEach(function(item, index){
		if (chk  == true){
			document.getElementById(item).disabled=false;
		}else{
			document.getElementById(item).disabled=true;
		}
	});
	$('select').material_select();
}

function mostrarMasInformacion(btnId, rowId){
	row = document.getElementById(rowId);
	btn = document.getElementById(btnId);
	
	if (row.style.display == 'none'){
		row.style.display = '';
		btn.innerHTML  = '<i class="fa fa-minus" aria-hidden="true"></i>';
	}else{
		row.style.display = 'none';
		btn.innerHTML  = '<i class="fa fa-plus" aria-hidden="true"></i>';
	}
}

function seleccionarCombo(){
	
	var ver_organismo		= (document.getElementById("chkVerOrganismo"	) == null	? '0' : (document.getElementById("chkVerOrganismo"		).checked == true ? '1' : '0'));
	var ver_edificio		= (document.getElementById("chkVerEdificio"		) == null	? '0' : (document.getElementById("chkVerEdificio"		).checked == true ? '1' : '0'));
	var ver_ambito			= (document.getElementById("chkVerAmbito"		) == null	? '0' : (document.getElementById("chkVerAmbito"			).checked == true ? '1' : '0'));
	var edicion_organismo	= (document.getElementById("chkEditarOrganismo"	) == null	? '0' : (document.getElementById("chkEditarOrganismo"	).checked == true ? '1' : '0'));
	var edicion_edificio	= (document.getElementById("chkEditarEdificio"	) == null	? '0' : (document.getElementById("chkEditarEdificio"	).checked == true ? '1' : '0'));
	var edicion_ambito		= (document.getElementById("chkEditarAmbito"	) == null	? '0' : (document.getElementById("chkEditarAmbito"		).checked == true ? '1' : '0'));	
	
	var organismos_propios	= (document.getElementById("chkPropiasOrganismo") == null	? '0' : (document.getElementById("chkPropiasOrganismo"	).checked == true ? '1' : '0'));
	var edificios_propios	= (document.getElementById("chkPropiasEdificio"	) == null	? '0' : (document.getElementById("chkPropiasEdificio"	).checked == true ? '1' : '0'));
	var ambitos_propios		= (document.getElementById("chkPropiasAmbito"	) == null	? '0' : (document.getElementById("chkPropiasAmbito"		).checked == true ? '1' : '0'));
	var delegar_organismos	= (document.getElementById("chkDelegarOrganismo") == null	? '0' : (document.getElementById("chkDelegarOrganismo"	).checked == true ? '1' : '0'));
	var delegar_edificios	= (document.getElementById("chkDelegarEdificio"	) == null	? '0' : (document.getElementById("chkDelegarEdificio"	).checked == true ? '1' : '0'));
	var delegar_ambitos		= (document.getElementById("chkDelegarAmbito"	) == null	? '0' : (document.getElementById("chkDelegarAmbito"		).checked == true ? '1' : '0'));

	var existe;
	
	existe = false;
	for (i = 0; i < document.getElementById("cmbPerfilesDefault").length; ++i){
		if (document.getElementById("cmbPerfilesDefault").options[i].value == ver_organismo+ver_edificio+ver_ambito+edicion_organismo+edicion_edificio+edicion_ambito){
			existe = true;
			document.getElementById("cmbPerfilesDefault").options[i].selected=true;
		}
	}
	if (existe == false){
		document.getElementById("cmbPerfilesDefault").value = '------';
	}

	existe = false;
	for (i = 0; i < document.getElementById("cmbRolesDefault").length; ++i){
		if (document.getElementById("cmbRolesDefault").options[i].value == organismos_propios+edificios_propios+ambitos_propios+delegar_organismos+delegar_edificios+delegar_ambitos){
			existe = true;
			document.getElementById("cmbRolesDefault").options[i].selected=true;
		}
	}
	if (existe == false){
		document.getElementById("cmbRolesDefault").value = '------';
	}

	$('#chkEditarOrganismo').trigger('change');
	$('#chkEditarEdificio').trigger('change');
	$('#chkEditarAmbito').trigger('change');
}

function armarFilaTabla(ID_PERMISO, ID_ORGANISMO, ID_EDIFICIO, ID_AMBITO, ID_LOCALIDAD, ID_PARTIDO, FECHA_ALTA, FECHA_BAJA, VER_ORGANISMO, VER_EDIFICIO, VER_AMBITO, EDICION_ORGANISMO, EDICION_EDIFICIO, EDICION_AMBITO, ORGANISMOS_PROPIOS, EDIFICIOS_PROPIOS, AMBITOS_PROPIOS, DELEGAR_ORGANISMOS, DELEGAR_EDIFICIOS, DELEGAR_AMBITOS, NOMBRE_LOCALIDAD, NOMBRE_PARTIDO, NOMBRE_ORGANISMO, NOMBRE_EDIFICIO, NOMBRE_AMBITO){

	var DATE_FECHA_BAJA = new Date(FECHA_BAJA.replace( /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1T$4:$5:$6"));
	var DATE_HOY = new Date();

	var retorno = '';
	retorno += '<tr>';

	retorno += '<td '+ (DATE_FECHA_BAJA <= DATE_HOY ? 'class="red-text"' : '') +'><div class="chip transparent tooltipped right" aria-hidden="true" data-position="top" data-delay="50" data-tooltip="'+ (DATE_FECHA_BAJA <= DATE_HOY ? mensajes[0] : mensajes[1]) +'">'+FECHA_BAJA.substring(0,10)+'</div></td>';
	retorno += '<td '+ (DATE_FECHA_BAJA <= DATE_HOY ? 'class="red-text"' : '') +'>';
	
	retorno += '<input type="hidden" id="id_organismo_'+ID_PERMISO+'" name="id_organismo_'+	ID_PERMISO+'" value="'+ID_ORGANISMO+'" />'
	retorno += '<input type="hidden" id="id_edificio_'+	ID_PERMISO+'" name="id_edificio_'+	ID_PERMISO+'" value="'+ID_EDIFICIO+'" />'
	retorno += '<input type="hidden" id="id_ambito_'+	ID_PERMISO+'" name="id_ambito_'+	ID_PERMISO+'" value="'+ID_AMBITO+'" />'
	retorno += '<input type="hidden" id="id_localidad_'+ID_PERMISO+'" name="id_localidad_'+	ID_PERMISO+'" value="'+ID_LOCALIDAD+'" />'
	retorno += '<input type="hidden" id="id_partido_'+	ID_PERMISO+'" name="id_partido_'+	ID_PERMISO+'" value="'+ID_PARTIDO+'" />'
	
	
	//retorno += '<div class ="row"><div class ="col s12">';
	
	retorno += '<b class="disabled">'+etiquetas[1]+':</b>';
	retorno += (VER_ORGANISMO == 0 && EDICION_ORGANISMO == 0 && DELEGAR_ORGANISMOS == 0	? '<div class="chip red tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[9]+'"><i class="fa fa-ban" aria-hidden="true"></i></div>'																									: '');
	retorno += (VER_ORGANISMO == 1														? '<div class="chip gob tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[2]+'"><i class="fa fa-eye" aria-hidden="true"></i></div>'																									: '');
	retorno += (EDICION_ORGANISMO == 1													? '<div class="chip '+ (ORGANISMOS_PROPIOS == 1 ? 'orange' : 'gob') +' tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[3]+(ORGANISMOS_PROPIOS == 1 ? mensajes[4] : '')+'"><i class="fa fa-pencil" aria-hidden="true"></i></div>'	: '');
	retorno += (DELEGAR_ORGANISMOS == 1													? '<div class="chip gob tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[5]+'"><i class="fa fa-users" aria-hidden="true"></i></div>'																									: '');
	
	retorno += '<b class="disabled">'+etiquetas[2]+':</b>';
	retorno += (VER_EDIFICIO == 0 && EDICION_EDIFICIO == 0 && DELEGAR_EDIFICIOS == 0	? '<div class="chip red tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[9]+'"><i class="fa fa-ban" aria-hidden="true"></i></div>'																									: '');
	retorno += (VER_EDIFICIO == 1														? '<div class="chip gob tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[2]+'"><i class="fa fa-eye" aria-hidden="true"></i></div>'																									: '');
	retorno += (EDICION_EDIFICIO == 1													? '<div class="chip '+ (EDIFICIOS_PROPIOS == 1 ? 'orange' : 'gob') +' tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[3]+(EDIFICIOS_PROPIOS == 1 ? mensajes[4] : '')+'"><i class="fa fa-pencil" aria-hidden="true"></i></div>'		: '');
	retorno += (DELEGAR_EDIFICIOS == 1													? '<div class="chip gob tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[5]+'"><i class="fa fa-users" aria-hidden="true"></i></div>'																									: '');
	
	//Ambitos Ocultos
	//retorno += '<b class="disabled">'+etiquetas[3]+':</b>';
	//retorno += (VER_AMBITO == 0 && EDICION_AMBITO == 0 && DELEGAR_AMBITOS == 0			? '<div class="chip red tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[9]+'"><i class="fa fa-ban" aria-hidden="true"></i></div>'																									: '');
	//retorno += (VER_AMBITO == 1															? '<div class="chip gob tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[2]+'"><i class="fa fa-eye" aria-hidden="true"></i></div>'																									: '');
	//retorno += (EDICION_AMBITO == 1														? '<div class="chip '+ (AMBITOS_PROPIOS == 1 ? 'orange' : 'gob') +' tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[3]+(AMBITOS_PROPIOS == 1 ? mensajes[4] : '')+'"><i class="fa fa-pencil" aria-hidden="true"></i></div>'			: '');
	//retorno += (DELEGAR_AMBITOS == 1														? '<div class="chip gob tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[5]+'"><i class="fa fa-users" aria-hidden="true"></i></div>'																									: '');

	//retorno += '<div class ="row" id="row'+ID_PERMISO+'" style="display:none;"><div class ="col s12"><b>'+etiquetas[0]+':</b>';
	retorno += '<ul class="collection" id="row'+ID_PERMISO+'" style="display:none;">';
	retorno += '<li class="collection-item green lighten-5">'+etiquetas[4]+': '+(NOMBRE_LOCALIDAD == '' || NOMBRE_LOCALIDAD == null ? document.getElementById("cmbLocalidad").options[0].text : NOMBRE_LOCALIDAD)+'.</li>';
	retorno += '<li class="collection-item green lighten-5">'+etiquetas[5]+': '+(NOMBRE_PARTIDO == '' || NOMBRE_PARTIDO == null ? document.getElementById("cmbPartido").options[0].text : NOMBRE_PARTIDO)+'.</li>';
	retorno += '<li class="collection-item green lighten-5">'+etiquetas[1]+': '+(NOMBRE_ORGANISMO == '' || NOMBRE_ORGANISMO == null ? document.getElementById("cmbOrganismo").options[0].text : NOMBRE_ORGANISMO)+'.</li>';
	retorno += '<li class="collection-item green lighten-5">'+etiquetas[2]+': '+(NOMBRE_EDIFICIO == ':  Nº ' ? document.getElementById("cmbEdificio").options[0].text : NOMBRE_EDIFICIO)+'.</li>';
	//Ambitos Ocultos
	//retorno += '<li class="collection-item green lighten-5">'+etiquetas[3]+': '+(NOMBRE_AMBITO == 'PISO , OFICINA , TURNO ' ? document.getElementById("cmbAmbito").options[0].text : NOMBRE_AMBITO)+'.</li>';
	retorno += '</ul>';
	//retorno += '</div></div>';
	retorno += '</td>';
	
	retorno += '<td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[6]+'" id="btn'+ID_PERMISO+'" onclick="mostrarMasInformacion(\'btn'+ID_PERMISO+'\',\'row'+ID_PERMISO+'\');"><i class="fa fa-plus" aria-hidden="true"></i></td>';
	retorno += '<td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[7]+'" onclick="editarPermisos(\''+ID_PERMISO+'\',\''+ID_ORGANISMO+'\',\''+ID_EDIFICIO+'\',\''+ID_AMBITO+'\',\''+ID_LOCALIDAD+'\',\''+ID_PARTIDO+'\',\''+FECHA_ALTA+'\',\''+FECHA_BAJA+'\',\''+VER_ORGANISMO+'\',\''+VER_EDIFICIO+'\',\''+VER_AMBITO+'\',\''+EDICION_ORGANISMO+'\',\''+EDICION_EDIFICIO+'\',\''+EDICION_AMBITO+'\',\''+ORGANISMOS_PROPIOS+'\',\''+EDIFICIOS_PROPIOS+'\',\''+AMBITOS_PROPIOS+'\',\''+DELEGAR_ORGANISMOS+'\',\''+DELEGAR_EDIFICIOS+'\',\''+DELEGAR_AMBITOS+'\');"><i class="fa fa-pencil" aria-hidden="true"></i></td>';
	retorno += '<td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="'+mensajes[8]+'" onclick="msgBox(\'Eliminar Permiso\', \'question\', \'<b>¿Realmente desea eliminar el permiso seleccionado?</b>\', \'YesNo\', \'borrarPermisoUsuario('+ID_PERMISO+');\');"><i class="fa fa-trash" aria-hidden="true"></i></td>';
	retorno += '</tr>';

	return retorno;
}

function obtenerDescripcionLista(sin_valor, lista){
	var retorno = "<ul>";
	if(lista != ""){
		lista.forEach(function(entry) {
			if (document.getElementById(entry).style.display != 'none'){
				retorno += "<li>" + document.getElementById(entry)["innerText"] + "</li>";
			}
		});
	}
	if(retorno == "<ul>"){
		retorno += "<li>" + sin_valor + "</li>";
	}
	retorno += "</ul>"
	return retorno;
}

function obtenerDescripcionPemisos(){
	var retorno = "";
	
	retorno += obtenerDescripcionLista(mensajes[10], ["liVerOrganismo", "liVerEdificio", "liVerAmbito", "liEditarOrganismo", "liEditarEdificio", "liEditarAmbito"]);
	retorno += obtenerDescripcionLista(mensajes[11], ["liPropiasOrganismo", "liPropiasEdificio", "liPropiasAmbito", "liDelegarOrganismo", "liDelegarEdificio", "liDelegarAmbito"]);
	retorno += obtenerDescripcionLista(mensajes[12], (tieneSectorAsignado() == true ? ["liLocalidad", "liPartido", "liOrganismo", "liEdificio", "liAmbito"] : ""));

	return retorno;
}

function tieneSectorAsignado(){
	var ls = ["cmbLocalidad", "cmbPartido", "cmbOrganismo", "cmbEdificio", "cmbAmbito"];
	var retorno = false;
	ls.forEach(function(entry) {
		if ($("#"+entry+" option:selected").val() != 'null'){
			retorno = true;
		}
	});
	return retorno;
}

function guardarPermiso(){
	var parametros = {
		"accion":				'guardarPermiso',
		"id_permiso":			document.getElementById("txtPermisolId").value,
		"id_persona":			document.getElementById('txtPersonaId').value,
		"id_padre":				document.getElementById('txtActualId').value,
		"id_organismo":			$("#cmbOrganismo option:selected").val(),
		"id_edificio":			$("#cmbEdificio option:selected").val(),
		"id_ambito":			$("#cmbAmbito option:selected").val(),
		"id_localidad":			$("#cmbLocalidad option:selected").val(),
		"id_partido":			$("#cmbPartido option:selected").val(),
		"fecha_alta":			document.getElementById("datepickerDesde"		).value,
		"fecha_baja":			document.getElementById("datepickerHasta"		).value,
		"ver_organismo":		(document.getElementById("chkVerOrganismo"		) == null	? '0' : (document.getElementById("chkVerOrganismo"		).checked == true ? '1' : '0')),
		"ver_edificio":			(document.getElementById("chkVerEdificio"		) == null	? '0' : (document.getElementById("chkVerEdificio"		).checked == true ? '1' : '0')),
		"ver_ambito":			(document.getElementById("chkVerAmbito"			) == null	? '0' : (document.getElementById("chkVerAmbito"			).checked == true ? '1' : '0')),
		"edicion_organismo":	(document.getElementById("chkEditarOrganismo"	) == null	? '0' : (document.getElementById("chkEditarOrganismo"	).checked == true ? '1' : '0')),
		"edicion_edificio":		(document.getElementById("chkEditarEdificio"	) == null	? '0' : (document.getElementById("chkEditarEdificio"	).checked == true ? '1' : '0')),
		"edicion_ambito":		(document.getElementById("chkEditarAmbito"		) == null	? '0' : (document.getElementById("chkEditarAmbito"		).checked == true ? '1' : '0')),
		"organismos_propios":	(document.getElementById("chkPropiasOrganismo"	) == null	? '0' : (document.getElementById("chkPropiasOrganismo"	).checked == true ? '1' : '0')),
		"edificios_propios":	(document.getElementById("chkPropiasEdificio"	) == null	? '0' : (document.getElementById("chkPropiasEdificio"	).checked == true ? '1' : '0')),
		"ambitos_propios":		(document.getElementById("chkPropiasAmbito"		) == null	? '0' : (document.getElementById("chkPropiasAmbito"		).checked == true ? '1' : '0')),
		"delegar_organismos":	(document.getElementById("chkDelegarOrganismo"	) == null	? '0' : (document.getElementById("chkDelegarOrganismo"	).checked == true ? '1' : '0')),
		"delegar_edificios":	(document.getElementById("chkDelegarEdificio"	) == null	? '0' : (document.getElementById("chkDelegarEdificio"	).checked == true ? '1' : '0')),
		"delegar_ambitos":		(document.getElementById("chkDelegarAmbito"		) == null	? '0' : (document.getElementById("chkDelegarAmbito"		).checked == true ? '1' : '0'))
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response > 0){
			ocultarPermiso();
			alerta("El permiso se ha guardado correctamente.", "done");
			$('#txtPermisolId').prop("value", response);
			$('#txtPersonaId').trigger('change');
		}else if (response <= 0){
			alerta("No se ha podido guardar el permiso.", "error");
		}
	});

}

function editarPermisos(ID_PERMISO, ID_ORGANISMO, ID_EDIFICIO, ID_AMBITO, ID_LOCALIDAD, ID_PARTIDO, FECHA_ALTA, FECHA_BAJA, VER_ORGANISMO, VER_EDIFICIO, VER_AMBITO, EDICION_ORGANISMO, EDICION_EDIFICIO, EDICION_AMBITO, ORGANISMOS_PROPIOS, EDIFICIOS_PROPIOS, AMBITOS_PROPIOS, DELEGAR_ORGANISMOS, DELEGAR_EDIFICIOS, DELEGAR_AMBITOS){
	
	if (document.getElementById("bloqueOrganismo") != null){
		document.getElementById("chkVerOrganismo"		).checked	= (VER_ORGANISMO		== 1 ? true : false);
		document.getElementById("chkEditarOrganismo"	).checked	= (EDICION_ORGANISMO	== 1 ? true : false);
		document.getElementById("chkPropiasOrganismo"	).checked	= (ORGANISMOS_PROPIOS	== 1 ? true : false);
		document.getElementById("chkDelegarOrganismo"	).checked	= (DELEGAR_ORGANISMOS	== 1 ? true : false);
	}
	if (document.getElementById("bloqueEdificio") != null){
		document.getElementById("chkVerEdificio"		).checked	= (VER_EDIFICIO			== 1 ? true : false);
		document.getElementById("chkEditarEdificio"		).checked	= (EDICION_EDIFICIO		== 1 ? true : false);
		document.getElementById("chkPropiasEdificio"	).checked	= (EDIFICIOS_PROPIOS	== 1 ? true : false);
		document.getElementById("chkDelegarEdificio"	).checked	= (DELEGAR_EDIFICIOS	== 1 ? true : false);
	}
	if (document.getElementById("bloqueAmbito") != null){
		document.getElementById("chkVerAmbito"			).checked	= (VER_AMBITO			== 1 ? true : false);
		document.getElementById("chkEditarAmbito"		).checked	= (EDICION_AMBITO		== 1 ? true : false);
		document.getElementById("chkPropiasAmbito"		).checked	= (AMBITOS_PROPIOS		== 1 ? true : false);
		document.getElementById("chkDelegarAmbito"		).checked	= (DELEGAR_AMBITOS		== 1 ? true : false);
	}
	
	document.getElementById("datepickerDesde"		).value		= FECHA_ALTA.substring(0,10);
	document.getElementById("datepickerHasta"		).value		= FECHA_BAJA.substring(0,10);
	document.getElementById("txtPermisolId"			).value		= ID_PERMISO;

	buscarOrganismo	(document.getElementById('txtPersonaId').value, document.getElementById('txtActualId').value, ID_ORGANISMO);
	buscarPartido	(document.getElementById('txtActualId').value, ID_PARTIDO);
	
	seleccionarCombo();

	goTo('#tabsPermisos');
	$('ul.tabs').tabs();
	$('ul.tabs').tabs('select_tab', 'tab-1');
	
	if(ID_ORGANISMO != "null" || ID_EDIFICIO != "null" || ID_AMBITO != "null" || ID_LOCALIDAD != "null" || ID_PARTIDO != "null"){
		document.getElementById('chkEspecificar').checked = true;
	}else{
		document.getElementById('chkEspecificar').checked = false;
	}
	habilitarEspecifico('chkEspecificar',['cmbAmbito','cmbEdificio','cmbOrganismo','cmbLocalidad','cmbPartido']);
}
function ocultarPermiso(){
	goTo('main');
	$('.ul.tabs').remove()
	$('#tabsPermisos .tooltipped').tooltip('remove');
	$("#tabsPermisos").hide();
}

function buscarOrganismo(ID_PERSONA, ID_PADRE, ID_ORGANISMO){
	$('#cmbOrganismo').empty().append('<option value="null">(CUALQUIER ORGANISMO)</option>');
	var parametros = {
		"accion":		'buscarDatosOrganismo',
		"id_persona":	ID_PERSONA,
		"id_padre":		ID_PADRE,
		"id_organismo":	'null',
		"term":			''
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		var data = $.parseJSON(response);
		$.each(data, function(idx, elem){
			$('#cmbOrganismo').append('<option value="'+elem.ID_ORGANISMO+'">'+elem.JURISDICCION+'</option>');
		});
		busquedaComboGenerica("cmbOrganismo",ID_ORGANISMO);
		$('#cmbOrganismo').change();
	});
}

function buscarPartido(ID_PERSONA, ID_PARTIDO){
	$('#cmbPartido').empty().append('<option value="null">(CUALQUIER PARTIDO)</option>');
	var parametros = {
		"accion":			'buscarDatosPartido',
		"id_persona":		ID_PERSONA,
		"permiso_edicion":	'0',
		"id_partido":		'null',
		"term":				''
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		var data = $.parseJSON(response);
		$.each(data, function(idx, elem){
			$('#cmbPartido').append('<option value="'+elem.ID_PARTIDO+'">'+elem.DESCRIPCION+'</option>');
		});
		busquedaComboGenerica("cmbPartido",ID_PARTIDO);
		$('#cmbPartido').change();
	});
}

function buscarLocalidad(ID_PERSONA, ID_PARTIDO, ID_LOCALIDAD){
	$('#cmbLocalidad').empty().append('<option value="null">(CUALQUIER LOCALIDAD)</option>');
	if (ID_PARTIDO != 'null'){
		var parametros = {
			"accion":			'buscarDatosLocalidad',
			"id_persona":		ID_PERSONA,
			"permiso_edicion":	'0',
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
	$('#cmbEdificio').empty().append('<option value="null">(CUALQUIER EDIFICIO / NUEVO EDIFICIO)</option>');
	if (ID_LOCALIDAD != 'null'){
		var parametros = {
			"accion":			'buscarDatosEdificio',
			"id_persona":		ID_PERSONA,
			"permiso_edicion":	'0',
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
			var data = $.parseJSON(response);
			$.each(data, function(idx, elem){
				$('#cmbEdificio').append('<option value="'+elem.ID+'">' + elem.NOMBRE + ': ' + elem.CALLE+' Nº '+elem.ALTURA+ (elem.ENTRE_CALLE_A != null ? ' E/ ' + elem.ENTRE_CALLE_A + (elem.ENTRE_CALLE_B != null ? ' Y '+ elem.ENTRE_CALLE_B : '') : '') + '</option>');
			});
			busquedaComboGenerica("cmbEdificio", ID_EDIFICIO);
			$('#cmbEdificio').change();
		});
	}else{
		$('#cmbEdificio').change();
	}
}

function buscarAmbito(ID_PERSONA, ID_ORGANISMO, ID_EDIFICIO, ID_AMBITO){
	$('#cmbAmbito').empty().append('<option value="null">(CUALQUIER ÁMBITO / NUEVO ÁMBITO)</option>');
	if (ID_EDIFICIO != 'null'){
		var parametros = {
			"accion":			'buscarDatosAmbito',
			"id_persona":		ID_PERSONA,
			"permiso_edicion":	'0',
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
			var data = $.parseJSON(response);
			$.each(data, function(idx, elem){
				$('#cmbAmbito').append('<option value="'+elem.ID+'">PISO ' + elem.PISO + (elem.OFICINA != null ? ', OFICINA ' + elem.OFICINA : '' ) + ', TURNO ' + elem.NOMBRE_TURNO + '</option>');
			});
			busquedaComboGenerica("cmbAmbito",ID_AMBITO);
			$('#cmbAmbito').change();
		});
	}else{
		$('#cmbAmbito').change();
	}
}

function busquedaComboGenerica(cmb, id){
	var existe = false;
	for (i = 0; i < document.getElementById(cmb).length; ++i){
		if (document.getElementById(cmb).options[i].value == id){
			existe = true;
			document.getElementById(cmb).options[i].selected = true;
		}
	}
	if (existe == false){
		document.getElementById(cmb).value = 'null';
		document.getElementById(cmb).options[0].selected = true;
	}
	$('select').material_select();
}

function borrarPermisoUsuario(id){
	ocultarPermiso();
	var parametros = {
		"accion":		'borrarPermisoUsuario',
		"id_permiso":	id
	};
	var XHR = $.ajax({
		data:		parametros,
		url:		myurl,
		type:		'post'
	});
	XHR.done(function(response){
		if (response == 1){
			alerta("El permiso se ha eliminado correctamente.", "done");
			$('#txtPersonaId').trigger('change');
		}else if (response == -2){
			alerta("No se ha podido eliminar el permiso.<br>El usuario ha delegado permisos. Se deben eliminar los permisos delegados primero.", "error");
		}else if (response == -1){
			alerta("No se ha podido eliminar el permiso.", "error");
		}else{
			alerta("No se ha podido eliminar el permiso.<br>El permiso especificado no existe.", "error");
		}
	});
}
