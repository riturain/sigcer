function validarClaves(){
	if ($("#documento").val() == ''){
		alerta('Complete su documento', 'error');
		setInputInvalid('#documento');
		return false;
	}
	if ($("#passActual").val() == ''){
		alerta('Complete su clave actual', 'error');
		setInputInvalid('#passActual');	
		return false;
	}
	if ($("#captcha").val() == ''){
		alerta('Complete el captcha', 'error');
		setInputInvalid('#captcha');
		recargarCaptcha();
		return false;
	}
	//clave
	longitud = $('#passNueva').val().length;			
	if (longitud < 4) {
		alerta("La contraseña debe tener entre 4 y 12 caracteres", 'error');
		setInputInvalid('#passNueva');
		return false;
	}
	if (longitud > 12) {
		alerta("La contraseña debe tener entre 4 y 12 caracteres", 'error');
		setInputInvalid('#passNueva');
		return false;
	}
	if (($("#passNueva").val() == '') || ($("#passRe").val() == '')){
		alerta('Ingrese su nueva clave', 'error');
		setInputInvalid('#passNueva');
		return false;
	}
	if ($("#passNueva").val() != $("#passRe").val()){
		alerta('Tiene que ingresar dos veces la clave nueva. Las claves no coinciden', 'error');
		setInputInvalid('#passNueva');
		setInputInvalid('#passRe');
		return false;
	}	
	return true;
}

function compararClaves(){
	var p1 = $("#passNueva").val();
	var p2 = $("#passRe").val();
	if (p1 == p2){
		longitud = $('#passNueva').val().length;			
		if (longitud < 4) {
			alerta("La contraseña debe tener entre 6 y 12 caracteres", 'error');
			setInputInvalid('#passNueva');
			return false;
		}
		if (longitud > 12) {
			alerta("La contraseña debe tener entre 6 y 12 caracteres", 'error');
			setInputInvalid('#passNueva');
			return false;
		}
		return false;
	}
	else{
		alerta("Las contraseñas no coinciden", 'error');
		return false;
	}
}