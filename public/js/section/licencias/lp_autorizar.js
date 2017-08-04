//JS LP AUTORIZAR
$(document).ready(function(){  
  $("#tabsAnularLicencias").tabs();		
  $("#tabsAnularLicencias").tabs( "option", "active", 0 );
  var motivo = $( "#motivoRechado" );
  var idSol;
  
  //PERSONAS ANULAR
  if($("#tbPersAnular").length != 0) {
	var oTable1 = $("#tbPersAnular").dataTable({
		"sPaginationType": "full_numbers",
		"iDisplayLength": 10,
		"bFilter": true,
		"aoColumns": [
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true},                    
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
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
	oTable1.fnSort( [[1, 'asc']] );   
  }
  
  //AUTORIZANTES ANULAR
  if($("#tbAutoAnular").length != 0) { 
	var oTable2 = $("#tbAutoAnular").dataTable({
		"sPaginationType": "full_numbers",
		"iDisplayLength": 10,
		"bFilter": true,
		"aoColumns": [
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},                    
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
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
	oTable2.fnSort( [[1, 'asc']] );   
  }
  
  //AUTORIZANTES AUTORIZAR
  if($("#tbAutoAutorizar").length != 0) {
	var oTable3 = $("#tbAutoAutorizar").dataTable({
		"sPaginationType": "full_numbers",
		"iDisplayLength": 10,
		"bFilter": true,
		"aoColumns": [
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true, "bVisible":    false},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},                    
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
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
	oTable3.fnSort( [[4, 'asc']] );   
  }
  
  $("#formRechazarSol").dialog({
		autoOpen: false,
		minHeight: 200,		
		minWidth: 600,
		maxWidth: 600,
		dialogClass: "formDialogRechazarSol",
		modal: true,
		buttons: {
			"Aceptar":  function(){rechazarLicencia(motivo.val());},//rechazarLicencia(id, motivo),
			"Cancelar": function() {$( this ).dialog( "close" );}	
		},
		close: function() {
			motivo.val( "" );
		}
  });	
});

function abrirFormRechazoSol(id){
	idSol = id;
	$("#formRechazarSol").dialog("open");
}

function anularLicencia(id){
	
	if (confirm("¿Realmente desea anular esta licencia?")){
		var XHRCM = $.ajax({
			type: "POST",url: "lp_autorizar",
			data:{  accion: 'anularLicencia',
					idLicencia: id
				}		
		});	
		XHRCM.done(function(response){
			window.location.href="lp_autorizar";
		});	
	}
	
	return false;
}

function autorizarLicencia(id){
	
	if (confirm("¿autorizar solicitud?")){
		var XHRCM = $.ajax({
			type: "POST",url: "lp_autorizar",
			data:{  accion: 'autorizarLicencia',
					idLicencia: id
				}		
		});	
		XHRCM.done(function(response){
			window.location.href="lp_autorizar";
		});	
	}
	
	return false;
}

function rechazarLicencia(motivoRechazo){
	
		if(motivoRechazo.length > 0) {
			
			if (confirm("¿rechazar solicitud?")){
			var XHRCM = $.ajax({
				type: "POST",url: "lp_autorizar",
				data:{  accion: 'rechazarLicencia',
						idLicencia: idSol,
						motivo: motivoRechazo
					}		
			});	
			XHRCM.done(function(response){
				window.location.href="lp_autorizar";
			});	
			} 
		} else {
			alertar("Debe completar motivo de rechazo");
			return false;
		}

	return false;

}