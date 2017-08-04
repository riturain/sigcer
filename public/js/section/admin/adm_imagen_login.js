window.URL = window.URL || window.webkitURL;
var useBlob = false && window.URL;

var max_size_width = 384;
var max_size_height = 216;

var max_size = 350;

var original_width = 0;
var original_height = 0;


$(document).ready(function(){
    
    $('ul.tabs').tabs({
      onShow: function(tab) {
        var XHR = $.ajax({
            type: "POST",
            url: "adm_imagen_login",                     
            data: { accion: 'ver_imagenes_fechas'}
        });
        XHR.done(function(datos){
            datos = JSON.parse(datos);
            var array = [];
            for (var i = datos.length - 1; i >= 0; i--) {
                array.push(datos[i]);
            }
            $('#calendar').fullCalendar({

                locale: 'es',
                defaultDate: $.now(),
                selectable: true,
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: array,
                eventRender: function(event, eventElement) {
                    if (event.imageurl) {
                        eventElement.find("div.fc-content").prepend("<a onclick='();'><img src='" + event.imageurl +"' width='180' height='100' /></a>");
                    }
                },
                dayClick: function(date) {
                    $("#imagenPorFecha").modal('open'); 
                    $("#fecha_desde").val(date.format('DD-MM-YYYY'));
                    $("#fecha_hasta").val('');
                    $('.carousel').carousel();
                    $('.carousel').carousel({fullWidth: true});
                    iniciarMaterialize();
                }

            });
        });
        $('.carousel').carousel();
        $('.carousel').carousel({fullWidth: true});
        

      
      }

    });
   
 
});
  
//llamar cuando se cargue el modal: 
//function cargar_modal_inicial(){
    document.getElementById('imagen_login').addEventListener("change", function() {    
        var files  = this.files;
        var errors = "";
        if (!files) {
            errors += "No se puede subir archivos con tu navegador";
        }    
        if (files && files[0]) {
            var file = files[0];            
            if ( (/\.(png|jpeg|jpg|gif)$/i).test(file.name) ) {
                document.getElementById('muestra_foto').innerHTML = "";
                readImage( file ); 
            } else {
                errors += file.name +" Extensión del archivo no soportada.\n";  
            }
        }    
        if (errors) {
            alerta(errors, "error"); 
        }
    });
//}

function readImage (file) {
    var reader = new FileReader();  
    reader.addEventListener("load", function () {
        var image  = new Image();        
        image.addEventListener("load", function () {
           
            var width = image.width;
            original_width = image.width;
            var height = image.height;
            original_height = image.height;

            //calcula alto y ancho
            if (width > height) { 
            	if (width > max_size) {
            	 	height *= max_size / width; 
            	 	width = max_size; 
            	 } 
            } 
            else { 
            	if (height > max_size) {
            	 	width *= max_size / height; 
            	 	height = max_size; 
            	 } 
            }

            image.width = width;
            image.height = height;
            image.id = 'mi_foto_original';

            document.getElementById('muestra_foto').appendChild( this );
            /*document.getElementById('muestra_foto').insertAdjacentHTML("beforeend", imageInfo +'<br>');*/
            $('#mi_foto_original').prop('resposive', true);
            if (useBlob) {
                // Free some memory for optimal performance
                window.URL.revokeObjectURL(image.src);
            }

            $("#div_de_visualizacion").show();

            $("#mi_foto_original").Jcrop({
                aspectRatio: 1920/1080,
                setSelect: [0,0,1920,1080],
                onSelect: getCoords
            });
        });        
        image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
    });    
    reader.readAsDataURL(file);  
}

function getCoords(c){
    // variables can be accessed here as
    // c.x, c.y, c.x2, c.y2, c.w, c.h
    $('#crop_x').val(c.x);
    $('#crop_y').val(c.y);
    $('#crop_w').val(c.w);
    $('#crop_h').val(c.h);
    cropTMF();
}

function cropTMF(){
    var canvas = document.getElementById('mi_canvas');
    canvas.width = max_size_width;
    canvas.height = max_size_height;
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('mi_foto_original');    
    
    var x = Math.round(original_width * parseInt($('#crop_x').val()) / image.width),
        y = Math.round(original_height * parseInt($('#crop_y').val()) / image.height),
        w = Math.round(original_width * parseInt($('#crop_w').val()) / image.width),
        h = Math.round(original_height * parseInt($('#crop_h').val()) / image.height);
		
	ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,x,y,w,h,0,0,canvas.width,canvas.height);
    // AGREGO TAMBIEN LA IMAGEN GRANDE PARA LEVANTARLA LUEGO
    var canvas = document.getElementById('mi_canvas_oculto');
    canvas.width = 1920;
    canvas.height = 1080;
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('mi_foto_original');    
		
	ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,x,y,w,h,0,0,canvas.width,canvas.height);
}

function guardar(){
    var canvas = document.getElementById('mi_canvas_oculto');
    if(!$("#muestra_foto").is(':empty')){
        var dataUrl = canvas.toDataURL('image/jpeg');                    
        var XHR = $.ajax({
            type: "POST",
            url: "adm_imagen_login",                     
            data: { accion: 'subir_foto', dataUrl: dataUrl }
        });
        XHR.done(function(response){
            window.location.reload();
        });    
    }
    else{
        alerta('Debe seleccionar una imagen','error');
    }
    
}

function agregarImagen(){
    $("#muestra_foto").empty();
    $("#agregarImagen").modal('open');
    var canvas = document.getElementById('mi_canvas');
	var ctx = canvas.getContext("2d");
 
	// Borramos el área que nos interese
	ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function eliminarImagen(){  
    var idImagen = $("#carousel-defecto .carousel-item.active input.id_imagen").val();
    var idPersona = $("#carousel-defecto .carousel-item.active input.id_persona").val();

    var XHR = $.ajax({
        type: "POST",
        url: "adm_imagen_login",                     
        data: { accion: 'borrar_imagen', idImagen: idImagen, idPersona: idPersona}
    });
    XHR.done(function(response){
        window.location.reload();
        
    });    

}
function recuperarImagen(idImagen,idPersona){     
    var XHR = $.ajax({
        type: "POST",
        url: "adm_imagen_login",                     
        data: { accion: 'recuperar_imagen', idImagen: idImagen, idPersona: idPersona}
    });
    XHR.done(function(response){
         window.location.reload();
    });  

}



function seleccionarPosicion(idImagen){      
    $("#agregado").empty();
    $("#idImagen").val(idImagen);
    var XHR = $.ajax({
        type: "POST",
        url: "adm_imagen_login",                     
        data: { accion: 'ver_fechas', idImagen: idImagen}
    });
    XHR.done(function(data){
        $("#agregado").append(data);
         Materialize.updateTextFields();
         iniciarMaterialize();
    });          
    $("#agregarFechas").modal('open'); 
   
}


function quitarFecha(idFecha){
    var XHR = $.ajax({
        type: "POST",
        url: "adm_imagen_login",                    
        data: { accion: 'quitar_fecha', idFecha: idFecha}
    });
    XHR.done(function(data){
        if(data == 1){
            $("#fecha_"+idFecha).remove();
            alerta('La acción fue realizada con éxito','done');
        }
        else{
            alerta('Ocurrió un error inesperado, intentelo nuevamente','error');
        }
    });       
}



function seleccionarImagenDefecto(){     
    var idImagen = $("#carousel-defecto .carousel-item.active input.id_imagen").val();
    var idPersona = $("#carousel-defecto .carousel-item.active input.id_persona").val();
    var posicion = $("#posicion").val();

    var XHR = $.ajax({
        type: "POST",
        url: "adm_imagen_login",                     
        data: { accion: 'por_defecto', idImagen: idImagen, idPersona: idPersona, posicion: posicion}
    });
    XHR.done(function(response){
        alerta('La acción fue realizada con éxito', 'done');
    });

}

function seleccionarFechas(idImagen){
    var idImagen = $("#carousel-fecha .carousel-item.active input.id_imagen").val();
    $("#agregado").empty();
    $("#idImagenFecha").val(idImagen);
    var XHR = $.ajax({
        type: "POST",
        url: "adm_imagen_login",                     
        data: { accion: 'ver_fechas', idImagen: idImagen}
    });
    XHR.done(function(data){
        $("#agregado").append(data);
         Materialize.updateTextFields();
         iniciarMaterialize();
    });          
    $("#agregarFechas").modal('open'); 
   
}

function agregarUnaFecha(){   
    var idFecha = $("#cant_fechas").val();
    var laFecha = '<div class="col s4 botonera white"><div class="input-field col s12 l10 offset-l1 "><input type="text" class="datepicker" id="fecha_nue_'+idFecha+'"/><label>Fecha:</label></div><div class="col s12 l12"><a class="waves-effect waves-light btn tooltipped disabled"  data-position="top" data-delay="50" data-tooltip="Quitar fecha"><i class="fa fa-trash" aria-hidden="true"></i>Quitar</a></div></div>';
    idFecha ++;
    $("#cant_fechas").val(idFecha);
    $("#agregado").append(laFecha);
    iniciarMaterialize();
    Materialize.updateTextFields();
}
//BORRAR PRONTO
function guardarfechas(){
    var cant_fechas = $("#cant_fechas").val();

    var idImagen = $("#carousel-fecha .carousel-item.active input.id_imagen").val();
    if (cant_fechas != 0) {
        for (var i = 0; i < cant_fechas; i++) {
            var fecha = $("#fecha_nue_"+i).val();
            if (fecha != '') {
                console.log(idImagen);
                console.log(fecha);
                var XHR = $.ajax({
                    type: "POST",
                    url: "adm_imagen_login",                    
                    data: { accion: 'agregar_fecha', idImagen: idImagen, fecha:fecha }
                });
                XHR.done(function(data){
                    if(data == 1){
                        alerta('La acción fue realizada con éxito','done');
                    }
                    else{
                        alerta('Ocurrió un error inesperado, intentelo nuevamente','error');
                    }
                });

            }
        }       
    }
}
function guardarfecha(){
    fecha_desde = $("#fecha_desde").val();
    fecha_hasta = $("#fecha_hasta").val();
    console.log(fecha_desde);
    idImagen = $("#carousel-fecha .carousel-item.active input.id_imagen").val();
    console.log(idImagen);
    if (fecha_hasta != ''){
        if(!esfechamenor(fecha_desde,fecha_hasta)){
            alerta('La fecha hasta debe ser posterior a la fecha desde.','error');
        }
        else{
            //iterar tantas veces como sea necesario
            fechaUno = pasaafecha(fecha_desde);
            fechaDos = pasaafecha(fecha_hasta);
            exito = 1;
            while((fechaUno <= fechaDos) && (exito == 1)){
                
                dia = fechaUno.getDate();
                mes = fechaUno.getMonth()+1;
                anio = fechaUno.getFullYear();
                fecha = dia+'-'+mes+'-'+anio;
            
                var XHR = $.ajax({
                    type: "POST",
                    url: "adm_imagen_login",                    
                    data: { accion: 'agregar_fecha', idImagen: idImagen, fecha:fecha }
                });
                XHR.done(function(data){
                    if(data != 1){
                        exito = 0;
                    }
                });
                fechaUno.setDate(fechaUno.getDate()+1);
            }
            if(exito == 1){
                alerta('La acción fue realizada con éxito','done');
            }
            else{
                alerta('Ocurrió un error inesperado, intentelo nuevamente','error');
            }
        
        }
    }
    else{
        var XHR = $.ajax({
            type: "POST",
            url: "adm_imagen_login",                    
            data: { accion: 'agregar_fecha', idImagen: idImagen, fecha:fecha_desde }
        });
        XHR.done(function(data){
            if(data == 1){
                alerta('La acción fue realizada con éxito','done');
            }
            else{
                alerta('Ocurrió un error inesperado, intentelo nuevamente','error');
            }

        });
    }
    
    /*var idImagen = $("#carousel-fecha .carousel-item.active input.id_imagen").val();
    if (cant_fechas != 0) {
        for (var i = 0; i < cant_fechas; i++) {
            var fecha = $("#fecha_nue_"+i).val();
            if (fecha != '') {
                console.log(idImagen);
                console.log(fecha);
                var XHR = $.ajax({
                    type: "POST",
                    url: "adm_imagen_login",                    
                    data: { accion: 'agregar_fecha', idImagen: idImagen, fecha:fecha }
                });
                XHR.done(function(data){
                    if(data == 1){
                        alerta('La acción fue realizada con éxito','done');
                    }
                    else{
                        alerta('Ocurrió un error inesperado, intentelo nuevamente','error');
                    }
                });

            }
        }       
    }*/
}