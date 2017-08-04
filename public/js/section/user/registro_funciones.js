/** Funciones de registro */
function valida_registro(){
    // comprobar tipo de documento - elecci�n del select
    if ($('#tipo').val() == ""){
        alert("Debe seleccionar un tipo de documento");
        return false;
    }
    // comprobar formato de documento v�lido (7 u 8 digits)	
    longitud = $('#documento').val().length;
    if (longitud == 0){
        alert("El documento debe tener entre 7 y 8 d�gitos");
        return false;
    }
    if (longitud < 7){
        alert("El documento debe tener entre 7 y 8 d�gitos");
        return false;
    }
    if (longitud > 9){
        alert("El documento debe tener entre 7 y 8 d�gitos");
        return false;
    }
    doc = $('#documento').val();
    validarNumero(doc);	

    // comprobar sexo - elecci�n de select	
    if ($("#sexo").val() == ""){
        alert('Debe seleccionar un sexo');
        return false;
    }
    if ($("#captcha").val() == ""){
        alert('Debe completar el captcha');
        return false;
    }
    return true;
}
function valida_registro_nuevo(){
    /**
	Verificar:
		1- campos llenos
		2- longitud usuario 7 a 8
		3- pass = repass
		4- usuario != pass
		5- longitud cuip (11 digitos)
		6- mail v�lido
	*/
    if ($('#usuario').val() == '') {
        alert("Ingrese un nombre de usuario");
        return false;
    }
    longitud = $('#usuario').val().length;
    if (longitud < 7) {
        alert("El nombre de usuario debe tener entre 7 y 8 d�gitos");
        return false;
    }
    if (longitud > 8) {
        alert("El nombre de usuario debe tener entre 7 y 8 d�gitos");
        return false;
    }
	
    /**/
    if ($('#pass').val() == '') {
        alert("Ingrese una contrase�a");
        return false;
    }
    if ($('#repass').val() == '') {
        alert("Ingrese nuevamente la contrase�a en el campo Re-Contrase�a");
        return false;
    }
    if ($('#pass').val() != $('#repass').val()) {
        alert("Ingrese la misma contrase�a en los dos campos");
        return false;
    }
    correo = $('#mail').val()
    if(!(validarEmail(correo))){
        alert('Ingrese un Mail verdadero');
        return false;
    }
    cuip = $('#cuip').val();
    if (!(validarNumero(cuip))){
        alert ('El cuip solo puede contener n�meros');
        return false;
    }
	longitudcuip = $('#cuip').val().length;
    if (!(longitudcuip == 11)) {
        alert("El cuip debe tener 11 d�gitos");
        return false;
    }
	//VALIDAR DNI DENTRO DEL CUIP		
	switch(longitud){ //longitud del documento	
	case 7:
		cuipcortado = cuip.substring(3,10);		
		if (!(cuipcortado == $('#usuario').val())){
			alert ('Su cuip no tiene relaci�n con el documento');
			return false;
		}	
		break;
	case 8:
		cuipcortado = cuip.substring(2,10);		
		if (!(cuipcortado == $('#usuario').val())){
			alert ('Su cuip no tiene relaci�n con el documento');
			return false;
		}
		break;
	default:
	  alert ('Su cuip no paso la validaci�n');
	  return false;
	  break;
	}
    return true;
}

function valida_registro_sigcer(){
    /**
	mail
	usuario
	contrase�a
	nuevousuario
	*/
    correo = $('#mail').val()
    if(!(validarEmail(correo))){
        alert('Mail incorrecto');
        return false;
    }
    if ($('#usuario').val() == '') {
        alert("Ingrese un nombre de usuario");
        return false;
    }
    longitud = $('#usuario').val().length;
    if (longitud < 7) {
        alert("El nombre de usuario debe tener entre 8 y 15 caracteres");
        return false;
    }
    if (longitud > 16) {
        alert("El nombre de usuario debe tener entre 8 y 15 caracteres");
        return false;
    }
		
    /* NUEVO NOMBRE DE USUARIO */
    if ($('#nuevoUsuario').val() != '') {		
        longitud = $('#nuevoUsuario').val().length;
        if (longitud < 7) {
            alert("El nuevo nombre de usuario debe tener entre 8 y 15 caracteres");
            return false;
        }
        if (longitud > 16) {
            alert("El nuevo nombre de usuario debe tener entre 8 y 15 caracteres");
            return false;
        }
    }
    return true;
}