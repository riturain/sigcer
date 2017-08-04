function validar(){
  if ($("#organismo_selected").val() == ''){
    alerta('Seleccione un organismo para ingresar', 'error');
    setInputInvalid('#organismo_selected');
    return false;
  }
  else{
    return true;
  }
  
}