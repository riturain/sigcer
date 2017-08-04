$(document).ready(function(){
	$("#guardar").click(function(event){
		if (confirm("�Est� seguro que desea guardar la encuesta?")){
			formu = (document.forms[0]);		
			return serial(formu,0);		
			event.preventDefault();
			return false;
		}else{
			event.preventDefault();
			return false;
		}
	});
	
	//volver abajo
	$("body").append("<a href='#' class='volverabajo'>Volver abajo</a>"); // Agregamos el bot?n con la flecha
	$(window).scroll(function(){
		if (($(document).height() - $(this).scrollTop()) > 615){
			$('.volverabajo').fadeIn();
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

function serial(formu,confirma){
	var listadoIDS = "";
	var listadoIDSValores = "";
	var todosLosIds = "";
	var okPost = false;
	var ok3 = false;
	var ok11 = false;
	var ok13 = true;
	
	$(formu).find(':input').each(function(){
		var elemento= this;
		if ((elemento.type === 'checkbox')||(elemento.type === 'radio')){
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
		if (elemento.type === 'text'){
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
	
	if (todosLosIds !== ""){
		$("input[name^=preg_3#]").each(function(){
			if (this.checked == true){
				ok3 = true;
			}
		});
		
		$("input[name^=preg_11#]").each(function(){
			if (this.checked == true){
				ok11 = true;
			}
		});
		
		if($("#459").is(':checked')){
			ok13 = false;
			$("input[name^=preg_13#]").each(function(){
				if (this.checked == true){
					ok13 = true;
				}
			});
		}
	
		if (ok13 == false){
			if(($("#459").is(':checked')) && (ok13 == false)){				
				alertar("Debe completar el punto 13 tambi�n.");
			}
			return false;
		}
	}
	
	if (todosLosIds !== ""){
		$("#todosLosIds").val(todosLosIds);
		okPost = true;
	}else{
		alertar("Debe completar la encuesta antes de guardar");
	}
	$("#listadoIds").val(listadoIDS);
	$("#listadoIdsTexto").val(listadoIDSValores);	
	return okPost;
	//return true;
}