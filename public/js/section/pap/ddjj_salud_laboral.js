$(document).ready(function() {
	$("#guardar").click(function(event) {
		if (confirm("Presionando 'GUARDAR sin CONFIRMAR' solamente guarda la DDJJ para ser modificada más tarde. Recuerde que debe apretar en 'GUARDAR Y CONFIRMAR' para dar por finalizada la DDJJ.")){
			formu = (document.forms[0]);		
			return serial(formu,0);
			//return false;
		}
		event.preventDefault();
		return false;
	})

	$("#guardarYConfirmar").click(function(event) {
		if (confirm("Presionando 'GUARDAR y CONFIRMAR' NO podrá modificar la DDJJ nuevamente. ADVERTENCIA: LOS DATOS CONSIGNADOS TIENEN CARÁCTER DE DECLARACIÓN JURADA, Y SERÁ CONSIDERADO COMO FALTA GRAVE Y COMUNICADO EN FORMA INMEDIATA AL ORGANISMO QUE PROPONE SU DESIGNACIÓN.")){
			if(confirm("¿Está seguro que desea finalizar la DDJJ, recuerde que no la va a poder modificar nuevamente?")){
				formu = (document.forms[0]);		
				return serial(formu,1);
				//return false;
			}
			alertar("Puede grabar la DDJJ temporalmente presionando en 'Guardar sin Confirmar'");
			event.preventDefault();
			return false;
		}
		alertar("Puede grabar la DDJJ temporalmente presionando en 'Guardar sin Confirmar'");
		event.preventDefault();
		return false;
	})
	
	if ($("#fecha").val() === ''){
		$("#fecha").val(diaHoy("/"));	
	}
	
	var fechas = $("#fechas").val();
	var eachFecha = fechas.split(",");
	var largo = eachFecha.length;				
	// for (var i = 0; i < (largo); i++) {
	// 	$("#fecha"+eachFecha[i]).datepicker({
	// 		changeMonth: true,
	// 		changeYear: true,
	// 		dateFormat: "dd/mm/yy"
	// 	});
	// 	$("#fecha"+eachFecha[i]).mask("99/99/9999");
	// }
	
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

function serial(formu, confirma) {
	var listadoIDS = "";
	var listadoIDSValores = "";
	var todosLosIds = "";
	var okPost = false;
	$(formu).find(':input').each(function() {
		var elemento= this;
		if (elemento.type === 'checkbox'){
			if(elemento.checked){
				//alert("id--> "+ elemento.id + " \nvalue--> " + elemento.value +" \ntipo--> "+ elemento.type + " \nname--> " + elemento.name);
				if (listadoIDS !== ""){
					listadoIDS += ","+elemento.id+"";
				}else{
					listadoIDS = ""+elemento.id+"";
				}
				if (todosLosIds !== ""){
					todosLosIds += ","+elemento.id+"";
				}else{
					todosLosIds = ""+elemento.id+"";
				}
			}
		}
		if ((elemento.type === 'text')&&(elemento.name !== 'fecha')&&(elemento.name !== 'lugar')){
			if (elemento.value !== ''){
				//alert("id--> "+ elemento.id + " \nvalue--> " + elemento.value +" \ntipo--> "+ elemento.type + " \nname--> " + elemento.name);
				if (listadoIDSValores !== ""){
					listadoIDSValores += '/#'+elemento.name+'/+'+elemento.value;
				}else{
					listadoIDSValores += ''+elemento.name+'/+'+elemento.value;
				}
				if (todosLosIds !== ""){
					todosLosIds += ","+elemento.name+"";
				}else{
					todosLosIds = ""+elemento.name+"";
				}
			}
		}
	});
	if (todosLosIds !== "") {
		$("#todosLosIds").val(todosLosIds);
		okPost = true;
	}
	$("#listadoIds").val(listadoIDS);
	$("#listadoIdsTexto").val(listadoIDSValores);	
	return okPost;
	//return true;
}