/**
 * notificaciones BI
 *
 * Funcionalidad para mostrar notificaciones en el menú de Busquedas Internas
 * Descripción: Verifica cada un intervalo de tiempo especificado si hay nuevas solicitudes pendientes (No Leidas = 1)
 *
 */

 var notificacionesBI = function() {

    var elementNotificationId = 'aprobar-solicitudes-de-búsqueda';
    var notificacionTag   = jQuery("<span>", { "css" : { "margin" : "1px 5px 0 5px" }, "class" : "media" });
    var notificacionTag_2 = jQuery("<a>", { "id": "notif", "css": {"display" : "inline", "background": "transparent" }, "class": "pull-left has-notif", "title": "Tiene solicitudes pendientes" }).appendTo(notificacionTag);
    var notificacionTag_3 = jQuery("<i>", { "class": "online" }).appendTo(notificacionTag_2);
    var params = { accion: "nuevas-solicitudes-pendientes", ignoreloading: "true"  };

    jQuery(notificacionTag).insertBefore('#' + elementNotificationId + ' a span.glyphicon.glyphicon-chevron-left');
    jQuery('.media').hide();

    return {
        init : function() {
             _consultarSobreNuevasSolicitudes(params);
        }
    };

 }();

/**
 * _consultarSobreNuevasSolicitudes BI
 *
 * Descripción:
 * Funcionalidad que busca nuevas solicitudes cargadas para su aprobación
 *
 */
 var _consultarSobreNuevasSolicitudes = function(params) {

    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: base_path + "/busqueda-interna/aprobar-solicitudes",
        data: params,
        success: function (data, textStatus, xhr) {
            if (textStatus == 'success') {
                //console.log('chequeando nuevas solicitudes...'+parseInt(data));
                if (parseInt(data) > 0) {

                    var numElemNoLeidos = jQuery('[data-mark="PENDIENTE"]').size();
                    if( (jQuery("#tabla_aprobar_solicitudes").length) && (parseInt(data) > numElemNoLeidos) ) {
                        location.reload();
                    }

                    $('#busquedas-internas-item ul').css('display', 'block');
                    $("#notif").attr({title: "Tiene (" + data + ") solicitudes pendientes "});
                    jQuery('.media').show();

                } else {
                    jQuery('.media').hide();
                }
            }
        },
        error: function (request, status, error) {
            //console.log("ERROR: " + JSON.stringify(request));
        }
    });
 }


 jQuery(document).ready(function() {

     const TIEMPO_ESTIMADO_CONSULTA = 20000;
     notificacionesBI.init();
     setInterval(function () {
         notificacionesBI.init();
     }, TIEMPO_ESTIMADO_CONSULTA);

 });
