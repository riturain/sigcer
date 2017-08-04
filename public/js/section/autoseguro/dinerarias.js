function imprimeDine(num,rec){	
	window.location.href= "dinerarias?imp="+num+"&rec="+rec;
}

function imprimeReporte(prestacion){	
	window.location.href= "dinerarias?prestacion="+prestacion;
}

function seleccionMedio(sin,rect){
	$("button").hide();	
	if (confirm('Desea aceptar?')){
		var XHR = $.ajax({
			type: "POST",
			url: "dinerarias",
			data:{  
				accion: 'medio',
				siniestro: sin,
				medio: 1,
				rect: rect
				}
		});
		XHR.done(function(response){
			window.location.href="dinerarias";
		});			
	}else{
		return false;
	}
}