/**
*	SIEMPRE PASAR: (val()<- jquery ) o  (value<-javascript puro)
*			
*	function validarMail(valor) 							<- devuelve true si el campo pasado es un mail de formato real
			
*	function validarSoloNumeros(valor) 						<- devuelve true si el campo pasado es un número
*	function validarSoloLetras(valor) 						<- devuelve true si el campo pasado está compuesto solo por letras
*	function validarSoloAlfanumericos(valor)				<- devuelve false si tiene algún caracter distinto de letras o números
			
*	function validarNumeroEntre(valor,min,max) 				<- devuelve true si el campo pasado está entre min y max inclusive
*	function validarCantidadDeCaracteres(valor,min, max)  	<- devuelve true si el string pasado está entre min y max inclusive

*	function validarSinEspacios(valor) 						<- devuelve false si el campo pasado tiene espacios en blanco

*	function validarNoVacio(valor) 							<- valida que el campo pasado no esté vacío ni sea indefinido

*	function isSet(valor)									<- devuelve true si la variable está definida y no es "undefined"

*	function soloLetras(e) --> para onkeypress="return soloLetras(event)" ex: {{ form_widget(form.anio, {'attr': {'onkeypress': 'return soloLetras(event)'} }) }}
*   function soloNumeros(evt) --> para onkeypress="return soloNumeros(event)" ex: {{ form_widget(form.anio, {'attr': {'onkeypress': 'return soloNumeros(event)'} }) }}

*/
var isMobile = null;


if (checkMobile() == true){
	$('select').addClass('browser-default');
	$('.tooltipped').removeClass('tooltipped');
	$('select').siblings('label').addClass('active');
}else{
	$('select').removeClass('browser-default');
}

function checkMobile() {
	if (typeof ignoreCheckMobile !== 'undefined') {
		isMobile = false;
	} else if(isMobile == null){
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		isMobile = check;
	}
	return isMobile;
}

function validarMail(valor){
	if (valor == ''){
		return false;
	}
	//filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filtro.test(valor)) {
		return true;
	}
	else {
		return false;
	}	
}
function validarTuMail(idInput)
{    
	var elMail = $("#"+idInput).val();		

	if (elMail == ''){
		alerta('Ingrese su email', 'error');
		$("#"+idInput).addClass('invalid');
		return false;
	}
	else{
		//filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filtro.test(elMail)) {
			return true;
		}
		else {	
			alerta('Formato de email invalido', 'error');
			$("#"+idInput).addClass('invalid');
			return false;
		}		
	}
}
function validarTelefono(valor){
if (/^([+0]\d{1,3}\s?)?(\(\d{2,5}\)\s?)?(\d{3,5}\s?)?(\d{2,4}\-)?(\d{2,4}\-)?\d{4,}$/.test(valor)){		
		return true;
	}else{		
		return false;
	}
}

function validarSoloNumeros(valor){
	if (/^([0-9])*$/.test(valor)){		
		return true;
	}else{		
		return false;
	}
}

function validarSoloLetras(valor){
	var alfanumericos = /^[a-zA-Z]+$/;						
	if(alfanumericos.test(valor))
		return true;
	return false;
}

function validarNumeroEntre(valor,min,max){
	if (validarSoloNumeros(valor)){

		if (valor > (max)){
			return false;
		}
		if (valor < (min)){
			return false;
		}
	}
	return true;
}

function validarCantidadDeCaracteres(valor,min,max){
	longitud = valor.length;
	if (longitud > (max)) {
		return false;
	}
	if (longitud < (min)) {		
		return false;
	}
    return true;
}

function validarSinEspacios(valor){  
	for ( i = 0; i < valor.length; i++ ){  
		if ( valor.charAt(i) == " " ){  
			return false;  
		}  
	}  
	return true;
}
function validarNoVacio(valor){
	if (isSet(valor)){
		if (valor == '') {
			return false;
		}
		return true;
	}
	return false;
}

/* para --> onkeypress="return soloLetras(event)" */
function soloLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8,37,39,46];
    tecla_especial = false
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        } 
    }
    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        return false; 
    }
}

/* para --> onkeypress="return soloNumeros(event)" */
function soloNumeros(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode	
	if((charCode == 8) || (charCode == 9) || (charCode == 46) || (charCode > 32 && charCode <41) || (charCode > 45 && charCode <58)){
		return true; 
	}	
	return false;
}

function soloNumerosDecimales(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode
	if((charCode == 8) || (charCode == 9) || (charCode == 44) || (charCode == 46)|| (charCode > 32 && charCode <41) || (charCode > 47 && charCode <58)){
		return true; 
	}	
	return false;
}

function validarSoloAlfanumericos(valor){
	var alfanumericos = /^[0-9a-zA-Z]*$/;
	if(alfanumericos.test(valor))
		return true;
	return false;
}


function isSet(valor){
    if(typeof valor == 'undefined'){ 
        return false;
    }
    return true;
}

function validaCuit(numero){    
	var sCUIT = numero;
	if (sCUIT !== ''){
		var aMult = '5432765432';
		var aMult = aMult.split('');
		
		if (sCUIT && sCUIT.length == 11){
			aCUIT = sCUIT.split('');
			var iResult = 0;
			for(i = 0; i <= 9; i++){
				iResult += aCUIT[i] * aMult[i];
			}
			iResult = (iResult % 11);
			iResult = 11 - iResult;
			
			if (iResult == 11) iResult = 0;
			if (iResult == 10) iResult = 9;
			
			if (iResult == aCUIT[10]){	
				
				return true;			
			}
		}
		return false;
	}
	return false;
}

function fechaUnoMenorFechaDos(fechaUno, fechaDos){
//valida que la fecha uno sea menor a la fecha dos 
		var dia1 = parseInt(fechaUno.substr(0,2));
		var mes1 = parseInt(fechaUno.substr(3,2));
		var anio1 = parseInt(fechaUno.substr(6,4));

		var dia2 = parseInt(fechaDos.substr(0,2));
		var mes2 = parseInt(fechaDos.substr(3,2));
		var anio2 = parseInt(fechaDos.substr(6,4));

		
		var f1 = new Date(anio1, mes1, dia1); 	
		var f2 = new Date(anio2, mes2, dia2); 

		if(f1 > f2){
			return false;
		}
		else{
			return true;
		}
}



//////////////////////////////////////////////////////////////////////////////////////////
// DESDE FUNCIONES (VERIFICAR QUE SEAN NECESARIAS)
//////////////////////////////////////////////////////////////////////////////////////////



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
			alerta('CUIT no válido', 'error');
			$("#"+x).val("");
			$("#"+x).addClass('invalid');
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
		alerta('CUIT no válido', 'error');
		$("#"+x).val("");
		$('#'+x).addClass('invalid');
		
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
