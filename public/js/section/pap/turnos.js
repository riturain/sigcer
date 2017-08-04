//JS turnos
datepicker_format = 'dd/mm/yyyy';
datepicker_min = 1;
datepicker_disable = [1,7];

$(document).ready(function(){
		
	$("#fecha").mask("99/99/9999");
	
	if ($("#imprime").val() == 1){		
		imprimirReporte();		
	}
	
	if ($("#imprimeObs").val() == 1){		
		imprimirReporteObs();		
	}	

	$('#dialogTurnos').modal({			
		complete: function(){cancelarTurno();} 
    });


});

function solicitarTurno(){
	var pFecha = $("#fecha").val();
	var XHR = $.ajax({
		type: "POST", url: "pap_turnos",
		data: { accion: 'solicitarTurno',				
				fecha: pFecha
		}
	});
	XHR.done(function(response) {
		var turno = $.parseJSON(response);
		if (turno[2] != null){
			//error de solicitud
			alerta(turno[2],'info');
		}else{
			$("#turnoDialog").val(turno[0]);
			$("#fechaTurno").val(turno[0]);
			$("#id_esp_unidadasis").val(turno[1]);

			$("#modal_turno").empty();
			if (pFecha == turno[0]){
				$("#modal_turno").append("<div><p>Podemos ofrecerte el turno para la fecha sugerida </p><p><b>"+turno[0]+"</b>.</p><p> ¿Desea confirmar?</p></div>");
			}else{
				$("#modal_turno").append("<div><p>El turno que le podemos ofrecer es para la fecha </p><p><b>"+turno[0]+"</b>.</p><p> ¿Desea confirmar?</p></div>");				
			}
			$("#dialogTurnos").modal("open");
		}
	});
}

function cancelarTurno(){
	var XHR = $.ajax({
		type: "POST", url: "pap_turnos",
		data: { accion: 'cancelarTurno',				
				fecha: $("#fechaTurno").val()
		}
	});
	XHR.done(function(response) {
		window.location.href="pap_turnos";
	});
}
function confirmarTurno(){	
	var XHR = $.ajax({
		type: "POST", url: "pap_turnos",
		data: { accion: 'confirmarTurno',				
				fecha: $("#fechaTurno").val()
		}
	});
	XHR.done(function(response) {
		window.location.href="pap_turnos";
	});
}

function openDialogAnular(a,b){
	$("#obs").val("");
	$("#a").val(a);
	$("#b").val(b);
	$("#dialogAnular").modal("open");
}

function anularTurno(){
	var XHR = $.ajax({
		type: "POST", url: "pap_turnos",
		data: { accion: 'anularTurno',				
				ta: $("#a").val(),
				pr: $("#b").val(),
				obs: $("#obs").val()
		}
	});
	XHR.done(function(response){
		window.location.href="pap_turnos";
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
	
	var XHR = $.ajax({
		type: "POST", url: "pap_turnos",
		data: { accion: 'guardaObs',
				p: params
		}
	});
	XHR.done(function(response){
		if (response == "0"){
			window.location.href="pap_turnos";
		}else{
			alertar(response);
			return false;
		}
	});	
}

function imprimirReporte(){
	window.location.href="pap_turnos?imprimeReporte=1";
}

function imprimirReporteObs(){
	window.location.href="pap_turnos?imprimeReporteObs=1";
}