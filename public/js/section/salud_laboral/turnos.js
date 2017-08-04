//JS turnos
$(document).ready(function(){
	
	$("#tabsTurnos").tabs();
	
	$("#fecha").datepicker(
		{ minDate: 1,
		  dateFormat: 'dd/mm/yy',
		  beforeShowDay: $.datepicker.noWeekends
		}
	);
	$("#fecha").mask("99/99/9999");
	$("#dialogTurnos").dialog({
		autoOpen: false,
		maxHeight: 200,		
		maxWidth: 300,
		modal: true,
		close: function( event, ui ) {
			cancelarTurno();
		}
	});	
	$("#dialogAnular").dialog({
		autoOpen: false,
		maxHeight: 300,		
		width: 400,
		modal: true
	});
	
	if ($("#imprime").val() == 1){
		$("#tabsTurnos").tabs({active: 0}); //carga la 1era
		imprimirReporte();		
	}
	
	if ($("#imprimeObs").val() == 1){
		$("#tabsTurnos").tabs({active: 1}); //carga la 2da pestaña
		imprimirReporteObs();		
	}
});

function solicitarTurno(){
	var pFecha = $("#fecha").val();
	var XHR = $.ajax({
		type: "POST", url: "turnos",
		data: { accion: 'solicitarTurno',				
				fecha: pFecha
		}
	});
	XHR.done(function(response) {
		var turno = $.parseJSON(response);
		if (turno[2] != null){
			//error de solicitud
			alertar(turno[2]);
		}else{			
			$("#turnoDialog").val(turno[0]);
			$("#fechaTurno").val(turno[0]);
			$("#id_esp_unidadasis").val(turno[1]);
			$("#dialogTurnos").dialog("open");
		}
	});
}

function cancelarTurno(){
	var XHR = $.ajax({
		type: "POST", url: "turnos",
		data: { accion: 'cancelarTurno',				
				fecha: $("#fechaTurno").val()
		}
	});
	XHR.done(function(response) {
		window.location.href="turnos";
	});
}
function confirmarTurno(){
	var XHR = $.ajax({
		type: "POST", url: "turnos",
		data: { accion: 'confirmarTurno',				
				fecha: $("#fechaTurno").val()
		}
	});
	XHR.done(function(response) {
		window.location.href="turnos";
	});
}

function openDialogAnular(a,b){
	$("#obs").val("");
	$("#a").val(a);
	$("#b").val(b);
	$("#dialogAnular").dialog("open");
}

function anularTurno(){
	var XHR = $.ajax({
		type: "POST", url: "turnos",
		data: { accion: 'anularTurno',				
				ta: $("#a").val(),
				pr: $("#b").val(),
				obs: $("#obs").val()
		}
	});
	XHR.done(function(response){
		window.location.href="turnos";
	});
}

function cerrarConfirmacion(){
	$('#msgConfirmacion').hide("blind");
}

function guardarMedicos(){
	var datos = [];
	var params = [];
	$("#observaciones").find(':input[type=hidden]').each(function() {		
		//this.id
		//this.value
		//this.type		
		datos.push(this.value);
	});
	datos.forEach(function(each) {
		params.push(each+"#"+$("#medico_"+each).val() + ", " + $("#matricula_"+each).val());
	});
	/*
	params.forEach(function(each){
		alert(each);
	});
	*/
	
	var XHR = $.ajax({
		type: "POST", url: "turnos",
		data: { accion: 'guardaObs',
				p: params
		}
	});
	XHR.done(function(response){
		if (response == "0"){
			window.location.href="turnos";
		}else{
			alertar(response);
			return false;
		}
	});	
}

function imprimirReporte(){
	window.location.href="turnos?imprimeReporte=1";
}

function imprimirReporteObs(){
	window.location.href="turnos?imprimeReporteObs=1";
}