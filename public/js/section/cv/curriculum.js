/**
 *Name: curriculum.js
 *Version: 1.0
 *Detalle: Script para guardar las diferentes secciones del curriculum.

 *function guardarExperiencia() 		 -> levanta los datos del formulario, valida y manda por ajax a curriculum para agregar una experiencia 

 *function guardarIdioma()		 		 -> levanta los datos del formulario, valida y manda por ajax a curriculum para agregar un idioma 
	
 *function guardarEducacion() 			 -> levanta los datos del formulario, valida y manda por ajax a curriculum para agregar una educación 

 *function guardarCurso() 				 ->	levanta los datos del formulario, valida y manda por ajax a curriculum para agregar un curso

 *function guardarAptitudConocimiento()  ->	levanta los datos del formulario, valida y manda por ajax a curriculum para agregar un aptitud o conocimiento 
 
 *function eliminarElementoCurriculum(idEliminar, funcion, idElemento) -> mandar por ajax a curriculum el id del elemento a eliminar, la funcion que utiliza para eliminarlo, y el idElemento a eliminar del html. 
 */


$(document).ready(function(){

	//Deshabilita y habilita el input

	$("select[name=estadoEstudio]").change(function(){
       	if($("select[name=estadoEstudio]").val() == "CO"){
       		$('#matricula_profesional').removeAttr('disabled');
       		$('#fecha_fin_educacion').removeAttr('disabled');
       		
       	}
       	else{
       		$('#matricula_profesional').attr('disabled', true);
       		$('#fecha_fin_educacion').attr('disabled', true);
       		$('#matricula_profesional').val('');
       		$('#fecha_fin_educacion').val('');
       		
       	}
    
    });

	//Deshabilita y habilita el input

    $("select[name=instituciones]").change(function(){
    	if($("select[name=instituciones]").val() == 75){
       		$('#institucion').removeAttr('disabled');
       		
       	}
       	else{
       		$('#institucion').attr('disabled', true);
       		$('#institucion').val('');
       		
       	}
    
    });
    /* Acvita la cantidad de personas a cargo el input para llenar*/
    $("#personasCargo").change(function(){
	    	if($("#personasCargo").prop('checked')){
	       		$('#cant_pers_cargo').removeAttr('disabled');   		
	       	}
	       	else{
	       		$('#cant_pers_cargo').attr('disabled', true);
	       		$('#cant_pers_cargo').val('');
	       		
	       	}
    
    });
    /* Activa la fecha de fin*/
    $("#empleo_actual").change(function(){
	    	if($("#empleo_actual").prop('checked')){
	    		$('#fecha_fin').attr('disabled', true);
	       		$('#fecha_fin').val('');
	       	}
	       	else{
	       		$('#fecha_fin').removeAttr('disabled');   		
	       	}
    
    });
 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function guardarExperiencia() levanta los datos del formulario, valida y manda por ajax a curriculum para agregar una experiencia 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function guardarExperiencia(opcion){
	
	 //mando ajax
	 empresa = $('#empresa').val();
	 pais = $('#pais').val();
	 industria = $('#industria').val();
	 area = $('#areaTrabajo').val();
	 tipoPuesto = $('#tipoPuesto').val();
	 nivel_conocimiento = $('#nivel_conocimiento').val();
	 //PERSONAS A CARGO CHECK
	 personasCargo = 0;
	 if($('#personasCargo').prop( "checked" )){
	 	personasCargo = 1;
	 }
	 cant_pers_cargo = $('#cant_pers_cargo').val();

	 fechaUno = $('#fecha_inicio').val();
	 fechaDos = $('#fecha_fin').val();

	 actualmente = 0;
	 if(fechaDos == ''){
	 	actualmente = 1;
	 }
	 papers = $('#papers').val();
	 contacto = $('#contacto').val();
	 responsabilidades = $('#responsabilidades').val();
	 
	
	 //Se verifica que el valor del campo este vacio
	if (empresa.trim() == ''){
		alerta('Ingrese un lugar de trabajo', 'error');
		setInputInvalid('#empresa');
		return;
	}
	if (pais.trim() == ''){
		alerta('Seleccione el país de radicación', 'error');
		setInputInvalid('#pais');
		return;
	}
	if (industria == ''){ 
    	alerta('Seleccione un ramo o actividad ', 'error');
    	setInputInvalid('#industria');
    	return;
    }
    if (area == ''){
		alerta('Seleccione un área de estudio', 'error');
		setInputInvalid('#areaTrabajo');
		return;
	}
	if (tipoPuesto == ''){
		alerta('Seleccione la denominación del puesto', 'error');
		setInputInvalid('#tipoPuesto');
		return;
	}
	if (nivel_conocimiento == ''){
		alerta('Seleccione el nivel de conocimiento o jerarquía', 'error');
		setInputInvalid('#nivel_conocimiento');
		return;
	}
	if($('#personasCargo').prop( "checked" ) && cant_pers_cargo == ''){
	 	alerta('Ingrese la cantidad de personas a cargo', 'error');
	 	setInputInvalid('#cant_pers_cargo');
		return;
	 }

	if (fechaUno == ''){
		alerta('Ingrese una fecha de inicio', 'error');
		setInputInvalid('#fecha_inicio');
		return;
	}

    if(fechaDos != ''){
    	actualmente = 0;

    	if(fechaUnoMenorFechaDos(fechaDos, fechaUno)){
			alerta('La fecha de inicio debe ser anterior a la de fin', 'error');
			setInputInvalid('#fecha_fin');
			return;
		}
	}
	else{
		actualmente = 1;
	}

	if (responsabilidades.trim() == ''){
	 	alerta('Ingrese las tareas principales realizadas', 'error');
	 	setInputInvalid('#responsabilidades');
		return;
	 }
	
	loading();
	//Limpio el formulario
	limpiarFormulario("form_agregar_experiencia");

	//cierro el modal 
	$('#experiencia').modal('close');
	
	//envío la solicitud al servidor
	var XHR = $.ajax({
		url: "curriculum",
	    type: "POST",
	    data: {empresa : empresa, pais : pais, industria : industria, area : area, tipoPuesto : tipoPuesto, nivelConocimiento : nivel_conocimiento , personasCargo : personasCargo, cantPersonasCargo : cant_pers_cargo, fechaUno : fechaUno, fechaDos : fechaDos, actualmente : actualmente, papers : papers, responsabilidades : responsabilidades, contacto : contacto, accion :'guardarExperiencia', opcion:opcion}
	});
	XHR.done(function(data){		
		if(opcion != 'nuevo'){
			$("#experiencia_"+opcion).remove();	
		}	
		$("#experienciaActualizada").append(data);
		cerrarLoading();
		alerta('La acción fue realizada con éxito', 'done');
	});
	

}


//////////////////////////////////////////////////////////////////////////////////////////////////////
//function guardarIdioma(opcion) levanta los datos del formulario, valida y manda por ajax a curriculum para agregar un idioma 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function guardarIdioma(opcion){

	  //mando ajax
	 idioma = $('#idioma_select').val();
	 nivelOral = $('#nivelOral').val();
	 nivelEscrito = $('#nivelEscrito').val();
 	 //Se verifica que el valor del campo este vacio

    if (idioma.trim() == ''){
    	alerta('Seleccione un idioma', 'error');
    	setInputInvalid('#idioma_select');
    	return;
    }
    if (nivelOral.trim() == ''){
    	alerta('Seleccione un nivel oral', 'error');
    	setInputInvalid('#nivelOral');
    	return;
    }
   	if (nivelEscrito == ''){ 
    	alerta('Seleccione un nivel escrito', 'error');
    	setInputInvalid('#nivelEscrito');
    	return;
    }

    loading();
    //Limpio el formulario
    limpiarFormulario("form_agregar_idioma");

	$('#idioma').modal('close');

	//envío la solicitud al servidor 
    var XHR = $.ajax({
		url: "curriculum",
	    type: "POST",
	    data: {idioma:idioma, nivelOral:nivelOral, nivelEscrito:nivelEscrito, accion:'guardarIdioma', opcion:opcion }
	});
	XHR.done(function(data){		
		if(opcion != 'nuevo'){
			$("#idioma_"+opcion).remove();	
		}	
		$("#idiomaActualizado").append(data);
		cerrarLoading();
		alerta('La accion fue realizada con exito', 'done');

	});


}


//////////////////////////////////////////////////////////////////////////////////////////////////////
//function guardarEducacion(opcion) levanta los datos del formulario, valida y manda por ajax a curriculum para agregar una educación 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function guardarEducacion(opcion){
	  //mando ajax
	 titulo = $('#titulo').val();
	 instituciones = $('#instituciones').val();
	 institucion = $('#institucion').val();
	 areaEstudio = $('#areaEstudio').val();
	 nivelEstudio = $('#nivelEstudio').val();
	 estadoEstudio = $('#estadoEstudio').val();
	 fechaUno = $('#fecha_inicio_educacion').val();
	 fechaDos = $('#fecha_fin_educacion').val();
	 matricula = $('#matricula_profesional').val();
	 promedio = $('#promedio').val();
	 cant_materias = $('#cant_materias').val();
	 cant_aprobadas = $('#cant_aprobadas').val();

	 actualmente = 0;
	 if($('#actualmenteEducacion').prop( "checked" )){
	 	actualmente = 1;
	 }	

	 //Se verifica que el valor del campo este vacio

    if (titulo.trim() == ''){
    	alerta('Ingrese un título o certificación', 'error');
    	setInputInvalid('#titulo');
    	return;
    }
    if (instituciones.trim() == ''){
    	alerta('Seleccione una institución', 'error');
    	setInputInvalid('#instituciones');
    	return;
    }
    else{

    	if(instituciones == 75 && institucion.trim() == ''){
    		alerta('Ingrese una institución', 'error');
    		setInputInvalid('#institucion');
    		return;
    	}
    }
   	if (areaEstudio.trim() == ''){
   		alerta('Seleccione un área de estudio', 'error');
   		setInputInvalid('#areaEstudio');
   		return;
   	}
   	if (nivelEstudio.trim() == ''){
   		alerta('Seleccione un nivel de estudio', 'error');
   		setInputInvalid('#nivelEstudio');
   		return;
   	}
  
   	if (estadoEstudio.trim() == ''){
   		alerta('Seleccione un estado de estudio', 'error');
   		setInputInvalid('#estadoEstudio');
   		return;
   	}
   	else{
   		if(estadoEstudio.trim() == 'CO' && fechaDos == ''){
   			alerta('Debe ingresar una fecha de fin', 'error');
   			setInputInvalid('#fecha_fin_educacion');
   			return;
   		}	
   		else{
   			if(estadoEstudio.trim() == 'CO' && cant_aprobadas.trim() != cant_materias.trim()){		
				alerta('La cantidad de materias debe coincidir con las materias aprobadas', 'error');
				setInputInvalid('#cant_materias');
				setInputInvalid('#cant_aprobadas');
				return;		
	   		}
   		}
   	}
   	if(!(validarNumero(promedio) && promedio.trim()< 11)){
   		alerta('El promedio debe ser un número entre 1 y 10','error');
   		setInputInvalid('#promedio');
   		return;
   	}
   	if(!(validarNumero(cant_materias))){
   		alerta('La cantidad de materias debe ser un número','error');
   		setInputInvalid('#cant_materias');
   		return;
   	}
   	if(!(validarNumero(cant_aprobadas))){
   		alerta('La cantidad de materias debe ser un número','error');
   		setInputInvalid('#cant_aprobadas');
   		return;
   	}
	if(cant_aprobadas.trim() == '' && cant_materias.trim() != ''){
		alerta('Si indica la cantidad de materias debe indicar las materias aprobadas','error');
		setInputInvalid('#cant_materias');
		setInputInvalid('#cant_aprobadas');
		return;
	}
   	if(cant_materias.trim() < cant_aprobadas.trim()){
		alerta('Las materias aprobadas no pueden ser más que el total de materias.','error');
		setInputInvalid('#cant_materias');
		setInputInvalid('#cant_aprobadas');
		return;
	}
   	
   	if (fechaUno == ''){
    	alerta('Ingrese una fecha de inicio', 'error');
    	setInputInvalid('#fecha_inicio_educacion');
    	return;
    }

	if(fechaDos != ''){
    	$('#actualmenteEducacion').attr('checked', false); 
    	actualmente = 0;

		if(fechaUnoMenorFechaDos(fechaDos, fechaUno)){
			alerta('La fecha de inicio debe ser anterior a la de fin', 'error');
			setInputInvalid('#fecha_inicio_educacion');
			setInputInvalid('#fecha_fin_educacion');
			return;
		}
	}
	else{
		if(estadoEstudio.trim() == 'EC'){
			actualmente = 1;
		}
		
	}	
	
    loading();
    //Limpio el formulario
    limpiarFormulario("form_agregar_educacion");

	$('#educacion').modal('close');

	//envío la solicitud al servidor 
    var XHR = $.ajax({
		url: "curriculum",
	    type: "POST",
	    data: {titulo:titulo, institucion:institucion, instituciones:instituciones, areaEstudio:areaEstudio, nivelEstudio:nivelEstudio, estadoEstudio:estadoEstudio, fechaUno:fechaUno, fechaDos:fechaDos, actualmente:actualmente, matricula:matricula, accion:'guardarEducacion',promedio:promedio, cant_materias:cant_materias, cant_aprobadas:cant_aprobadas, opcion:opcion}
	});
	XHR.done(function(data){																																																								
		if(opcion != 'nuevo'){
			$("#educacion_"+opcion).remove();	
		}		
		$("#educacionActualizada").append(data);
		cerrarLoading();
		alerta('La accion fue realizada con exito', 'done');
	});


}


//////////////////////////////////////////////////////////////////////////////////////////////////////
//function guardarCurso(opcion) levanta los datos del formulario, valida y manda por ajax a curriculum para agregar un curso 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function guardarCurso(opcion){
	  //mando ajax
	 nombre = $('#nombre').val();
	 institucion_curso = $('#institucion_curso').val();
	 fecha_curso = $('#fecha_curso').val();
	 areaEstudioCurso = $('#areaEstudioCurso').val();
	 cantHoras = $('#cantHoras').val();
	 puntaje = $('#puntaje').val();

	//Se verifica que el valor del campo este vacio

    if (nombre.trim() == ''){
    	alerta('Ingrese el nombre del curso', 'error');
    	setInputInvalid('#nombre');
    	return;
    }

    if (institucion_curso.trim() == ''){
    	alerta('Ingrese una institución', 'error');
    	setInputInvalid('#institucion_curso');
    	return;
    }
  
   	if (areaEstudioCurso.trim() == ''){
   		alerta('Seleccione un área de estudio', 'error');
   		setInputInvalid('#areaEstudioCurso');
    	return;
   	}
   
   	else{
   		if(puntaje.trim() != ''){
   			if(!(validarNumero(puntaje) && puntaje.trim()< 11)){
		   		alerta('El puntaje debe ser un número entre 1 y 10','error');
		   		setInputInvalid('#puntaje');
		   		return;
		   	}
   		}
   		
   	}

	
     loading();
    //Limpio el formulario
    limpiarFormulario("form_agregar_curso");

	$('#curso').modal('close');

    //envío la solicitud al servidor 
    var XHR = $.ajax({
		url: "curriculum",
	    type: "POST",
	    data: {nombre:nombre, institucion_curso:institucion_curso, fecha_curso:fecha_curso, areaEstudioCurso:areaEstudioCurso, cantHoras:cantHoras, puntaje:puntaje, accion:'guardarCurso', opcion:opcion}
	});
	XHR.done(function(data){	
		if(opcion != 'nuevo'){
			$("#curso_"+opcion).remove();	
		}		
		$("#cursoActualizado").append(data);
		cerrarLoading();
		alerta('La accion fue realizada con exito', 'done');
	});


}


//////////////////////////////////////////////////////////////////////////////////////////////////////
//function guardarAptitudConocimiento(opcion) levanta los datos del formulario, valida y manda por ajax a curriculum para agregar un aptitud o conocimiento 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function guardarAptitudConocimiento(opcion){
	  //mando ajax
	 nombre_aptitud = $('#nombre_aptitud').val();
	 descripcion_aptitud = $('#descripcion_aptitud').val();
	 areaEstudioAptitud = $('#areaEstudioAptitud').val();

	
    if (nombre_aptitud.trim() == ''){
    	alerta('Ingrese una aptitud o conocimiento', 'error');
    	setInputInvalid('#nombre_aptitud');
    	return;
    }

	if (areaEstudioAptitud == ''){
    	alerta('Seleccione un área de estudio', 'error');
    	setInputInvalid('#areaEstudioAptitud');
    	return;
    }
    loading();
    //Limpio el formulario
    limpiarFormulario("form_agregar_aptitud");

	$('#aptitud').modal('close');

	var XHR = $.ajax({
		url: "curriculum",
	    type: "POST",
	    data: {nombre_aptitud:nombre_aptitud, descripcion_aptitud:descripcion_aptitud, areaEstudioAptitud:areaEstudioAptitud, accion:'guardarAptitudConocimiento', opcion: opcion}
	});

	
	XHR.done(function(data){	
		if(opcion != 'nuevo'){
			$("#aptitud_"+opcion).remove();	
		}	
		$("#aptitudConocimientoActualizado").append(data);
		cerrarLoading();
		alerta('La accion fue realizada con exito', 'done');
	});

}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function eliminarElementoCurriculum(idEliminar, funcion, idElemento) mandar por ajax a curriculum el id del elemento a eliminar, la funcion que utiliza para eliminarlo, y el idElemento a eliminar del html. 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function eliminarElementoCurriculum(idEliminar, funcion, idElemento){
	loading();
	//envío la solicitud al servidor
	var XHR = $.ajax({
		url: "curriculum",
	    type: "POST",
	    data: {idEliminar: idEliminar, accion :'eliminarElemento', funcion: funcion}
	});

	XHR.done(function(resultado){	
		if(resultado == 1){
			$(idElemento).remove();	
			cerrarLoading();
			alerta('La accion fue realizada con exito', 'done');
		}
		else{
			alerta('No se pudo realizar la acción', 'error');
		}
		
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//function editarElementoCurriculum(idEliminar, funcion, idElemento) mandar por ajax a curriculum el id del elemento a eliminar, la funcion que utiliza para eliminarlo, y el idElemento a eliminar del html. 
//////////////////////////////////////////////////////////////////////////////////////////////////////
function abrirModal(idModal, funcionalidad, idElemento){
	
	switch(idModal) {
	    case "aptitud":
	    	$(".titulo").empty();
	    	$("#aptitud .modal-footer .accion").empty();
	    	limpiarFormulario('form_agregar_aptitud');
	        if(funcionalidad == 'agregar'){
	        	$(".titulo").prepend("<h3>Agregar aptitud y conocimiento</h3>");
	        	$("#areaEstudioAptitud option[value='']").attr("selected",true);
	        	$("#aptitud .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarAptitudConocimiento(\'nuevo\')">Guardar</a>');
	        }
	        else{
	        	$(".titulo").prepend("<h3>Editar aptitud y conocimiento</h3>");
	        	aptitud_nombre = $("#aptitud_nombre_"+idElemento).text();
	        	aptitud_descripcion = $("#aptitud_descripcion_"+idElemento+" span").text();
	        	aptitud_area = $("#aptitud_area_"+idElemento).val();

	        	$("#descripcion_aptitud").val(aptitud_descripcion);
	        	$("#areaEstudioAptitud option[value="+aptitud_area+"]").attr("selected",true);
	        	$("#nombre_aptitud").val(aptitud_nombre);

	        	$("#aptitud .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarAptitudConocimiento('+idElemento+')">Guardar</a>');
	        }
	        $('#areaEstudioAptitud').material_select();
	        Materialize.updateTextFields();
	        $("#aptitud").modal('open');
	    break;

	    case "curso":
	    	$(".titulo").empty();
	    	$("#curso .modal-footer .accion").empty();
	    	limpiarFormulario('form_agregar_curso');
	        if(funcionalidad == 'agregar'){
	        	$(".titulo").prepend("<h3>Agregar curso</h3>");
	        	$("#areaEstudioCurso option[value='']").attr("selected",true);
	        	$("#curso .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarCurso(\'nuevo\')">Guardar</a>');
	        }
	        else{
	        	$(".titulo").prepend("<h3>Editar curso</h3>");
	        	curso_nombre = $("#curso_nombre_"+idElemento).text();
	        	curso_insticucion = $("#curso_insticucion_"+idElemento).text();
	        	curso_area_estudio = $("#curso_area_estudio_"+idElemento).val();
	        	curso_fecha = $("#curso_fecha_"+idElemento).text();
			
	        	curso_cant_horas = $("#curso_cant_horas_"+idElemento).text();
	        	curso_puntaje = $("#curso_puntaje_"+idElemento).text();


	        	$("#nombre").val(curso_nombre);
	        	$("#institucion_curso").val(curso_insticucion);
	        	$("#areaEstudioCurso option[value="+curso_area_estudio+"]").attr("selected",true);
	        	
	        	$("#fecha_curso").val(curso_fecha);
	        	$("#cantHoras").val(curso_cant_horas);
	        	$("#puntaje").val(curso_puntaje);

	        	$("#curso .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarCurso('+idElemento+')">Guardar</a>');
	        }
	        $('#areaEstudioCurso').material_select();
	        Materialize.updateTextFields();
	        $("#curso").modal('open');
	    break;
	    case "educacion":
	    	$(".titulo").empty();
	    	$("#educacion .modal-footer .accion").empty();
	    	limpiarFormulario('form_agregar_educacion');
	    	$('#matricula_profesional').attr('disabled', true);
       		$('#fecha_fin_educacion').attr('disabled', true);
	        if(funcionalidad == 'agregar'){
	        	$(".titulo").prepend("<h3>Agregar formación</h3>");
	        	$("#areaEstudio option[value='']").attr("selected",true);
	        	$("#nivelEstudio option[value='']").attr("selected",true);
	        	$("#estadoEstudio option[value='']").attr("selected",true);
	        	$("#instituciones option[value='']").attr("selected",true);
	        	$("#educacion .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarEducacion(\'nuevo\')">Guardar</a>');
	        }
	        else{
	        	$(".titulo").prepend("<h3>Editar formación</h3>");
	        	educacion_titulo = $("#educacion_titulo_"+idElemento).text();
	        	educacion_institucion = $("#educacion_institucion_"+idElemento).text();
	        	educacion_area_estudio = $("#educacion_area_estudio_"+idElemento).val();
	        	educacion_nivel_estudio = $("#educacion_nivel_estudio_"+idElemento).val();
	        	educacion_id_institucion = $("#educacion_id_institucion_"+idElemento).val();
	        	educacion_estado = $("#educacion_estado_"+idElemento).val();
	        	educacion_promedio = $("#educacion_promedio_"+idElemento).text();
	        	educacion_cant_materias = $("#educacion_cant_materias_"+idElemento).text();
	        	educacion_cant_aprobadas = $("#educacion_cant_aprobadas_"+idElemento).text();

	        	educacion_fecha_inicio = $("#educacion_fecha_inicio_"+idElemento).text();
	        	educacion_fecha_fin = $("#educacion_fecha_fin_"+idElemento).text();
	        	educacion_matricula = $("#ecucacion_matricula_"+idElemento).text();
	       
	        	$("#titulo").val(educacion_titulo);
	        	
	        	$("#areaEstudio option[value="+educacion_area_estudio+"]").attr("selected",true);
	        	$("#nivelEstudio option[value="+educacion_nivel_estudio+"]").attr("selected",true);
	        	$("#estadoEstudio option[value="+educacion_estado+"]").attr("selected",true);
	        	$("#instituciones option[value="+educacion_id_institucion+"]").attr("selected",true);
	        	$("#promedio").val(educacion_promedio);
	        	$("#cant_materias").val(educacion_cant_materias);
	        	$("#cant_aprobadas").val(educacion_cant_aprobadas);

				if(educacion_id_institucion == 75){
	        		$("#institucion").removeAttr('disabled');
	        		$("#institucion").val(educacion_institucion);
	        	}

	        	if(educacion_matricula != ""){
	        		$("#matricula_profesional").removeAttr('disabled');
	        		$("#matricula_profesional").val(educacion_matricula);
	        	}
	        	if(educacion_fecha_fin != ""){
	        		$("#fecha_fin_educacion").removeAttr('disabled');
	        		$("#fecha_fin_educacion").val(educacion_fecha_fin);        		
	        	}

	        	$("#fecha_inicio_educacion").val(educacion_fecha_inicio);
	        	

	        	$("#educacion .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarEducacion('+idElemento+')">Guardar</a>');
	        }
	        $('#areaEstudio').material_select();
	        $('#nivelEstudio').material_select();
	        $('#estadoEstudio').material_select();
	        $('#instituciones').material_select();

	        Materialize.updateTextFields();
	        $("#educacion").modal('open');
	    break;
	     case "idioma":
	    	$(".titulo").empty();
	    	$("#idioma .modal-footer .accion").empty();
	    	limpiarFormulario('form_agregar_idioma');
	        if(funcionalidad == 'agregar'){
	        	$(".titulo").prepend("<h3>Agregar idioma</h3>");
	        	$("#idioma_select option[value='']").attr("selected",true);
	        	$("#nivelOral option[value='']").attr("selected",true);
	        	$("#nivelEscrito option[value='']").attr("selected",true);
	        	$("#idioma .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarIdioma(\'nuevo\')">Guardar</a>');
	        }
	        else{
	        	$(".titulo").prepend("<h3>Editar idioma</h3>");
	        	idioma_seleccionado = $("#idioma_id_idioma_"+idElemento).val();
	        	idioma_nivel_oral = $("#idioma_nivel_oral_"+idElemento).text();
	        	idioma_nivel_escrito = $("#idioma_nivel_escrito_"+idElemento).text();


	        	$("#idioma_select option[value="+idioma_seleccionado+"]").attr("selected",true);
	        	$("#nivelOral option[value="+idioma_nivel_oral+"]").attr("selected",true);
	        	$("#nivelEscrito option[value="+idioma_nivel_escrito+"]").attr("selected",true);	        	

	        	$("#idioma .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarIdioma('+idElemento+')">Guardar</a>');
	        }

	        $('#idioma_select').material_select();
	        $('#nivelOral').material_select();
	        $('#nivelEscrito').material_select();

	        Materialize.updateTextFields();
	        $("#idioma").modal('open');

	    break;
	    case "experiencia":
	    	$(".titulo").empty();
	    	$("#experiencia .modal-footer .accion").empty();
	    	limpiarFormulario('form_agregar_experiencia');
	        if(funcionalidad == 'agregar'){
	        	$(".titulo").prepend("<h3>Agregar experiencia laboral</h3>");
	        	$("#personasCargo").attr('checked', false); 
	        	$("#empleo_actual").attr('checked', false); 
	        	$("#cant_pers_cargo").attr('disabled', true); 
	        	$("#fecha_fin").removeAttr('disabled');
	        	$("#industria option[value='']").attr("selected",true);
	        	$("#areaTrabajo option[value='']").attr("selected",true);
	        	$("#nivel_conocimiento option[value='']").attr("selected",true);
	        	$("#tipoPuesto option[value='']").attr("selected",true);
	        	$("#pais option[value='']").attr("selected",true);
	        	$("#experiencia .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarExperiencia(\'nuevo\')">Guardar</a>');
	        }
	        else{
	        	$(".titulo").prepend("<h3>Editar experiencia laboral</h3>");
	        	experiencia_id_pais = $("#experiencia_id_pais_"+idElemento).val();
	        	experiencia_id_puesto = $("#experiencia_id_puesto_"+idElemento).val();
	        	experiencia_nivel_conocimiento = $("#experiencia_id_nivel_conocimiento_"+idElemento).val();

	        	experiencia_empresa = $("#experiencia_empresa_"+idElemento).text();
	        	experiencia_fecha_inicio = $("#experiencia_fecha_inicio_"+idElemento).text();
	        	experiencia_fecha_fin = $("#experiencia_fecha_fin_"+idElemento).text();
	        	experiencia_responsabilidades = $("#experiencia_responsabilidades_"+idElemento).text();
	        	experiencia_contacto = $("#experiencia_contacto_"+idElemento).text();
	        	experiencia_personas_cargo = $("#experiencia_personas_cargo_"+idElemento).val();
	        	experiencia_cant_pers_cargo = $("#experiencia_cant_personas_"+idElemento).text();
	        	experiencia_id_area = $("#experiencia_id_area_"+idElemento).val();
	        	experiencia_id_industria = $("#experiencia_id_industria_"+idElemento).val();
	        	experiencia_papers =$("#experiencia_papers_"+idElemento).text();

	        	$("#empresa").val(experiencia_empresa);
	        	$("#fecha_inicio").val(experiencia_fecha_inicio);
	        	$("#fecha_fin").val(experiencia_fecha_fin);
	        	$("#responsabilidades").val(experiencia_responsabilidades);
	        	$("#contacto").val(experiencia_contacto);
	        	$("#papers").val(experiencia_papers);

	        	if(experiencia_personas_cargo == 1){
	        		$("#personasCargo").attr('checked', true);  
	        		$("#cant_pers_cargo").removeAttr('disabled');
	        		$("#cant_pers_cargo").val(experiencia_cant_pers_cargo);
	        	}
	        	else{
	        		$("#personasCargo").attr('checked', false); 
	        	}
	        	if(experiencia_fecha_fin == ''){
	        		$("#empleo_actual").attr('checked', true); 
	        		$("#fecha_fin").attr('disabled', true);      	}
	        	
	        	
	        	$("#nivel_conocimiento option[value="+experiencia_nivel_conocimiento+"]").attr("selected",true);
	        	$("#tipoPuesto option[value="+experiencia_id_puesto+"]").attr("selected",true);
	        	$("#pais option[value="+experiencia_id_pais+"]").attr("selected",true);
	        	$("#industria option[value="+experiencia_id_industria+"]").attr("selected",true);
	        	$("#areaTrabajo option[value="+experiencia_id_area+"]").attr("selected",true);
	        	

	        	$("#experiencia .modal-footer .accion").append('<a class=" modal-action waves-effect waves-green btn-flat" name="Guardar" value="Guardar" onclick="guardarExperiencia('+idElemento+')">Guardar</a>');
	        }


	        $('#nivel_conocimiento').material_select();
	        $('#tipoPuesto').material_select();
	      	$('#pais').material_select();
	        $('#industria').material_select();
	        $('#areaTrabajo').material_select();

	        Materialize.updateTextFields();
	        $("#experiencia").modal('open');

	    break;
	}

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//function abrirModal
//////////////////////////////////////////////////////////////////////////////////////////////////////
function editarImagen(){
    $("#muestra_foto").empty();
    $("#editarImagen").modal('open');
    var canvas = document.getElementById('mi_canvas');
	var ctx = canvas.getContext("2d");
 
	// Borramos el área que nos interese
	ctx.clearRect(0, 0, canvas.width, canvas.height);

}
