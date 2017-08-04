/**
 * 
 * @change - si el usuario logueado no es autorizante el 3er check debe estar deshabilitado
 */


$containerPreferencias = $("#containerPreferencias");
var cambioDeEstado_check_correo;
var cambioDeEstado_check_novedades;
var cambioDeEstado_check_solicitudes;
var cambioDeEstado_correo;

// variables que van a almecenar los valores iniciales de los check por si se reinicia la configuracion
var checkMail;
var checkNov;
var checkSol;

$(document).ready(function () {
    getInfoInicial();

});

function getInfoInicial() {
    
   
    $.ajax({
        type: "POST",
        url: "preferencias_c.php",
        data: {
            methodName: "init"
        },
        dataType: "json",
        success: function (response) {

            if (response.datos_preferencias.length == 0){
                if (response.es_autorizante == 0) {
                    $("input[name='solicitudes']", $containerPreferencias).prop('disabled', true);
                    $("#dat_check_solicitudes", $containerPreferencias).prop('disabled', true);
                }
                alert("usuario sin mails asignados");
            }else{
                    setearCheck(response);
            
          }//else
        }
    });
}

function setearCheck(response){
           
            
            var es_autorizante = response.es_autorizante;
            //me quedo con los correos
            var mail = response.datos_preferencias[0].CORREOMISC;
            var novedades = response.datos_preferencias[0].CORREOSOLICLIC;
            var solicitudes = response.datos_preferencias[0].CORREOAUTORIZANTE;
            //me quedo con los valores de los check
            checkMail = (response.datos_preferencias[0].CORREOMISCSN == 0)? false : true;
            checkNov = (response.datos_preferencias[0].CORREOSOLICLICSN == 0 )? false : true;
            checkSol = (response.datos_preferencias[0].CORREOAUTORIZANTESN == 0)? false : true;
            //se asignan los valores de la bbdd
            $("input[name='correo']", $containerPreferencias).val(mail);
            $("input[name='novedades']", $containerPreferencias).val(novedades);
            $("input[name='solicitudes']", $containerPreferencias).val(solicitudes);
            
            
            $("#dat_check_correo").prop('checked', checkMail);
            $("#dat_check_novedades").prop('checked', checkNov);
            $("#dat_check_solicitudes").prop('checked', checkSol);

            
            //si no es autorizante deshabilito el check y el input del solicitante
            if (es_autorizante == 0) {
                $("input[name='solicitudes']", $containerPreferencias).prop('disabled', true);
                $("#dat_check_solicitudes", $containerPreferencias).prop('disabled', true);
            }
}

function save() {
      

     cambioDeEstado_check_correo = $('#dat_check_correo').is(":checked");
     check_correo = (cambioDeEstado_check_correo) ?  1 : 0;    
     cambioDeEstado_check_novedades = $('#dat_check_novedades').is(":checked");
     check_novedades = (cambioDeEstado_check_novedades) ? 1 : 0;
     cambioDeEstado_check_solicitudes = $('#dat_check_solicitudes').is(":checked");
     check_solicitudes = (cambioDeEstado_check_solicitudes)? 1 : 0;
     
     cambioDeEstado_correo = $("input[name='correo']", $containerPreferencias).val();
     cambioDeEstado_novedades = $("input[name='novedades']", $containerPreferencias).val();
     cambioDeEstado_solicitudes = $("input[name='solicitudes']", $containerPreferencias).val();
      $.ajax({
        type: "POST",
        url: "preferencias_c.php",
        data: {methodName: "save", p_correomiscsn:check_correo, p_correomisc:cambioDeEstado_correo, p_correosoliclicsn:check_novedades, p_correosoliclic:cambioDeEstado_novedades, p_correoautorizantesn:check_solicitudes, p_autorizante:cambioDeEstado_solicitudes },
        success: function (response) {
            alert(response);
                      
        }       
    });
            
 

}

function reiniciar() {
    
     // si hubo cambios en los check -> me quedo con esos valores

     $.ajax({
        type: "POST",
        url: "preferencias_c.php",
        data: {methodName: "reiniciar"},
        success: function (response) {
           
            alert(response);
            location.reload();
           
        }
        
    });


}

