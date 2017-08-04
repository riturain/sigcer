$(document).ready(function(){
	if ($("#fecha").val() === ''){
		$("#fecha").val(diaHoy("/"));	
	}

	//volver abajo
	$("body").append("<a href='#' class='volverabajo'>Volver abajo</a>"); // Agregamos el bot?n con la flecha
	$(window).scroll(function(){
		if (($(document).height() - $(this).scrollTop()) > 615){
			$('.volverabajo').fadeIn();
			//alertar($(document).height() - $(this).scrollTop());
		} 
		else{
			$('.volverabajo').fadeOut();
		} 
	});		
	$(document).on("click",".volverabajo",function(e){
		e.preventDefault();
		$("html, body").stop().animate({ scrollTop: $(document).height() }, "slow");
	});
	
});