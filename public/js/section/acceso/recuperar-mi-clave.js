/**
 * Nombre: recuperar-mi-clave.js
 * Fecha: DIC 28, 2016.
 *
 * Descripción: Manejo de inicio de sesion para autenticacion de Usuarios
 *
 */

var request_login = false;
$(document).ready(function () {
	$(function () {
		$('#lblDocumento').addClass('active');
		$("#documento_recuperar").focus();
	})
	$("#btn-reestablecer-clave").click(function (event) {
		if (request_login)
			return;
		request_login = true;
		if ($('#documento_recuperar').val() == '') {
			alerta(MSG_CREDENCIALES_USUARIO_VACIA, "error");
			setInputInvalid('#documento_recuperar');
			return request_login = false;
		}
		if ($('#captcha-2').val() == '') {
			alerta(MSG_IMAGEN_CAPTCHA_VACIA, "error");
			setInputInvalid('#captcha-2');
			return request_login = false;
		}
		var params = {
			accion: "reestablecer-clave",
			documento: $('#documento_recuperar').val(),
			captcha: $('#captcha-2').val(),
			ignoreloading: "true"
		};
		$.ajax({
			url: base_path + directory + '/recuperar-mi-clave',
			data: params,
			type: "POST",
			dataType: "json",
			beforeSend: function () {
			loading();
			}
		}).done(function (response) {
			if (response == 'envio-mail-correo-registrado') {
				alerta(MSG_ENVIO_CLAVE_EXITO, "done");
				setTimeout(function () { window.location.href = TARGET_URL_PAGE; }, 5000);
			} else {
				cerrarLoading();
				if (response == 'captcha-incorrecto') {
					alerta(MSG_CAPTCHA_FAIL, "error");
					$('#captcha-2').val('');
					recargarCaptcha();
					return request_login = false;
				} else if (response == 'documento-incorrecto') {
					alerta(MSG_DOCUMENTO_INCORRECTO, "error");
					return request_login = false;
				} else if (response == 'documento-no-registrado') {
					alerta(MSG_DOCUMENTO_NO_REGISTRADO, "error");
					$('#documento_recuperar').focus();
					return request_login = false;
				} else if (response == 'mail-incorrecto') {
					alerta(MSG_MAIL_INCORRECTO, "error");
					return request_login = false;
				} else {
					alerta(MSG_ERROR_GENERAL, "error");
					return request_login = false;
				}
		}
		}).error(function (response, status, error) {
			alerta(MSG_ERROR_GENERAL, "error");
			cerrarLoading();
			return request_login = false;
		});
	});
});
