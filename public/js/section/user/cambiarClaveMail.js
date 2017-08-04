$(document).ready(function(){
	$("#documento").focus();
});

function validarForm(){
	if ($("#captcha").val() == ""){
		alert("Complete el captcha");
		$("#captcha").focus();
		return false;
	}
	if ($.isNumeric($("#documento").val()) == false){
		return false;
	}
	if ($("#clave").val() == ""){
		alert("Complete la clave");
		$("#clave").focus();
		return false;
	}
	if ($("#clave").val() != $("#reclave").val()){
		alert("Las claves deben ser iguales");
		$("#reclave").focus();
		return false;
	}
	if ($("#clave").val().length < 5 ){
		alert("La clave es demasiado corta.");
		$("#clave").focus();
		return false;		
	}
	return true;
}