//JS ingResult
$(document).ready(function(){
	$("#tbl_ingResult").dataTable({	
		"sPaginationType": "full_numbers",
		"iDisplayLength": 10,
		"bFilter": true,
		"aoColumns": [
			{"bSearchable": true, "bVisible":    true},			
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},			
			{"bSearchable": true},			
			{"bSearchable": true}
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
});