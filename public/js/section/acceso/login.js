/**
 * Nombre: login.js
 * Fecha: DIC 05, 2016.
 *
 * Descripción: Manejo de inicio de sesion para autenticacion de Usuarios
 *
 */

$(document).ready(function () {
	if(location.search.split('redirect=').length > 1){
		alerta(MSG_SESION_CADUCADA, "warning");
	}
	$(function () {
		$('#lblDocumento').addClass('active');
		$("#documento").focus();
	});
});

$("#documento").keypress(function (event) {
    if (event.which == 13)
        $("#inp_pass").focus();
});

$("#inp_pass").keypress(function (event) {
    if (event.which == 13)
        $("#btn-login").click();
});

var request_login = false;
$("#btn-login").click(function (event) {
	if (request_login)
		return;
	request_login = true;

	var params = {
		submit: "submit",
		usuario: $('#documento').val(),
		password: $('#inp_pass').val(),
		ignoreloading: "true"
	};
	if ($('#documento').val() == '') {
		alerta(MSG_CREDENCIALES_VACIAS, "error");
		setInputInvalid('#documento');
		return request_login = false;
	}
	var longitudDocumento = $('#documento').val().length;
	if (longitudDocumento < 6 || longitudDocumento > 12) {
		alerta(MSG_CAMPO_LONGITUD_DOCUMENTO, "error");
		setInputInvalid('#documento');
		return request_login = false;
	}
	if ($('#inp_pass').val() == '') {
		alerta(MSG_CREDENCIALES_VACIAS, "error");
		setInputInvalid('#inp_pass');
		return request_login = false;
	}
	var longitudClave = $('#inp_pass').val().length;
	if (longitudClave < 4 || longitudClave > 12) {
		alerta(MSG_CAMPO_LONGITUD_CONTRASENA, "error");
		setInputInvalid('#inp_pass');
		return request_login = false;
	}

	$.ajax({
		url: 'login',
		data: params,
		type: "POST",
		dataType: "json",
		timeout: 5000,
		beforeSend: function () {
			loading();
			alerta(MSG_SOLICITUD_EN_PROCESO, "info");
		}
	}).done(function (response) {
		if (response == 200) {
			loading();
			alerta(MSG_CREDENCIALES_VALIDAS, "info");
			setTimeout(function () { window.location.href = TARGET_URL_PAGE; }, REDIRECT_DELAY);
		} else if (response == 222) {
			alerta(MSG_CREDENCIALES_VALIDAS, "info");
			loading();
			setTimeout(function () { window.location.href = URL_PAGINA_VALIDAR_ORGANISMO;}, REDIRECT_DELAY);
		} else if (response == 2001) {
			alerta(MSG_CREDENCIALES_INVALIDAS, "error");
			$('#documento').focus();
			cerrarLoading();
			return request_login = false;
		} else if (response == 2002 || response == 2003) {
			alerta(MSG_USUARIO_DESCONOCIDO, "error");
			$('#documento').focus();
			cerrarLoading();
			return request_login = false;
		} else if (response == 2004) {
			alerta(MSG_COMPLETAR_EMAIL, "error");
			cerrarLoading();
			return request_login = false;
		} else {
			alerta(MSG_ERROR_GENERAL, "error");
			cerrarLoading();
			return request_login = false;
		}
	}).error(function (response, status, error) {
		console.log(JSON.stringify(response));
		if (response.statusText == 'timeout') {
			alerta(MSG_ERROR_TIMEOUT, "error");
			setTimeout(function () { window.location.href = URL_PAGINA_VALIDAR_ORGANISMO; }, REDIRECT_DELAY);
		} else {
			var MSG = (response.readyState == 4) ? response.responseText : '';
			MSG += ' ' + error;
			alerta(MSG_ERROR_GENERAL, "error");
			cerrarLoading();
			request_login = false;
		}
	});

});