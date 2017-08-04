$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCMAz5698_HnBArbgdbPeP1f9ODjO-VIgg&signed_in=true&libraries=places&callback=initAutocomplete');

var gmarkers = [];
var gmarkers2 = [];
var placeSearch, autocomplete, autocomplete2;
var componentForm = {
	street_number: 'short_name',
	route: 'long_name',
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	administrative_area_level_2: 'short_name',
	//country: 'long_name',
	postal_code: 'short_name'
};
var componentForm2 = {
	street_number2: 'short_name',
	route2: 'long_name',
	locality2: 'long_name',
	administrative_area_level_12: 'short_name',
	administrative_area_level_22: 'short_name',
	//country2: 'long_name',
	postal_code2: 'short_name'
};
var addressElements = {
	street_number: false,
	route: false,
	locality: false,
	administrative_area_level_1: false,
	administrative_area_level_2: false,
	country: false,
	postal_code: false
	//postal_code_sufix: false
};


var maxField = 10; //Input fields increment limitation
var x = 1; //Initial field counter is 1
var fieldHTML = "";
var lat, lng, lat2, lng2;

$(document).ready(function(){
	
	/* Obtenemos los valores en caso de tenerlos en un formulario ya guardado en la base de datos */
	lat = $('#latitud').val();
	lng = $('#longitud').val();
	
	lat2 = $('#latitud2').val();
	lng2 = $('#longitud2').val();
	
	
	$('.add_button').click(function(){ //Once add button is clicked
		if(x < maxField){ //Check maximum number of input fields
			x++; //Increment field counter
			$('.field_wrapper').append(fieldHTML); // Add field html
			$(".fecha").mask("99-99-9999");
		}
	});
	
	$(".fecha").mask("99-99-9999");

	$("#lab_organismo").change(function(){
		$("#lab_estructura_id").val("");
		$("#lab_estructura").val("");
		$("#detalle_estructura").empty();
	});
	
	$("#lab_organismo2").change(function(){
		$("#lab_estructura2_id").val("");
		$("#lab_estructura2").val("");
		$("#detalle_estructura2").empty();
	});

	//AUTOCOMPLETADO DE ESTRUCTURAS
	$(function () {
        var single = $('#lab_estructura').materialize_autocomplete({
            multiple: {
                enable: false
            },
            dropdown: {
                el: '#estructuras_mostrar',
                itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" data-text=\'<%= item.text %>\'><a href="javascript:void(0)"><%= item.highlight %></a></li>'
            },
            getData: function (value, callback){
           		//si ingreso más de 5 letras realiza la busqueda
            	if(value.length > 5){

	            	var org;	
					if ($("#lab_organismo").val() != ""){
						org = $("#lab_organismo").val();
					}else{
						org = 0;
					}
					var parametros = {
		                "accion": 'buscarEstructura',
		                "term" : value,
						"id_organismo" : org
		            };
		            $.ajax({
		                data:  parametros,
		                url: 'perfil',
		                type:  'post',
		                dataType: "json",
		                success: function( data ) {
		                	
		                	var datosLocos = new Array();
		                	$.each(data, function( index, item ) {
		                		var obj = { id: item['ID_ESTRUCTURA'], text: item['DESCRIPCION'], highlight: item['DESCRIPCION'] };
		          				datosLocos.push(obj);
							});
							
		                	callback(value, datosLocos);

		                }
		            });
	            	$("#lab_estructura").click();
	            	
	             }
	            },
	            onSelect: function (item) {
	                
	                var parametros = {
		                "accion": 'devolverEstructura',
		                "id" : item.id
		            };
		            $.ajax({
		                data:  parametros,
		                url: 'perfil',
		                type:  'post',
		                dataType: "json",
		                success: function( data ) {
		                	if(data != 0){
		                	
		                		$("#lab_estructura_id").val(data.ID_ESTRUCTURA);
		                		$("#detalle_estructura").empty();
								var arbol = data.E1;
								if(data.E2 != null ){
									arbol = arbol+" ><br>"+data.E2;
								}
								if(data.E3 != null ){
									arbol = arbol+" ><br>"+data.E3;
								}
								if(data.E4 != null ){
									arbol = arbol+" ><br>"+data.E4;
								}
								if(data.E5 != null ){
									arbol = arbol+" ><br>"+data.E5;
								}
								if(data.E6 != null ){
									arbol = arbol+" ><br>"+data.E6;
								}
								if(data.E7 != null ){
									arbol = arbol+" ><br>"+data.E7;
								}
								if(data.E8 != null ){
									arbol = arbol+" ><br>"+data.E8;
								}
								if(data.E9 != null ){
									arbol = arbol+" ><br>"+data.E9;
								}
								$("#detalle_estructura").append(arbol);
							}
							else{
								alerta('No se pudo cargar la estructura, intentelo nuevamente','error');
							}
		                }
		            });//FINALIZA AJAX
	            },
	            limit: 100,
	            cacheable: false

        });

        var single2 = $('#lab_estructura2').materialize_autocomplete({
            multiple: {
                enable: false
            },
            dropdown: {
                el: '#estructuras_mostrar2',
                itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" data-text=\'<%= item.text %>\'><a href="javascript:void(0)"><%= item.highlight %></a></li>'
            },
            getData: function (value, callback){
           		//si ingreso más de 5 letras realiza la busqueda
            	if(value.length > 5){

	            	var org;	
					if ($("#lab_organismo2").val() != ""){
						org = $("#lab_organismo2").val();
					}else{
						org = 0;
					}
					var parametros = {
		                "accion": 'buscarEstructura',
		                "term" : value,
						"id_organismo" : org
		            };
		            $.ajax({
		                data:  parametros,
		                url: 'perfil',
		                type:  'post',
		                dataType: "json",
		                success: function( data ) {
		                	
		                	var datosLocos = new Array();
		                	$.each(data, function( index, item ) {
		                		var obj = { id: item['ID_ESTRUCTURA'], text: item['DESCRIPCION'], highlight: item['DESCRIPCION'] };
		          				datosLocos.push(obj);
							});
							
		                	callback(value, datosLocos);

		                }
		            });
	            	$("#lab_estructura2").click();
	            	
	             }
	            },
	            onSelect: function (item) {
	                
	                var parametros = {
		                "accion": 'devolverEstructura',
		                "id" : item.id
		            };
		            $.ajax({
		                data:  parametros,
		                url: 'perfil',
		                type:  'post',
		                dataType: "json",
		                success: function( data ) {
			                if(data != 0){
			                	$("#lab_estructura2_id").val(data.ID_ESTRUCTURA);
								$("#detalle_estructura2").empty();
								var arbol = data.E1;
								if(data.E2 != null ){
									arbol = arbol+" ><br>"+data.E2;
								}
								if(data.E3 != null ){
									arbol = arbol+" ><br>"+data.E3;
								}
								if(data.E4 != null ){
									arbol = arbol+" ><br>"+data.E4;
								}
								if(data.E5 != null ){
									arbol = arbol+" ><br>"+data.E5;
								}
								if(data.E6 != null ){
									arbol = arbol+" ><br>"+data.E6;
								}
								if(data.E7 != null ){
									arbol = arbol+" ><br>"+data.E7;
								}
								if(data.E8 != null ){
									arbol = arbol+" ><br>"+data.E8;
								}
								if(data.E9 != null ){
									arbol = arbol+" ><br>"+data.E9;
								}
								$("#detalle_estructura2").append(arbol);
							}
							else{
								alerta('No se pudo cargar la estructura, intentelo nuevamente','error');
							}
		            
		                }
		            });//FINALIZA AJAX
	            },
	            limit: 100,
	            cacheable: false

        });
  
    });

	
	$("#lab_estructura2").autocomplete({
        source: function( request, response ) {
			
			var org;
			if ($("#lab_organismo2").val() != ""){
				org = $("#lab_organismo2").val();
			}else{
				org = 0;
			}
			
            var parametros = {
                "accion": 'buscarEstructura',
                "term" : request.term,
				"id_organismo" : org
            };
            $.ajax({
                data:  parametros,
                url: 'perfil',
                type:  'post',
                dataType: "json",
                success: function( data ) {
                    response( $.map( data, function( item ) {
                        return {
                            label: item['DESCRIPCION'],
                            value: item['DESCRIPCION'],
                            id: item['ID_ESTRUCTURA'],
							e1: item['E1'],
							e2: item['E2'],
							e3: item['E3'],
							e4: item['E4'],
							e5: item['E5'],
							e6: item['E6'],
							e7: item['E7'],
							e8: item['E8'],
							e9: item['E9']
                        };
                    }));
                }
            });
        },		
        minLength: 5,
        autoFocus: true,
        select: function( event, ui ) {
			
			var det = "";
			if (ui.item.e1 != null) {det += ui.item.e1;}
			if (ui.item.e2 != null) {det += " > <br/> "+ui.item.e2;}
			if (ui.item.e3 != null) {det += " > <br/> "+ui.item.e3;}
			if (ui.item.e4 != null) {det += " > <br/> "+ui.item.e4;}
			if (ui.item.e5 != null) {det += " > <br/> "+ui.item.e5;}
			if (ui.item.e6 != null) {det += " > <br/> "+ui.item.e6;}
			if (ui.item.e7 != null) {det += " > <br/> "+ui.item.e7;}
			if (ui.item.e8 != null) {det += " > <br/> "+ui.item.e8;}
			if (ui.item.e9 != null) {det += " > <br/> "+ui.item.e9;}
			
			$('#lab_estructura2_id').prop("value",ui.item.id);
			$('#lab_estructura2').prop("value",ui.item.value);
			$("#detalle_estructura2").empty();
			$("#detalle_estructura2").html(det);
        }
    });
	
	if ($("#lab_estructura_id").val() != ''){		
		var XHR = $.ajax({
			type: "POST",url: "perfil",
			data:{  accion: 'devolverEstructura', id: $("#lab_estructura_id").val()  }
		});
		XHR.done(function(response){
			if (response != "0"){
				var data = $.parseJSON(response);			
				var det = "";
				if (data['E1'] != null) {det += data['E1'];}
				if (data['E2'] != null) {det += " > <br/> "+data['E2'];}
				if (data['E3'] != null) {det += " > <br/> "+data['E3'];}
				if (data['E4'] != null) {det += " > <br/> "+data['E4'];}
				if (data['E5'] != null) {det += " > <br/> "+data['E5'];}
				if (data['E6'] != null) {det += " > <br/> "+data['E6'];}
				if (data['E7'] != null) {det += " > <br/> "+data['E7'];}
				if (data['E8'] != null) {det += " > <br/> "+data['E8'];}
				if (data['E9'] != null) {det += " > <br/> "+data['E9'];}
							
				$('#lab_estructura').prop("value",data['DESCRIPCION']);
				$("#detalle_estructura").empty();
				$("#detalle_estructura").html(det);
			}
		});		
	}

	if ($("#lab_estructura2_id").val() != ''){		
		var XHR = $.ajax({
			type: "POST",url: "perfil",
			data:{  accion: 'devolverEstructura', id: $("#lab_estructura2_id").val()  }
		});
		XHR.done(function(response){
			if (response != "0"){
				var data = $.parseJSON(response);						
				var det = "";			
				if (data['E1'] != null) {det += data['E1'];}
				if (data['E2'] != null) {det += " > <br/> "+data['E2'];}
				if (data['E3'] != null) {det += " > <br/> "+data['E3'];}
				if (data['E4'] != null) {det += " > <br/> "+data['E4'];}
				if (data['E5'] != null) {det += " > <br/> "+data['E5'];}
				if (data['E6'] != null) {det += " > <br/> "+data['E6'];}
				if (data['E7'] != null) {det += " > <br/> "+data['E7'];}
				if (data['E8'] != null) {det += " > <br/> "+data['E8'];}
				if (data['E9'] != null) {det += " > <br/> "+data['E9'];}
							
				$('#lab_estructura2').prop("value",data['DESCRIPCION']);
				$("#detalle_estructura2").empty();
				$("#detalle_estructura2").html(det);
				
			}
			
		});		
	}
	$('#tabDomicilio').click(function(){
		setTimeout("resizeMap(map)",100);
	});
	$('#tabRelacionLaboral').click(function(){
		setTimeout("resizeMap(map2)",100);
	});
	
}); // fin document ready

function resizeMap(m) {
	  x = m.getZoom();
	  c = m.getCenter();
	  google.maps.event.trigger(m, 'resize');
	  m.setZoom(x); 
	  m.setCenter(c); 
 };

function initAddressElements(){
	for (var elemento in addressElements){
		addressElements[elemento] = false;
	}
}

function initAutocomplete() {
	
	if(lat !=='' && lng !== ''){
		var myLatlong = new google.maps.LatLng(lat,lng);
	}else{
		/* Si no creamos el objeto con una latitud cualquiera como la de Mar del Plata, Argentina por ej */
		var myLatlong = new google.maps.LatLng(-34.5453062, -58.449774899999966);
	}	
	
	var myOptions = {
		zoom:8,
		center:myLatlong,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map'),myOptions);
	var options = {
		types: ['geocode'],
		componentRestrictions: {country: "ar"}
	}; 
	map2 =  new google.maps.Map(document.getElementById('map2'),myOptions);
	var options2 = {
		types: ['geocode'],
		componentRestrictions: {country: "ar"}
	}; 
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
		{types: ['geocode']});
	autocomplete.addListener('place_changed', fillInAddress);	

	autocomplete2 = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
		{types: ['geocode']});
	autocomplete2.addListener('place_changed', fillInAddress2);
	
	var marker;	
	
	if (($("#latitud").val() != "") && ($("#longitud").val() != "")){
		
		removeMarkers();
		var location = new google.maps.LatLng($("#latitud").val(),$("#longitud").val());
		marker = new google.maps.Marker({
			position: location,
			icon: {
				path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
				scale: 8, //tamaño
				strokeColor: '#ea2f10', //color del borde
				strokeWeight: 2, //grosor del borde
				fillColor: '#f04124', //color de relleno
				fillOpacity:1// opacidad del relleno
			},
			map: map,
			title: 'Hogar'
		});
		
		gmarkers.push(marker);
		
		marker.setPosition(location);
		map.setCenter(location);
		map.setZoom(16);
	
		//updatePosition(myLatlong);
	}
	
	if (($("#latitud2").val() != "") && ($("#longitud2").val() != "")){
		
		removeMarkers2();
		var location = new google.maps.LatLng($("#latitud2").val(),$("#longitud2").val());
		marker = new google.maps.Marker({
			position: location,
			icon: {
				path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
				scale: 8, //tamaño
				strokeColor: '#43ac6a', //color del borde
				strokeWeight: 2, //grosor del borde
				fillColor: '#43ac6a', //color de relleno
				fillOpacity:1// opacidad del relleno
			},
			map: map2,
			title: 'Trabajo'
		}); 
	
		gmarkers2.push(marker);
		
		marker.setPosition(location);
		map2.setCenter(location);
		map2.setZoom(16);
		
		//updatePosition2(myLatlong);
	}
	
}

function updatePosition(latLng){
	$('#autocomplete').val("");
	$('#route').val("").removeAttr("disabled");
	$('#street_number').val("").removeAttr("disabled");
	$('#dat_Piso').val("");
	$('#dat_Dpto').val("");
	$('#postal_code').val("");
	
	$('#normalizado').val("0");
	
	$('#latitud').val(latLng.lat());
	$('#longitud').val(latLng.lng());
}
function updatePosition2(latLng){	
	$('#autocomplete2').val("");
	$('#route2').val("").removeAttr("disabled");
	$('#street_number2').val("").removeAttr("disabled");
	$('#dat_Piso2').val("");
	$('#dat_Dpto2').val("");
	$('#postal_code2').val("");
	
	$('#normalizado2').val("0");
	
	$('#latitud2').val(latLng.lat());
	$('#longitud2').val(latLng.lng());
}

function fillInAddress() {
	
	initAddressElements();

	$('#route').val("").prop("disabled","disabled");
	$('#street_number').val("").prop("disabled","disabled");
	$('#administrative_area_level_2').val("").prop("disabled","disabled");
	$('#normalizado').val("1");
	$("#locality").prop("disabled","disabled");
	$("#administrative_area_level_1").prop("disabled","disabled");
	
	removeMarkers();
	
	var place = autocomplete.getPlace();
	for (var component in componentForm) {
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
	}
	
	for (var i = 0; i < place.address_components.length; i++){
		var addressType = place.address_components[i].types[0];
		if (componentForm[addressType]){
			var val = place.address_components[i][componentForm[addressType]];
			document.getElementById(addressType).value = val;
		}
		if (addressElements[addressType] != undefined){
			addressElements[addressType] = true;
		}
		if (addressType == 'country') {
			if (place.address_components[i]['short_name'] != 'AR'){
				$("#pais_dom").val(0);
			}else{
				$("#pais_dom").val(1);
			}
		}
	}
		
	for (var elemento in addressElements){
		if (addressElements[elemento] == true){
			$("#"+elemento).prop("disabled","disabled");
		}else{
			$("#"+elemento).removeAttr("readonly").removeAttr("disabled");
			if ((elemento == 'street number') || (elemento == 'route')){
				$('#normalizado').val("0");				
			}
		}
	}
	
	document.getElementById('latitud').value = place.geometry.location.lat();
	document.getElementById('longitud').value = place.geometry.location.lng();
	var location = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
	var marker = new google.maps.Marker({
		position: location,
		icon: {
			path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
			scale: 8, //tamaño
			strokeColor: '#ea2f10', //color del borde
			strokeWeight: 2, //grosor del borde
			fillColor: '#f04124', //color de relleno
			fillOpacity:1// opacidad del relleno
		},
		map: map,
		title: 'Hogar',
		draggable: true
	});

	gmarkers.push(marker);
	
	marker.setPosition(location);
	map.setCenter(location);
	map.setZoom(16);
	
	google.maps.event.addListener(marker, 'dragend', function(){
		updatePosition(marker.getPosition());
	});	
	Materialize.updateTextFields();
}

function fillInAddress2() {
	
	initAddressElements();
	
	$('#route2').val("").prop("disabled","disabled");
	$('#street_number2').val("").prop("disabled","disabled");	
	$('#administrative_area_level_22').val("").prop("disabled","disabled");	
	$('#normalizado2').val("1");
	$("#locality2").prop("disabled","disabled");
	$("#administrative_area_level_12").prop("disabled","disabled");
	
	removeMarkers2();	
	
	var place2 = autocomplete2.getPlace();
	for (var component in componentForm2) {
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
	}
	
	for (var i = 0; i < place2.address_components.length; i++) {
		var addressType = place2.address_components[i].types[0];
		if (componentForm2[addressType+"2"]) {
			var val = place2.address_components[i][componentForm2[addressType+"2"]];
			document.getElementById(addressType+"2").value = val;
		}
		if (addressElements[addressType] != undefined){
			addressElements[addressType] = true;
		}
		if (addressType == 'country') {
			if (place2.address_components[i]['short_name'] != 'AR'){
				$("#pais_dom2").val(0);
			}else{
				$("#pais_dom2").val(1);
			}
		}
	}
	
	for (var elemento in addressElements){
		if (addressElements[elemento] == true){
			$("#"+elemento+"2").prop("disabled","disabled");
		}else{
			$("#"+elemento+"2").removeAttr("readonly").removeAttr("disabled");
			if ((elemento == 'street number') || (elemento == 'route')){
				$('#normalizado2').val("0");				
			}
		}
    }
	
	document.getElementById('latitud2').value = place2.geometry.location.lat();
	document.getElementById('longitud2').value = place2.geometry.location.lng();
	var location = new google.maps.LatLng(place2.geometry.location.lat(),place2.geometry.location.lng());
	var marker = new google.maps.Marker({
			position: location,
			icon: {
				path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
				scale: 8, //tamaño
				strokeColor: '#43ac6a', //color del borde
				strokeWeight: 2, //grosor del borde
				fillColor: '#43ac6a', //color de relleno
				fillOpacity:1// opacidad del relleno
		},
	    map: map2,
	    title: 'Trabajo',
		draggable: true
	});
	
	gmarkers2.push(marker);		
	marker.setPosition(location);
	map2.setCenter(location);
	map2.setZoom(16);
	
	google.maps.event.addListener(marker, 'dragend', function(){
		updatePosition2(marker.getPosition());
	});
	Materialize.updateTextFields();
}

function removeMarkers(){
    for(i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
}

function removeMarkers2(){
    for(i=0; i<gmarkers2.length; i++){
        gmarkers2[i].setMap(null);
    }
}

function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	var geolocation = {
	      		lat: position.coords.latitude,
	      		lng: position.coords.longitude
	    	};
	    	var circle = new google.maps.Circle({
	      		center: geolocation,
	      		radius: position.coords.accuracy
	    	});
	    	autocomplete.setBounds(circle.getBounds());
	  	});
	}	
}

function eliminarFamiliar(fam,elem){	
	
	if (fam != 0){
		var XHRFam = $.ajax({
			type: "POST",url: "perfil",
			data:{  accion: 'borrarFamiliar', fam: fam  }
		});
		XHRFam.done(function(response){
			if (response == 1){
				$("#li_familiar_"+fam).remove();
				x--; //Decrement field counter	
				alerta('La acción fue realizada con éxito', 'done');
			}
			else{
				alerta('El familiar no se puede eliminar. Puede estar vinculado a un tramite.', 'error');
			}				
		});			
	}
	else{
		$(elem).closest("li").remove();
		alerta('La acción fue realizada con éxito', 'done');
		x--; //Decrement field counter
	}
	
	return false;
}
function moverSeccion(idSeccion){
	if(idSeccion != ""){
		$(idSeccion).click();
	}
}

//VALIDAR FORMULARIO DE PERFIL
function validarFormPerfil(){
	var error = false;
	var seccion = "";
	//SECCION DATOS PERSONALES
	if (error == false){
		if ($('#dat_Nombre').val().trim() == ''){
			alerta('Ingrese su nombre', 'error');
			setInputInvalid('#dat_Nombre');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_Apellido').val().trim() == ''){
			alerta('Ingrese su apellido', 'error');
			setInputInvalid('#dat_Apellido');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_CUIL').val().trim() == ''){
			alerta('Ingrese su CUIL/CUIL', 'error');
			setInputInvalid('#dat_CUIL');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_FechaNac').val().trim() == ''){
			alerta('Ingrese su fecha de nacimiento', 'error');
			setInputInvalid('#dat_FechaNac');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_Sexo').val().trim() == ''){
			alerta('Seleccione su sexo', 'error');
			setInputInvalid('#dat_Sexo');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_EstadoCivil').val().trim() == ''){
			alerta('Seleccione su estado civil', 'error');
			setInputInvalid('#dat_EstadoCivil');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_TipoDoc').val().trim() == ''){
			alerta('Seleccione tipo de documento', 'error');
			setInputInvalid('#dat_TipoDoc');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	if (error == false){
		if ($('#dat_Nacionalidad').val().trim() == ''){
			alerta('Seleccione su nacionalidad', 'error');
			setInputInvalid('#dat_Nacionalidad');
			moverSeccion("#tabDatosPersonales");
			error = true;
		}
	}
	
	//VALIDAR EL DOMICILIO 
	if (error == false){
		if ($("#postal_code").val() == ""){
			alerta("Debe completar el código postal", 'error');
			setInputInvalid('#postal_code');
			moverSeccion("#tabDomicilio");
			error = true;
		}
	}
	if (error == false){
		if ($("#locality").val() == ""){
			alerta("Debe completar la localidad", 'error');
			setInputInvalid('#locality');
			moverSeccion("#tabDomicilio");
			error = true;
		}
	}
	if (error == false){
		if (($("#administrative_area_level_2").val() == "") || ($("#administrative_area_level_1").val() == "")){
			alerta("Debe completar el partido y provincia", 'error');
			setInputInvalid('#administrative_area_level_2');
			setInputInvalid('#administrative_area_level_1');
			moverSeccion("#tabDomicilio");
			error = true;
		}
	}
	if (error == false){
		if (($("#route").val() == "") || ($("#street_number").val() == "")){
			alerta("Debe completar la calle y el número de su domicilio personal", 'error');
			setInputInvalid('#route');
			setInputInvalid('#street_number');
			moverSeccion("#tabDomicilio");
			error = true;
		}
	}


	//FIN VALIDAR DOMICILIO 
	// VALIDAR CONTACTO 
	if (error == false){
		if ($('#dat_Email').val().trim() == ''){
			alerta('Ingrese su email', 'error');
			moverSeccion("#tabContacto");
			setInputInvalid('#dat_Email');	
			return false;
		}
	}
	if (error == false){
		if (!validarMail($('#dat_Email').val().trim())){
			alerta('Formato de email invalido', 'error');
			validarTuMail('dat_Email');
			moverSeccion("#tabContacto");
			setInputInvalid('#dat_Email');	
			return false;
		}
	}
	if (error == false){
		if ($('#dat_TelCelular').val().trim() == ''){
			alerta('Ingrese su número de celular', 'error');
			moverSeccion("#tabContacto");
			setInputInvalid('#dat_TelCelular');	
			return false;
		}
		else{
			if(!validarTelefono($('#dat_TelCelular').val())){
				alerta('Formato de teléfono no válido', 'error');
				moverSeccion("#tabContacto");
				setInputInvalid('#dat_TelCelular');	
				return false;
			}
		}
	}
	// FIN VALIDACIÖN CONTACTO 

	//VALIDAR LOS FAMILIARES 
	//VALIDA LOS APELLIDOS DE LOS FAMILIARES
	if (error == false){
		$("input[name^=field_apellido]").each(
			function(){			
				if ((error == false) && (this.value == '')){
					alerta("Ingrese el apellido de su familiar", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					$(this).addClass('invalid');	
					error = true;
				}
					
			}
		);
	}
	//VALIDA LOS NOMBRES DE LOS FAMILIARES
	if (error == false){
		$("input[name^=field_nombre]").each(
			function(){			
				if ((error == false) && (this.value == '')){
					alerta("Ingrese el nombre de su familiar", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					$(this).addClass('invalid');	
					error = true;
				}
				
			}
		);
	}
	
	//VALIDA LOS TIPOS DE DOCUMENTOS DE LOS FAMILIARES
	if (error == false){
		$("select[name^=field_tipo]").each(
			function(){		
				if ((error == false) && (this.value == '')){
					alerta("Seleccione el tipo de documento de su familiar", 'error');
					this.focus();
					$(this).addClass('invalid');
					moverSeccion("#tabFamiliares");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					
					error = true;
				}
			}
		);
	}

	//VALIDA LOS DOCUMENTOS DE LOS FAMILIARES
	if (error == false){
		$("input[name^=field_documento]").each(
			function(){			
				if ((error == false) && ((this.value.length > 8) || (this.value.length < 7))){
					alerta("El documento del familiar es incorrecto", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");	
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					$(this).addClass('invalid');	
					error = true;
				}
				if ((error == false) && ($.isNumeric(this.value) == false)){
					alerta("El documento del familiar es incorrecto", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");
					setInputInvalid("#field_documento");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					$(this).addClass('invalid');		
					error = true;
				}
			
			}
		);
	}

	//VALIDA EL PARENTESCO CON LOS FAMILIARES
	if (error == false){
		
		$("select[name^=field_parentesco]").each(
			function(){		
				if ((error == false) && (this.value == '')){
					alerta("Seleccione el parentesco con su familiar", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					
					error = true;
				}
			}
		);
	}

	//VALIDA EL SEXO DE LOS FAMILIARES
	if (error == false){
		$("select[name^=field_sexo]").each(
			function(){		
				if ((error == false) && (this.value == '')){
					alerta("Seleccione sexo de su familiar", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}  
						}
					);
					
					error = true;
				}
			}
		);
	}

	//VALIDAR LAS FECHAS DE NACIMIENTO DE LOS FAMILIARES
	if (error == false){
		$("input[name^=field_nacimiento]").each(
			function(){			
				if ((error == false) && (this.value == "")){
					alerta("Ingrese la fecha de nacimiento de su familiar", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");	
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					$(this).addClass('invalid');	
					error = true;
				}
	
			}
		);
	}
	//DISCAPACIDAD
	if (error == false){
		
		$("select[name^=field_discapacitado]").each(
			
			function(){	
				if ((error == false) && (this.value == '')){
					alerta("Seleccione si tiene discapacidad su familiar ", 'error');
					this.focus();
					moverSeccion("#tabFamiliares");
					$(this).parents('li').each(
						function(){
							if(!$(this).children('.collapsible-header').hasClass('active')){
								$(this).children('.collapsible-header').click();
							}
						}
					);
					
					error = true;
				}
			}
			
		);
	}
	//FIN VALIDACIÖN FAMILIARES

	//VALIDAR RELACION LABORAL 

	if (error == false){
		//VALIDA LA RELACIÓN LABORAL 
		if (($("#lab_rel").val() == "")){
			alerta("Complete la relación laboral de su cargo actual", 'error');
			moverSeccion("#tabRelacionLaboral");
			setInputInvalid('#lab_rel');	
			return false;
		}
	}
	if (error == false){
		//validar que seleccione organismo y estructura
		if (($("#lab_organismo").val() == "") || ($("#lab_estructura_id").val() == "")){
			$("#lab_estructura").focus();
			alerta("Complete el organismo y estructura donde posee cargo de revista", 'error');
			moverSeccion("#tabRelacionLaboral");
			setInputInvalid('#lab_estructura');
			return false;
		}
	}
	if (error == false){
		if (($("#lab_organismo2").val() == "") || ($("#lab_estructura2_id").val() == "")){
			$("#lab_estructura2").focus();
			alerta("Complete el organismo y estructura donde presta servicio", 'error');
			moverSeccion("#tabRelacionLaboral");
			setInputInvalid('#lab_estructura2');
			return false;
		}
	}
	
	if (error == false){
		if ($("#postal_code2").val() == ""){
			alerta("Debe completar el código postal", 'error');
			setInputInvalid('#postal_code2');
			moverSeccion("#tabRelacionLaboral");
			error = true;
		}
	}
	
	if (error == false){
		if ($("#locality2").val() == ""){
			alerta("Debe completar la localidad", 'error');
			setInputInvalid('#locality2');
			moverSeccion("#tabRelacionLaboral");
			error = true;
		}
	}

	
	if (error == false){
		if (($("#route2").val() == "") || ($("#street_number2").val() == "")){
			alerta("Debe completar la calle y el número de su domicilio laboral", 'error');
			moverSeccion("#tabRelacionLaboral");
			setInputInvalid('#route2');
			setInputInvalid('#street_number2');
			error = true;
		}
	}
	if (error == false){

		if (($("#administrative_area_level_2").val() == "") || ($("#administrative_area_level_1").val() == "")){
			alerta("Debe completar el partido y provincia", 'error');
			moverSeccion("#tabRelacionLaboral");
			setInputInvalid('#administrative_area_level_2');
			setInputInvalid('#administrative_area_level_1');
			error = true;
		}
	}
	
	if (error == false){
		if ($("#pais_dom").val() == 0){
			alerta("El domicilio seleccionado no es de Argentina", 'error');
			moverSeccion("#tabDomicilio");
			error = true;
		}
	}
	
	if (error == false){
		if ($("#pais_dom2").val() == 0){
			alerta("El domicilio laboral seleccionado no es de Argentina", 'error');
			moverSeccion("#tabRelacionLaboral");
			error = true;
		}
	}
	
	if(error == false ){
		$('#dat_NroDocumento').attr('disabled', false);
		$('#route').attr('disabled', false);
		$('#street_number').attr('disabled', false);
		$('#locality').attr('disabled', false);
		$('#administrative_area_level_2').attr('disabled', false);
		$('#administrative_area_level_1').attr('disabled', false);
		$('#route2').attr('disabled', false);
		$('#street_number2').attr('disabled', false);
		$('#locality2').attr('disabled', false);
		$('#administrative_area_level_22').attr('disabled', false);
		$('#administrative_area_level_12').attr('disabled', false);
		$('#postal_code').attr('disabled', false);
		$('#postal_code2').attr('disabled', false);
		return true;
	}
	else{
		return false;
	}
	
	
	
	
}

function copiarDatos(){
	//copia organismo
	if (($("#lab_organismo").val() != "") && ($("#lab_estructura_id").val() != "")){
		$("#lab_organismo2 option[value="+$("#lab_organismo").val()+"]").attr("selected",true);
		iniciarMaterialize();
	}
	//copia estructura
	if ($("#lab_estructura_id").val() != ""){
		$("#lab_estructura2_id").val($("#lab_estructura_id").val());
		$("#lab_estructura2").val($("#lab_estructura").val());
		$("#detalle_estructura2").empty();
		$("#detalle_estructura2").html($("#detalle_estructura").html());	
	}
}

function agregarFamiliar(){
	//envío la solicitud al servidor

	var XHR = $.ajax({
		url: "perfil",
	    type: "POST",
	    data: {accion : "addFormularioFamiliar"}
	});
	XHR.done(function(data){
		$("#listaFamiliares").append(data);
		iniciarMaterialize();
		Materialize.updateTextFields();
		cerrarLoading();
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function abrirModal
//////////////////////////////////////////////////////////////////////////////////////////////////////
function abrirModal(){

	limpiarFormulario('uploadImageForm');

	$("#div_de_visualizacion").hide();
    $("#muestra_foto").empty();
    var canvas = document.getElementById('mi_canvas');
	var ctx = canvas.getContext("2d");
 
	// Borramos el área que nos interese
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    $("#editarImagen").modal('open');
}

