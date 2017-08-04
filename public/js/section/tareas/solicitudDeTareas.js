
var $containerResponsables = $("#containerResponsables");
var $containerModal = $("#modalSolicitud");
var $tablaResponsables;
var responsableslicCom;
var responsablesrarap;
var indiceActual;
var projects = "";
$(document).ready(function () {
    getInfoInicial(false);
});


function getInfoInicial(resaltar, resaltarFilaIndice) {
    console.log(base_path + '/tareas/solicitudDeTareas_c');
    console.log("base_path + '/tareas/solicitudDeTareas_c'");
    $.ajax({
        type: "POST",
        url: "/tareas/solicitudDeTareas_c.php",
//        url: base_path + '/tareas/solicitudDeTareas_c',
        data: {methodName: "getInfoInicial"},
        dataType: "json",
        error:function(response, status, error) {console.log(response);},        
        success: function (response) {
            alert("response de getInfoInicial");
//            response = $.parseJSON(response);
            console.log(response);
            solicitudes = response.solicitudes;
            console.log(solicitudes);
            esDir = response.esDirector;
            console.log(esDir);
            response.esDirector;
            alert("esta por ir a populate");
            
            populateGrilla(solicitudes, response.esDirector);
            if (resaltar) {
                resaltarFila(resaltarFilaIndice);
            }
        }
           
    });
}

function resaltarFila(indice) {
    var $fila = $("tr:nth-child(" + indice + ")", $("#grillaSolicitudes tbody"));
    var colorOriginal = $fila.css("background-color");
    $fila.stop(true, true).animate(
            {backgroundColor: "#FFFF96"}, 1200,
            function () {
                setTimeout(function () {
                    $fila.stop(true, true).animate({backgroundColor: colorOriginal}, 1200);
                }, 1500);
            }
    );
}

function populateGrilla(solicitudes, esDirector) {
    alert('entra a solicitudes');
    console.log(solicitudes);
    console.log('cant de sol>>>' + solicitudes.length);
    console.log(solicitudes[1].FECHA);
    if (solicitudes.length >= 0) {
        var tbody = $("#grillaSolicitudes tbody");
        tbody.html("");
        var content = "";
        var cantTotal = solicitudes.length;
        for (i = 0; i < cantTotal; i++) {
            content += '<tr>';
            content += '<td>' + solicitudes[i].FECHA + '</td>';
            content += '<td>' + solicitudes[i].NRO + '</td>';
            content += '<td align="left">' + solicitudes[i].TIT_DESCR + '</td>';
            if (!esDirector) {
                content += '<td align="left">' + solicitudes[i].SOLIC + '</td>';
            }
            content += '<td align="left">' + solicitudes[i].RESP + '</td>';
            content += '<td>' + solicitudes[i].ESTADO + '</td>';
            content += '<td>';
            if (esDirector) {
                content += armarComboPrioridad(cantTotal, i + 1);
            } else {
                content += solicitudes[i].PRIORIDAD;
            }
            content += '</td>';
            content += '<td><a class="btn" href="javascript:showEditar(' + solicitudes[i].NRO + ', ' + (i + 1) + ');">Editar</a></td>';
            content += '</tr>';
        }
        content += '<td><a class="btn">Asignar tarea a nombre de:</a></td>';
        console.log(content);
        tbody.append(content);
    }
}

function armarComboPrioridad(cantTotal, indice) {
    var select = "<select onchange=cambiarPrioridad(" + indice + ",this.value)>";
    for (var i = 1; i < cantTotal + 1; i++) {
        select += "<option value='" + i + "' " + (indice == i ? "selected" : "") + ">" + i + "</option>";
    }
    select += "</select>";
    return select;
}

function cambiarPrioridad(actual, destino) {
    $.ajax({
        type: "POST",
        url: "solicitudDeTareas_c.php",
        data: {methodName: "cambiarPrioridad", actual: actual, destino: destino},
        dataType: "json",
        success: function (response) {

            if (response.success) {
                getInfoInicial(true, destino);
            }
        }
    });
}

$containerModal.dialog({
    autoOpen: false,
    height: 320,
    width: 500,
    modal: true,
    overflow: true,
});

function showAlta() {
    $(".ui-dialog .ui-dialog-title").html("Nueva Solicitud de Tarea");
    $containerModal.html("Cargando y cargando..");
    $.ajax({
        type: "POST",
        url: "solicitudDeTareas_c.php",
        data: {methodName: "getFormAlta"},
        success: function (response) {
//            console.log(response);
            $containerModal.html(response);
//            setAutocomplete();
        }
    });
    $containerModal.dialog("open");
}

function setAutocomplete() {
    /* plugin: custom data and display
     * ajax para buscar la lista
     y en el success(rsponse) {
        var projects = response.empleados;
        e instancia el autocom..
     }
     */
    $.ajax({
        type: "POST",
        url: "solicitudDeTareas_c.php",
        data: {methodName: "getResponsables"},

        success: function (response) {
            
//            console.log("estos son los datos del response para autocompletar");
            projects = $.parseJSON(response);
            console.log(projects);
            $("#project").autocomplete({
                minLength: 0,
                source: projects,
                focus: function (event, ui) {
                    $("#project").val(ui.item.nombre);
                    return false;
                },
                select: function (event, ui) {
                    $("#project").val(ui.item.nombre);
                    $("#project-id").val(ui.item.id);


                    return false;
        }
        
    })
//     .autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
                .append(item.nombre)
                .appendTo(ul);
//    };
       }
    });

//    $("#project").autocomplete({
//        minLength: 0,
//        source: projects,
//        focus: function (event, ui) {
//            $("#project").val(ui.item.nombre);
//            return false;
//        },
//        select: function (event, ui) {
//            $("#project").val(ui.item.nombre);
//            $("#project-id").val(ui.item.id);
//
//
//            return false;
//        }
//        
//    })
//    .autocomplete("instance")._renderItem = function (ul, item) {
//        return $("<li>")
//                .append(item.nombre)
//                .appendTo(ul);
//    };
    
}

var indiceFilaEdicion;
//id es la solicitud
function showEditar(id, indice) {
//    console.log('este es el id');
//    console.log(id);
//    console.log('y este es el indice');
//    console.log(indice);
    
    $(".ui-dialog .ui-dialog-title").html("Editar Solicitud");
    indiceFilaEdicion = indice;
    $containerModal.empty();
    var XHR = $.ajax({
        type: "POST",
        url: "solicitudDeTareas_c.php",
        data: {methodName: "getFormEdicion", id: id},
        beforeSend: function () {
            $containerModal.html("Cargando..");
        }
    });
    XHR.done(function (response) {
        $containerModal.empty();
        $containerModal.html(response);
    });
    $containerModal.dialog("open");
}

function cerrarModal() {
    $containerModal.dialog("close");
}

function guardarAlta() {
    
    $("#modalError").empty();
    if ($.trim($("input[name=titulo]", $containerModal).val()) === "") {
        $("#modalError").html("- Debe ingresar un titulo");
        return;
    }
    if ($("select[name=responsable] option:selected", $containerModal).val() === "") {
        $("#modalError").html("- Debe ingresar un responsable para la solicitud");
        return;
    }

        
    $.ajax({
        type: "POST",
        url: "solicitudDeTareas_c.php",
        data: $("form", $containerModal).serialize(),
//        datatype:"json",
        success: function (response) {           
            response = $.parseJSON(response);
//            console.log(response);
            
            
            if (response.success) {
                console.log($("form", $containerModal).serialize());
                $containerModal.dialog("close");
                var indice = $("#grillaSolicitudes tbody tr").length + 1;
                getInfoInicial(true, indice);
            }
        }
    });

}

function editarSolicitud() {
//    console.log('entra al editarsolicitud');
    $("#modalError").empty();
    if ($.trim($("input[name=titulo]", $containerModal).val()) === "") {
        $("#modalError").html("- Debe ingresar un titulo");
        return;
    }
    if ($("select[name=responsable] option:selected", $containerModal).val() === "") {
        $("#modalError").html("- Debe ingresar un responsable para la solicitud");
        return;
    }

//    console.log('entra al ajax');
    $.ajax({
        type: "POST",
        url: "solicitudDeTareas_c.php",
        data: $("form", $containerModal).serialize(),
        dataType: "json",
        success: function (response) {
            
//           response = $.parseJSON(response);
//            console.log('serialize');
//            console.log($("form", $containerModal).serialize());
//            console.log(response);
//            console.log('#form_id');
            if (response.success) {
                $containerModal.dialog("close");
                getInfoInicial(true, indiceFilaEdicion);
            }
        }
    });


}

