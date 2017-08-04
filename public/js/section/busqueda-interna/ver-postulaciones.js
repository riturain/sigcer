/**
 *Name:    ver-postulaciones.js
 *Version: 1.0
 *Fecha  : OCT 25, 2016.
 *Detalle: 
 */

$(document).ready( function() {	
	
	//declaramos el datatable
	$('#tablaPostulaciones').DataTable(
		{
		"aoColumns": [
			{"bSortable": false},
            {"bSearchable": true},
            {"bSearchable": true},
            {"bSearchable": true},
            {"bSearchable": true},
            //{"bSearchable": true},
            {"bSortable": false}
                        ],
            "oLanguage": {
            	"sZeroRecords": "No hay registros para mostrar",
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
		}
	);
});

//marcado de postulacion
function marcar(elemento){
	var path= 'localhost/portal.mvc/' || base_path;
	var valorAnterior = elemento.getAttribute("value");//checkbox
	var valorNuevo;
	if(valorAnterior==0){ valorNuevo = 1 }else{ valorNuevo=0 }
	var idPostulacion = elemento.getAttribute('data-id');
	var fila = document.getElementById(idPostulacion); 
	var parametros = { accion: 'marcar', idPostulacion: idPostulacion, valor: valorNuevo };
	$.ajax({
		data: parametros,
		type: 'POST',
		dataType: 'json',
		url: path + 'busquedas-internas/ver-postulaciones',
		success: function(datos, textStatus, xhr){
			var badge = $('#preseleccionado');
			if(datos==1){
				if(valorNuevo==0){
					fila.setAttribute('class', '');
					elemento.setAttribute('checked', '');
					elemento.setAttribute('value', 0);
					badge.attr('style', 'display: none;');
					badge.html('');
				}else{
					fila.setAttribute('class', 'checked');
					elemento.setAttribute('checked', 'checked');
					elemento.setAttribute('value', 1);
					badge.attr('style', 'display: block;');
					badge.html('Preseleccionado');
				}
			}
		},
		error: function(pedido, stado, error){
			console.log('ERROR', JSON.stringify(pedido));
		}
	});
	
};