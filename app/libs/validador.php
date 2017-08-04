<?php

//	NUMEROS:
//	validarSoloNumeros($unNumero);						//DEVUELVE EL NUMERO O FALSE
//	validarNumeroEntre($unNumero, $min, $max); 			//DEVUELVE EL NUMERO O FALSE
//	validarNumeroFlotante($unNumero); 					//DEVUELVE TRUE O FALSE (decimal con punto)

//	CADENAS:
//	validarMail($mail); 								//DEVUELVE MAIL O FALSE
//	quitarBlancos($varchar); 							//DEVUELVE LA CADENA SIN ESPACIOS BLANCOS
//	limpiarCaracteresEspeciales($string); 				//DEVUELVE EL STRING LIMPIO
//	validarSoloCaracteres($varchar); 					//sin números		
//	validarCaracteresEntre($varchar, $min, $max);		//mayor igual y menor igual
// 	validarCadenaPermitida($cadena,$permitidos); 		//compruebo que los caracteres sean los permitidos 

//	FECHAS:
//	validarFecha($unaFecha);							//valida que sea una fecha d m Y (sin importar separador)
//	vFormatoFecha($unaFecha);							//valida que sea una fecha sin importar separador usando preg_match
//	validarFormatoFecha($unaFecha, $formato = "/"); 	//valida el formato de una fecha según el separador
//	fechaReturnYMD($unaFecha);	 						//recibe una fecha validada y retorna un string con la fecha ordenada por AÑO, MES y DÍA
//	validarFechaEntre($unaFecha, $fechaMin, $fechaMax);	//valida que una fecha esté entre otras dos <= y >=

//	CUIT:
//	esCuit($cuit);										//valida cuit devuelve true o false

function validarMail($mail){ //DEVUELVE MAIL O FALSE
	return(filter_var($mail, FILTER_VALIDATE_EMAIL));		
}
function validarSoloNumeros($unNumero){//DEVUELVE EL NUMERO O FALSE
	return(filter_var($unNumero, FILTER_VALIDATE_INT));
}
function validarNumeroEntre($unNumero, $min, $max){ //DEVUELVE EL NUMERO O FALSE
	if ((validarSoloNumeros($unNumero)) && (validarSoloNumeros($min)) && (validarSoloNumeros($max))){
		$int_options = array("options"=> array("min_range"=>$min, "max_range"=>$max));
		return(filter_var($unNumero, FILTER_VALIDATE_INT, $int_options));
	}else{
		return false;
	}
}
function validarNumeroFlotante($unNumero){ //DEVUELVE TRUE O FALSE
	return (filter_var($unNumero, FILTER_VALIDATE_FLOAT, FILTER_FLAG_ALLOW_THOUSAND)!== false);
}
function quitarBlancos($varchar){ //DEVUELVE LA CADENA SIN ESPACIOS BLANCOS
	return trim($varchar);
}
function limpiarCaracteresEspeciales($string){ //DEVUELVE EL STRING LIMPIO
	$string = htmlentities($string);
	$string = preg_replace('/\&(.)[^;]*;/', '\\1', $string);
	return $string;
}
function validarSoloCaracteres($varchar){ //sin números	
	//if(preg_match('/[^a-zA-Z\s-]/i',$varchar)){		
		return true;
	//}else{
	//	return false;
	//}
}
function validarCaracteresEntre($varchar, $min, $max){	//mayor igual y menor igual
	if (validarSoloCaracteres($varchar)){
		$largo = strlen($varchar);
		if(($min <= $largo)&&($largo <= $max)){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
/**
	limpiar caracteres especiales
		addslashes()/stripslashes()
		htmlentities(string, ENT_QUOTES)
		htmlspecialchars()	
	validar formato fecha
*/

function validarCadenaPermitida($cadena,$permitidos){ //compruebo que los caracteres sean los permitidos 	
	//$permitidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789-_?!#$%&/()=?¡[]{}:.;,<>";
	for ($i=0; $i < strlen($cadena); $i++){
			if (strpos($permitidos, substr($cadena,$i,1))===false){		
				return false; 
			} 
	}
	return true; 
}




/* ---------- FECHAS ---------- */
function validarFecha($unaFecha){ //valida que sea una fecha d m Y (sin importar separador)
	$separator_type= array("/","-");
	$separator = "";
	foreach ($separator_type as $each) {
		$find = stripos($unaFecha,$each);
		if($find <> false){
			$separator= $each;
		}
	}
	if ($separator == ""){
		return false;
	}else{
		if (validarFormatoFecha($unaFecha, $separator)){
			$arrD = explode($separator,$unaFecha);
			return checkdate($arrD[1],$arrD[0],$arrD[2]);
		}else{
			return false;
		}			
	}
}

function vFormatoFecha($unaFecha){ //valida que sea una fecha sin importar separador usando preg_match
	if(preg_match('/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/', $unaFecha)){
		return true;
	}else{
		return false;
	}
}

function validarFormatoFecha($unaFecha, $formato = "/"){ //valida el formato de una fecha según el separador
	if ($formato == "/"){
		if (preg_match('/^\d{1,2}\/\d{1,2}\/\d{4}$/', $unaFecha)){
			return true;
		}else{
			return false;
		}
	}else{
		if (preg_match('/^\d{1,2}\-\d{1,2}\-\d{4}$/', $unaFecha)){
			return true;
		}else{
			return false;
		}	
	}
}

function fechaReturnYMD($unaFecha){ //recibe una fecha validada y retorna un string con la fecha ordenada por AÑO, MES y DÍA
	$separator_type= array("/","-");
	$separator = "";
	foreach ($separator_type as $each) {
		$find = stripos($unaFecha,$each);
		if($find <> false){
			$separator= $each;
		}
	}
	if ($separator == ""){
		return "";
	}else{
		$arrD = explode($separator,$unaFecha);
		return "$arrD[2]"."$arrD[1]"."$arrD[0]";
	}
}

function validarFechaEntre($unaFecha, $fechaMin, $fechaMax){ //valida que una fecha esté entre otras dos <= y >=
	if ((validarFecha($unaFecha)) && (validarFecha($fechaMin)) && (validarFecha($fechaMax))){
		$f = fechaReturnYMD($unaFecha);
		$f1 = fechaReturnYMD($fechaMin);
		$f2 = fechaReturnYMD($fechaMax);
		if (strcmp($f1, $f2) > 0){ //si f1 es mayor que f2 --> false
			return false;
		}else{
			//f1 es menor que f2 o son iguales
			if ((strcmp($f, $f1) < 0) || (strcmp($f, $f2) > 0)){	//si (f es menor que f1) or (f es mayor que f2) --> false
				return false;
			}else{
				//la fecha está dentro del rango
				return true;
			}
		}
	}else{
		return false;
	}
}

function esCuit($cuit) {
    $esCuit=false;
    $cuit_rearmado="";
     //separo cualquier caracter que no tenga que ver con numeros
    for ($i=0; $i < strlen($cuit); $i++) {   
        if ((Ord(substr($cuit, $i, 1)) >= 48) && (Ord(substr($cuit, $i, 1)) <= 57))     {
            $cuit_rearmado = $cuit_rearmado . substr($cuit, $i, 1);
        }
    }
    $cuit=$cuit_rearmado;
    if (strlen($cuit_rearmado) <> 11) {  // si to estan todos los digitos
        $esCuit=false;
    } else {
        $x=$i=$dv=0;
        // Multiplico los dígitos.
        $vec[0] = (substr($cuit, 0, 1)) * 5;
        $vec[1] = (substr($cuit, 1, 1)) * 4;
        $vec[2] = (substr($cuit, 2, 1)) * 3;
        $vec[3] = (substr($cuit, 3, 1)) * 2;
        $vec[4] = (substr($cuit, 4, 1)) * 7;
        $vec[5] = (substr($cuit, 5, 1)) * 6;
        $vec[6] = (substr($cuit, 6, 1)) * 5;
        $vec[7] = (substr($cuit, 7, 1)) * 4;
        $vec[8] = (substr($cuit, 8, 1)) * 3;
        $vec[9] = (substr($cuit, 9, 1)) * 2;
                    
        // Suma cada uno de los resultado.
        for( $i = 0;$i<=9; $i++) {
            $x += $vec[$i];
        }
        $dv = (11 - ($x % 11)) % 11;
        if ($dv == (substr($cuit, 10, 1)) ) {
            $esCuit=true;
        }
    }
    return( $esCuit );
}

function zerofill($entero, $largo){
    // Limpiamos por si se encontraran errores de tipo en las variables
    $entero = (int)$entero;
    $largo = (int)$largo;	
     
    $relleno = "";
     
    /**
     * Determinamos la cantidad de caracteres utilizados por $entero
     * Si este valor es mayor o igual que $largo, devolvemos el $entero
     * De lo contrario, rellenamos con ceros a la izquierda del número
     **/
    if (strlen($entero) < $largo) {
        $relleno = str_repeat('0',$largo - strlen($entero));
    }
    return $relleno . $entero;
}

function validarFechaMayorAHoy($fecha){
//valida que la fecha sea mayor a hoy y devuelve true. Si la fecha es igual a hoy o anterior entonces devuelve false
	if (validarFecha($fecha)){
		$hoy = date('d/m/Y');
		$today = fechaReturnYMD($hoy);
		$date = fechaReturnYMD($fecha);
		if (strcmp($today, $date) > 0){ //si $today es mayor que $date --> false
			return false;
		}else{
			//$today es menor que $date o son iguales
			if ($today == $date){
				return false;
			}else{
				//la fecha $date($fecha) es mayor a hoy
				return true;
			}
		}
	}else{
		return false;
	}
}

function utf8_encode_all($dat) // -- It returns $dat encoded to UTF8 
{ 
  if (is_string($dat)) return utf8_encode($dat); 
  if (!is_array($dat)) return $dat; 
  $ret = array(); 
  foreach($dat as $i=>$d) $ret[$i] = utf8_encode_all($d); 
  return $ret; 
} 
/* ....... */ 

function utf8_decode_all($dat) // -- It returns $dat decoded from UTF8 
{ 
  if (is_string($dat)) return utf8_decode($dat); 
  if (!is_array($dat)) return $dat; 
  $ret = array(); 
  foreach($dat as $i=>$d) $ret[$i] = utf8_decode_all($d); 
  return $ret; 
} 
/* ....... */

function esPar($numero){
   $resto = $numero%2;
   if (($resto==0) && ($numero!=0)) {
        return true;
   }else{
        return false;
   }
}

function sacarAcentos($string){
	$letrasProhibidas = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ", "Ñ");
	$letrasSantas = array ("a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "n", "N");
	$limpio = str_replace($letrasProhibidas, $letrasSantas, $string);
	return $limpio;
}


?>