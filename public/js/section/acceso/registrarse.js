/**
 * Nombre: registrarse.js
 * Fecha: ENE 04, 2017.
 *
 * Descripción: Manejo de Registro de Usuarios
 *
 * Verificar:
 1- campos llenos
 2- longitud usuario 7 a 8
 3- pass = repass
 4- usuario != pass
 5- longitud cuip (11 digitos)
 6- mail válido
 */

var request_login = false;
$(document).ready(function () {
	$("#btn-registrarme").click(function (event) {
		if (request_login)
			return;
		request_login = true;

		//Tipo DNI
		if ($('#tipo').val() == '') {
			alerta(MSG_CAMPO_TIPO_DNI_VACIO, "error");
			setInputInvalid('#tipo');
			return request_login = false;
		}
		//Documento
		dni = $('#documento_registro').val();
		if (dni == '') {
			alerta(MSG_CAMPO_NRO_DOCUMENTO, "error");
			setInputInvalid('#documento_registro');
			return request_login = false;
		}
		// comprobar formato de documento válido (7 u 8 digits)
		longitud = $('#documento_registro').val().length;
		if (longitud == 0 || longitud < 7 || longitud > 9) {
			alerta(MSG_CAMPO_LONGITUD_DOCUMENTO, "error");
			setInputInvalid('#documento_registro');
			return request_login = false;
		}
		var doc = $('#documento_registro').val();
		validarNumero(doc);
		//Sexo
		if ($('#sexo').val() == '') {
			alerta(MSG_CAMPO_TIPO_SEXO, "error");
			setInputInvalid('#sexo');
			return request_login = false;
		}
		correo = $('#mail').val().trim();
		if (correo == '') {
			alerta(MSG_CAMPO_EMAIL_NO_VACIO, "error");
			setInputInvalid('#mail');
			return request_login = false;
		}
		if (!(validarEmail(correo))) {
			alerta(MSG_CAMPO_EMAIL_FORMATO_VALIDO, "error");
			setInputInvalid('#mail');
			return request_login = false;
		}
		cuip = $('#cuip').val();
		if (!(validarNumero(cuip))) {
			alerta(MSG_CAMPO_CUIL_FORMATO_NUMEROS, "error");
			setInputInvalid('#cuip');
			return request_login = false;
		}
		if (!(validaCuitConDNI(cuip, dni))) {
			alerta(MSG_CAMPO_CUIL_DISTINTO_DOCUMENTO, "error");
			setInputInvalid('#cuip');
			return request_login = false;
		}
		longitudcuip = $('#cuip').val().length;
		if (!(longitudcuip == 11)) {
			alerta(MSG_CAMPO_CUIL_CANTIDAD_DIGITOS, "error");
			setInputInvalid('#cuip');
			return request_login = false;
		}
		//VALIDAR DNI DENTRO DEL CUIP //longitud del documento
		var longitud = $('#documento_registro').val().length;
		switch (longitud) {
			case 7:
				cuipcortado = cuip.substring(3, 10);
				if (!(cuipcortado == $('#documento_registro').val())) {
					alerta(MSG_CAMPO_CUIL_DISTINTO_DOCUMENTO, "error");
					setInputInvalid('#documento_registro');
					return request_login = false;
				}
				break;
			case 8:
				cuipcortado = cuip.substring(2, 10);
				if (!(cuipcortado == $('#documento_registro').val())) {
					alerta(MSG_CAMPO_CUIL_DISTINTO_DOCUMENTO, "error");
					setInputInvalid('#documento_registro');
					setInputInvalid('#cuip');
					return request_login = false;
				}
				break;
			default:
				alerta(MSG_CAMPO_CUIL_INVALIDO, "error");
				setInputInvalid('#documento_registro');
				return request_login = false;
				break;
		}
		if ($('#pass').val() == '') {
			alerta(MSG_CAMPO_CONTRASENA_NO_VACIA, "error");
			setInputInvalid('#pass');
			return request_login = false;
		}
		var longitudClave = $('#pass').val().length;
		if (longitudClave < 4 || longitudClave > 12) {
			alerta(MSG_CAMPO_LONGITUD_CONTRASENA, "error");
			setInputInvalid('#pass');
			return request_login = false;
		}
		if ($('#repass').val() == '') {
			alerta(MSG_CAMPO_REPETIR_CONTRASENA, "error");
			setInputInvalid('#repass');
			return request_login = false;
		}
		if ($('#pass').val() != $('#repass').val()) {
			alerta(MSG_CAMPO_CONTRASENA_NO_COINCIDEN, "error");
			setInputInvalid('#pass');
			setInputInvalid('#repass');
			return request_login = false;
		}
		if (validarSinEspacios($('#pass').val()) == false) {
			alerta(MSG_CAMPO_CONTRASENA_NO_VALIDO, "error");
			setInputInvalid('#pass');
			return request_login = false;
		}
		//Contraseña
		if (($('#documento_registro').val().trim() == $('#pass').val().trim())) {
			alerta(MSG_DOCUMENTO_DISTINTO_CONTRASENA, "error");
			setInputInvalid('#pass');
			return request_login = false;
		}
		//Captcha
		if ($("#captcha-1").val().trim() === "") {
			alerta(MSG_CAPTCHA_VACIO, "error");
			setInputInvalid('#captcha-1');
			$('#captcha-1').val('');
			recargarCaptcha();
			return request_login = false;
		}
		//Realizamos la peticion Ajax
		if (request_login == true) {
			var params = {
				accion: "guardarNuevo",
				captcha: $('#captcha-1').val().trim(),
				doc: $('#documento_registro').val(),
				pass: $('#pass').val().trim(),				
				cuip: $('#cuip').val(),
				sexo: $('#sexo').val(),
				mail: $('#mail').val(),
				tipo: $('#tipo').val(),
				ignoreloading: "true"
			};

			$.ajax({
				url: base_path + directory + '/registrarse',
				data: params,
				type: "POST",
				dataType: "json",
				beforeSend: function () {
					loading();
				}
			}).done(function (response) {				
				recargarCaptcha();
				$("#captcha-1").val("");
				//console.log('.done ' + JSON.stringify(response));
				if (response == 'registro-exitoso') {
					alerta(MSG_REGISTRO_EXITOSO, "done");
					setTimeout(function () {window.location.href = TARGET_URL_PAGE;}, 5000);
				} else{
					cerrarLoading();
					request_login = false;
					switch(response){
						case 'faltan-datos-obligatorios':
							alerta(MSG_DATOS_OBLIGATORIOS, "error");
							setInputInvalid('#captcha-1');							
							break;
						case 'captcha-incorrecto':
							alerta(MSG_CAPTCHA_FAIL, "error");
							$('#captcha-1').val('');
							setInputInvalid('#captcha-1');
							recargarCaptcha();							
							break;
						case 'documento-incorrecto':
							alerta(MSG_DOCUMENTO_INCORRECTO, "error");
							setInputInvalid('#documento_registro');							
							break;
						case 'documento-ya-registrado':
							alerta(MSG_DOCUMENTO_YA_REGISTRADO, "error");
							setInputInvalid('#documento_registro');							
							break;
						case 'documento-no-registrado':
							alerta(MSG_DOCUMENTO_NO_REGISTRADO, "error");
							setInputInvalid('#documento_registro');							
							break;
						case 'mail-incorrecto':
							alerta(MSG_CAMPO_EMAIL_FORMATO_VALIDO, "error");
							setInputInvalid('#mail');
							break;
						case 'campo-cuil-invalido':
							alert(MSG_CAMPO_CUIL_INVALIDO,"error");
							setInputInvalid('#cuip');
							break;
                    	case 'es-usuario-sigcer':
                        	alerta(MSG_ES_USUARIO_sigcer, "error");                        	
                        	break;
						default:
							alerta(response, "error");
							setInputInvalid('#documento_registro');							
							break;
					}					
					return false;
				}
			}).error(function (response, status, error) {
				recargarCaptcha();
				$("#captcha-1").val("");
				request_login = false;
				var MSG = (response.readyState == 4) ? response.responseText : '';
                //console.log('.error ' + response.responseText);
				alerta(MSG_ERROR_GENERAL, "error");
				cerrarLoading();
				return false;
			})
		}
	});
});
