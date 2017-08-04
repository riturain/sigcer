/**
 *Name:    ver-busquedas.js
 *Version: 1.0
 *Fecha  : OCT 25, 2016.
 *Detalle: Script para confirmacion de borrado de una postulacion
 */

$(document).ready(function() {
	//declaramos el datatable
	$('#tablaMisPostulaciones').DataTable(
		{
			"aoColumns": [
	            {"bSearchable": true},
	            {"bSearchable": true},
	            {"bSearchable": true},
	            {"bSearchable": true},
	            {"bSearchable": true},
	            {"bSortable": false},
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
	// Interceptamos el evento submit
    $('form').submit(function() {
    	var res = confirm('¿Desea borrar la postulación para la búsqueda?');
    	if(res == true){
    		 // Enviamos el formulario usando AJAX
    		 console.log($(this).serialize());
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                // Mostramos un mensaje con la respuesta de PHP
                /*success: function(data) {
                	$('#msj').attr('id', 'aviso');
                	$('#aviso').attr('class', 'ok');
                	$('#aviso').attr('align', 'left');
                	$('#aviso').html(data);
                	$('#aviso').show();
                }*/
            })          
    	}else{
    		return false;
    	}   
    }); 
})
