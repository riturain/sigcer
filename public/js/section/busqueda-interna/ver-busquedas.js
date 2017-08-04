/**
 *Name:    ver-busquedas.js
 *Version: 2.0
 *Fecha  : FEB 14, 2016.
 *Descripcion: Vista de las busquedas disponibles / solicitads
 *Se cambió la vista de las Ofertas/Busquedas para darle un aspecto diferente implementándo
 *  la librería listJs para para realizar acciones como fltros, búsquedas, etc, orden sobre el html.
 *
 */
 $(document).ready( function() {

     //declaramos el datatable
     $('#tablaBusquedas').DataTable(
         {
             "aoColumns": [
                 {"bSortable": true},
                 {"bSearchable": true},
                 {"bSearchable": true},
                 {"bSearchable": true},
                 {"bSortable": false},
                 {"bSortable": false}
             ],
             "oLanguage": {
                 "sZeroRecords": "no hay registros",
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

     //listJs
     var options = {
         valueNames: [ 'puesto', 'fecha', 'organismo' ],
         page: 9,
         pagination: true
     };
     var solicitudesList = new List('solicitudes', options);

 });

