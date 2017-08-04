var myurl = 'permisos_riesgos_laborales';

var mensajes = 		[
						"El permiso ha caducado",
						"El Usuario tiene permiso activo hasta la fecha",
						"El Usuario puede ver las DDJJ creadas",
						"El Usuario puede editar las DDJJ creadas",
						" por él mismo",
						"El Usuario puede delegar permisosa otros Usuarios",
						"Mostrar más información",
						"Editar Permisos de Usuario",
						"Eliminar Permisos de Usuario",
						"El Usuario no tiene permisos",
						"Ningún Permiso",
						"Ningún Privilegio",
						"Cualquier Sector"
					];

var etiquetas =		[
						"Sector Espcífico",
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

var tableOptions =	{
						"sPaginationType": "full_numbers",															 
						"iDisplayLength": 10,
						"aoColumns":	[
											{"bSearchable": true},
											{"bSearchable": true},
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
										"sZeroRecords": "No se encuentran permisos asignados a este usuario.",
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

$(document).ready(function(){
	$("#tabsPermisos").tabs();
	$("#datepickerDesde").datepicker({ minDate: new Date(), dateFormat: 'dd/mm/yy'});
	$("#datepickerHasta").datepicker({ minDate: new Date(), dateFormat: 'dd/mm/yy'});
	
	if (document.getElementById("tablaPermisos") != null){
		var oTable1 = $("#tablaPermisos").dataTable(tableOptions);
		oTable1.fnSort( [[0, 'asc']] );
	}
	
	$( function() {
		$( document ).tooltip({
			show: {
				effect: "highlight",
				delay: 750
			}
		});
	});

	$("#txtPersona").autocomplete({
		source: function( request, response ) {
			var parametros = {
				"accion":		'buscarPersona',
				"term":			request.term,
				"id_padre" :	document.getElementById('txtActualId').value
			};
			$.ajax({
				data:		parametros,
				url:		myurl,
				type:		'post',
				dataType:	'json',
				success:	function( data ) {
								response( $.map( data, function( item ) {
									return {
										label:		item['CUIT'] + ': ' + item['APELLIDO'] + ', ' + item['NOMBRE'],
										value:		item['CUIT'] + ': ' + item['APELLIDO'] + ', ' + item['NOMBRE'],
										id:			item['ID_PERSONA'],
										nombre:		item['NOMBRE'],
										apellido:	item['APELLIDO']
									};
								}));
							}
			});
        },
        minLength:	5,
		delay:		1000,
        autoFocus:	true,
        select:		function( event, ui ) {
						ocultarPermiso();
						$('#asignacionPermisos').hide();
						$('#txtPersonaId').prop("value",ui.item.id);
						$('#txtPersona').prop("value",ui.item.label);
						$('#personaPermiso').empty();
						$('#personaPermiso').html(ui.item.nombre + " " + ui.item.apellido);
						$('#txtPersonaId').trigger('change');
						$('#asignacionPermisos').goTo();
					}
    });
	
	$("#txtPersonaId").change(function(){
		$('#tablaPermisos > tbody').empty();
		var oSettings = oTable1.fnSettings();
		var iTotalRecords = oSettings.fnRecordsTotal();
		for (i=0;i<=iTotalRecords;i++) {
			oTable1.fnDeleteRow(0,null,true);
		}
		oTable1.fnDestroy();
		
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
				oTable1 = $("#tablaPermisos").dataTable(tableOptions);
				oTable1.fnSort( [[0, 'asc']] );
				$('#asignacionPermisos').show();
			});
		}
	});

	(function($) {
		$.fn.goTo = function() {
			$(this).show();
			$('html, body').animate({
				scrollTop: $(this).offset().top + 'px'
			}, 'fast');
			return this;
		}
	})(jQuery);

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
});

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
}

function mostrarMasInformacion(btnId, rowId){
	row = document.getElementById(rowId);
	btn = document.getElementById(btnId);
	
	if (row.style.display == 'none'){
		row.style.display = 'block';
		btn.innerHTML  = '-';
	}else{
		row.style.display = 'none';
		btn.innerHTML  = '+';
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

function convertirFecha(fecha){
	return fecha.replace( /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1T$4:$5:$6");
}

function armarFilaTabla(ID_PERMISO, ID_ORGANISMO, ID_EDIFICIO, ID_AMBITO, ID_LOCALIDAD, ID_PARTIDO, FECHA_ALTA, FECHA_BAJA, VER_ORGANISMO, VER_EDIFICIO, VER_AMBITO, EDICION_ORGANISMO, EDICION_EDIFICIO, EDICION_AMBITO, ORGANISMOS_PROPIOS, EDIFICIOS_PROPIOS, AMBITOS_PROPIOS, DELEGAR_ORGANISMOS, DELEGAR_EDIFICIOS, DELEGAR_AMBITOS, NOMBRE_LOCALIDAD, NOMBRE_PARTIDO, NOMBRE_ORGANISMO, NOMBRE_EDIFICIO, NOMBRE_AMBITO){

	var DATE_FECHA_BAJA = new Date(convertirFecha(FECHA_BAJA));
	var DATE_HOY = new Date();

	var retorno = '';
	retorno += '<tr>';

	retorno += '<td title="'+ (DATE_FECHA_BAJA <= DATE_HOY ? mensajes[0] : mensajes[1]) +'."'+ (DATE_FECHA_BAJA <= DATE_HOY ? ' class="invalido"' : '') +'>'+FECHA_BAJA.substring(0,10)+'</td>';
	retorno += '<td '+ (DATE_FECHA_BAJA <= DATE_HOY ? 'class="invalido"' : '') +'>';
	
	retorno += '<input type="hidden" id="id_organismo_'+ID_PERMISO+'" name="id_organismo_'+	ID_PERMISO+'" value="'+ID_ORGANISMO+'" />'
	retorno += '<input type="hidden" id="id_edificio_'+	ID_PERMISO+'" name="id_edificio_'+	ID_PERMISO+'" value="'+ID_EDIFICIO+'" />'
	retorno += '<input type="hidden" id="id_ambito_'+	ID_PERMISO+'" name="id_ambito_'+	ID_PERMISO+'" value="'+ID_AMBITO+'" />'
	retorno += '<input type="hidden" id="id_localidad_'+ID_PERMISO+'" name="id_localidad_'+	ID_PERMISO+'" value="'+ID_LOCALIDAD+'" />'
	retorno += '<input type="hidden" id="id_partido_'+	ID_PERMISO+'" name="id_partido_'+	ID_PERMISO+'" value="'+ID_PARTIDO+'" />'
	
	retorno += '<label>'+etiquetas[1]+':</label>';
	retorno += (VER_ORGANISMO == 0 && EDICION_ORGANISMO == 0 && DELEGAR_ORGANISMOS == 0	? '<div class="tag tagrojo" title="'+mensajes[9]+'.">'+etiquetas[9]+'</div>'																									: '');
	retorno += (VER_ORGANISMO == 1														? '<div class="tag tagverde" title="'+mensajes[2]+'.">'+etiquetas[6]+'</div>'																									: '');
	retorno += (EDICION_ORGANISMO == 1													? '<div class="tag '+ (ORGANISMOS_PROPIOS == 1 ? 'tagnaranja' : 'tagverde') +'" title="'+mensajes[3]+(ORGANISMOS_PROPIOS == 1 ? mensajes[4] : '')+'.">'+etiquetas[7]+'</div>'	: '');
	retorno += (DELEGAR_ORGANISMOS == 1													? '<div class="tag tagverde" title="'+mensajes[5]+'.">'+etiquetas[8]+'</div>'																									: '');
	
	retorno += '<label>'+etiquetas[2]+':</label>';
	retorno += (VER_EDIFICIO == 0 && EDICION_EDIFICIO == 0 && DELEGAR_EDIFICIOS == 0	? '<div class="tag tagrojo" title="'+mensajes[9]+'.">'+etiquetas[9]+'</div>'																									: '');
	retorno += (VER_EDIFICIO == 1														? '<div class="tag tagverde" title="'+mensajes[2]+'.">'+etiquetas[6]+'</div>'																									: '');
	retorno += (EDICION_EDIFICIO == 1													? '<div class="tag '+ (EDIFICIOS_PROPIOS == 1 ? 'tagnaranja' : 'tagverde') +'" title="'+mensajes[3]+(EDIFICIOS_PROPIOS == 1 ? mensajes[4] : '')+'.">'+etiquetas[7]+'</div>'		: '');
	retorno += (DELEGAR_EDIFICIOS == 1													? '<div class="tag tagverde" title="'+mensajes[5]+'.">'+etiquetas[8]+'</div>'																									: '');
	
	//Ambitos Ocultos
	//retorno += '<label>'+etiquetas[3]+':</label>';
	//retorno += (VER_AMBITO == 0 && EDICION_AMBITO == 0 && DELEGAR_AMBITOS == 0			? '<div class="tag tagrojo" title="'+mensajes[9]+'.">'+etiquetas[9]+'</div>'																									: '');
	//retorno += (VER_AMBITO == 1															? '<div class="tag tagverde" title="'+mensajes[2]+'.">'+etiquetas[6]+'</div>'																									: '');
	//retorno += (EDICION_AMBITO == 1														? '<div class="tag '+ (AMBITOS_PROPIOS == 1 ? 'tagnaranja' : 'tagverde') +'" title="'+mensajes[3]+(AMBITOS_PROPIOS == 1 ? mensajes[4] : '')+'.">'+etiquetas[7]+'</div>'			: '');
	//retorno += (DELEGAR_AMBITOS == 1													? '<div class="tag tagverde" title="'+mensajes[5]+'.">'+etiquetas[8]+'</div>'																									: '');
	
	retorno += '<div class="minitag taggris" id="btn'+ID_PERMISO+'" title="'+mensajes[6]+'." onclick="mostrarMasInformacion(\'btn'+ID_PERMISO+'\',\'row'+ID_PERMISO+'\');">+</div>';
	retorno += '<span id="row'+ID_PERMISO+'" style="display:none;"><br><br><label>'+etiquetas[0]+':</label><br>';
	retorno += '<ul>';
	retorno += '<li>'+etiquetas[4]+': '+(NOMBRE_LOCALIDAD == '' || NOMBRE_LOCALIDAD == null ? document.getElementById("cmbLocalidad").options[0].text : NOMBRE_LOCALIDAD)+'.</li>';
	retorno += '<li>'+etiquetas[5]+': '+(NOMBRE_PARTIDO == '' || NOMBRE_PARTIDO == null ? document.getElementById("cmbPartido").options[0].text : NOMBRE_PARTIDO)+'.</li>';
	retorno += '<li>'+etiquetas[1]+': '+(NOMBRE_ORGANISMO == '' || NOMBRE_ORGANISMO == null ? document.getElementById("cmbOrganismo").options[0].text : NOMBRE_ORGANISMO)+'.</li>';
	retorno += '<li>'+etiquetas[2]+': '+(NOMBRE_EDIFICIO == ':  Nº ' ? document.getElementById("cmbEdificio").options[0].text : NOMBRE_EDIFICIO)+'.</li>';
	//Ambitos Ocultos
	//retorno += '<li>'+etiquetas[3]+': '+(NOMBRE_AMBITO == 'PISO , OFICINA , TURNO ' ? document.getElementById("cmbAmbito").options[0].text : NOMBRE_AMBITO)+'.</li>';
	retorno += '</ul>';
	retorno += '</span>';
	retorno += '</td>';
	retorno += '<td align="center" class="imagecel" title="'+mensajes[7]+'." onclick="editarPermisos(\''+ID_PERMISO+'\',\''+ID_ORGANISMO+'\',\''+ID_EDIFICIO+'\',\''+ID_AMBITO+'\',\''+ID_LOCALIDAD+'\',\''+ID_PARTIDO+'\',\''+FECHA_ALTA+'\',\''+FECHA_BAJA+'\',\''+VER_ORGANISMO+'\',\''+VER_EDIFICIO+'\',\''+VER_AMBITO+'\',\''+EDICION_ORGANISMO+'\',\''+EDICION_EDIFICIO+'\',\''+EDICION_AMBITO+'\',\''+ORGANISMOS_PROPIOS+'\',\''+EDIFICIOS_PROPIOS+'\',\''+AMBITOS_PROPIOS+'\',\''+DELEGAR_ORGANISMOS+'\',\''+DELEGAR_EDIFICIOS+'\',\''+DELEGAR_AMBITOS+'\');"><span class="glyphicon glyphicon-pencil"></span></td>';
	retorno += '<td align="center" class="imagecel" title="'+mensajes[8]+'." onclick="mostrarDialogo(\'#dialog\', \'Eliminar Permiso\', \'question\', \'<p><b>¿Realmente desea eliminar el permiso seleccionado?</b></p>\', \'SiNo\', \'borrarPermisoUsuario('+ID_PERMISO+');\');"><span class="glyphicon glyphicon-trash"></span></td>';
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
			mostrarDialogo("#dialog", "Permiso Guardado", "ok", "<p><b>El permiso se ha guardado correctamente.</b></p>", "", "");
			$('#txtPermisolId').prop("value", response);
			$('#txtPersonaId').trigger('change');
		}else if (response <= 0){
			mostrarDialogo("#dialog", "Problemas al Realizar Guardado", "exclamation", "<p class='invalido'><b>No se ha podido guardar el permiso.</b></p>", "", "");
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

	$("#botonGuardar").show();
	$("#tabsPermisos" ).tabs({ active: 0 });
	$('#tabsPermisos').goTo();
	
	if(ID_ORGANISMO != "null" || ID_EDIFICIO != "null" || ID_AMBITO != "null" || ID_LOCALIDAD != "null" || ID_PARTIDO != "null"){
		document.getElementById('chkEspecificar').checked = true;
	}else{
		document.getElementById('chkEspecificar').checked = false;
	}
	habilitarEspecifico('chkEspecificar',['cmbAmbito','cmbEdificio','cmbOrganismo','cmbLocalidad','cmbPartido']);
}
function ocultarPermiso(){
	$("#tabsPermisos").hide();
	$("#botonGuardar").hide();
	$('#formPermisos').goTo();
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
			mostrarDialogo("#dialog", "Permiso Borrado", "ok", "<p><b>El permiso se ha eliminado correctamente.</b></p>", "", "");
			$('#txtPersonaId').trigger('change');
		}else if (response == -2){
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar el permiso.</b><br>El usuario ha delegado permisos. Se deben eliminar los permisos delegados primero.</p>", "", "");
		}else if (response == -1){
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar el permiso.</b></p>", "", "");
		}else{
			mostrarDialogo("#dialog", "Problemas al Realizar Borrado", "exclamation", "<p class='invalido'><b>No se ha podido eliminar el permiso.</b><br>El permiso especificado no existe.</p>", "", "");
		}
	});
}



function mostrarDialogo(elemento, titulo, icono, contenido, tipo, funcion){
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
								setTimeout(funcion, 10);
							},
							No: function() {
								$( this ).dialog( "close" );
							}
						}
			break;
		case "AceptarCancelar":
			botones =	{
							Aceptar: function() {
								$( this ).dialog( "close" );
								setTimeout(funcion, 10);
							},
							Cancelar: function() {
								$( this ).dialog( "close" );
							}
						}
			break;
		default:
			botones =	{
							Aceptar: function() {
								$( this ).dialog( "close" );
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
}

