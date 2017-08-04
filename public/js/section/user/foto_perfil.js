window.URL = window.URL || window.webkitURL;
var useBlob = false && window.URL;

var max_size = ($("#isMobile").val() == 1) ? 100 : 300;
var original_width = 0;
var original_height = 0;

//$(document).ready(function(){
//    cargar_modal_inicial();
//});

//llamar cuando se cargue el modal: 
//function cargar_modal_inicial(){
    document.getElementById('foto_perfil').addEventListener("change", function() {    
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
        // At this point `reader.result` contains already the Base64 Data-URL
        // and we've could immediately show an image using `elPreview.insertAdjacentHTML("beforeend", "<img src='"+ reader.result +"'>");`
        // But we want to get that image's width and height px values! Since the File Object does not hold the size of an image
        // we need to create a new image and assign it's src, so when
        // the image is loaded we can calculate it's width and height:
        var image  = new Image();        
        image.addEventListener("load", function () {
            // Concatenate our HTML image info 
            /*var imageInfo = file.name +' '+ image.width  +'×'+ image.height +' '+ file.type    +' '+ Math.round(file.size/1024) +'KB';*/
            // Finally append our created image and the HTML info string to our `#preview` 
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
            /*document.getElementById('muestra_foto').insertAdjacentHTML("beforeend", imageInfo +'<br>');*/
            $('#mi_foto_original').prop('resposive', true);
            if (useBlob) {
                // Free some memory for optimal performance
                window.URL.revokeObjectURL(image.src);
            }

            $("#div_de_visualizacion").show();

            $("#mi_foto_original").Jcrop({
                aspectRatio: 1,
                setSelect: [0,0,(width),(height)],
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
    canvas.width = max_size;
    canvas.height = max_size;
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('mi_foto_original');    
    
    var x = Math.round(original_width * parseInt($('#crop_x').val()) / image.width),
        y = Math.round(original_height * parseInt($('#crop_y').val()) / image.height),
        w = Math.round(original_width * parseInt($('#crop_w').val()) / image.width),
        h = Math.round(original_height * parseInt($('#crop_h').val()) / image.height);
		
	ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,x,y,w,h,0,0,max_size,max_size);
}

function guardar(){
    var canvas = document.getElementById('mi_canvas');
    if(!$("#muestra_foto").is(':empty')){
        var dataUrl = canvas.toDataURL('image/jpeg');                    
        var XHR = $.ajax({
            type: "POST",
            url: "foto_perfil",                     
            data: { sube_foto: true, dataUrl: dataUrl }
        });
        XHR.done(function(response){
            window.location.reload();
        });    
    }
    else{
        alerta('Debe seleccionar una imagen','error');
    }
    
}
