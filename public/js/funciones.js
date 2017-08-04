//Produccion
const PORTAL_APP_BASE_PATH = 'http://portal.rrhh.gba.gov.ar';
var base_path = window.location.origin + '/portal.mvc';

//Get domain Base Path Portal App
base_path = (base_path == PORTAL_APP_BASE_PATH)
    ? PORTAL_APP_BASE_PATH + '/portal'
    : base_path;

$(document).ready(function(){ // -------------------------------------------------------------------------

    $("#loading").hide();
    $('#toast-container').remove();
    $(document) .ajaxStart(function(){$( "#loading" ).show();})
	       		.ajaxStop(function(){$( "#loading" ).hide();});

	$(document).ajaxSend(function(event, xhr, options){
		if(options.url.toLowerCase().indexOf("ignoreloading=true") < 0){
			$( "#loading" ).show();
		}
	}).ajaxComplete(function(event, xhr, options){
		 if(options.url.toLowerCase().indexOf("ignoreloading=true") < 0){
			$( "#loading" ).hide();
		}
	});

	$("#inputlogin").focus();

	//Desvanece los avisos a los 3 segundos y medio
	$('#aviso').append($("&nbsp;&nbsp;&nbsp;<button class='buttonAviso' onclick='cerrarAviso();return false;' >x</button>"));
	$('#avisoMsg').append($("&nbsp;&nbsp;&nbsp;<button class='buttonAviso' onclick='cerrarAvisoMsg();return false;' >x</button>"));
	
	setTimeout(function() {			
		$('#aviso').hide("blind");
		},100000
	);
	setTimeout(function() {			
		$('#avisoMsg').hide("blind");
		},100000
	);
	
	$( document ).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                .addClass( "arrow" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }
    });
	
	//menu
	$(function(){
		(function($){		
			$.fn.accordion = function(custom) {
				var defaults = {
					keepOpen: false,
					startingOpen: false
				} 
				var settings = $.extend({}, defaults, custom);
				if(settings.startingOpen){
					$(settings.startingOpen).show();
				}
			
				return this.each(function(){
					var obj = $(this);
					$('li a', obj).click(function(event){
							var elem = $(this).next();
							if(elem.is('ul')){
								event.preventDefault();
								if(!settings.keepOpen){
									obj.find('ul:visible').not(elem).not(elem.parents('ul:visible')).slideUp();
								}
								elem.slideToggle();
							}
					});
				});
			};
		})(jQuery);	
	$('#menu').accordion({keepOpen:false, startingOpen: '#open'});
	});
	
	//menu
	var alto = $('#header').height() + $('#ruta').height() + $('#footer').height();
	$('#menuvertical').css({height: alto});
	
	//loading
	cerrar();

	//volver arriba
	$("body").append("<a href='#' class='volverarriba'>Volver arriba</a>"); // Agregamos el bot?n con la flecha
	$(window).scroll(function(){
		if ($(this).scrollTop() > 70) $('.volverarriba').fadeIn();
		else $('.volverarriba').fadeOut();
	});		
	$(document).on("click",".volverarriba",function(e){
		e.preventDefault();
		$("html, body").stop().animate({ scrollTop: 0 }, "slow");
	});
	
	$( "#tabs" ).tabs();	
	
	$("#dialogHelp").dialog({
		autoOpen: false,
		height: 400,		
		width: 450,		
		modal: true,
		overflow: true,
	});

	if ($(".datatable").length > 0){
		$(".datatable").dataTable({
			"responsive": true,
			"iDisplayLength": 10,
			"bLengthChange": false,
			"bFilter": true,
			"bAutoWidth": false,
			"oLanguage": {
				"sZeroRecords": "no hay registros",
				"sInfo": "Resultados del _START_ al _END_, de un total de _TOTAL_",
				"sInfoEmpty": "Mostrando 0 registros",
				"sInfoFiltered": "(Filtrado de _MAX_ registros)",
				"sSearch": "Buscar: ",
				"oPaginate": {
					"sFirst":    "Primero",
					"sLast":     "Último",
					"sNext":     "Siguiente",
					"sPrevious": "Anterior"
				}
			}
		});
	}

	if(inIframe()){
		$("#header").hide();
		$("#footer").hide();
		$("#menuvertical").hide();
		$("div.usuario.derecha").hide();
		$("#ruta").css( "width", "100%" );
		$("#ruta").css( "float", "none" );
		$("body").css( "background-color", "white" );
		$(".ancho").css( "width", "100%" );
	}
}); // -------------------------------------------------------------------------

function cerrarAviso(){
	$('#aviso').hide("blind");
}
function cerrarAvisoMsg(){
	$('#avisoMsg').hide("blind");
}

/** ---------------------------------------------
FUNCIONES DE USO COMÚN
*/ 
function alertar(msg){
	$("#dialogAlertar").empty();
	$("#dialogAlertar").append($("<p>"+msg+"</p>"));
	$("#dialogAlertar").dialog({modal: true});
}

function validarlogin(formu){
    a=formu.getElementsByTagName('input');
    i=0;
    while(i< a.length){
        if (((a[i].type=='text')) || ((a[i].type=='password'))) {
            if((a[i].value=='')) {
                alert("El Campo "+a[i].name+ " es obligatorio, por favor ingrese los datos");
                a[i].focus();
                return false;
            }
        }
        i++;
    }
    return true;
}

function validarNumero(numero){
    if (/^([0-9])*$/.test(numero)){		
        return true;
    }else{
        alertar("El valor " + numero + " no es un número");
        return false;
    }	
}

function validarEmail(valor) {
    filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filtro.test(valor)) {
        return true;
    }
    else {
        return false;
    }
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false; 
    return true;
}

function isDecimalKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
		/*if (charCode == 46){ //punto o coma
			return true;
		}*/
		return false; 
	}
    return true;
}

// licencia anual
function esNumero(numero){
    /*alert (numero);*/
    if (/^([0-9])*$/.test(numero)){
        if (numero > 2030)
            $("input[name='licenciaAno']").val("");
        if (numero < 2006)
            $("input[name='licenciaAno']").val("");
    }else{	
        $("input[name='licenciaAno']").val("");
    }	
}

function pasaafecha(fechachar) {
          
    //Separamos las fechas en dias, meses y años
    var diaInicio=fechachar.substring(0,2);
    var mesInicio=fechachar.substring(3,5);
    var anoInicio=fechachar.substring(6,10);
              
    //Los meses empiezan en 0 por lo que le restamos 1
    mesInicio = mesInicio -1;
          
    //Creamos una fecha con los valores que hemos sacado
    var fdate =  new Date(anoInicio,mesInicio,diaInicio);
    return fdate;
}


function esfechamenor(fecha1,fecha2) {

    var fechamenor = pasaafecha(fecha1);
    var fechamayor = pasaafecha(fecha2);
    if (fechamenor <= fechamayor) {
        return true;
    }
    else {
        return false;
    }
}


//FUNCIONES PARA CALCULAR LA DIFERENCIA EN DIAS ENTRE DOS FECHAS

function mostrarDias(fecha1,fecha2,destino){
       
    var fechaInicio = document.getElementById(fecha1).value;
    var fechaFin = document.getElementById(fecha2).value;
		
    if (fechaInicio.length != 10 || fechaFin.length != 10 || fechaInicio.value == '' || fechaFin.value == ''){
        diasTotal = 0;
    }
       
    else{
        //Separamos las fechas en dias, meses y años
        var diaInicio=fechaInicio.substring(0,2);
        var mesInicio=fechaInicio.substring(3,5);
        var anoInicio=fechaInicio.substring(6,10);
          
        var diaFin=fechaFin.substring(0,2);
        var mesFin=fechaFin.substring(3,5);
        var anoFin=fechaFin.substring(6,10);
              
        //Los meses empiezan en 0 por lo que le restamos 1
        mesFin = mesFin -1;
        mesInicio = mesInicio -1;
          
        //Creamos una fecha con los valores que hemos sacado
        var fInicio =  new Date(anoInicio,mesInicio,diaInicio);
        var fFin =  new Date(anoFin,mesFin,diaFin);
          
        diasTotal = 0;
      
        if(fFin>fInicio){              
            //Para sumarle 365 días tienen que haber 2 años de diferencia
            //Si no solamente sumo los días entre meses
            anoInicio++;
            while(anoFin>anoInicio){              
                if(esBisiesto(anoFin)){
                    dias_e_anio=366;
                }else{
                    dias_e_anio=365;
				}
                diasTotal = diasTotal + dias_e_anio;
                anoFin--;
            }
            //Para sumarle los días de un mes completo, tengo que ver que haya diferencia de 2 meses
            mesInicio++;            
            while(mesFin>mesInicio){
                dias_e_mes = getDays(mesFin-1,anoFin);
                diasTotal = diasTotal + dias_e_mes;
                mesFin--;
            }
            //Solamente falta sumar los días 
            mesInicio--;
            if(mesInicio==mesFin){
                diasTotal=diaFin-diaInicio+1;
            }else{                  
                //Saco los días desde el mesInicio hasta fin de mes
                dias_e_mes=getDays(mesInicio,anoInicio);
                diasTotal = diasTotal + (dias_e_mes-diaInicio) +1;
                //ahora saco los días desde el principio de mesFin hasta el día
                diasTotal = diasTotal + parseInt(diaFin);
            }            
        }
        //Si la fechaFin es mayor
        else if (fechaFin<fechaInicio){
            alert("La fecha de fin no puede ser mayor que la fecha de inicio");
            diasTotal=0;        
        }          
        //Si las fechas son iguales
        else{
            diasTotal = 1;
        }  
    }
    document.getElementById(destino).value = diasTotal; 
    return diasTotal;  
}
  
function esBisiesto(ano) {
    if (ano % 4 == 0)
        return true
    /* else */
    return false
} 

function diaHoy(tipo){
	if (tipo === '/'){
		var d = new Date();	
		var month = d.getMonth()+1;
		var day = d.getDate();
		var output = ( day < 10 ? '0' : '') + day	+ '/' +	(month < 10 ? '0' : '') + month + '/' + d.getFullYear();
		return output;
	}else{
		var d = new Date();	
		var month = d.getMonth()+1;
		var day = d.getDate();
		var output = ( day < 10 ? '0' : '') + day	+ '-' +	(month < 10 ? '0' : '') + month + '-' + d.getFullYear();
		return output;
	}
}

function cambiarDivisorFecha(f,tipo){
	if (tipo === '-'){		
		var res = f.split("/");
		if(res[0].length == 2){
			f = res[0]+"-"+res[1]+"-"+res[2];
		}
		return f;
	}else{
		var res = f.split("-");
		if(res[0].length == 2){
			f = res[0]+"/"+res[1]+"/"+res[2];
		}
		return f;
	}
}

function getDays(month, year) {
  
    var ar = new Array(12)
    ar[0] = 31 // Enero
    if(esBisiesto)
    {
        ar[1]=29
    }
    else
    {
        ar[1]=28
    }
    ar[2] = 31 // Marzo
    ar[3] = 30 // Abril
    ar[4] = 31 // Mayo
    ar[5] = 30 // Junio
    ar[6] = 31 // Julio
    ar[7] = 31 // Agosto
    ar[8] = 30 // Septiembre
    ar[9] = 31 // Octubre
    ar[10] = 30 // Noviembre
    ar[11] = 31 // Diciembre
 
    return ar[month];
}

function cerrar(){    
    $("#loading").hide();
}

function pulsar(e) {
    return (e.keyCode!=13);//evitar ENTER
}
function pulsadorT(e) {
    if (e.keyCode==9){
        //evitar TABULADOR   
        e.preventDefault();
        e.returnValue = false;
    }
}

function compararPasswords(){
	var p1 = $("#pass1").val();
	var p2 = $("#pass2").val();
	if (p1 == p2){
		longitud = $('#pass1').val().length;			
		if (longitud < 4) {
			alert ("La contraseña debe tener entre 4 y 12 caracteres");
			return false;
		}
		if (longitud > 12) {
			alert ("La contraseña debe tener entre 4 y 12 caracteres");
			return false;
		}
		return true;
	}
	else{
		alert ("Las contraseñas no coinciden");
		return false;
	}
}

function validaCuit(x)
{    
	var sCUIT = $("#"+x).val();
	if (sCUIT !== ''){
		var aMult = '5432765432';
		var aMult = aMult.split('');
		
		if (sCUIT && sCUIT.length == 11)
		{
			aCUIT = sCUIT.split('');
			var iResult = 0;
			for(i = 0; i <= 9; i++)
			{
				iResult += aCUIT[i] * aMult[i];
			}
			iResult = (iResult % 11);
			iResult = 11 - iResult;
			
			if (iResult == 11) iResult = 0;
			if (iResult == 10) iResult = 9;
			
			if (iResult == aCUIT[10])
			{	
				
				return true;			
			}
		}
		alertar("CUIT NO VÁLIDO");
		$("#"+x).val("");
		$("#"+x).focus();
		return false;
	}
	return false;
}

function validaCuitConDNI(x,dni)
{    
	$("#btnResetCuit").show();
	var sCUIT = $("#"+x).val();		
	if (sCUIT !== ''){
		
		var n = sCUIT.substring(2,10);
		if (n != dni){
			alertar("CUIT NO VÁLIDO");
			$("#"+x).val("");
			$("#"+x).focus();
			return false;
		}
	
	
		var aMult = '5432765432';
		var aMult = aMult.split('');
		
		if (sCUIT && sCUIT.length == 11)
		{
			aCUIT = sCUIT.split('');
			var iResult = 0;
			for(i = 0; i <= 9; i++)
			{
				iResult += aCUIT[i] * aMult[i];
			}
			iResult = (iResult % 11);
			iResult = 11 - iResult;
			
			if (iResult == 11) iResult = 0;
			if (iResult == 10) iResult = 9;
			
			if (iResult == aCUIT[10])
			{	
				return true;			
			}
		}
		alertar("CUIT NO VÁLIDO");
		$("#"+x).val("");
		$("#"+x).focus();
		return false;
	}
	return false;
}

function resetCUIT(cuit){
	$("#btnResetCuit").hide();
	$("#dat_CUIL").val(cuit);
}


function encontrarCadenaEntre(cadena, val1, val2){
	pos = cadena.indexOf(val1);	
	largo = val1.length;
	subcadena = cadena.substring(pos+largo);	
	pos = subcadena.indexOf(val2);	
	subcadena = subcadena.substring(0,pos);
	return subcadena;
}
function limpiarCadenaDesde(cadena, desde){	
	pos = cadena.indexOf(desde);	
	subcadena = cadena.substring(0,pos);
	return subcadena;
}

function openHelp(){
	$("#dialogHelp").empty();
	var XHR = $.ajax({
		type: "POST", 
		url: base_path+"/ayuda",
		data:{ 	accion: 'traerAyuda'},
		beforeSend: function() {
			$("#dialogHelp").html("Cargando..");
		}		
	});
	XHR.done(function(response){		
		$("#dialogHelp").empty();
		$("#dialogHelp").append(response);
	});
	$("#dialogHelp").dialog("open");	
}

/**
 * Menu
 * Funcionalidad para marcar el item/subitem seleccionado del menú
 * Descripción: Guarda en sessionStorage el item y subitem clickeado en un momento dado
 * y al recargar la página se recuperan esos valores, se les asigna una clase de css que
 * marca la opción elegida
 */
$('#menu li').click(function () {

    $('#menu a').css('color', '');
    $('#menu').find(".itemSelected").removeAttr("style").removeClass('itemSelected');

    var itemSeleccionado = $(this).attr("id");
    var itemGuardado = sessionStorage.getItem('menu.itemSeleccionado');
    $('#' + itemSeleccionado).children('a').css('color', '#9aca3c');

    //Si contien "-item" es un item de nivel padre sino es un subitem nivel hijo
    if (itemSeleccionado.search(/-item/i) > 0) {
        if (itemSeleccionado !== itemGuardado) {
            $("#" + itemGuardado + ' a').removeClass('itemSelected').css('color', '');
        }
        if (itemSeleccionado !== 'cerrar-sesion-item') {
            menuItemSeleccionado = itemSeleccionado;
        }
    } else {
        subitemSeleccionado = itemSeleccionado;
    }

    menuItemSeleccionado = ((typeof(itemSeleccionado) != "undefined") && itemSeleccionado !== '')
        ? itemSeleccionado
        : '';

    menuSubitemSeleccionado = ((typeof(subitemSeleccionado) != "undefined") && subitemSeleccionado !== '')
        ? subitemSeleccionado
        : '';

    var menu = {
        itemSeleccionado: menuItemSeleccionado,
        subitemSeleccionado: menuSubitemSeleccionado
    };
    sessionStorage.setItem('menu', JSON.stringify(menu));

});

$(document).ready(function () {
    var menu = JSON.parse(sessionStorage.getItem('menu'));
    if (menu != null && menu.itemSeleccionado != "") {
        $('#' + menu.itemSeleccionado).children('a').addClass('itemSelected').css('color', '#9aca3c');
        $('#' + menu.itemSeleccionado + ' ul').css('display', 'block');
        $('#' + menu.subitemSeleccionado).children('a').addClass('itemSelected');
    } else {
        var ruta = $('#ruta').attr('class').replace("/", "\\/");
		$("a[href*=" + ruta + "]").parents('ul').css('display', 'block');
        $("a[href*=" + ruta + "]").parents('ul').siblings('a').addClass('itemSelected').css('color', '#9aca3c');
        $("a[href*=" + ruta + "]").addClass('itemSelected').css('color', '#9aca3c');
        ;
    }
});

function inIframe () {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
}