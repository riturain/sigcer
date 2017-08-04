/**
 *Name:    solicitud-busqueda-interna.js
 *Version: 1.0
 *Fecha  : OCT 25, 2016.
 *Detalle: Script para manejo de validaciones del formulario
 */

 var $tipoAccion = $('#id_busqueda_interna').val();

 var borrarSolicitud = function() {

    $('#borrarSolicitudButton').attr('disabled', 'disabled').addClass('disabledItemStyle');
    $('[data-id*="idSolicitud"]').click(function () {

        var checkedItems = eachCheckedSolicitud();
        (checkedItems.length>0)
            ? $('#borrarSolicitudButton').removeAttr('disabled').removeClass('disabledItemStyle')
            : $('#borrarSolicitudButton').attr('disabled', 'disabled').addClass('disabledItemStyle');
    })

    //Evento de clickear el boton de borrar solicitudess
    $('#borrarSolicitudButton').click(function () {

        //Recupero items checkeados
        var checkedItems = eachCheckedSolicitud();
        if (checkedItems.length>0){

            var opcionBorrar = confirm("Esta por borrar las solicitudes, desea continuar?");
            if (opcionBorrar == true) {

                var params = {
                    action:"borrar-solicitudes",
                    listaIdSolicitudes: checkedItems,
                };

                jQuery.ajax({
                    type: "POST",
                    dataType:"json",
                    url: base_path +"/busqueda-interna/ver-mis-solicitudes",
                    data: params,
                    success: function(data, textStatus, xhr) {
                        if (textStatus == 'success') {
                            jQuery.each(checkedItems, function(key, value) {
                                jQuery('#solicitud-'+value).remove();
                            });

                            /*  var msgBorrar = jQuery("<div>",
                                {
                                    "id": "aviso",
                                    "class": "ok",
                                    "text": "La solicitud fue borrada exitosamente"
                                }
                            ).insertBefore('#ver-mis-solicitudes');
                            var btnBorrar = jQuery("<button>",
                                {
                                    "class": "buttonAviso",
                                    "text": "x",
                                    "onClick": "cerrarAviso();return false;"
                                }
                             ).appendTo(msgBorrar);*/

                        }
                    },
                    error: function (request, status, error) {
                        console.log("ERROR: " + JSON.stringify(request));
                    }
                });

            }
        }
    })
}

var eachCheckedSolicitud = function() {
    var checkedSolicitudesList = []
    var checked = jQuery("table#solicitudesTable input[type=checkbox]:checked").each(function( ) {
        var solicitudValue = jQuery(this).val();
        checkedSolicitudesList.push(solicitudValue);
    });
    return checkedSolicitudesList;
}

$('#denominacion_puesto').change(function () {

    $('.chosen-single').css('border', '');
    $('#denominacion_puesto_msg').css('border', '');
    var denominacionPuestoSeleccionado = $('#denominacion_puesto');
    var denominacion_puesto = denominacionPuestoSeleccionado.val();
    $('#errorDenominacionPuestoSolicitado').hide();

    if (denominacion_puesto == '') {
        $('.chosen-single').css('border', '1px dotted red');
        $('#errorDenominacionPuestoSolicitado').show();
        $('#denominacion_puesto_msg').css('color', 'red').css('font-style', 'italic');
        $('#denominacion_puesto_msg').show();
    }

});

//Limpiamos la validacion luego de haber seleccionado alguna tipo de solicitud
$("form input[id='postulacion_interna']:radio").change(function () {

    var input = jQuery("form input[id='postulacion_interna']:radio")
        .parent('span')
        .css('border', '');
    $('#postulacion_error_msg').text('');
 });

 //Limpiamos la validacion luego de haber seleccionado cantidad de vacantes
 $("form input[name='cantidad_vacantes']:radio").change(function () {

    var input = jQuery("form input[name='cantidad_vacantes']:radio")
        .parent('span')
        .css('border', '');
 });

 var validarOtrosCampos = function() {

    //Estilos para radios tipo de postulacion
    var checkedSolicitudesList = []
    var checked = jQuery("form input[id='postulacion_interna']:checked").each(function () {
        var solicitudValue = jQuery(this).val();
        checkedSolicitudesList.push(solicitudValue);
    });

    if (checkedSolicitudesList.length == 0) {

        var input = jQuery("form input[id='postulacion_interna']:radio")
            .wrap("<span></span>")
            .parent()
            .css({
                border: "1px red dotted",
                padding: "4px 0px 0px 3px"
            });
    }

    //Estilos para radios cantidad_vacantes
    var checkedCantidad_vacantes = []
    var checked = jQuery("form input[id='cantidad_vacantes']:checked").each(function () {
         var solicitudValue = jQuery(this).val();
         checkedCantidad_vacantes.push(solicitudValue);
    });

    if (checkedCantidad_vacantes.length == 0) {
         var input = jQuery("form input[name='cantidad_vacantes']:radio")
             .wrap("<span></span>")
             .parent()
             .css({
                 border: "1px red dotted",
                 padding: "4px 0px 0px 3px"
             });
    }


    $('.chosen-single').css('border', '');
    $('#denominacion_puesto_msg').css('border', '');
    var denominacionPuestoSeleccionado = $('#denominacion_puesto');
    var denominacion_puesto = denominacionPuestoSeleccionado.val();

    if (denominacion_puesto == '') {
        $('.chosen-single').css('border', '1px dotted red');
        $('#errorDenominacionPuestoSolicitado').show();
        $('#denominacion_puesto_msg').css('color', 'red').css('font-style', 'italic');
        $('#denominacion_puesto_msg').show();
        return false;
    }

};

 var solicitudBusquedaInterna = function() {

    /**
     * Validacion del formulario
     */
    var validateFormEvents = function() {

        $("#form-solicitud-busqueda-interna").validate({
            rules: {
                postulacion_interna: {
                    required: true,
                },
                denominacion_puesto: {
                    required: true
                },
                cantidad_vacantes: {
                    required: true
                },
                id_motivo_busqueda_interna: {
                    required: true
                },
                tareas_principales: {
                    required: true
                },
                areas_internas: {
                    required: true
                },
                diasVigencia: {
                    required: true
                },
                instituciones_externas: {
                    required: true
                },
                recursos: {
                    required: true
                },
                conocimientos: {
                    required: true
                },
                habilidades: {
                    required: true
                },
                experiencia_laboral: {
                    required: true,
                },
                id_nivel_educativo: {
                    required: true
                },
                personas_a_cargo: {
                    required: true
                },
                lugar_trabajo: {
                    required: true
                },
                horario_trabajo_desde: {
                    required: true
                },
                horario_trabajo_hasta: {
                    required: true
                },
                tipo_pase_reubicacion: {
                    required: true
                }
            },
            messages: {
                postulacion_interna: "Indique Tipo de Solicitud a realizar",
                id_motivo_busqueda_interna: "Seleccione el motivo de la búsqueda",
                cantidad_vacantes: "Indique la cantidad de vacantes disponibles",
                denominacion_puesto: {
                    required: "Ingrese la Denominación del Puesto"
                },
                diasVigencia : "Seleccione la visibilidad de la solicitud",
                experiencia_laboral: "Indique la experiencia laboral requerida",
                id_nivel_educativo: "Indique el nivel educativo requerido",
                personas_a_cargo: "Indique si tendrá personas a cargo",
                lugar_trabajo: "Ingrese el lugar de trabajo",
                horario_trabajo_desde: "Complete el campo horario desde",
                horario_trabajo_hasta: "Complete el campo horario hasta",
                tipo_pase_reubicacion: "Indique el tipo de pase/traslado que a efectuar",
                tareas_principales: "Especifique que responsabilidades y a tareas cumplir",
                tareas_complementarias: "Debe completar este campo",
                areas_internas: "Debe completar este campo",
                instituciones_externas: "Debe completar este campo",
                recursos: "Debe completar este campo",
                conocimientos: "Ingrese los conocimientos requeridos",
                habilidades: "Ingrese las habilidades necesarias y requeridas"
            },
            submitHandler: function (form) {
                var apyn_autorizante = $('#apyn_autorizante').val();
                form.submit();
            }
        });

        validarOtrosCampos();

    }
    /**
     * Init
     */
    return {
        init : function() {
            if ($('#id_busqueda_interna').length) {

                //Configuracion widget suggest/combobox
                $("#denominacion_puesto").chosen({
                    max_selected_options: 5,
                    no_results_text: "No se encontraron coincidencias",
                    width: "354px"
                });

                if ($('#enviarSolicitud').click(function () {
                    validateFormEvents();
                }));
            }
            borrarSolicitud();
        }
    };

}();

$(document).ready(function() {

    //Inicializar
    solicitudBusquedaInterna.init();
    
    //Inicializar listado de solicitudes como datatable
    if(document.getElementById('solicitudesTable')!= null){
    	 var solicitudesTable = $('#solicitudesTable').DataTable({
 			"aoColumns": [
 				{"bSortable": false},
 	            {"bSearchable": true},//6 cols // 1 y 6 false
                 {"bSortable": false},
                 {"sType": "date-ddmmyy"},
 	            {"bSearchable": true},
 	            {"bSearchable": true},
 	            {"bSortable": false},
                 {"bSortable": false}
             ],
             columnDefs: [
                 { type: 'date-ddmmyyyy', targets: [ 3 ] }
             ],
 	            "oLanguage": {
 	                "sZeroRecords": "No se encuentran Solicitudes propias para mostrar.",
 	                "sLengthMenu": "Mostrar _MENU_ registros",
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
                 "fnRowCallback": function( row, data, index ) {
                      $(row).removeClass('odd');
                      $(row).removeClass('even');
                     }
         });
    	 //Orden por default
    	 solicitudesTable.fnSort([[3, 'desc']]);
    }   
   
});
