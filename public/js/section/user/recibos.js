$(document).ready(function(){
	
});

function listarRecibos(){
	if (($("#tipoLiq").val() != '') || ($("#mesAnio").val() != '')){
		var nrocta = '';
		if ($("#nrocta").val() != ''){
			nrocta = $("#nrocta").val();
		}
		var XHR = $.ajax({
			type: "POST", 
			url: "recibos",
			data:{ 
					accion: 'listar', 
					liquidacion: $("#tipoLiq").val(), 
					fecha: $("#mesAnio").val(),
					nrocta: nrocta
				},
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
		url: "recibos",
		data:{ accion: 'imprimir', idLiquidacion: idLiq, liqui: liqui, tipoLiq: $("#tipoLiq").val() }
	});
	XHR.done(function(response){
			location.href=response;
			return false;
	});	
}