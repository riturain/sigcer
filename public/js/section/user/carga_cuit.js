window.URL = window.URL || window.webkitURL;
var useBlob = false && window.URL;
var canvas_vacio = true;

var mini_max_size = 100;
var max_size = 900;
var original_width = 0;
var original_height = 0;
var imagesLoaded = 0;

//imagen mini
var aux_mini_top = 0;
var aux_mini_ancho = 0;
var mini_canvas = document.getElementById('mini_canvas');
var mini_ctx = mini_canvas.getContext('2d');
var image_mini_saved;

//imagen grande
var aux_top = 0;
var aux_ancho = 0;
var canvas = document.getElementById('mi_canvas');
var ctx = canvas.getContext('2d');
var image_saved;

document.getElementById('file_cuit').addEventListener("change", function() {    
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
        alerta(errors, 'error');        
    }
});

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
            if (width > height) { if (width > max_size) { height *= max_size / width; width = max_size; } } 
            else { if (height > max_size) { width *= max_size / height; height = max_size; } }

            image.width = width;
            image.height = height;
            image.id = 'mi_foto_original';
            document.getElementById('muestra_foto').appendChild( this );
            $('#mi_foto_original').prop('resposive', true);
            
            if (useBlob) { // free memory
                window.URL.revokeObjectURL(image.src);
            }

            imagesLoaded++;
            $("#boton_de_subir").html('Agregar otra foto');
            if (imagesLoaded == 2){

                $("#input_carga").hide();

                //mini
                image_mini_saved = mini_ctx.getImageData(0,0,mini_canvas.width,mini_canvas.height);
                aux_mini_top = mini_canvas.height;
                aux_mini_ancho = mini_canvas.width;
                //grande
                image_saved = ctx.getImageData(0,0,canvas.width,canvas.height);
                aux_top = canvas.height;
                aux_ancho = canvas.width;
            }
            
            canvas_vacio = false;
            $("#botonera").show();            
            $("#div_de_visualizacion").show();            
            $("#documento_guardado").hide();

            $("#mi_foto_original").Jcrop({                
                setSelect: [0,0,100,100],
                onSelect: getCoords
            });
        });        
        image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
    });    
    reader.readAsDataURL(file);  
}

function getCoords(c){    
    // c.x, c.y, c.x2, c.y2, c.w, c.h
    $('#crop_x').val(c.x);
    $('#crop_y').val(c.y);
    $('#crop_w').val(c.w);
    $('#crop_h').val(c.h);
    cropTMF();
}

function cropTMF(){    
    var image = document.getElementById('mi_foto_original');
    var alto = 0;
    var ancho = 0;    

    var x = Math.round(original_width * parseInt($('#crop_x').val()) / image.width),
        y = Math.round(original_height * parseInt($('#crop_y').val()) / image.height),
        w = Math.round(original_width * parseInt($('#crop_w').val()) / image.width),
        h = Math.round(original_height * parseInt($('#crop_h').val()) / image.height);

// mini canvas    
    //calculo de proporcion mini canvas
    if (h > w){
        alto = mini_max_size;
        ancho = Math.round(w * mini_max_size / h);
    }else{
        alto = Math.round(h * mini_max_size / w);
        ancho = mini_max_size;    
    }

    mini_canvas.height = alto + aux_mini_top;
    mini_canvas.width = (ancho > aux_mini_ancho)? ancho : aux_mini_ancho;
    
    if (imagesLoaded > 1){
        mini_ctx.putImageData(image_mini_saved,0,0);        
    }
    mini_ctx.drawImage(image,x,y,w,h,0,aux_mini_top,ancho,alto);

// canvas grande
    //calculo de proporcion mini canvas
    if (h > w){
        alto = max_size;
        ancho = Math.round(w * max_size / h);
    }else{
        alto = Math.round(h * max_size / w);
        ancho = max_size;
    }

    canvas.height = alto + aux_top;
    canvas.width = (ancho > aux_ancho)? ancho : aux_ancho;
    
    if (imagesLoaded > 1){
        ctx.putImageData(image_saved,0,0);        
    }
    ctx.drawImage(image,x,y,w,h,0,aux_top,ancho,alto);

}

function limpiar_canvas(){
    var mini_canvas = document.getElementById('mini_canvas');
    var ctx = mini_canvas.getContext('2d');
    ctx.clearRect(0, 0, mini_canvas.width,mini_canvas.height);
    mini_canvas.width = 0;
    mini_canvas.height = 0;

    var canvas = document.getElementById('mi_canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width,canvas.height);
    canvas.width = 0;
    canvas.height = 0;

    document.getElementById('file_cuit').value = '';
    document.getElementById('file_path').value = '';
    document.getElementById('muestra_foto').innerHTML = "";

    $("#input_carga").show();

    aux_top = 0;
    aux_ancho = 0;
    imagesLoaded = 0;
    $("#boton_de_subir").html('Subir cuit');
    canvas_vacio = true;
    $("#botonera").hide();
    $("#div_de_visualizacion").hide();
    $("#documento_guardado").show();
}

function guardar(){
    if(!canvas_vacio){
        var dataUrl = canvas.toDataURL('image/jpeg');                    
        var XHR = $.ajax({
            type: "POST",
            url: "carga_cuit",                     
            data: { sube_foto: true, dataUrl: dataUrl }
        });
        XHR.done(function(response){
            window.location.reload();
        });    
    }else{
        alerta('Debe seleccionar una imagen','error');
    }
    
}
