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
		console.log(fechaUno);
		console.log(dia1);
		console.log(mes1);
		console.log(anio1);
		var dia2 = parseInt(fechaDos.substr(0,2));
		var mes2 = parseInt(fechaDos.substr(3,2));
		var anio2 = parseInt(fechaDos.substr(6,4));
		console.log(fechaDos);
		console.log(dia2);
		console.log(mes2);
		console.log(anio2);
		
		var f1 = new Date(anio1, mes1, dia1); 	
		var f2 = new Date(anio2, mes2, dia2); 
		if(f1 > f2){
			return false;
		}
		else{
			return true;
		}
}