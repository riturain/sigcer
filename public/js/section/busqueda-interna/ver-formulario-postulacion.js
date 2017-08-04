/**
 *Name:    ver-formulario-postulacion.js
 *Version: 1.0
 *Fecha  : OCT 25, 2016.
 *Detalle: Script para manejo de validaciones del formulario
 */


$(document).ready( function() {	

	//transformamos los select en chosen
	$('.chosen-single').chosen();
	
	//validacion del formulario
	$("#form-postulacion-busqueda-interna").validate();
	
	//validacion y mensaje de los campos requeridos
	$( "#dat_tareas" ).rules( "add", {
		  required: true,
		  messages: {
		    required: "Ingrese las Principales Tareas de su Puesto"
		  }
		});
});

