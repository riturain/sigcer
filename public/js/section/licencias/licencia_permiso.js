//JS licencias y permisos
$(document).ready(function(){
	$("#tabslicenciasPermisos").tabs();	
 	$("#datepickerD").datepicker($.datepicker.regional["es"],$.datepicker.regional["Today"]);
	$("#datepickerD").datepicker('option', 'dateFormat' , 'dd/mm/yy');

$("#historialLP").dataTable({		
		"iDisplayLength": 10,
		"aoColumns": [
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": false,
			 "bVisible": false}
                    ],
        "bLengthChange": false,
        "bFilter": true,
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
	
	$("#tipodoc").autocomplete({
        source: function( request, response ) {
            $.ajax({
                data:  parametros,
                url: 'licencia_permiso',
                type:  'post',
                dataType: "json",
                success: function( data ) {
                    response( $.map( data, function( item ) {
                        return {
                            label: item['label'],                            
                            value: item['label'],
                            id: item['id']
                        };
                    }));
                }
            });
        },
        minLength: 1,
        autoFocus: true,
        select: function( event, ui ) {
			$('#tipodoc').prop("value",ui.item.value);
			$('#documento').prop("value",ui.item.id);
			
        }
    });
	$("#anio").mask("2099");
});
	
function validalicencia(){
	
	if ($("#anio").val() == ""){
		alertar("Debe completar el año");
		return false;
	}
   	valor = $('#cantdias').val();
	if (!validarNumero(valor)){
			alertar("Cantidad de Dias no es un número");
			return false;
		}	
    valor = $('#datepickerD').val();
    if (valor == ''){
        alertar('Complete un valor para Fecha de Inicio de la Solicitud');
        return false;
    }

    valor = $('#tipo_licencia').val();
    if (valor == ''){
        alertar('Debe seleccionar un tipo de solicitud');
        return false;
    }

	if ($("#tipo_licencia").val() == ';7'){
	
		var desde = $("#datepickerD").val().substring(6,10);
		var hasta = $("#fechahasta").val().substring(6,10);
		if (desde == hasta - 1){
			if (confirm("Recuerde, la fecha desde y hasta del período de Licencia deberá coincidir en el año. Caso contrario, PERDERÁ los días del período solicitado que caen en el siguiente año. ¿La pide de todos modos?")){
				return true;
			}else{
				return false;
			}
		}		
	}	
    return true;
}

	
function traerLicenciaPermisoPorTerm(){
    var que_busca = $('#txt_busca').val();
    var donde_busca = $('#op_busqueda').val();
    if (donde_busca === ''){
        alertar('Debe seleccionar un TIPO de búsqueda');
        return false;
    }
    if (que_busca === ''){
        alertar('Debe indicar el contenido de la búsqueda.');
        return false;
    }
    if (donde_busca === 'NroDoc') {
        if (!validarNumero(que_busca)){
			alertar("No es un número");
			return false;
		}
    }
	$("#resultadosLPPersonas").empty();
    var XHRCM = $.ajax({
		type: "POST",url: "licencia_permiso",
		data:{  accion: 'traerlicenciaPermiso',
				term: que_busca	
			},
		beforeSend: function () {
            $("#resultadosLPPersonas").append("<p>Cargando..</p>");
        }
	});	
	XHRCM.done(function(response){
		$("#resultadosLPPersonas").empty();
		var personas = $.parseJSON(response);
		largo = personas.length;
		if (largo>0){
			var tabla = $("<table id='tablaResultadosLP'></table>");
			var cabecera = $("<thead></thead>");
			cabecera.append("<tr><th>Tipo</th><th>NºDocumento</th><th>Legajo</th><th>Agente</th><th>&nbsp;</th></tr>");
			tabla.append(cabecera);
			var body = $("<tbody></tbody>");
			for (var x = 0; x < largo; x++){
				// personas[x][0] - idPersona
				// personas[x][1] - tipoDoc
				// personas[x][2] - nroDoc
				// personas[x][3] - legajo
				// personas[x][4] - ApyN
				body.append("<tr><td>"+personas[x][1]+"</td><td>"+personas[x][2]+"</td><td>"+personas[x][3]+"</td><td>"+personas[x][4]+"</td><td><button onclick='licenciaParaTercero("+personas[x][0]+");'>Seleccionar</button></td></tr>");
			}
			tabla.append(body);
			$("#resultadosLPPersonas").append(tabla);
			var oTable = $("#tablaResultadosLP").dataTable({
				"sPaginationType": "full_numbers",
				"iDisplayLength": 10,
				"bFilter": true,
				"aoColumns": [
                    {"bSearchable": true},
                    {"bSearchable": true},
                    {"bSearchable": true},
                    {"bSearchable": true},                    
                    {"bSearchable": false}
                    ],
				"bLengthChange": false,
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
			oTable.fnSort( [[3, 'asc']] );
		}else{
			$("#resultadosLPPersonas").append("<p>No hay resultados</p>");
		}
	});	
}

function licenciaParaTercero(idPer){
	var XHRLPTercero = $.ajax({
		type: "POST",url: "licencia_permiso",
		data:{   accion: 'traerDatosLPParaTercero',
				 id_pers: idPer
			   }
			 
	});
	XHRLPTercero.done(function(response){
		var datosTercero = $.parseJSON(response);
		ponerDatosEnFormLP(datosTercero);		
		$("#avisoDeTerceroLP").show();
		$("#avisoDeTerceroLP").empty();
		$("#avisoDeTerceroLP").append("<div class='aviso'>Estás pidiendo una Licencia para un tercero. <button onclick='return traerMisDatos();' >Cancelar</button></div>");
	});
}

function traerMisDatos(){
	var XHRCM = $.ajax({
		type: "POST",url: "licencia_permiso",
		data:{  accion: 'traerDatosParaMi' }
	});
	XHRCM.done(function(response){
		var misDatos = $.parseJSON(response);
		ponerDatosEnFormLP(misDatos);
		$("#avisoDeTerceroLP").empty();
		$("#avisoDeTerceroLP").hide();
	});
}


function ponerDatosEnFormLP(datos){
	$("#id_persona_licencia").val(datos.id_persona);
	$("#apyn").val(datos.apyn);
	$("#id_domicilio").val(datos.id_domicilio);
	$("#tipodoc").val(datos.tipodoc);
	$("#documento").val(datos.documento);
	$("#legajo").val(datos.legajo);
	
	$("#reparticion").val(datos.reparticion);
	$("#dependencia").val(datos.dependencia);
	$("#tabslicenciasPermisos").tabs( "option", "active", 0 );
}
      
	  
function cantDiasLicencia(obj){
	$("#anio").val("");
	$("#cantdias").val("");
	$("#datepickerD").val("");
	$("#fechahasta").val("");
	// toma del Id Value de Tipos de licencias las primeras posiciones que indican la cant maxima de dias
	var dias = obj.value.substr(0,obj.value.indexOf(";"));
	dias = (dias == '')? 0 : dias;
	$("#cantdias").val(dias);	
	if (obj.value !== ';7'){
		fecha = new Date();
		anio = fecha.getFullYear();
		$("#anio").val(anio);	
	}
}

function iraFecha() {
	if (($('#datepickerD').val() !== '') && ($('#tipo_licencia').val() !== '') && ($('#cantdias').val() !== '')){
	
		fechaInicial = $('#datepickerD').val();	
		var lic = $('#tipo_licencia').val().substr($('#tipo_licencia').val().indexOf(";") + 1,$('#tipo_licencia').val().length);
		var XHR = $.ajax({
			type: "POST",
			url: "licencia_permiso",
			data:{  accion: 'calcular_hasta',
					id_licencia: lic,
					fecha_desde: fechaInicial,
					dias: $("#cantdias").val()
				}
		});	
		XHR.done(function(response){			
			$("#fechahasta").val($.parseJSON(response));
		});
		
		
	}
}