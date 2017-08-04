	var base_path = window.location.origin;
	var path = document.location.pathname;
	var directory = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
	var DELAY_MESSAGE = 10000;
	var REDIRECT_DELAY = 5000;

	const TARGET_URL_PAGE = base_path + directory + '/home';
	const URL_PAGINA_VALIDAR_ORGANISMO = base_path + directory  + '/check_organismo';
	
	
	var recargarCaptcha = function () {
		$.ajax({
			url: base_path + directory + "/public/captcha/captcha_v2.php",
			data: {ignoreloading: 'true'},			
			success: function (result) {
				$("img.imagen-captcha").attr("src", "public/captcha/captcha_v2.php?v="+Math.floor((Math.random() * 1000) + 1));
			}
		});
	}