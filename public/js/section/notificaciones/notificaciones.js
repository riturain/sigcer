//js
$(document).ready(function() {

	$("#dialogMensaje").dialog({
		autoOpen: false,
		height: 'auto',
		width: 600,
		modal: true,
		close: function() {
		}
	});
	
});

function cambiarPagina(pag){
	var XHR = $.ajax({
		type: "POST", 
		url: "notificaciones",
		data:{ accion: 'pagina', pagina: pag },
		beforeSend: function( xhr ) {
			$("#notificacionesVentana").html("Cargando..");
		}		
	});
	XHR.done(function(response){
		location.href="notificaciones";
	});
}

function mostrarMensaje(x){
	var ret = obtenerValoresFila(x+1);
	var paginaMensaje = "<table class='dialogMsg'>";
	paginaMensaje += "<tr><td><b>De: </b> "+ret.de+"</td></tr>";	
	paginaMensaje += "<tr><td><b>Fecha: </b>"+ret.fecha+"</td></tr>";	
	paginaMensaje += "<tr><td><b>Asunto: </b>"+ret.asunto+"</td></tr>";	
	paginaMensaje += "<tr><td colspan='2' class='bordeMsg'>"+ret.mensaje+"</td></tr>";	
	paginaMensaje += "</table>";
	
	$("#dialogMensaje").html(paginaMensaje);
	$("#dialogMensaje").dialog("open");
	//alert (ret.asunto);
}

//OBTENER VALORES DE LA FILA DE UNA TABLA
function obtenerValoresFila(index){
	var arregloFila = new Object();
	$("#notificacionesTabla tbody tr").eq(index).each(function(){
		arregloFila['de'] = this.cells[0].innerHTML;
		arregloFila['asunto'] = this.cells[1].innerHTML;
		
		arregloFila['fecha'] = this.cells[3].innerHTML;
		arregloFila['mensaje'] = this.cells[4].innerHTML;
	});
	return arregloFila;
}