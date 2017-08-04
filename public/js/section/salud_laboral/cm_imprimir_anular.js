//JS CM IMPRIMIR ANULAR
$(document).ready(function(){  
  if($("#tablaResultadosCM").length != 0) {
	var oTable = $("#tablaResultadosCM").dataTable({
		"sPaginationType": "full_numbers",
		"iDisplayLength": 10,
		"bFilter": true,
		"aoColumns": [
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},                    
			{"bSearchable": false},
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
  }
});

function traerCarpetasMedicasPorTerm(){
    var que_busca = $('#txt_busca').val();    
    if (que_busca === ''){
        alertar('Debe indicar el contenido de la búsqueda.');
        return false;
    }
	$("#listadoCM").empty();
    var XHRCM = $.ajax({
		type: "POST",url: "carpeta_medica",
		data:{  accion: 'traerCarpetasMedicasPorBusqueda',
				term: que_busca	
			},
		beforeSend: function () {
            $("#listadoCM").append("<p>Cargando..</p>");
        }
	});	
	XHRCM.done(function(response){
		$("#listadoCM").empty();
		var carpetas = $.parseJSON(response);
		largo = carpetas.length;
		if (largo>0){
			var tabla = $("<table id='tablaResultadosCM'></table>");
			var cabecera = $("<thead></thead>");
			cabecera.append("<tr class='topic'><th>N°DOCUMENTO</th><th>AGENTE</th><th>FECHA SOLICITUD</th><th>N°FORMULARIO</th><th>IMPRIMIR</th><th>ANULAR</th></tr>");
			tabla.append(cabecera);
			var body = $("<tbody></tbody>");
			for (var x = 0; x < largo; x++){
				// carpetas[x][0] - 
				// carpetas[x][] - 
				// carpetas[x][] - 
				// carpetas[x][] - 
				// carpetas[x][] - 
				// carpetas[x][] - 
				body.append("<tr><td>"+carpetas[x][1]+"</td><td>"+carpetas[x][2]+"</td><td>"+carpetas[x][3]+"</td><td>"+carpetas[x][4]+"</td><td>"+carpetas[x][4]+"</td><td><button onclick='return imprimirCarpeta("+carpetas[x][0]+");'>Imprimir</button></td><td><button onclick='return anularCarpeta("+carpetas[x][0]+");'>Anular</button></td></tr>");
			}
			tabla.append(body);
			$("#listadoCM").append(tabla);			
			var oTable = $("#tablaResultadosCM").dataTable({
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
			$("#listadoCM").append("<p>No hay resultados</p>");
		}
	});
	return false;
}

function imprimirCarpeta(id){
	window.location.href= "cm_imprimir_anular?id="+id;
	return false;	
}
function anularCarpeta(id,fila){
	
	
	
	if (confirm("¿Realmente desea anular esta carpeta?")){
		var XHRCM = $.ajax({
			type: "POST",url: "cm_imprimir_anular",
			data:{  accion: 'anularCarpeta',
					idCarpeta: id
				}		
		});	
		XHRCM.done(function(response){
			window.location.href="cm_imprimir_anular";
		});	
	}
	return false;
}