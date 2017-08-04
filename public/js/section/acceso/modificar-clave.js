/**
 * Nombre: modificar-clave.js
 * Fecha: ENE 02, 2017.
 *
 * Descripción: Manejo de modificacion de contraseña
 *
 */

var request_login = false;
$(document).ready(function () {
	$(function () {
		$('#lblDocumento').addClass('active');
		$("#documento").focus();
	})
	$("#btn-modificar-clave").click(function (event) {
		if (request_login)
			return;
		request_login = true;
		if ($('#documento').val() == '') {
			alerta(MSG_CREDENCIALES_USUARIO_VACIA, "error");
			setInputInvalid('#documento');
			return request_login = false;
		}
		// comprobar formato de documento válido (7 u 8 digits)
		longitud = $('#documento').val().length;
		if (longitud == 0 || longitud < 7 || longitud > 9) {
			alerta(MSG_CAMPO_LONGITUD_DOCUMENTO, "error");
			setInputInvalid('#documento');
			return false;
		}
		if ($('#captcha').val() == '') {
			alerta(MSG_IMAGEN_CAPTCHA_VACIA, "error");
			setInputInvalid('#captcha');
			return request_login = false;
		}
		if ($('#clave').val() == '' || $('#reclave').val() == '') {
			alerta(MSG_CLAVE_VACIA, "error");
			setInputInvalid('#clave');
			setInputInvalid('#reclave');
			return request_login = false;
		}
		var longitudClave = $('#clave').val().length;
		if (longitudClave < 4 || longitudClave > 12) {
			alerta(MSG_CAMPO_LONGITUD_CONTRASENA, "error");
			return request_login = false;
		}
		if ($('#clave').val() != $('#reclave').val()) {
			alerta(MSG_CAMPO_CONTRASENA_NO_COINCIDEN, "error");
			setInputInvalid('#clave');
			setInputInvalid('#reclave');
			return false;
		}
		if (validarSinEspacios($('#clave').val()) == false) {
			alerta(MSG_CAMPO_CONTRASENA_NO_VALIDO, "error");
			return false;
		}
		/**
		 * Peticion ajax
		 **/
		var params = {
			accion: "modificar-clave",
			documento: $('#documento').val(),
			link: $('#link').val(),
			captcha: $('#captcha').val(),
			clave: $('#clave').val(),
			reclave: $('#reclave').val(),
			ignoreloading: "true"
		};

		$.ajax({
			url: base_path + directory + '/modificar-clave',
			data: params,
			type: "POST",
			dataType: "json",
			beforeSend: function () {
				alerta(MSG_SOLICITUD_EN_PROCESO, "info");
				loading();
			}
		}).done(function (response) {
			if (response == 'clave-modificada-correctamente') {
				alerta(MSG_CLAVE_MODIFICADA_CORRECTAMENTE, "done");
				setTimeout(function () { window.location.href = base_path + directory + '/login'; }, REDIRECT_DELAY);
			} else{
				cerrarLoading();
				if (response == 'captcha-incorrecto') {
					alerta(MSG_CAPTCHA_FAIL, "error");
					recargarCaptcha();
					return request_login = false;
				} else if (response == 'claves-no-coinciden') {
					alerta(MSG_CAMPO_CONTRASENA_NO_COINCIDEN, "error");
					return request_login = false;
				} else if (response == 'documento-incorrecto') {
					alerta(MSG_DOCUMENTO_INCORRECTO, "error");
					return request_login = false;
				} else if (response == 'documento-no-registrado') {
					alerta(MSG_DOCUMENTO_NO_REGISTRADO, "error");
					return request_login = false;
				} else if (response == 'clave-demasiado-corta') {
					alerta(MSG_CAMPO_LONGITUD_CONTRASENA, "error");
					return request_login = false;
				} else if (response == 'link-invalido') {
					alerta(MSG_LINK_INVALIDO, "error");
					setTimeout(function () {  window.location.href = base_path + directory + '/login'; }, REDIRECT_DELAY);
					return request_login = false;
				} else {
					alerta(MSG_ERROR_GENERAL, "error");
					return request_login = false;
				}
			}
		}).error(function (response, status, error) {
			console.log(response.responseText);
			alerta(MSG_ERROR_GENERAL, "error");
			cerrarLoading();
			return request_login = false;
		}).complete(function (xhr, response, status) {
			if (response !== 'link-invalido') {
				setTimeout(function () { cerrarLoading(); }, 5000);
			}
		});
	});
});