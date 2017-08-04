/**
 * js de misResponsables
 */

var $containerResponsables = $("#containerResponsables");
var $containerEstructura = $("#containerEstructura");
var $tablaResponsables;
var responsableslicCom;
var responsablesrarap;
var indiceActual;
$(document).ready(function () {
//   $(".dat_Desde").mask("99-99-9999");
//   $btnPrev.prop('disabled', true);
   getInfoInicial();
   initDatatable();
//   $("#button_sup").prop("disabled", true);
//   onChangeChecked();
});


function getInfoInicial(){
    console.log("entra al ajax");
    $.ajax({
        type: "POST",
        url:  "/test_misResponsables",
        data: {methodName: "initResponsables"},
        dataType: "json",
        success: function (response) {
//            var response = $.parseJSON(responsee);
        
            console.log(response);
            console.log("valor de licCom");
            responsableslicCom = response.datos_LicCom;
            console.log(responsableslicCom);
//            console.log("longituddd".responsableslicCom.length);
            
            responsablesrarap = response.datos_RaRap;
            console.log(responsableslicCom);
//            console.log("longituddd".responsablesrarap.length);
                        
                 
            estructura = response.estructura
            console.log(response);

            
            apyn = response.apyn
            if (apyn != ' ')
                $("input[name='nombre']", $containerEstructura).val(apyn);
                else $("input[name='nombre']", $containerEstructura).val("sin nombre asignado");
                
            $("input[name='doc']", $containerEstructura).val(response.dni);
            if (estructura != ' ')
                $("input[name='estructura']", $containerEstructura).val(response.estructura);
                else $("input[name='estructura']", $containerEstructura).val("sin estructura asignada");
            if (responsableslicCom.length > 0) {
                for (i = 0; i < responsableslicCom.length; i++){
                    console.log("responsableslicCom[i].SUPLENTE_ACTIVO");
                    console.log(responsableslicCom[i].SUPLENTE_ACTIVO);
                    if (responsableslicCom[i].SUPLENTE_ACTIVO == 1) {

//                          check =  '<input type=\"checkbox\" value=\"1\" checked class=/>';
                          check =  '<input type=\"checkbox\" class=\"inputck\" checked disabled readonly/>';

                    } else
                          check =  '<input type=\"checkbox\" class=\"inputck\" disabled readonly/>';

//            check = '<input type=\"checkbox\" ' + (value.SUPLENTE_ACTIVO == 1 ? "checked" : "") + '" disabled readonly />';
            
                    fila = [responsableslicCom[i].TIPO_MOTIVO, responsableslicCom[i].TITULAR, responsableslicCom[i].SUPLENTE, check];
                    $tablaResponsables.fnAddData(fila);
                }
            }else {
                console.log("entro por rarap");
//                responsablesrarap[0].SUPLENTE_ACTIVO;
                for (i = 0; i < responsablesrarap.length; i++) {
                    
                     if (responsablesrarap[i].SUPLENTE_ACTIVO == 0) {
                        check =  '<input type=\"checkbox\" class=\"inputck\" checked disabled readonly/>';
                    } else
                        check =  '<input type=\"checkbox\" class=\"inputck\" disabled readonly/>';
                    fila = [responsablesrarap[i].TIPO_MOTIVO, responsablesrarap[i].TITULAR, responsablesrarap[i].SUPLENTE,check];
                    $tablaResponsables.fnAddData(fila);
                }
            }
        }
    })
     .done(function( data, textStatus, jqXHR ) {
     if ( console && console.log ) {
         console.log( "La solicitud se ha completado correctamente." );
     }
      })
     .fail(function( jqXHR, textStatus, errorThrown ) {
     if ( console && console.log ) {
         console.log( "La solicitud a fallado: " +  textStatus);
     }
    })
}

function initDatatable(){
     $tablaResponsables = $("table", $containerResponsables).dataTable({
        "iDisplayLength": 5,
        "aoColumns": [
            {"bSearchable": false},
            {"bSearchable": false},
            {"bSearchable": false},
            {"bSearchable": false}
//            {"bSearchable": false}
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
        "columns": [{data: "Suplente_activo",
                render: function (data, type, row) {
//                    if (type === 'display') {
                        return '<input type="checkbox" class="editor-active">';
//                    }
                    return data;
                },
                className: "dt-body-center"
//                className: "containerResponsables"
            }
        ]
    });
}


    
