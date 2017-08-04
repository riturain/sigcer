//JS CARPETA MEDICA
$(document).ready(function(){
	$("#tabsCarpetasMedicas").tabs();	
	//$( "#datepicker" ).datepicker($.datepicker.regional["es"]);
	$( "#datepicker" ).datepicker({ minDate: 0});
	//$( "#datepicker" ).datepicker();
	$("#historialCM").dataTable({		
		"iDisplayLength": 10,
		"aoColumns": [
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": true},
			{"bSearchable": false,
			 "bSearchable": false}
                    ],
        "bLengthChange": false,
        "bFilter": true,
        "bAutoWidth": false,
                "oLanguage": {
                    //"sLengthMenu": "Mostrar _MENU_ registros por página",
                    "sZeroRecords": "no hay registros",
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
                }
	
	});
	initModificarDomicilio();
	
	//autocompletar Localidades
    $("#autoCompletarLocalidad").autocomplete({
        source: function( request, response ) {
            var parametros = {
                "accion": 'autocompletarLocalidades',
                "term" : request.term
            };
            $.ajax({
                data:  parametros,
                url: 'carpeta_medica',
                type:  'post',
                dataType: "json",
                success: function( data ) {
                	//console.log(data);
                    response( $.map( data, function( item ) {
                        return {
                            label: item['label'],                            
                            value: item['label'],
                            id: item['id']
                        };
                    }));
                }
            });
        },
		open: function(){
                    $(this).autocomplete('widget').css('z-index', 1500);// para que no quede en la capa de atrás
                    return false;
                },
        minLength: 1,
        autoFocus: true,
        select: function( event, ui ) {
			$('#dom_5').prop("value",ui.item.value);
			$('#dom_6').prop("value",ui.item.id);
			$("#dialogLocalidad").dialog("close");
        }
    });
	//ocultoFilaFamiliares si no es rePost
	if((typeof $("#familiarEnfermo").val() === "undefined") || ($("#familiarEnfermo").val() === '')){
		toggleFamiliares(15,false); //fila 14 es
	}
	
	$("#dialogLocalidad").dialog({
		autoOpen: false,
		height: 100,		
		width: 340,		
		modal: true
	});
	
});

function esFamiliar(){
	//if (($("#tipo_solicitud").val() == 2) || ($("#tipo_solicitud").val() == 9)){ // si es atención familiar	
	if (($("#tipo_solicitud").val() != '') && ($("#tipo_solicitud option:selected").text() == 'ATENCION FAMILIAR ENFERMO')){ // si es atención familiar
	    toggleFamiliares(15,true);
    }else{
        toggleFamiliares(15,false);
    }	
}	
function toggleFamiliares(num,ver) {
    dis= ver ? '' : 'none';
    tab=document.getElementById('tabla_licencia');
    tab.getElementsByTagName('tr')[num].style.display=dis;
}

function initModificarDomicilio(){
    if ($("#dom_1").val() == ''){
        $('#mod_domicilio').prop("checked", true);
		$("#btnDialog").removeAttr("disabled"); 
    }else{
        $("#dom_1").prop("disabled",true);
        $("#dom_2").prop("disabled",true);
        $("#dom_3").prop("disabled",true);
        $("#dom_4").prop("disabled",true);
        $("#dom_5").prop("readonly",true);
        $("#dom_6").prop("disabled",true);
        $("#dom_7").prop("disabled",true);		 
    }	
}

function validarCarpetaMedica(){
    valor = $("input[name='modalidad']:checked").val();
    if ((valor != "ambulatoria") && (valor != "domiciliaria"))
    {
        alert('Debe seleccionar la modalidad de la carpeta');	
        return false;
    }	
    if ($('#mod_domicilio').is(':checked')){
        valor = $('#dom_1').val();
        if (valor == ''){
            alert('Completar el campo Calle de Domicilio');
            return false;
        }
        valor = $('#dom_2').val();
        if (valor == ''){
            alert('Completar el campo Altura de Domicilio');
            return false;
        }
        valor = $('#dom_6').val();
        if (valor == ''){
            alert('Completar el campo Localidad de Domicilio');
            return false;
        }
        valor = $('#dom_3').val();
        if (valor != "") {
            if (!(/^([0-9])*$/.test(valor))){
                alert('El campo piso debe ser un valor numérico');
                return false;
            }
        }
    }
    valor = $('#datepicker').val();
    if (valor == ''){
        alert('Completar el campo Fecha de Solicitud');
        return false;
    }
    valor = $('#tipo_solicitud').val();
    if (valor == ''){
        alert('Debe seleccionar un tipo de solicitud');
        return false;
    }
    if ($("#tipo_solicitud option:selected").text() == 'ATENCION FAMILIAR ENFERMO'){ // si es atención familiar
        if ($("#familiarEnfermo").val() == ''){
            alert('Debe seleccionar un familiar');
            return false;
        }
    }
    /*valor = $("input[name='lugar_trabajo']").val();
    if (valor == ''){
        alert('Completar el Lugar Efectivo de Trabajo');
        return false;
    }*/
    valor = $("#tarea").val();
    if (valor == ''){
        alert('Debe seleccionar una tarea');
        return false;
    }
    /*valor = $("input[name='descripcion_trabajo']").val();
    if (valor == ''){
        alert('Completar el campo Descripción de Tarea');
        return false;
    }*/
	$( "#loading" ).show();
	$("#domi").prop("disabled",false);
	$("#ambu").prop("disabled",false);
	$("#tipo_solicitud").prop("disabled",false);	
	$("#datepicker").prop("disabled",false);
	$("#familiarEnfermo").prop("disabled",false);
    return true;
}

function habDeshabDomicilio(){
    if ($('#mod_domicilio').is(':checked')) {
		$("#dom_1_temp").prop("value", $("#dom_1").val());
		$("#dom_2_temp").prop("value", $("#dom_2").val());
		$("#dom_3_temp").prop("value", $("#dom_3").val());
		$("#dom_4_temp").prop("value", $("#dom_4").val());
		$("#dom_5_temp").prop("value", $("#dom_5").val());
		$("#dom_6_temp").prop("value", $("#dom_6").val());
        $("#dom_1").prop("disabled",false);
        $("#dom_1").prop("value",'');
        $("#dom_2").prop("disabled",false);
        $("#dom_2").prop("value",'');
        $("#dom_3").prop("disabled",false);
        $("#dom_3").prop("value",'');
        $("#dom_4").prop("disabled",false);
        $("#dom_4").prop("value",'');
        //$("#dom_5").prop("disabled",false);
        $("#dom_5").prop("value",'');
        $("#dom_6").prop("disabled",false);
        $("#dom_6").prop("value",'');
        $("#dom_7").prop("disabled",false);
        $("#dom_7").prop("value",'');
        $("#btnDialog").removeAttr("disabled");        
    }else {				
        $("#dom_1").prop("disabled",true);
        $("#dom_1").prop("value",'');
        $("#dom_2").prop("disabled",true);
        $("#dom_2").prop("value",'');
        $("#dom_3").prop("disabled",true);
        $("#dom_3").prop("value",'');
        $("#dom_4").prop("disabled",true);
        $("#dom_4").prop("value",'');
        //$("#dom_5").prop("disabled",true);
        $("#dom_5").prop("value",'');
        $("#dom_6").prop("disabled",true);
        $("#dom_6").prop("value",'');
        $("#dom_7").prop("disabled",true);
        $("#dom_7").prop("value",'');
		$("#dom_1").prop("value", $("#dom_1_temp").val());
		$("#dom_2").prop("value", $("#dom_2_temp").val());
		$("#dom_3").prop("value", $("#dom_3_temp").val());
		$("#dom_4").prop("value", $("#dom_4_temp").val());
		$("#dom_5").prop("value", $("#dom_5_temp").val());
		$("#dom_6").prop("value", $("#dom_6_temp").val());
		$("#btnDialog").prop("disabled","disabled");
    }
}

function traerCarpetasMedicasPorTerm(){
    var que_busca = $('#txt_busca').val();
    var donde_busca = $('#op_busqueda').val();
    if (donde_busca === ''){
        alertar('Debe seleccionar un TIPO de búsqueda');
        return false;
    }
    if (que_busca === ''){
        alertar('Debe indicar el contenido de la búsqueda.');
        return false;
    }
    if (donde_busca === 'NroDoc') {
        if (!validarNumero(que_busca)){
			alertar("No es un número");
			return false;
		}
    }
	$("#resultadosCMPersonas").empty();
    var XHRCM = $.ajax({
		type: "POST",url: "carpeta_medica",
		data:{  accion: 'traerCarpetasMedicas',
				term: que_busca	
			},
		beforeSend: function () {
            $("#resultadosCMPersonas").append("<p>Cargando..</p>");
        }
	});	
	XHRCM.done(function(response){
		$("#resultadosCMPersonas").empty();
		var personas = $.parseJSON(response);
		largo = personas.length;
		if (largo>0){
			var tabla = $("<table id='tablaResultadosCM'></table>");
			var cabecera = $("<thead></thead>");
			cabecera.append("<tr><th>Tipo</th><th>NºDocumento</th><th>Legajo</th><th>Agente</th><th>&nbsp;</th></tr>");
			tabla.append(cabecera);
			var body = $("<tbody></tbody>");
			for (var x = 0; x < largo; x++){
				// personas[x][0] - idPersona
				// personas[x][1] - tipoDoc
				// personas[x][2] - nroDoc
				// personas[x][3] - legajo
				// personas[x][4] - ApyN
				body.append("<tr><td>"+personas[x][1]+"</td><td>"+personas[x][2]+"</td><td>"+personas[x][3]+"</td><td>"+personas[x][4]+"</td><td><button onclick='carpetaParaTercero("+personas[x][0]+","+personas[x][2]+");'>Seleccionar</button></td></tr>");
			}
			tabla.append(body);
			$("#resultadosCMPersonas").append(tabla);
			var oTable = $("#tablaResultadosCM").dataTable({
				"sPaginationType": "full_numbers",
				"iDisplayLength": 10,
				"bFilter": true,
				"aoColumns": [
                    {"bSearchable": true},
                    {"bSearchable": true},
                    {"bSearchable": true},
                    {"bSearchable": true},                    
                    {"bSearchable": false}
                    ],
				"bLengthChange": false,
				"oLanguage": {	
					"sZeroRecords": "no hay registros",
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
				}
			});
			oTable.fnSort( [[3, 'asc']] );
		}else{
			$("#resultadosCMPersonas").append("<p>No hay resultados</p>");
		}
	});	
}

function carpetaParaTercero(idPer,nroDoc){
	
	$("#idPerTer").val(idPer);
	$("#docPerTer").val(nroDoc);
	
	var XHRCMTercero = $.ajax({
		type: "POST",url: "carpeta_medica",
		data:{  accion: 'traerDatosParaTercero',
				id_per: idPer	
			}
	});
	XHRCMTercero.done(function(response){
		var datosTercero = $.parseJSON(response);
		ponerDatosEnFormCM(datosTercero);		
		/*
		datosTercero.id_persona 
		datosTercero.tipodoc 
		datosTercero.documento 
		datosTercero.legajo 
		datosTercero.apyn 
		datosTercero.dom_calle 
		datosTercero.dom_altura 
		datosTercero.dom_id_localidad
		datosTercero.dom_localidad 
		datosTercero.reparticion 
		datosTercero.dependencia 
		datosTercero.id_domicilio 
		*/
		$("#avisoDeTercero").show();
		$("#avisoDeTercero").empty();
		$("#avisoDeTercero").append("<div class='aviso'>Estás pidiendo Carpeta Médica para un tercero. <button onclick='return traerMisDatos();' >Cancelar</button></div>");
		var XHRFamTercero = $.ajax({
			type: "POST",url: "carpeta_medica",
			data:{  accion: 'traerFamiliaresParaTercero',
					terceroDOC: nroDoc,
					terceroID: idPer
				}
		});
		XHRFamTercero.done(function(response){
			var famTercero = $.parseJSON(response);
			$("#familiarEnfermo").empty();
			var fila = $("<option value=''>&nbsp;</option>");
			$("#familiarEnfermo").append(fila);
			if(famTercero !== null){
				var largo = famTercero.length,
				element = null;
				for (var i = 0; i < largo; i++){
					element = famTercero[i];
					fila = $("<option value='"+element[1]+"'>"+element[2]+","+element[3]+"</option>");
					$("#familiarEnfermo").append(fila);
				}
			}
		});
	});
}

function traerMisDatos(){

	$("#idPerTer").val("0");
	$("#docPerTer").val("0");

	var XHRCM = $.ajax({
		type: "POST",url: "carpeta_medica",
		data:{  accion: 'traerDatosParaMi' }
	});
	XHRCM.done(function(response){
		var misDatos = $.parseJSON(response);		
		if(misDatos === null){
			$("#familiarEnfermo").empty();
			$("#avisoDeTercero").empty();
			$("#avisoDeTercero").hide();		
			return false;
		}else{
			ponerDatosEnFormCM(misDatos);		
		}
		
		var XHRFamTercero = $.ajax({
			type: "POST",url: "carpeta_medica",
			data:{  accion: 'traerFamiliaresParaTercero',
					terceroDOC: "",
					terceroID: ""
				}
		});
		XHRFamTercero.done(function(response){
			var famTercero = $.parseJSON(response);
			$("#familiarEnfermo").empty();
			var fila = $("<option value=''>&nbsp;</option>");
			$("#familiarEnfermo").append(fila);
			
			if(famTercero !== null){
				var largo = famTercero.length,
				element = null;
				for (var i=0; i<largo; i++){
					element = famTercero[i];
					fila = $("<option value='"+element[1]+"'>"+element[2]+","+element[3]+"</option>");
					$("#familiarEnfermo").append(fila);
				}
			}else{
				$("#avisoDeTercero").empty();
				$("#avisoDeTercero").hide();
				return false;
			}			
		});		
		$("#avisoDeTercero").empty();
		$("#avisoDeTercero").hide();		
	});
}

function ponerDatosEnFormCM(datos){
	$("#id_persona_cm").val(datos.id_persona);
	$("#id_domicilio").val(datos.id_domicilio);
	$("#tipodoc").val(datos.tipodoc);
	$("#documento").val(datos.documento);
	$("#legajo").val(datos.legajo);
	$("#apyn").val(datos.apyn);
	$("#dom_1").val(datos.dom_calle);
	$("#dom_2").val(datos.dom_altura);
	$("#dom_3").val("");
	$("#dom_4").val("");
	$("#dom_5").val(datos.dom_localidad);
	$("#dom_localidad").val(datos.dom_localidad);
	$("#dom_6").val(datos.dom_id_localidad);		
	$("#reparticion").val(datos.reparticion);
	$("#dependencia").val(datos.dependencia);
	$("#tabsCarpetasMedicas").tabs( "option", "active", 0 );
}

function cargaReiteracion(){
	if($("#reiteracion").is(':checked')){
		var XHR = $.ajax({
			type: "POST", 
			url: "carpeta_medica",
			data:{  accion: 'cargaReiteracion',
					idPer: $("#idPerTer").val()
				}
		});
		XHR.done(function(response){
			var valores = $.parseJSON(response);
			//alert(valores[0]);//ok
			//alert(valores[1]);//id_tipo_carpeta_medica
			//alert(valores[2]);//id_familiar
			if (valores[0] != '0'){
				$("#domi").prop("checked","checked"); //MODALIDAD DOMICILIARIA
				$("#domi").prop("disabled",true); //MODALIDAD DOMICILIARIA
				$("#ambu").prop("disabled",true); //MODALIDAD DOMICILIARIA
				$("#datepicker").val(diaHoy('-'));
				$("#datepicker").prop("disabled",true);
				$("#tipo_solicitud option[value="+ valores[1] +"]").prop("selected",true);
				$("#tipo_solicitud").prop("disabled",true);
				//TIPO SOLICITUD -> SI ES FAMILIAR ENFERMO -> VIENE FAMILIAR
				if (valores[2] != '0'){					
					toggleFamiliares(15,true);
					$("#familiarEnfermo option[value="+ valores[2] +"]").prop("selected",true);
					$("#familiarEnfermo").prop("disabled",true);
				}
			}else{
				alertar("No hay carpetas médicas para reiterar");
				$("#reiteracion").removeAttr("checked");
			}
		});	
	}else{
		$( "#loading" ).show();
		location.href="carpeta_medica";
	}
}

function openDialogLocalidades(){
	$("#autoCompletarLocalidad").val("");
	$("#dialogLocalidad").dialog("open");
}

function imprimirCarpeta(id){
	window.location.href= "pdf_carpeta_medica?id="+id;
	return false;	
}