$(document).ready(function(){
    // $('select').material_select();

    // $("#dialogVigente").dialog({
    //     autoOpen: false,        
    //     dialogClass: "dialogAFVigente",
    //     height: 200,        
    //     width: 400,
    //     modal: true
    // });
    // if ($("#ocultarDiv").val() == "SI"){
    //     $("#capaAF").hide();
    //     $("#btnNuevaAsig").show();
    // }else{
    //     $("#capaAF").show();
    //     $("#btnNuevaAsig").hide();
    //     $("#btnCerrar").append("<button class='right' onclick='window.location.reload();' > Cerrar </button>")
    // }
    // if ($("#mostrarDialog").val() == "SI"){
    //     $("#dialogVigente").dialog("open");
    // }
});

function cerrarDialogo(){
    $("#dialogVigente").dialog("close");
}

function mostrarOcultarCapaAf(){
    var XHR = $.ajax({
        type: "POST", 
        url: "af_solicitud",
        data: { accionFinal: 'vigente' }
    });
    XHR.done(function(response){        
        if (response == 0){
            $("#btnNuevaAsig").hide();
            $("#capaAF").show();
            //$("#btnCerrar").append("<button class='right' onclick='window.location.reload();' > Cerrar </button>");
        }else{          
            $("#accion").val("traerVigente");
            $("#id_solicitud").val(response);
            $("#mensajes").append("<p><b>Cargando asignación vigente..</b></p>");
            $("#formAF").submit();
        }
    });
}

/** ============================================================== */
function validar_AF_Solicitud(){
    //TODO
    if ($("#accion").val() == "editar"){
        return true;
    }
    if ($("#accion").val() == "baja"){
        return true;
    }
    if ($("#accion").val() == "traerVigente"){
        return true;
    }
    if ($('[name="af_tipoRelacion"]').val() != ''){ 
        alert('Debe presionar el botón de +(más) para cargar la línea');
        return false;
    }
    if ($('[name="af_conyuge_tipoRelacion"]').val() != ''){ 
        alert('Debe presionar el botón de +(más) para cargar la línea');
        return false;
    }
    if ($('[name="af_datos_hijos_AsignacionSolicitada"]').val() != '0'){ 
        alert('Debe presionar el botón de +(más) para cargar la línea');
        return false;
    }
    $("#accion").val("guardar");
    return true;    
}

// SACAR Y AGREGAR FILAS
function agregarFilaOtrosIngresos(obj){    
    
    var col1 = $("#af_tipoRelacion").val(); //ok
    var col2 = $("#af_Denominacion_input").val();  // <- ver selección
    var col3 = $("#af_CuitEmpleador").val(); //ok
    var col4 = $("#af_IngresoBruto_input").val(); // <- ver selección    
    var text = $("#af_IngresoBruto_text").val(); // <- no se usa
    if (text == ''){
        text = $("#af_IngresoBruto_input").val();
    }

    var col5 = 0;
    if($("#fm_check").is(':checked')){
        col5 = 1;
    }
    firmoMecanizada();
    
    /* ** sacar check para agregar columna */ 
    if ((col1 == '') || (col2 == '') || (col3 == '') || (col4 == '')){
        alert ("Complete todos los campos");
        return false;
    }
    else{
        obj.value = parseInt(obj.value) + 1;
        var oId = obj.value;
        //función blanquear        
        blanquearDeclarante();
    }
    //limpio el campo de ingreso
    $("#af_IngresoBruto_text").val("");
    
    var strHtml1 = "<td><input type='text' name='af_otros_ingresos_"+oId+"_tipo_relacion' value='"+col1+"' readonly /></td> ";
    var strHtml2 = "<td><input type='text' name='af_otros_ingresos_"+oId+"_denominacion' value='"+col2+"' readonly /></td> ";
    var strHtml3 = "<td><input type='text' name='af_otros_ingresos_"+oId+"_cuit_empleador' value='"+col3+"' readonly /></td> ";
    var strHtml4 = "<td><input type='hidden' name='af_otros_ingresos_"+oId+"_ingreso_bruto' value='"+col4+"' readonly /><input type='text' readonly value='"+text+"' /></td> ";    
    if (col5 == 1){
        var strHtml5 = "<td><input type='checkbox' checked /><input type='hidden' name='af_otros_ingresos_"+oId+"_firmo_mecanizada' value='1' readonly='readonly' /></td> ";
    }else{
        var strHtml5 = "<td><input type='checkbox' /><input type='hidden' name='af_otros_ingresos_"+oId+"_firmo_mecanizada' value='0' readonly='readonly' /></td> ";
    }
    
    var aux = document.getElementById('oi_cant_campos').value;
    var strHtml6 = "<input type='button' value=' - ' onclick='sacarFilaOtrosIngresos("+aux+")'/>";   

    var objTr = document.createElement("tr");
    objTr.id = "af_row_otros_ingresos_" + oId;
    
    var objTd1 = document.createElement("td");
    objTd1.id = "af_la" + oId;
    objTd1.innerHTML = strHtml1;    
    
    var objTd2 = document.createElement("td");
    objTd2.id = "af_la" + oId;
    objTd2.innerHTML = strHtml2; 
    
    var objTd3 = document.createElement("td");
    objTd3.id = "af_la" + oId;
    objTd3.innerHTML = strHtml3; 
    
    var objTd4 = document.createElement("td");
    objTd4.id = "af_la" + oId;
    objTd4.innerHTML = strHtml4; 
        
    var objTd6 = document.createElement("td");
    objTd6.id = "af_la" + oId;
    objTd6.innerHTML = strHtml6; 
    
    var objTd5 = document.createElement("td");
    objTd5.id = "af_la" + oId;
    objTd5.innerHTML = strHtml5; 
    
    objTr.appendChild(objTd6);
    objTr.appendChild(objTd1);
    objTr.appendChild(objTd2);
    objTr.appendChild(objTd3);
    objTr.appendChild(objTd4);
    objTr.appendChild(objTd5);
    
    var objTbody = document.getElementById("otrosIngresos");
    objTbody.appendChild(objTr);    
    return false;
}

function sacarFilaOtrosIngresos(numOI){
    if (confirm('Desea borrar la fila seleccionada?')){
        var objHijo = document.getElementById('af_row_otros_ingresos_' + numOI);
        var objPadre = objHijo.parentNode;
        objPadre.removeChild(objHijo);
    }
    return false;    
}

function agregarFilaConyuge(obj){    
    
    var col1 = $("#af_conyuge_tipoRelacion").val(); //ok
    var col2 = $("#af_conyuge_Denominacion_input").val();  // <- ver selección
    var col3 = $("#af_conyuge_CuitEmpleador").val(); //ok
    var col4 = $("#af_conyuge_IngresoBruto_input").val(); // <- ver selección   
    var text = $("#af_conyuge_IngresoBruto_text").val();    
    if (text == ''){
        text = $("#af_conyuge_IngresoBruto_input").val();
    }


    var col5 = 0;
    if($("#fm_check2").is(':checked')){
        col5 = 1;
    }   
    firmoMecanizada2();
    
    if ((col1 == '') || (col2 == '') || (col3 == '') || (col4 == '')){
        alert ("Complete todos los campos");
        return false;
    }
    else{
        obj.value = parseInt(obj.value) + 1;
        var oId = obj.value;
        //función blanquear        
        blanquearConyuge();
    }
    //limpio campo de ingreso
    $("#af_conyuge_IngresoBruto_text").val("");
    
    var strHtml1 = "<td><input type='text' name='af_conyuge_"+oId+"_tipo_relacion' value='"+col1+"' readonly /></td> ";
    var strHtml2 = "<td><input type='text' name='af_conyuge_"+oId+"_denominacion' value='"+col2+"' readonly /></td> ";
    var strHtml3 = "<td><input type='text' name='af_conyuge_"+oId+"_cuit_empleador' value='"+col3+"' readonly /></td> ";
    var strHtml4 = "<td><input type='hidden' name='af_conyuge_"+oId+"_ingreso_bruto' value='"+col4+"' readonly /><input type='text' readonly value='"+text+"' /></td> ";    
    if (col5 == 1){
        var strHtml5 = "<td><input type='checkbox' checked /><input type='hidden' name='af_conyuge_"+oId+"_firmo_mecanizada' value='1' readonly='readonly' /></td> ";
    }else{
        var strHtml5 = "<td><input type='checkbox' /><input type='hidden' name='af_conyuge_"+oId+"_firmo_mecanizada' value='0' readonly='readonly' /></td> ";
    }
    
    var aux = document.getElementById('conyuge_cant_campos').value;
    var strHtml6 = "<input type='button' value=' - ' onclick='sacarFilaConyuge("+aux+")'/>";   

    var objTr = document.createElement("tr");
    objTr.id = "af_row_conyuge_" + oId;
    
    var objTd1 = document.createElement("td");
    objTd1.id = "af_la" + oId;
    objTd1.innerHTML = strHtml1;    
    
    var objTd2 = document.createElement("td");
    objTd2.id = "af_la" + oId;
    objTd2.innerHTML = strHtml2; 
    
    var objTd3 = document.createElement("td");
    objTd3.id = "af_la" + oId;
    objTd3.innerHTML = strHtml3; 
    
    var objTd4 = document.createElement("td");
    objTd4.id = "af_la" + oId;
    objTd4.innerHTML = strHtml4; 
        
    var objTd6 = document.createElement("td");
    objTd6.id = "af_la" + oId;
    objTd6.innerHTML = strHtml6; 
    
    var objTd5 = document.createElement("td");
    objTd5.id = "af_la" + oId;
    objTd5.innerHTML = strHtml5;
    
    objTr.appendChild(objTd6);
    objTr.appendChild(objTd1);
    objTr.appendChild(objTd2);
    objTr.appendChild(objTd3);
    objTr.appendChild(objTd4);    
    objTr.appendChild(objTd5);    
    
    var objTbody = document.getElementById("conyuge_ingresos");
    objTbody.appendChild(objTr);    
    return false;
}

function sacarFilaConyuge(numCony){
    if (confirm('Desea borrar la fila seleccionada?')){
        var objHijo = document.getElementById('af_row_conyuge_' + numCony);
        var objPadre = objHijo.parentNode;
        objPadre.removeChild(objHijo);
    }    
    return false;
}

function obtenerValoresFilaAsignaciones(index){
        var arregloFila = new Object();
        $("#tabla_af4 tbody tr").eq(index).each(function(){
            //alert(this.cells[1].innerHTML);
            arregloFila['idAsignacion'] = encontrarCadenaEntre(this.cells[1].innerHTML, 'asignacion_id" value="', '"');
            //alert(this.cells[2].innerHTML);
            arregloFila['idFamiliar'] = encontrarCadenaEntre(this.cells[2].innerHTML, 'apyn_id" value="', '"');            
        });
        //alert(arregloFila['idAsignacion']+' - '+arregloFila['idFamiliar']);
        return arregloFila;
    }

function validarPorDuplicado(col1a,col2a){
    var cantFilas = parseInt($("#dh_cant_campos").val());
    if (cantFilas > 0){
        var i;
        for (var i = cantFilas; i > 0; i--){
            var arr = obtenerValoresFilaAsignaciones(i);
            //alert(arr['idAsignacion']+" = "+col1a+" -- "+arr['idFamiliar']+" = "+col2a);
            if ((arr['idAsignacion'] === col1a) && (arr['idFamiliar'] === col2a)){
                return true;
            }
        }
        //no hay asignaciones iguales a la que se va a cargar
        return false;
    }else{
        //no hay asignaciones todavía
        return false;
    }
}

function agregarFilaDatosHijos(obj){    
    
    var col1a = $("#af_datos_hijos_AsignacionSolicitada_input_id").val();       //asig id
    var col1b = $("#af_datos_hijos_AsignacionSolicitada_input_text").val();     //asig text
    var col2a = $("#af_datos_hijos_ApellidoyNombre_input_id").val();             //familiar id
    var col2b = $("#af_datos_hijos_ApellidoyNombre_input_text").val();           //familiar text
    var col3 = $("#af_datos_hijos_Dni").val(); 
    var col4 = $("#af_datos_hijos_FechaNacimiento").val(); 
    var col5 = $("#af_datos_hijos_Discapacidad").val(); 
    if ((col1a == '') || (col1b == '') || (col2a == '') || (col2b == '') || (col3 == '') || (col4 == '') || (col5 == '')){
        if (!(col1b == 'PRENATAL' )){
            alert ("Complete todos los campos");
            return false;
        }
        else{
            if (validarPorDuplicado(col1a,col2a)){
                alert ("Esta asignación ya está en el listado");
                return false;
            }       
            //aumento el contador
            obj.value = parseInt(obj.value) + 1;
            var oId = obj.value;
            //función blanquear para limpiar los campos y poder volver a usarlos
            blanquearDatosHijos();
        }
    }
    else{
        if (validarPorDuplicado(col1a,col2a)){
            alert ("Esta asignación ya está en el listado");
            return false;
        }
        //aumento el contador
        obj.value = parseInt(obj.value) + 1;
        var oId = obj.value;
        //función blanquear para limpiar los campos y poder volver a usarlos
        blanquearDatosHijos();
    }   
    var strHtml1 = "<td><input type='hidden' name='af_datos_hijos_"+oId+"_asignacion_id' value='"+col1a+"' readonly /><input type='text' name='af_datos_hijos_"+oId+"_asignacion_text' value='"+col1b+"' readonly size='45' /></td>";
    var strHtml2 = "<td><input type='hidden' name='af_datos_hijos_"+oId+"_apyn_id' value='"+col2a+"' readonly /><input type='text' name='af_datos_hijos_"+oId+"_apyn_text' value='"+col2b+"' readonly /></td> ";
    var strHtml3 = "<td><input type='text' name='af_datos_hijos_"+oId+"_dni' value='"+col3+"' readonly /></td> ";
    var strHtml4 = "<td><input type='text' name='af_datos_hijos_"+oId+"_fnacimiento' value='"+col4+"' readonly /></td> ";
    var strHtml5 = "<td><input type='text' name='af_datos_hijos_"+oId+"_discapacidad' value='"+col5+"' readonly /></td> ";    
    var aux = document.getElementById('dh_cant_campos').value;
    var strHtml6 = "<input type='button' value=' - ' onclick='sacarFilaDatosHijos("+aux+")'/>";

    var objTr = document.createElement("tr");
    objTr.id = "af_row_datos_hijos_" + oId;
    
    var objTd1 = document.createElement("td");
    objTd1.id = "af_la" + oId;    
    objTd1.innerHTML = strHtml1;    
    
    var objTd2 = document.createElement("td");
    objTd2.id = "af_la" + oId;
    objTd2.innerHTML = strHtml2; 
    
    var objTd3 = document.createElement("td");
    objTd3.id = "af_la" + oId;
    objTd3.innerHTML = strHtml3; 
    
    var objTd4 = document.createElement("td");
    objTd4.id = "af_la" + oId;
    objTd4.innerHTML = strHtml4; 
    
    var objTd5 = document.createElement("td");
    objTd5.id = "af_la" + oId;
    objTd5.innerHTML = strHtml5; 
    
    var objTd6 = document.createElement("td");
    objTd6.id = "af_la" + oId;
    objTd6.innerHTML = strHtml6; 
    
    objTr.appendChild(objTd6);
    objTr.appendChild(objTd1);
    objTr.appendChild(objTd2);
    objTr.appendChild(objTd3);
    objTr.appendChild(objTd4);
    objTr.appendChild(objTd5);
    
    var objTbody = document.getElementById("datosHijos");
    objTbody.appendChild(objTr);
    return false;
}

function sacarFilaDatosHijos(numDH){
    if (confirm('Desea borrar la fila seleccionada?')){
        var objHijo = document.getElementById('af_row_datos_hijos_' + numDH);
        var objPadre = objHijo.parentNode;
        objPadre.removeChild(objHijo);
    }    
    return false;  

}

// FIN SACAR Y AGREGAR FILAS




/* DECLARANTE */      /* DECLARANTE */      /* DECLARANTE */      /* DECLARANTE */      /* DECLARANTE */      /* DECLARANTE */      /* DECLARANTE */      


function relacionDenominacion(rel){

    //RELACION PUEDE SER:
    // DEPENDIENTE, INDEPENDIENTE, JUBILACION_O_PENSION
    // SI DEPENDIENTE --> deja escribir --> CUITEMPLEADOR --> deja escribir
    // SI INDEPENDIENTE --> MONOTRIBUTISTA/AUTONOMO --> '-' --> disabled (*)
    // SI JUBILACION_O_PENSION --> CONTRIBUTIVA/NO_CONTRIBUTIVA --> '-' --> deja escribir
    $('#af_Denominacion_input').val('');
    $('#af_CuitEmpleador').val('');
    $('#af_IngresoBruto_input').val('');

    
    switch(rel.value){
        case 'DEPENDIENTE':     
    
            $('#af_Denominacion_input').removeAttr('disabled');
            $('#af_Denominacion_input').val('');
            $('#af_Denominacion_input').show(); // DEJAR ESCRIBIR SOLO CARACTERES            
            $('#af_Denominacion_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_Denominacion_select_1 option:first").attr('selected','selected');  
            $('#af_Denominacion_select_1').attr('disabled', 'disabled');
            $('#af_Denominacion_select_1').hide();             
            $('#af_Denominacion_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_Denominacion_select_2 option:first").attr('selected','selected');  
            $('#af_Denominacion_select_2').attr('disabled', 'disabled');
            $('#af_Denominacion_select_2').hide(); 
            $('#af_CuitEmpleador').removeAttr('disabled'); 
            $('#af_CuitEmpleador').val(''); //INGRESE CUIT EMPLEADOR
            $('#af_IngresoBruto_input').removeAttr('disabled'); 
            $('#af_IngresoBruto_input').val(''); // DEJAR ESCRIBIR SOLO NÚMEROS
            $('#af_IngresoBruto_text').val("");
            $('#af_IngresoBruto_input').show();            
            $('#af_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_1 option:first").attr('selected','selected');  
            $('#af_IngresoBruto_select_1').attr('disabled', 'disabled');
            $('#af_IngresoBruto_select_1').hide();              
            $('#af_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_2 option:first").attr('selected','selected');  
            $('#af_IngresoBruto_select_2').attr('disabled', 'disabled');
            $('#af_IngresoBruto_select_2').hide();
            toggleFM(true);
            break;
        
        case 'INDEPENDIENTE':
        
            $('#af_Denominacion_input').val('');
            $('#af_Denominacion_input').hide(); 
            $('#af_Denominacion_input').attr('disabled', 'disabled'); 
            $('#af_Denominacion_select_1').removeAttr('disabled');            
            $('#af_Denominacion_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_Denominacion_select_1 option:first").attr('selected','selected');            
            $('#af_Denominacion_select_1').show(); // MUESTRA OPCIONES MONOTRIBUTISTA/AUTONOMO
            $('#af_Denominacion_select_2').attr('disabled', 'disabled');            
            $('#af_Denominacion_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_Denominacion_select_2 option:first").attr('selected','selected');
            $('#af_Denominacion_select_2').hide();      
            $('#af_CuitEmpleador').attr('disabled', 'disabled');
            $('#af_CuitEmpleador').val('-');
            $('#af_IngresoBruto_input').val('');
            $('#af_IngresoBruto_text').val("");
            $('#af_IngresoBruto_input').attr('disabled', 'disabled');
            $('#af_IngresoBruto_input').show();
            $('#af_IngresoBruto_select_1').hide();
            $('#af_IngresoBruto_select_1').attr('disabled', 'disabled');            
            $('#af_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_1 option:first").attr('selected','selected');
            $('#af_IngresoBruto_select_2').hide();
            $('#af_IngresoBruto_select_2').attr('disabled', 'disabled');            
            $('#af_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_2 option:first").attr('selected','selected');
            toggleFM(false);
            break;
        
        case 'JUBILACION_O_PENSION':
        
            $('#af_Denominacion_input').hide(); 
            $('#af_Denominacion_input').val('');        
            $('#af_Denominacion_input').attr('disabled', 'disabled'); 
            $('#af_Denominacion_select_1').hide(); 
            $('#af_Denominacion_select_1').attr('disabled', 'disabled');
            $('#af_Denominacion_select_2').show(); // MUESTRA OPCIONES CONTRIBUTIVA/NO_CONTRIBUTIVA
            $('#af_Denominacion_select_2').removeAttr('disabled');              
            $('#af_CuitEmpleador').attr('disabled', 'disabled');
            $('#af_CuitEmpleador').val('-');
            $('#af_IngresoBruto_input').removeAttr('disabled');
            $('#af_IngresoBruto_input').val('');
            $('#af_IngresoBruto_text').val("");
            $('#af_IngresoBruto_input').show();                        
            $('#af_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_1 option:first").attr('selected','selected');
            $('#af_IngresoBruto_select_1').attr('disabled', 'disabled');
            $('#af_IngresoBruto_select_1').hide();              
            $('#af_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_2 option:first").attr('selected','selected');
            $('#af_IngresoBruto_select_2').attr('disabled', 'disabled');
            $('#af_IngresoBruto_select_2').hide();
            toggleFM(false);
            break;  
        case '': 
            blanquearDeclarante();
            break;
    }   
}

function denominacionIngresoBruto(deno){
    // (*) DENOMINACION PUEDE SER:
    //      MONOTRIBUTISTA, AUTONOMO
    //      SI MONOTRIBUTISTA --> --> (2000.00/3000.00/4000.00/6000.00/8000.00)
    //      SI AUTONOMO --> --> (1089.66/1525.52/2179.33/3486.92/4794.51)
    
    //$("#af_IngresoBruto_input")
    //$("#af_IngresoBruto_select_1")
    //$("#af_IngresoBruto_select_2")
    
    switch(deno.value){
        case 'MONOTRIBUTISTA':
            $("#af_Denominacion_input").val("MONOTRIBUTISTA");
            $("#af_IngresoBruto_input").attr('disabled', 'disabled');
            $("#af_IngresoBruto_input").val('');
            $('#af_IngresoBruto_text').val("");
            $("#af_IngresoBruto_input").hide();
            $("#af_IngresoBruto_select_1").removeAttr('disabled');
            $('#af_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_1 option:first").attr('selected','selected'); 
            $("#af_IngresoBruto_select_1").show();
            $("#af_IngresoBruto_select_2").attr('disabled', 'disabled');
            $('#af_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_IngresoBruto_select_2 option:first").attr('selected','selected'); 
            $("#af_IngresoBruto_select_2").hide();
            break;
        case 'AUTONOMO':    
            $("#af_Denominacion_input").val("AUTONOMO");
            $("#af_IngresoBruto_input").attr('disabled', 'disabled');
            $("#af_IngresoBruto_input").val('');
            $('#af_IngresoBruto_text').val("");
            $("#af_IngresoBruto_input").hide();
            $("#af_IngresoBruto_select_1").attr('disabled', 'disabled');
            $("#af_IngresoBruto_select_1").hide();
            $("#af_IngresoBruto_select_2").removeAttr('disabled');
            $("#af_IngresoBruto_select_2").show();
            break;
        case 'CONTRIBUTIVA':
            $("#af_Denominacion_input").val("CONTRIBUTIVA");
            $("#af_IngresoBruto_input").removeAttr('disabled');
            $("#af_IngresoBruto_input").val('');
            $('#af_IngresoBruto_text').val("");
            $("#af_IngresoBruto_input").show();
            $("#af_IngresoBruto_select_1").attr('disabled', 'disabled');
            $("#af_IngresoBruto_select_1").hide();
            $("#af_IngresoBruto_select_2").attr('disabled', 'disabled');    
            $("#af_IngresoBruto_select_2").hide();  
            break;
        case 'NO_CONTRIBUTIVA': 
            $("#af_Denominacion_input").val("NO_CONTRIBUTIVA");
            $("#af_IngresoBruto_input").removeAttr('disabled');
            $("#af_IngresoBruto_input").val('');
            $('#af_IngresoBruto_text').val("");
            $("#af_IngresoBruto_input").show();
            $("#af_IngresoBruto_select_1").attr('disabled', 'disabled');
            $("#af_IngresoBruto_select_1").hide();
            $("#af_IngresoBruto_select_2").attr('disabled', 'disabled');
            $("#af_IngresoBruto_select_2").hide();
            break;
        case '':
            blanquearIngresoBruto();
            break;
    }    
}

function blanquearDeclarante(){
    
    $('#af_tipoRelacion option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_tipoRelacion option:first").attr('selected','selected');     
    
    $('#af_Denominacion_input').val('');    
    $('#af_Denominacion_input').show(); 
    $('#af_Denominacion_input').attr('disabled', 'disabled');
    $('#af_Denominacion_select_1').hide();    
    $('#af_Denominacion_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_Denominacion_select_1 option:first").attr('selected','selected');    
    $('#af_Denominacion_select_1').attr('disabled', 'disabled');
    $('#af_Denominacion_select_2').hide();    
    $('#af_Denominacion_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_Denominacion_select_2 option:first").attr('selected','selected');    
    $('#af_Denominacion_select_2').attr('disabled', 'disabled');
    $('#af_CuitEmpleador').val(''); 
    $('#af_CuitEmpleador').attr('disabled', 'disabled');
    $('#af_IngresoBruto_input').val('');
    $('#af_IngresoBruto_text').val("");
    $('#af_IngresoBruto_input').show(); 
    $('#af_IngresoBruto_input').attr('disabled', 'disabled');   
    $('#af_IngresoBruto_select_1').hide();    
    $('#af_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_IngresoBruto_select_1 option:first").attr('selected','selected');    
    $('#af_IngresoBruto_select_1').attr('disabled', 'disabled');    
    $('#af_IngresoBruto_select_2').hide();    
    $('#af_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_IngresoBruto_select_2 option:first").attr('selected','selected');    
    $('#af_IngresoBruto_select_2').attr('disabled', 'disabled');    
}

function blanquearIngresoBruto(){
    $('#af_IngresoBruto_input').attr('disabled', 'disabled');   
    $('#af_IngresoBruto_input').val('');
    $('#af_IngresoBruto_text').val("");
    $('#af_IngresoBruto_input').show();
    $('#af_IngresoBruto_select_1').attr('disabled', 'disabled');    
    $('#af_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_IngresoBruto_select_1 option:first").attr('selected','selected');
    $('#af_IngresoBruto_select_1').hide();  
    $('#af_IngresoBruto_select_2').attr('disabled', 'disabled');    
    $('#af_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_IngresoBruto_select_2 option:first").attr('selected','selected');
    $('#af_IngresoBruto_select_2').hide();      
}

function seleccionaIngresoBruto(montoIngreso,elem){
    if (montoIngreso.value != ""){
        $('#af_IngresoBruto_input').val(montoIngreso.value);
        $('#af_IngresoBruto_text').val($("#"+elem+" option:selected").text());
    }else{
        $('#af_IngresoBruto_input').val("");
        $('#af_IngresoBruto_text').val("");
    }
}

/*

$('#target option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
$("#target option:first").attr('selected','selected');
 
*/





/* CONYUGE */     /* CONYUGE */     /* CONYUGE */     /* CONYUGE */     /* CONYUGE */     /* CONYUGE */     /* CONYUGE */     /* CONYUGE */     /* CONYUGE */     



function relacionConyugeDenominacion(rel){
    //RELACION PUEDE SER:
    // DEPENDIENTE, INDEPENDIENTE, JUBILACION_O_PENSION
    // SI DEPENDIENTE --> deja escribir --> CUITEMPLEADOR --> deja escribir
    // SI INDEPENDIENTE --> MONOTRIBUTISTA/AUTONOMO --> '-' --> disabled (*)
    // SI JUBILACION_O_PENSION --> CONTRIBUTIVA/NO_CONTRIBUTIVA --> '-' --> deja escribir
    $('#af_conyuge_Denominacion_input').val('');
    $('#af_conyuge_CuitEmpleador').val('');
    $('#af_conyuge_IngresoBruto_input').val('');

    
    switch(rel.value){
        case 'DEPENDIENTE':     
    
            $('#af_conyuge_Denominacion_input').removeAttr('disabled');
            $('#af_conyuge_Denominacion_input').val('');
            $('#af_conyuge_Denominacion_input').show(); // DEJAR ESCRIBIR SOLO CARACTERES            
            $('#af_conyuge_Denominacion_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_Denominacion_select_1 option:first").attr('selected','selected');  
            $('#af_conyuge_Denominacion_select_1').attr('disabled', 'disabled');
            $('#af_conyuge_Denominacion_select_1').hide();             
            $('#af_conyuge_Denominacion_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_Denominacion_select_2 option:first").attr('selected','selected');  
            $('#af_conyuge_Denominacion_select_2').attr('disabled', 'disabled');
            $('#af_conyuge_Denominacion_select_2').hide(); 
            $('#af_conyuge_CuitEmpleador').removeAttr('disabled'); 
            $('#af_conyuge_CuitEmpleador').val(''); //INGRESE CUIT EMPLEADOR
            $('#af_conyuge_IngresoBruto_input').removeAttr('disabled'); 
            $('#af_conyuge_IngresoBruto_input').val(''); // DEJAR ESCRIBIR SOLO NÚMEROS
            $('#af_conyuge_IngresoBruto_text').val("");
            $('#af_conyuge_IngresoBruto_input').show();            
            $('#af_conyuge_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_1 option:first").attr('selected','selected');  
            $('#af_conyuge_IngresoBruto_select_1').attr('disabled', 'disabled');
            $('#af_conyuge_IngresoBruto_select_1').hide();              
            $('#af_conyuge_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_2 option:first").attr('selected','selected');  
            $('#af_conyuge_IngresoBruto_select_2').attr('disabled', 'disabled');
            $('#af_conyuge_IngresoBruto_select_2').hide();
            toggleFM2(true);
            break;
        
        case 'INDEPENDIENTE':
        
            $('#af_conyuge_Denominacion_input').val('');
            $('#af_conyuge_Denominacion_input').hide(); 
            $('#af_conyuge_Denominacion_input').attr('disabled', 'disabled'); 
            $('#af_conyuge_Denominacion_select_1').removeAttr('disabled');            
            $('#af_conyuge_Denominacion_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_Denominacion_select_1 option:first").attr('selected','selected');            
            $('#af_conyuge_Denominacion_select_1').show(); // MUESTRA OPCIONES MONOTRIBUTISTA/AUTONOMO
            $('#af_conyuge_Denominacion_select_2').attr('disabled', 'disabled');            
            $('#af_conyuge_Denominacion_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_Denominacion_select_2 option:first").attr('selected','selected');
            $('#af_conyuge_Denominacion_select_2').hide();      
            $('#af_conyuge_CuitEmpleador').removeAttr('disabled'); 
            $('#af_conyuge_CuitEmpleador').val('');
            $('#af_conyuge_IngresoBruto_input').val('');
            $('#af_conyuge_IngresoBruto_text').val("");
            $('#af_conyuge_IngresoBruto_input').attr('disabled', 'disabled');
            $('#af_conyuge_IngresoBruto_input').show();
            $('#af_conyuge_IngresoBruto_select_1').hide();
            $('#af_conyuge_IngresoBruto_select_1').attr('disabled', 'disabled');            
            $('#af_conyuge_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_1 option:first").attr('selected','selected');
            $('#af_conyuge_IngresoBruto_select_2').hide();
            $('#af_conyuge_IngresoBruto_select_2').attr('disabled', 'disabled');            
            $('#af_conyuge_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_2 option:first").attr('selected','selected');
            toggleFM2(false);
            break;
        
        case 'JUBILACION_O_PENSION':
        
            $('#af_conyuge_Denominacion_input').hide(); 
            $('#af_conyuge_Denominacion_input').val('');        
            $('#af_conyuge_Denominacion_input').attr('disabled', 'disabled'); 
            $('#af_conyuge_Denominacion_select_1').hide(); 
            $('#af_conyuge_Denominacion_select_1').attr('disabled', 'disabled');
            $('#af_conyuge_Denominacion_select_2').show(); // MUESTRA OPCIONES CONTRIBUTIVA/NO_CONTRIBUTIVA
            $('#af_conyuge_Denominacion_select_2').removeAttr('disabled');              
            $('#af_conyuge_CuitEmpleador').removeAttr('disabled'); 
            $('#af_conyuge_CuitEmpleador').val('');
            $('#af_conyuge_IngresoBruto_input').removeAttr('disabled');
            $('#af_conyuge_IngresoBruto_input').val('');
            $('#af_conyuge_IngresoBruto_text').val("");
            $('#af_conyuge_IngresoBruto_input').show();                        
            $('#af_conyuge_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_1 option:first").attr('selected','selected');
            $('#af_conyuge_IngresoBruto_select_1').attr('disabled', 'disabled');
            $('#af_conyuge_IngresoBruto_select_1').hide();              
            $('#af_conyuge_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_2 option:first").attr('selected','selected');
            $('#af_conyuge_IngresoBruto_select_2').attr('disabled', 'disabled');
            $('#af_conyuge_IngresoBruto_select_2').hide();
            toggleFM2(false);
            break;
            
        case '':
            blanquearConyuge();
            break;
    }   
}

function denominacionConyugeIngresoBruto(deno){
    // (*) DENOMINACION PUEDE SER:
    //      MONOTRIBUTISTA, AUTONOMO
    //      SI MONOTRIBUTISTA --> --> (2000.00/3000.00/4000.00/6000.00/8000.00)
    //      SI AUTONOMO --> --> (1089.66/1525.52/2179.33/3486.92/4794.51)
    
    //$("#af_IngresoBruto_input")
    //$("#af_IngresoBruto_select_1")
    //$("#af_IngresoBruto_select_2")
    
    switch(deno.value){
        case 'MONOTRIBUTISTA':
            $("#af_conyuge_Denominacion_input").val("MONOTRIBUTISTA");
            $("#af_conyuge_IngresoBruto_input").attr('disabled', 'disabled');
            $("#af_conyuge_IngresoBruto_input").val('');
            $('#af_conyuge_IngresoBruto_text').val("");
            $("#af_conyuge_IngresoBruto_input").hide();
            $("#af_conyuge_IngresoBruto_select_1").removeAttr('disabled');
            $('#af_conyuge_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_1 option:first").attr('selected','selected'); 
            $("#af_conyuge_IngresoBruto_select_1").show();
            $("#af_conyuge_IngresoBruto_select_2").attr('disabled', 'disabled');
            $('#af_conyuge_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
            $("#af_conyuge_IngresoBruto_select_2 option:first").attr('selected','selected'); 
            $("#af_conyuge_IngresoBruto_select_2").hide();
            break;
        case 'AUTONOMO':    
            $("#af_conyuge_Denominacion_input").val("AUTONOMO");
            $("#af_conyuge_IngresoBruto_input").attr('disabled', 'disabled');
            $("#af_conyuge_IngresoBruto_input").val('');
            $('#af_conyuge_IngresoBruto_text').val("");
            $("#af_conyuge_IngresoBruto_input").hide();
            $("#af_conyuge_IngresoBruto_select_1").attr('disabled', 'disabled');
            $("#af_conyuge_IngresoBruto_select_1").hide();
            $("#af_conyuge_IngresoBruto_select_2").removeAttr('disabled');
            $("#af_conyuge_IngresoBruto_select_2").show();
            break;
        case 'CONTRIBUTIVA':
            $("#af_conyuge_Denominacion_input").val("CONTRIBUTIVA");
            $("#af_conyuge_IngresoBruto_input").removeAttr('disabled');
            $("#af_conyuge_IngresoBruto_input").val('');
            $('#af_conyuge_IngresoBruto_text').val("");
            $("#af_conyuge_IngresoBruto_input").show();
            $("#af_conyuge_IngresoBruto_select_1").attr('disabled', 'disabled');
            $("#af_conyuge_IngresoBruto_select_1").hide();
            $("#af_conyuge_IngresoBruto_select_2").attr('disabled', 'disabled');    
            $("#af_conyuge_IngresoBruto_select_2").hide();  
            break;
        case 'NO_CONTRIBUTIVA': 
            $("#af_conyuge_Denominacion_input").val("NO_CONTRIBUTIVA");
            $("#af_conyuge_IngresoBruto_input").removeAttr('disabled');
            $("#af_conyuge_IngresoBruto_input").val('');
            $('#af_conyuge_IngresoBruto_text').val("");
            $("#af_conyuge_IngresoBruto_input").show();
            $("#af_conyuge_IngresoBruto_select_1").attr('disabled', 'disabled');
            $("#af_conyuge_IngresoBruto_select_1").hide();
            $("#af_conyuge_IngresoBruto_select_2").attr('disabled', 'disabled');
            $("#af_conyuge_IngresoBruto_select_2").hide();
            break;
        case '':
            blanquearConyugeIngresoBruto();
            break;
    }    
}

function blanquearConyuge(){
    
    $('#af_conyuge_tipoRelacion option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_tipoRelacion option:first").attr('selected','selected');     
    
    $('#af_conyuge_Denominacion_input').val('');    
    $('#af_conyuge_Denominacion_input').show(); 
    $('#af_conyuge_Denominacion_input').attr('disabled', 'disabled');
    $('#af_conyuge_Denominacion_select_1').hide();    
    $('#af_conyuge_Denominacion_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_Denominacion_select_1 option:first").attr('selected','selected');    
    $('#af_conyuge_Denominacion_select_1').attr('disabled', 'disabled');
    $('#af_conyuge_Denominacion_select_2').hide();    
    $('#af_conyuge_Denominacion_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_Denominacion_select_2 option:first").attr('selected','selected');    
    $('#af_conyuge_Denominacion_select_2').attr('disabled', 'disabled');
    $('#af_conyuge_CuitEmpleador').val(''); 
    $('#af_conyuge_CuitEmpleador').attr('disabled', 'disabled');
    $('#af_conyuge_IngresoBruto_input').val('');
    $('#af_conyuge_IngresoBruto_input').show(); 
    $('#af_conyuge_IngresoBruto_input').attr('disabled', 'disabled');   
    $('#af_conyuge_IngresoBruto_select_1').hide();    
    $('#af_conyuge_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_IngresoBruto_select_1 option:first").attr('selected','selected');    
    $('#af_conyuge_IngresoBruto_select_1').attr('disabled', 'disabled');    
    $('#af_conyuge_IngresoBruto_select_2').hide();    
    $('#af_conyuge_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_IngresoBruto_select_2 option:first").attr('selected','selected');    
    $('#af_conyuge_IngresoBruto_select_2').attr('disabled', 'disabled');    
}

function blanquearConyugeIngresoBruto(){
    $('#af_conyuge_IngresoBruto_input').attr('disabled', 'disabled');   
    $('#af_conyuge_IngresoBruto_input').val('');
    $('#af_conyuge_IngresoBruto_text').val("");
    $('#af_conyuge_IngresoBruto_input').show();
    $('#af_conyuge_IngresoBruto_select_1').attr('disabled', 'disabled');    
    $('#af_conyuge_IngresoBruto_select_1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_IngresoBruto_select_1 option:first").attr('selected','selected');
    $('#af_conyuge_IngresoBruto_select_1').hide();  
    $('#af_conyuge_IngresoBruto_select_2').attr('disabled', 'disabled');    
    $('#af_conyuge_IngresoBruto_select_2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_conyuge_IngresoBruto_select_2 option:first").attr('selected','selected');
    $('#af_conyuge_IngresoBruto_select_2').hide();      
}

function blanquearDatosHijos(){    
    $('#af_datos_hijos_AsignacionSolicitada_input_id').val('');
    $('#af_datos_hijos_AsignacionSolicitada_input_text').val('');
    $('#af_datos_hijos_AsignacionSolicitada option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_AsignacionSolicitada option:first").attr('selected','selected');
    
    $('#af_datos_hijos_ApellidoyNombre_input_id').val('');
    $('#af_datos_hijos_ApellidoyNombre_input_text').val('');
    $('#af_datos_hijos_ApellidoyNombre_input_text').show();
    
    $('#af_datos_hijos_ApellidoyNombre_select1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_ApellidoyNombre_select1 option:first").attr('selected','selected');    
    $('#af_datos_hijos_ApellidoyNombre_select1').hide();        
    $('#af_datos_hijos_ApellidoyNombre_select2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_ApellidoyNombre_select2 option:first").attr('selected','selected');    
    $('#af_datos_hijos_ApellidoyNombre_select2').hide();        
    $('#af_datos_hijos_ApellidoyNombre_select3 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_ApellidoyNombre_select3 option:first").attr('selected','selected');    
    $('#af_datos_hijos_ApellidoyNombre_select3').hide();        
    $('#af_datos_hijos_Dni').val('');        
    $('#af_datos_hijos_FechaNacimiento').val('');        
    $('#af_datos_hijos_Discapacidad').val('');        
}

function blanquearDatosHijos2(){            
    $('#af_datos_hijos_Dni').val('');        
    $('#af_datos_hijos_FechaNacimiento').val('');        
    $('#af_datos_hijos_Discapacidad').val('');    
}

function seleccionaConyugeIngresoBruto(montoIngreso,elem){
    if (montoIngreso.value != ""){
        $('#af_conyuge_IngresoBruto_input').val(montoIngreso.value);
        $('#af_conyuge_IngresoBruto_text').val($("#"+elem+" option:selected").text());
    }else{
        $('#af_conyuge_IngresoBruto_input').val("");
        $('#af_conyuge_IngresoBruto_text').val("");
    }
}

function guardaFamiliar(opt){    
    var numopc = opt.value.split("**");
    if (numopc[0] == 0){
        blanquearDatosHijos2();
    }else{

        $("#af_datos_hijos_ApellidoyNombre_input_id").val(numopc[0]);
        $("#af_datos_hijos_ApellidoyNombre_input_text").val(numopc[1]);
        $("#af_datos_hijos_Dni").val(numopc[2]);
        $("#af_datos_hijos_FechaNacimiento").val(numopc[3]);
        if (numopc[4] == 0) {
            $("#af_datos_hijos_Discapacidad").val('NO');
        } else {
            $("#af_datos_hijos_Discapacidad").val('SI'); 
        }
        //af_datos_hijos_AsignacionSolicitada_input_id verificar si es 4 o 8 para discapacitado
        if (($("#af_datos_hijos_AsignacionSolicitada_input_id").val() == 4) || ($("#af_datos_hijos_AsignacionSolicitada_input_id").val() == 8)){
            // DE PREPO
            $("#af_datos_hijos_Discapacidad").val('SI');
        }
        if ($("#af_datos_hijos_AsignacionSolicitada_input_id").val() == 7){
            $("#af_datos_hijos_Discapacidad").val('-');
        }
    }
}

function cambiarComboDatosHijos(opc){
    /*
     * si value elegido es "" o "1"             --> show input vacio readonly   :: hide, select first select1, select2 y select3 y otros 3 input siempre a blanc
     * si value elegido es "2" o "7"            --> show select1                :: hide, select first value='' input, select2 y select3 y otros 3 input siempre a blanc
     * si value elegido es "5"                  --> show select2                :: hide, select first value='' input, select1 y select3 y otros 3 input siempre a blanc
     * si value elegido es "3","4","6" o "8"    --> show select3                :: hide, select first value='' input, select1 y select2 y otros 3 input siempre a blanc
     */
    var numopc = opc.value.split("**");
    //guardar asignacion seleccionada TODO
    
    $('#af_datos_hijos_AsignacionSolicitada_input_id').val(numopc[0]);
    $('#af_datos_hijos_AsignacionSolicitada_input_text').val(numopc[1]);
    
    switch(numopc[0]){
        case '0': inputShowDF();
                  blanquearDatosHijos();  
                  break;
        case '1': inputShowDF();
                  break;
        case '2': selectUnoShowDF();
                  break;
        case '3': selectTresShowDF();            
                  break;
        case '4': selectTresShowDF();            
                  break;
        case '5': selectDosShowDF();            
                  break;
        case '6': selectTresShowDF();            
                  break;
        case '7': selectUnoShowDF();            
                  break;
        case '8': selectTresShowDF();            
                  break;
    }    
}
/*  */
function inputShowDF(){
    $('#af_datos_hijos_ApellidoyNombre_input_id').val('');
    $('#af_datos_hijos_ApellidoyNombre_input_text').val('');
    $('#af_datos_hijos_ApellidoyNombre_input_text').show();    
    $('#af_datos_hijos_ApellidoyNombre_select1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_ApellidoyNombre_select1 option:first").attr('selected','selected');    
    $('#af_datos_hijos_ApellidoyNombre_select1').hide();        
    $('#af_datos_hijos_ApellidoyNombre_select2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_ApellidoyNombre_select2 option:first").attr('selected','selected');    
    $('#af_datos_hijos_ApellidoyNombre_select2').hide();        
    $('#af_datos_hijos_ApellidoyNombre_select3 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
    $("#af_datos_hijos_ApellidoyNombre_select3 option:first").attr('selected','selected');    
    $('#af_datos_hijos_ApellidoyNombre_select3').hide();        
    $('#af_datos_hijos_Dni').val('');    
    $('#af_datos_hijos_FechaNacimiento').val('');        
    $('#af_datos_hijos_Discapacidad').val('');        
}

/* */ 
function selectUnoShowDF(){
        $('#af_datos_hijos_ApellidoyNombre_input_id').val('');
        $('#af_datos_hijos_ApellidoyNombre_input_text').val('');
        $('#af_datos_hijos_ApellidoyNombre_input_text').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select1 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select1').removeAttr('disabled');
        $('#af_datos_hijos_ApellidoyNombre_select1').show();        
        $('#af_datos_hijos_ApellidoyNombre_select2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select2 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select2').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select3 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select3 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select3').hide();
        $("#af_datos_hijos_Dni").val('');
        $("#af_datos_hijos_FechaNacimiento").val('');
        $("#af_datos_hijos_Discapacidad").val('');
}

/* */
function selectDosShowDF(){
        $('#af_datos_hijos_ApellidoyNombre_input_id').val('');
        $('#af_datos_hijos_ApellidoyNombre_input_text').val('');
        $('#af_datos_hijos_ApellidoyNombre_input_text').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select1 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select1').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select2 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select2').removeAttr('disabled');
        $('#af_datos_hijos_ApellidoyNombre_select2').show();        
        $('#af_datos_hijos_ApellidoyNombre_select3 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select3 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select3').hide();
        $("#af_datos_hijos_Dni").val('');
        $("#af_datos_hijos_FechaNacimiento").val('');
        $("#af_datos_hijos_Discapacidad").val('');
}

/* */
function selectTresShowDF(){
        $('#af_datos_hijos_ApellidoyNombre_input_id').val('');
        $('#af_datos_hijos_ApellidoyNombre_input_text').val('');
        $('#af_datos_hijos_ApellidoyNombre_input_text').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select1 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select1 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select1').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select2 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select2 option:first").attr('selected','selected');    
        $('#af_datos_hijos_ApellidoyNombre_select2').hide();        
        $('#af_datos_hijos_ApellidoyNombre_select3 option[selected="selected"]').each( function() {$(this).removeAttr('selected');});
        $("#af_datos_hijos_ApellidoyNombre_select3 option:first").attr('selected','selected');            
        $('#af_datos_hijos_ApellidoyNombre_select3').show();
        $("#af_datos_hijos_Dni").val('');
        $("#af_datos_hijos_FechaNacimiento").val('');
        $("#af_datos_hijos_Discapacidad").val('');
}

function editarAF(id){
    $("#accion").val("editar");
    $("#id_solicitud").val(id); 
    $("#formAF").submit();  
}

function bajarAF(id){
    if (confirm('¿Está seguro que desea dar de baja esta DDJJ?')){
        $("#accion").val("baja");
        $("#id_solicitud").val(id); 
        $("#formAF").submit();        
    }
}


/* FIRMO MECANIZADA */
function toggleFM(ver) {
    if (ver){
        $("#fm_check").removeAttr("disabled")
    }else{
        $("#fm_check").prop("disabled","disabled")
    }   
}
function firmoMecanizada(){
    //if($("#fm_check").is(':checked')){
    //  var texto = $("#af_Denominacion_input").val();
    //  $("#af_Denominacion_input").val("FM|"+texto);
    //}
    $("#fm_check").removeAttr('checked');
    $("#fm_check").prop('disabled','disabled');
}

function toggleFM2(ver) {
    if (ver){
        $("#fm_check2").removeAttr("disabled")
    }else{
        $("#fm_check2").prop("disabled","disabled")
    }
}
function firmoMecanizada2(){
    //if($("#fm_check2").is(':checked')){
    //  var texto = $("#af_conyuge_Denominacion_input").val();
    //  $("#af_conyuge_Denominacion_input").val("FM|"+texto);
    //}
    $("#fm_check2").removeAttr('checked');
    $("#fm_check2").prop('disabled','disabled');
}