//JS licencias y permisos
$(document).ready(function(){
	$("#tabsnovedadesAsistencia").tabs();	
	$("#tabsnovedadesAsistencia").tabs( "option", "active", 0 );

	if($("#tablaAsistenciaPersona").length != 0) {
		var oTable1 = $("#tablaAsistenciaPersona").dataTable({		
			"sPaginationType": "full_numbers",															 
			"iDisplayLength": 10,
			"aoColumns": [
				{"bSearchable": false, "sType": 'date'},
				{"bSearchable": false},
				{"bSearchable": false},
				{"bSearchable": false},
				{"bSearchable": false},
				{"bSearchable": false}],
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
		//oTable1.fnSort( [[1, 'asc']] ); 
	}
	

});
	
function traerNovedadesAsistenciaPorTerm(){
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
	$("#resultadosNovedadesAsistencia").empty();
    var XHRCM = $.ajax({
		type: "POST",url: "licencia_permiso",
		data:{  accion: 'traerlicenciaPermiso',
				term: que_busca	
			},
		beforeSend: function () {
            $("#resultadosNovedadesAsistencia").append("<p>Cargando..</p>");
        }
	});	
	XHRCM.done(function(response){
		$("#resultadosNovedadesAsistencia").empty();
		var personas = $.parseJSON(response);
		largo = personas.length;
		if (largo>0){
			var tabla = $("<table id='tablaResultadosAsistencias'></table>");
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
				body.append("<tr><td>"+personas[x][1]+"</td><td>"+personas[x][2]+"</td><td>"+personas[x][3]+"</td><td>"+personas[x][4]+"</td><td><button onclick='ausenciasDeTerceros("+personas[x][0]+");'>Seleccionar</button></td></tr>");
			}
			tabla.append(body);
			$("#resultadosNovedadesAsistencia").append(tabla);
			var oTable = $("#tablaResultadosAsistencias").dataTable({
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
			$("#resultadosNovedadesAsistencia").append("<p>No hay resultados</p>");
		}
	});	
}

function ausenciasDeTerceros(idPer){
	var XHRNATercero = $.ajax({
		type: "POST",url: "novedades_asistencia",
		data:{   accion: 'traerDatosNAParaTercero',
				 id_pers: idPer
			 }
			 
	});
	XHRNATercero.done(function(response){
							   
		$("#resultadosNovedadesAsistencia").empty();							   
		var datosTercero = $.parseJSON(response);
		largo = datosTercero.length;
		
		if (largo>0){
			var tabla = $("<table id='tablaResultadosAsistencias'></table>");
			var cabecera = $("<thead></thead>");
			cabecera.append("<tr><th>NOMBRE</th><th></th><th>LUNES</th><th>MARTES</th><th>MIERCOLES</th><th>JUEVES</th><th>VIERNES</th></tr>");
			tabla.append(cabecera);
			var body = $("<tbody></tbody>");
			for (var x = 0; x < largo; x++){
				// personas[x][0] - idPersona
				// personas[x][1] - tipoDoc
				// personas[x][2] - nroDoc
				// personas[x][3] - legajo
				// personas[x][4] - ApyN
				body.append("<tr><td>"+datosTercero[x]['AYN']+"</td><td>"+datosTercero[x]['LUNES_SEMANA']+"</td><td>"+datosTercero[x]['LUNES']+"</td><td>"+datosTercero[x]['MARTES']+"</td><td>"+datosTercero[x]['MIERCOLES']+"</td><td>"+datosTercero[x]['JUEVES']+"</td><td>"+datosTercero[x]['VIERNES']+"</td></tr>");
			}
			tabla.append(body);
			$("#resultadosNovedadesAsistencia").append(tabla);
			var oTable = $("#tablaResultadosAsistencias").dataTable({
				"sPaginationType": "full_numbers",
				"iDisplayLength": 10,
				"bFilter": true,
				"aoColumns": [
                    {"bSearchable": false},
                    {"bSearchable": false, "sType": 'date'},
                    {"bSearchable": false},
                    {"bSearchable": false},
                    {"bSearchable": false},                    
                    {"bSearchable": false},
					{"bSearchable": false},
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
//			oTable.fnSort( [[1, 'asc']] );
		}else{
			$("#resultadosNovedadesAsistencia").append("<p>No hay resultados</p>");
		}

		
		
		
		
		
		
		
		
		
		
		
		
		
		
/*		ponerDatosEnFormLP(datosTercero);		
		$("#avisoDeTerceroLP").show();
		$("#avisoDeTerceroLP").empty();
		$("#avisoDeTerceroLP").append("<div class='aviso'>Estás pidiendo una Licencia para un tercero. <button onclick='return traerMisDatos();' >Cancelar</button></div>");*/
	});
}

