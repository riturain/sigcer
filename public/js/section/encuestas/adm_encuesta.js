/**
 *Name: adm_encuestas.js
 *Version: 1.0
 *Detalle: Script para administrar el adm encuestas.
 *function guardarExperiencia() -> levanta los datos del formulario, valida y manda por ajax a curriculum para agregar una experiencia 
 */

//abre el modal y lo carga con los datos necesarios
function abrirModal(idEncuesta){
	
	limpiarFormulario('form_modificar_encuesta');
	
	descripcionEncuesta = $("#descripcion_encuesta_"+idEncuesta).text();
	fechaFinEncuesta = $("#fecha_fin_encuesta_"+idEncuesta).text();
	organismoEncuesta = $("#id_organismo_"+idEncuesta).val();

	$("#id_encuesta").val(idEncuesta);
	$("#descripcion_encuesta").val(descripcionEncuesta);
	$("#fecha_fin_encuesta").val(fechaFinEncuesta);
	$("#organismo_encuesta option[value="+organismoEncuesta+"]").attr("selected",true);
	
	iniciarMaterialize();
    $("#modificarEncuesta").modal('open');
	   
}
//Guarda la modificación realizada solo se cambia descripcion fecha de fin y idOrganismo de ser necesario.
function guardarModificacion(){
	id = $("#id_encuesta").val();
	descripcion = $("#descripcion_encuesta").val();
	fechaFin = $("#fecha_fin_encuesta").val();
	idOrganismo = $("#organismo_encuesta").val();
	
	if ((id === '')||(fechaFin === '')||(descripcion === '')){
    	alerta('Complete todos los campos', 'error');
    	return;
    }
    else{
    	$.ajax({
	        type: "POST",
	        url: "modificar_encuesta",
	        data: {idEncuesta: id, descripcion: descripcion, fechaFin: fechaFin, idOrganismo: idOrganismo},
	        success: function () {
	          $("#descripcion_encuesta_"+id).text(descripcion);
	          $("#fecha_fin_encuesta_"+id).text(fechaFin);
	          $("#id_organismo_"+id).val(idOrganismo);
			  iniciarMaterialize();
			  $("#modificarEncuesta").modal('close');
	        }
	    });

    }
	
}

//Eliminar una encuesta, manda a adm_encuesta por POST con el id de la encuesta 
function eliminar(id) {
   $.ajax({
        type: "POST",
        url: "adm_encuesta",
        data: {eliminar : id},
        success: function (data) {
        	if(data == 0){
        		alerta('La encuesta no se puede eliminar, hay usuarios que ya dieron sus respuestas.', 'error');
    			return;
        	}
        	else{
        		 location.reload();
        	}
           
        } 

    });     
}

//finaliza una encuesta, llama al controlador adm_encuesta enviandole el id de la encuesta por POST
function confirmar(id) {
	$.ajax({
        type: "POST",
        url: "adm_encuesta",
        data: {finalizar : id},
        success: function () {
           alerta('La encuesta fue finalizada con éxito', 'done');
    		return;
        }
	});
	
}

//agrega un fieldset en el div agregoTipo
function agregarTipo(elemen) {
	var id_elemento = $("#id_elemento").val();
	id_elemento ++;
	$("#id_elemento").val(id_elemento);
	var eltipo = '<div class="tipoCompleto col s12" id="tipo_'+id_elemento+'"><div class="tipoSeccion card"><div class="card-content grey lighten-4"><div class="row"><div class="col s12 l10"><h5>Tipo</h5></div><div class="col s12 l2"><a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Eliminar tipo" onclick="msgBox(\'Eliminar tipo\', \'help\', \'¿Está seguro que desea eliminar el tipo seleccionado?\', \'YesNo\', \'eliminarElemento(tipo_'+id_elemento+');\');"><i class="fa fa-trash" aria-hidden="true"></i>Eliminar</a></div><div class="input-field col s12 l3"><select class="selectedis" onchange="seleccionado(this);"><option value="">Seleccione un tipo de input</option><option value="1">Checkbox</option><option value="2">Número</option><option value="3">Texto</option><option value="4">Fecha</option><option value="5">Radio</option><option value="6">Cabecera</option><option value="7">Mail</option><option value="8">Textarea</option><option value="9">Select</option></select><label>Organismo</label></div><div class="input-field col s12 l4"><input type="text" id="descripcion" name="descripcion" class="validate" /><label for="descripcion">Descripción</label></div><div class="divTamanio input-field col s12 l3"><select class="tamanio" ><option value="">Seleccione tamaño</option><option value="l2">col l2</option><option value="l4">col l4</option><option value="l6">col l6 (50%)</option><option value="l8">col l8</option><option value="l10">col l10</option><option value="l12">col l12 (100%)</option></select><label>Tamaño de input</label></div><div class="input-field col s12 l2"><input type="checkbox" class="requerido "id="requerido_'+id_elemento+'" name="requerido_'+id_elemento+'"/><label for="requerido_'+id_elemento+'">Requerido</label></div></div></div></div></div>';
	$(elemen).parent().parent().siblings(".seccionCompleta").append(eltipo);
	iniciarMaterialize();
}

//agrega una seccion nueva al final del formulario en el div agregoSeccion
function agregarSeccion(elemen) {
	var id_elemento = $("#id_elemento").val();
	id_elemento ++;
	$("#id_elemento").val(id_elemento);
	var laSeccion = '<div class="card" id="seccion_'+id_elemento+'"><div class="card-content grey lighten-5"><div class="seccionCompleta row"><div class="col s12 l10"><h5>Sección</h5></div><div class="col s12 l2"><a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Eliminar sección" onclick="msgBox(\'Eliminar sección\', \'help\', \'¿Está seguro que desea eliminar la sección seleccionada? \', \'YesNo\', \'eliminarElemento(seccion_'+id_elemento+');\');"><i class="fa fa-trash" aria-hidden="true"></i>Eliminar sección</a></div><div class="nombreSeccion input-field col s12 "><input type="text" name="seccion" class="seccion"/><label>Nombre de sección</label></div><div class="tipoCompleto col s12"><div class="tipoSeccion card"><div class="card-content grey lighten-4"><div class="row"><div class="col s12 l10"><h5>Tipo</h5></div><div class="col s12 l2"><a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Eliminar tipo" onclick="msgBox(\'Eliminar tipo\', \'help\', \'¿Está seguro que desea eliminar el tipo seleccionado? \', \'YesNo\', \'eliminarElemento(this);\');"><i class="fa fa-trash" aria-hidden="true"></i>Eliminar</a></div><div class="input-field col s12 l3"><select class="selectedis" onchange="seleccionado(this);"><option value="">Seleccione un tipo de input</option><option value="1">Checkbox</option><option value="2">Número</option><option value="3">Texto</option><option value="4">Fecha</option><option value="5">Radio</option><option value="6">Cabecera</option><option value="7">Mail</option><option value="8">Textarea</option><option value="9">Select</option></select><label>Organismo</label></div><div class="input-field col s12 l4"><input type="text" id="descripcion" name="descripcion" class="validate" /><label for="descripcion">Descripción</label></div><div class="divTamanio input-field col s12 l3"><select class="tamanio" ><option value="">Seleccione tamaño</option><option value="l2">col l2</option><option value="l4">col l4</option><option value="l6">col l6 (50%)</option><option value="l8">col l8</option><option value="l10">col l10</option><option value="l12">col l12 (100%)</option></select><label>Tamaño de input</label></div><div class="input-field col s12 l2"><input type="checkbox" class="requerido "id="requerido_'+id_elemento+'" name="requerido_'+id_elemento+'"/><label for="requerido_'+id_elemento+'">Requerido</label></div></div></div></div></div></div><div class="row botonera"><div class="col s12"><a class="waves-effect waves-light btn left" onclick="agregarTipo(this)"><i class="fa fa-plus" aria-hidden="true"></i>Agregar tipo</a></div></div></div></div>';
    $(agregoSeccion).append(laSeccion);
    iniciarMaterialize();
}

//agrega una opcion si el elemento seleccionado del select es 9 (select)
function seleccionado(elSeleccionado) {
	var id_elemento = $("#id_elemento").val();
	id_elemento ++;
	$("#id_elemento").val(id_elemento);
	$(elSeleccionado).parent().parent().parent().siblings('.opcionesSelect').remove();
    if(elSeleccionado.value == 9 || elSeleccionado.value == 5){
	    var laOpcion = '<div class="opcionesSelect"><div class="row opciones" id="opcion_'+id_elemento+'"><div class="input-field col s12 l10"><input type="text"/><label>Opción</label></div></div><div class="row"><div class="col s12"><a class="waves-effect waves-light btn left" onclick="agregarOpcion(this)"><i class="fa fa-plus" aria-hidden="true"></i>Agregar opción</a></div></div></div>';
	    $(elSeleccionado).parent().parent().parent().parent().append(laOpcion);
	}
}
//agrega una opción mas.
function agregarOpcion(elemen) {
	var id_elemento = $("#id_elemento").val();
	id_elemento ++;
	$("#id_elemento").val(id_elemento);
	var laOpcion = '<div class="row opciones" id="opcion_'+id_elemento+'"><div class="input-field col s12 l10"><input type="text"/><label>Opción</label></div><div class="input-field col s12 l2"><a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Eliminar opción" onclick="msgBox(\'Eliminar opción\', \'help\', \'¿Está seguro que desea eliminar la opción seleccionada? \', \'YesNo\', \'eliminarElemento(opcion_'+id_elemento+');\');"><i class="fa fa-trash" aria-hidden="true"></i>Eliminar</a></div></div>';
	$(".opciones").last().after(laOpcion);
}

//Eliminar elemento 
function eliminarElemento(elemen) {
	elemen.remove();
}

//guardar la encuesta armada (NO LAS RESPUESTAS )
function guardarAjax() {
	//valido que no sea vacio ni número 
	nombreEncuesta = $('#nombreEncuesta').val();
	fechaFin = $('#fecha').val();	
	organismo = $('#organismo').val();
	   //Se verifica que el valor del campo este vacio
    if ((nombreEncuesta.trim() === '')||(fechaFin === '')||(nombreEncuesta.length > 50)){
    	alerta('Debe completar el nombre y la fecha de fin de la encuesta','error');
    	setInputInvalid('#nombreEncuesta');
    	setInputInvalid('#fecha');	
    }
    else {
		//recorro las secciones 
		var secciones = new Array();
		var correcto = true;
		seccionCompleta = $(".seccionCompleta");
		/*console.log('cantidad de secciones:',seccionCompleta.length);*/
		if(seccionCompleta.length > 0){
				//si tiene elementos entonces lo recorro
				seccionCompleta.each(function() {	
					    nombreSeccion = $(this).children('div.nombreSeccion').children('input.seccion').val();
					   /* console.log('Nombre de la sección :',nombreSeccion);*/
					 
					    if(nombreSeccion.trim() === ''){
					    	alerta('Debe completar el nombre de la sección','error');
					    	correcto = false;
					    	return false;
					    }
					    //recorro los tipos 
					    tiposDeSeccion = $(this).children('div.tipoCompleto');
					   /* console.log('cantidad de tipos:',tiposDeSeccion.length);*/
					    if(tiposDeSeccion.length > 0){
					    	var tipos = new Array();
						    tiposDeSeccion.each(function(){
							    $('select').material_select('destroy');
							    tipo = $(this).children('div.tipoSeccion').children('div').children('div').children('div').children('select.selectedis').val();
							  	/*console.log('selection :',tipo);*/
							    
							    descripcion = $(this).children('div.tipoSeccion').children('div').children('div').children('div').children('input').val();
							    /*console.log('laDescripcion :',descripcion);*/
							    if(descripcion.trim() === ''){
							    	alerta('Debe completar la  descripción del tipo','error');
							    	correcto = false;
							    	return false;
							    }
							    tamanio = $(this).children('div.tipoSeccion').children('div').children('div').children('div.divTamanio').children('select.tamanio').val();
							    console.log(tamanio);
							    $('select').material_select();
							    checkbox = $(this).children('div.tipoSeccion').children('div').children('div').children('div').children('input.requerido');

							    if( checkbox.attr('checked') ) {
							    	 	requerido = 1;
								}
								else{
									requerido = 0;
								}
								/*console.log('requerido : ',requerido);*/
								var lasOpciones = new Array();
								//recorro las opciones 
								if((tipo == 9)||(tipo == 5)){
									opciones = $(this).children('div.tipoSeccion').children('div').children('div.opcionesSelect').children('div.opciones');
									
									if(opciones.length > 0){
										/*console.log('cant opciones : ', opciones.length);
										console.log('opciones : ', opciones)*/
										opciones.each(function() {
										    opcion = $(this).children('div').children('input').val();
										    /*console.log('la opcion : ',opcion);*/
										    if(opcion.trim() === ''){
										    	alerta('Debe completar el nombre de la opción','error');
										    	correcto = false;
										    	return false;
										    }									    
									    	//agregar opcion al arreglo 
									    	lasOpciones.push(opcion);									  
										});	
										//console.log(opciones);
									}
									else{
										alerta('Debe colocar una opcion','error');
										correcto = false;
										return false;
									}
								}
								tipo = {
								    nroTipo : tipo,
								    descripcion : descripcion,
								    requerido : requerido,
								    opciones : lasOpciones,
								    tamanio : tamanio
								};
								//agrego al arreglo de la seccion
								tipos.push(tipo);
						    });					  
						}
						else{
							alerta('Debe ingresar al menos un tipo dentro de la sección','error');
							correcto = false;
							return false;
						}
						seccion = {
							    nombreSeccion : nombreSeccion,
							    tipos : tipos
						};
						//agrego al arreglo de secciones
						secciones.push(seccion);	
					});
					encuesta = {
					    nombreEncuesta : nombreEncuesta,
					    fechaFin : fechaFin,
					    organismo : organismo,
					    secciones : secciones
					};
					if(correcto){
				   		//mando ajax
				   		/*console.log(secciones);*/
					    $.ajax({
					        type: "POST",
					        url: "adm_encuesta",
					        data: {encuesta : encuesta},
					        dataType: "json",
					        success: function () {
					        	location.reload();   
					        }
					    });
				    }

		}//fin if seccion completa
		else{
			//error debe tener al menos un elemento para poder cargar la encuesta
			alerta('Debe tener al menos un elemento la sección','error');
			correcto = false;
			return false;
			
		}
	}//fin else


}



function modificar(id){
	$modal = $( "#dialog-form");
	$modal.dialog({
	      resizable: false,
	      height: "auto",
	      width: "auto",
	      modal: true,
	       buttons: {
		     
		    }  
	});

	$.ajax({
        type: "POST",
        url: "modificar_encuesta",
        data: {idEncuesta: id, modal: true},
        dataType: "JSON",
        success: function (response) {
       		//agarro la fecha y la voy vuelta
        	date = response[0].FECHA_FIN;	
		    dia=date.substring(0,2);
		    mes=date.substring(3,5);
		    anio=date.substring(6,10);
		    fecha = anio+"-"+mes+"-"+dia;
		   /* console.log(response[0].ID_ORGANISMO);*/
		    if(response[0].ID_ORGANISMO != null){
		  		 $("#organismo_encuesta option[value="+ response[0].ID_ORGANISMO +"]").attr("selected",true);
           	}
           	else{
           		$("#organismo_encuesta option:first-child").attr("selected",true);
           	}
           $("#descripcion_encuesta").val(response[0].DESCRIPCION);
           $("#fecha_fin_encuesta").val(fecha);
           $("#id_encuesta").val(id);

        }
    });
}

