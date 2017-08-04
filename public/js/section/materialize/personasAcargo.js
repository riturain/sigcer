/**
 * 
 * nuevas var globales
 */
var indiceActual = 0;
var $containerEstructura = $("#containerEstructura");
var $containerACargo = $("#containerACargo");
var $containerSuplentes = $("#containerSuplentes");
var $tablaACargo, $tablaSuplentes;
var $btnPrev = $("#btnPrev");
var $btnNext = $("#btnNext");
var estructuras;//global del arreglo de estructuras.
var rol; //global, nombre del rol. El mismo para todas las estructuras.

/***
 * 
 * @change - en el primer response el boton viene deshabilitado
 * agregue la fcc onChangeChecked con un listener para ck.
 * agreuge la fcc actualizarEstado para el butoon
 * 
 */
$(document).ready(function () {
   $(".dat_Desde").mask("99-99-9999");
   $btnPrev.prop('disabled', true);
   initDatatables();
   getInfoInicial();
   $("#button_sup").prop("disabled", true);
   onChangeChecked();
});

function getInfoInicial() {
//    console.log("entra al getInfoInicial");
    $.ajax({
        type: "POST",
        url: "/test_personasacargo",
        data: {methodName: "initTitular"},
        dataType: "json",
        success: function (response) {
            
            console.log("response");
            
            estructuras = response.datos_titulares;
            console.log("estructuras.length");
            console.log(estructuras.length);
            console.log(estructuras);
            rol = response.tipo_rol;
            console.log("este es el rol".rol);
            setInfoEstructuras();
            setInfoACargo(response.datos_acargo);
            setInfoSuplentes(response.datos_suplentes);
        }
    });
}

function getPersonasDeEstructura(){
    var estrucActual = estructuras[indiceActual];
     $.ajax({
        type: "POST",
        url: "/test_personasacargo",
        data: {methodName: "getPersonasDeEstructura", ID_ESTRUCTURA: estrucActual.ID_ESTRUCTURA, ID_TIPO_MOTIVO_AUTORIZANTE: estrucActual.ID_TIPO_MOTIVO_AUTORIZANTE, AUTORIZANTE: estrucActual.AUTORIZANTE},
        dataType: "json",
        success: function (response) {           
			//ESTO NO SETEAR, ya que estructuras se trae solo la 1er vez
            //estructuras = response.datos_personas.datos_titulares;  
//            console.log(response);
            setInfoEstructuras();
            setInfoACargo(response.datos_acargo);
            setInfoSuplentes(response.datos_suplentes);
	    refreshEstadoBtnNextPrev();
        }
    });    
}
function setInfoEstructuras() {
    var estrucActual = estructuras[indiceActual];
    $("input[name='rol']", $containerEstructura).val(rol);
    $("input[name='estructura']", $containerEstructura).val(estrucActual.ESTRUCTURA);
    $("input[name='titular']", $containerEstructura).val(estrucActual.NOMBRE_TITULAR);
    $("input[name='suplente']", $containerEstructura).val(estrucActual.NOMBRE_SUPLENTE);
    $("input[name='desde']", $containerEstructura).val(estrucActual.DESDE);
    $("input[name='check_suplente']", $containerEstructura).prop("checked", estrucActual.SUPLENTE_ACTIVO == "1");
}
function setInfoACargo(personasACargo) {
    $tablaACargo.fnClearTable();
    var fila;
    if (personasACargo.length === 0) {
        $("div.wrapper_table", $containerACargo).hide();
    } else {
        $("div.wrapper_table", $containerACargo).show();
        $.each(personasACargo, function (index, value) {
            fila = [value.APYNOM];
            $tablaACargo.fnAddData(fila);
        });
    }
}
function setInfoSuplentes(suplentes) { 
//    $ult = suplentes.pop(); //saco el ultimo elemento, ya que pertenece al actual.
    console.log("ult");
//    console.log($ult);
    $tablaSuplentes.fnClearTable();
    suplentes.shift();
    var fila, check;
    if (suplentes.length === 0) {
        $("div.wrapper_table", $containerACargo).hide();
    } else {
        $("div.wrapper_table", $containerACargo).show();
        $.each(suplentes, function (index, value) {
            
            if (value.SUPLENTE_ACTIVO == 0) {
                check = '<input type=\"checkbox\" checked disabled readonly />';
            } else
                check = '<input type=\"checkbox\" disabled readonly />';
//            check = '<input type=\"checkbox\" ' + (value.SUPLENTE_ACTIVO == 1 ? "checked" : "") + '" disabled readonly />';
            fila = [value.APELLIDO, value.NOMBRE, check, value.DESDE, value.HASTA];
            $tablaSuplentes.fnAddData(fila);
            
        });
        
//        console.log("ultimo tr");
//        console.log($("tr",  $("#suplente tbody")).last().hide());

       

     }
}
function prev() {
	deshabilitarBtnNextPrev();
       
    if (indiceActual === 0)
        return;
    indiceActual--;
    getPersonasDeEstructura();
}
function next() {
	deshabilitarBtnNextPrev();
   
    if (indiceActual == estructuras.length)
        return;
    indiceActual++;
    getPersonasDeEstructura();
}
function deshabilitarBtnNextPrev(){
	$btnPrev.prop('disabled',true);
	$btnNext.prop('disabled',true);
}
function refreshEstadoBtnNextPrev(){
	$btnPrev.prop('disabled', indiceActual === 0);
	$btnNext.prop('disabled', (indiceActual >= estructuras.length - 1));
}
function initDatatables() {
//      console.log("entro al initDatatables");
     $tablaACargo = $("table", $containerACargo).dataTable({
        "iDisplayLength": 5,
        "aoColumns": [
            {"bSearchable": false}            
        ],
        "bDestroy": true,
        "bLengthChange": false,
        "bFilter": false,
        "bAutoWidth": false,
        "bPaginate": true,
        "bInfo": true,
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
    
     $tablaSuplentes = $("table", $containerSuplentes).dataTable({
        "iDisplayLength": 5,
        "aoColumns": [
            {"bSearchable": false},
            {"bSearchable": false},
            {"bSearchable": false},
            {"bSearchable": false},
            {"bSearchable": false}
        ],
        "bDestroy": true,
        "bLengthChange": false,
        "bFilter": false,
        "bAutoWidth": false,
        "bPaginate": true,
        "bInfo": true,
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
        },
        "columns": [{data: "Suple",
                render: function (data, type, row) {
                    if (type === 'display') {
                        return '<input type="checkbox" class="editor-active">';
                    }
                    return data;
                },
                className: "dt-body-center"
            }
        ]
    });
}
function onChangeChecked(){      
        $('#dat_check').change(function() {
            checkCte = estructuras[indiceActual].SUPLENTE_ACTIVO == 1;
            var check = $('#dat_check').is(":checked");   
//            $("#button_sup").prop("disabled", checkCte === check);
            $("#button_sup").prop("disabled", false);
         });
}

/**
 * 
 * agrèga la nueva fila a suplentes y los lista 
 */
function actualizarEstado(){
    
     var estActual = estructuras[indiceActual];     
     cambioDeEstado = $('#dat_check').is(":checked");
     esSuplente = cambioDeEstado ? 1 : 0;
     $("#button_sup").prop("disabled", true);
     $.ajax({
        type: "POST",
        url: base_path + "/materialize/personasAcargo_c",
        data: {methodName: "save", indice: indiceActual, AUTORIZANTE: estActual.AUTORIZANTE, ID_ESTRUCTURA:estActual.ID_ESTRUCTURA, ID_TIPO_MOTIVO_AUTORIZANTE: estActual.ID_TIPO_MOTIVO_AUTORIZANTE, ID_TITULAR:estActual.ID_TITULAR,  ID_SUPLENTE: estActual.ID_SUPLENTE, SUPLENTE_ACTIVO: esSuplente},
        dataType: "json",
        success: function (response) {
            $("#button_sup").prop("disabled", true);
            alert(response.mensaje);
            setInfoSuplentes(response.datos_suplentes);
        }
    });
}