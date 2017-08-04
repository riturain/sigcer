$(document).ready(function() {

	//inicialización de data table
    var aprobarSolicitudes = $('#tabla_aprobar_solicitudes').dataTable({
        "aoColumns": [
            {"bSearchable": true},
            {"sType": "date-ddmmyy"},
            {"bSearchable": true},
            {"bSearchable": true},
            {"bSearchable": true},
            {"bSortable": true},
            {"bSortable": false}
        ],
        columnDefs: [
            { type: 'date-ddmmyyyy', targets: [ 1 ] }
        ],
        "oLanguage": {
            "sZeroRecords": "No hay Solicitudes para aprobar",
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
        "fnRowCallback": function( row ) {
            $(row).removeClass('odd');
            $(row).removeClass('even');
        }
    });

    //Orden por default
    aprobarSolicitudes.fnSort([[1,'desc']]);

    //Visualizamos como no leíada la solicitud
    jQuery('[data-mark="PENDIENTE"]').css('font-weight', 'bold');

});

/*
 Accion para marcar como leída una solicitud
 pero se ejecuta la llamada solo si el estado es PENDIENTE
 */
$('.link-modal').click(function () {

    var idSolicitud = $(this).attr('data-id');
    var estadoSolicitud = $(this).attr('data-estado');

    if (estadoSolicitud == "PENDIENTE") {
        var params = {
            accion: "leida",
            id_busqueda_interna: idSolicitud,
        };

        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: base_path + "/busqueda-interna/aprobar-solicitudes",
            data: params,
            success: function (data, textStatus, xhr) {
                if (textStatus == 'success') {

                    if (data['out'][0] == 1) {
                        // Visualizamos como leíada la solicitud
                        $('#solicitud-' + idSolicitud).css('font-weight', 'normal');
                        $('#solicitud-' + idSolicitud).attr('data-mark', 'PENDIENTE_LEIDA');
                    }

                    var numElemNoLeidos = jQuery('[data-mark="PENDIENTE"]').size();
                    if (numElemNoLeidos == 0) {
                        jQuery('.media').hide();
                    }

                }
            },
            error: function (request, status, error) {
                console.log("ERROR: " + JSON.stringify(request));
            }
        });
    }
});



