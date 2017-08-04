$(document).ready(function(){
	$("#op_busqueda").focus();
});

function traerPersonas(){
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
			return false;
		}
    }
	//limpiar tabla
	$("#resultadosCMPersonas").empty();
    var XHR = $.ajax({
		type: "POST",url: "adm_recibos",
		data:{  accion: 'traePersonasBuscadas',
				term: que_busca	
			},
		beforeSend: function () {
            $("#resultadosPersonas").append("<p>Cargando..</p>");
        }
	});	
	XHR.done(function(response){
		$("#resultadosPersonas").empty();
		var personas = $.parseJSON(response);
		largo = personas.length;
		if (largo>0){
			var tabla = $("<table id='tablaResultados'></table>");
			var cabecera = $("<thead></thead>");
			cabecera.append("<tr><th>Tipo</th><th>NºDocumento</th><th>Legajo</th><th>Agente</th><th>&nbsp;</th></tr>");
			tabla.append(cabecera);
			var body = $("<tbody></tbody>");
			for (var x = 0; x < largo; x++){				
				body.append("<tr>"+
					"<td>"+personas[x]['TIPO_DOCUMENTO']+"</td>"+
					"<td>"+personas[x]['NUMERO']+"</td>"+
					"<td>"+personas[x]['LEGAJO']+"</td>"+
					"<td>"+personas[x]['APELLIDO']+", "+personas[x]['NOMBRE']+"</td>"+
					"<td><button onclick='verRecibosTerceros("+personas[x]['ID_PERSONA']+", \""+personas[x]['APELLIDO']+", "+personas[x]['NOMBRE']+"\");'>Seleccionar</button></td>"+
					"</tr>");
			}
			tabla.append(body);
			$("#resultadosPersonas").append(tabla);
			var oTable = $("#tablaResultados").dataTable({
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
			$("#resultadosPersonas").append("<p>No hay resultados</p>");
		}
	});	
}
function verRecibosTerceros(per,apyn){
	$("#resultadosRecibos").hide();
	$("#persona").val(per);	
	var XHR = $.ajax({
		type: "POST",
		url: "adm_recibos",
		data:{  accion: 'seleccionarPersona',
				persona:per
			}
	});	
	XHR.done(function(datos){
		var listado = $.parseJSON(datos);		
		$("#resultados").empty();
		$("#mesAnio").empty();
		$("#tipoLiq").empty();		
		$("#personaSelected").empty();		
		var auxFecha;
		var largo = listado.fecha.length;		
		if (largo>0){	
			$("#mesAnio").append($("<option value=\"\">Seleccione</option>"));
			for (var x = 0; x < largo; x++){				
				$("#mesAnio").append($("<option value=\""+listado.fecha[x]+"\">"+listado.fecha[x]+"</option>"));
			}
			largo = listado.liquidacion.length;
			if (largo>0){			
				$("#tipoLiq").append($("<option value=\"\">Seleccione</option>"));
				for (var x = 0; x < largo; x++){
					$("#tipoLiq").append($("<option value=\""+listado.liquidacion[x]+"\">"+listado.liquidacion[x]+"</option>"));
				}
			}
			$("#personaSelected").append($("<h2>"+apyn+"</h2>"));
			$("#resultadosRecibos").show();
		}else{			
			alertar("Este agente no tiene recibos");
			return false;
		}
	});
}

function listarRecibos(){
	if (($("#tipoLiq").val() != '') || ($("#mesAnio").val() != '')){
		var XHR = $.ajax({
			type: "POST", 
			url: "adm_recibos",
			data:{ accion: 'listarRecibos', liquidacion: $("#tipoLiq").val(), fecha: $("#mesAnio").val(), persona: $("#persona").val() },
			beforeSend: function( xhr ) {
				$("#resultados").html("Cargando..");
			}		
		});
		XHR.done(function(response){
				$("#resultados").empty();
				$("#resultados").append(response);
				return false;
		});
		
	}else{
		alertar("Debe seleccionar alguna opción");
		return false;
	}
}

function imprimirRecibo(idLiq,liqui){
	var XHR = $.ajax({
		type: "POST", 
		url: "adm_recibos",
		data:{ accion: 'imprimir', idLiquidacion: idLiq, liqui: liqui, tipoLiq: $("#tipoLiq").val(), persona: $("#persona").val() }
	});
	XHR.done(function(response){
			location.href="pdf_recibos";
			return false;
	});	
}