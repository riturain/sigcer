$(document).ready(function(){
	$("#doc").focus();
	
	
	$("#doc").bind("enterKey",function(e){
		buscarUsuario();
	});
	$("#doc").keyup(function(e){
		if(e.keyCode == 13){
			$(this).trigger("enterKey");
		}
	});
	
});
function buscarUsuario(){
	$("#respuesta").empty();
	if (($("#doc").val() != '') && ($("#doc").val().length > 6)){
		var XHR = $.ajax({
			type: "POST",
			url: "adm_ddjj_reubic",
			data:{  accion: 'checkDocumento',
					doc: $("#doc").val()
				},
			beforeSend: function() {
				$("#respuesta").append("<p>Cargando..</p>");
			}
		});	
		XHR.done(function(response){
			$("#respuesta").empty();
			if (response != ""){
				$("#respuesta").append("<p><button type='button' onclick='resetDDJJ("+$("#doc").val()+",\""+response+"\");return false;'>Reset DDJJ</button> - "+response+"</p>");
			}
			$("#doc").val("");
		});
	}else{
		alertar("Debe escribir un documento");
		return false;
	}
}

function resetDDJJ(doc,nyap){
	if (confirm("Está seguro que desea resetear la DDJJ de "+nyap)){
		$("#respuesta").empty();
		var XHR = $.ajax({
			type: "POST",
			url: "adm_ddjj_reubic",
			data:{  accion: 'resetDDJJ',
					doc: doc
				},
			beforeSend: function() {
				$("#respuesta").append("<p>reseteando..</p>");
			}
		});	
		XHR.done(function(response){
			$("#respuesta").empty();
			if (response == '1'){
				$("#respuesta").append("<p>El usuario "+nyap+" de documento "+doc+" fue reseteado exitosamente</p>");
			}else{
				$("#respuesta").append("<p>NO SE PUDO RESETEAR la DDJJ del usuario "+nyap+" de documento "+doc+", O NO EXISTE</p>");
			}
		});
	}
}