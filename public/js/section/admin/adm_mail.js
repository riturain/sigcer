$(document).ready(function(){
	$("#busca_documento").focus();
});

function validarMail(){
	if (($("#mail_1").val() != "") && ($("#mail_1").val() == $("#mail_2").val())){
		return validarEmail($("#mail_1").val());
	}else{
		alertar("El mail debe repetirse para verificar errores de escritura.");
		return false;
	}
}

function validarDocumento(){
	if (($("#busca_documento").val().length > 8) || ($("#busca_documento").val().length < 7)){
		alertar("Complete correctamente el documento");
		return false;
	}
	if ($.isNumeric($("#busca_documento").val())){
		return true
	}else{
		return false;		
	}
}