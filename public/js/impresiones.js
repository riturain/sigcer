var clicked = false;
var clickY;

$("#print-preview-overlay").on({
    'mousemove': function(e) {
        clicked && updateScrollPos(e);
    },
    'mousedown': function(e) {
        clicked = true;
        clickY = e.pageY;
		$(this).removeClass("grab").addClass("grabbing");
    },
    'mouseup': function() {
        clicked = false;
        $(this).removeClass("grabbing").addClass("grab");
    }
});

var updateScrollPos = function(e) {
    $(window).scrollTop($(window).scrollTop() + (clickY - e.pageY));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function generarPDFid(id,nombre,cant ,) le ingresa el nombre id principal ya que los divs se deben arbar id_nro y la cantidad de divs que tienen
//////////////////////////////////////////////////////////////////////////////////////////////////////
function generarPDF(nombre){
	$(window).scrollTop(0);
	$('.zoomable').css('MozTransform','scale(1)');
	$('.zoomable').css('zoom', '100%');
	$('#printmenu').removeClass("pulse");
	
	var cant = $(".printable").length;
	var i = 0;
	var promise = Array();
	while(i < cant){
		promise[i] = new Promise(function (resolve, reject) {
			var element = $(".printable").get(i);
			var elCanvas = Array();
			elCanvas['valido'] = (element.innerHTML.length > 0);
			html2canvas(element,{
				background: "#FFF",
				onrendered: function (canvas) {
					elCanvas['imagen'] = canvas.toDataURL('image/jpeg');
					elCanvas['width'] = canvas.width;
					elCanvas['height'] = canvas.height;
					resolve(elCanvas);
				}
			});
		});
		i ++;
	}
	
	Promise.all(promise).then(function (screens) {
            var marginTop = 17
			var marginLeft = 25
			
			var pageWidth = 210;
		 	var pageHeight = 297;
	 		var doc = new jsPDF('p', 'mm');	  
			
			var imgTop = marginTop;
			var imgLeft = marginLeft / 2;
			var imgHeight = pageHeight - marginTop;
			var imgWidth = pageWidth - marginLeft; 
			
			var i = 0;
			
			while(i < cant){
				var imagen = screens[i];
				if(imagen['valido']){
					var imgData = imagen['imagen'];
					imgHeight = imagen['height'] * imgWidth / imagen['width'];
				  	  if(imgTop + imgHeight > pageHeight){
				  	  	doc.addPage();
				  	  	imgTop = marginTop;
				  	  }
					  doc.addImage(imgData, 'JPEG', imgLeft, imgTop, imgWidth, imgHeight);
					  imgTop += imgHeight;
				}
			  	i ++;
			}
			
			//doc.setTextColor(000);
       		//doc.setFontSize(10);
      		//doc.text(imgLeft, doc.internal.pageSize.height - 5, agua);
        	//cerrarLoading();
			doc.save(nombre+'.pdf');
    });	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function generarJPGid(id, nombre) envía el nombre del id del elemento a agregar al JPG
//////////////////////////////////////////////////////////////////////////////////////////////////////
function generarJPG(selector, nombre){
	html2canvas($(selector), {
  		background: "#fff",
  		onrendered: function (canvas) {
	        var imgData = canvas.toDataURL("image/jpeg",1.0);
			// For Export to IMG
	        var a = document.createElement('a');
	        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
	        a.download = nombre+'.jpg';
	        a.click();
      	}
	});
}