$(document).ready(function(){	
	//	$("#btnCambiaDistrito").hide();
	
	/* 2 ----------------------------------------------------------------------------- */
	
	//$("#otroTitCapDocente").val("");
	//$("#otroTitCapDocente").prop("disabled","disabled");
	//$("#titCapDocente").val("");
	//$("#titCapDocente").removeAttr("disabled");	
	$("#dialog2").dialog({
		autoOpen: false,
		height: 200,
		width: 450,
		modal: true,
		buttons: {
			"Aceptar":  function() {
				//if ((($("#titCapDocente").val() != "") || ($("#otroTitCapDocente").val() != "")) && ($("#expedidoPor").val() != "")){
				if (($("#titCapDocente").val() != "") && ($("#expedidoPor").val() != "")){
					//agregar fila
					//var dato = "";
					//if ($("#titCapDocente").val() != ""){
						dato = $("#titCapDocente").val();
					//}else{
					//	dato = $("#otroTitCapDocente").val();
					//}					
					var fila = $("<tr>"
						+"<td>"+dato+"<input type=\"hidden\" name=\"titCapDoc[]\" value=\""+dato+"\" /></td>"
						+"<td>"+$("#expedidoPor").val()+"<input type=\"hidden\" name=\"expedPor[]\" value=\""+$("#expedidoPor").val()+"\" /></td>"
						+"<td class=\"derecha\"><button type=\"button\" onclick=\"quitarFila(this);return false;\"> - </button></td>"
						+"</tr>");
					$("#tbl2 tbody").append(fila);
					$( this ).dialog( "close" );
				}else{
					alertar("Debe completar todos los campos");
				}
			},
			"Cancelar": function() {$( this ).dialog( "close" );}
		},
		close: function() {
			//limpiar campos
			$("#titCapDocente").val("");
			$("#titCapDocente").removeAttr("disabled");
			$("#expedidoPor").val("");
			//$("#otroTitCapDocente").val("");
			//$("#otroTitCapDocente").prop("disabled","disabled");
			//$("#otro").removeAttr("checked");
		}
	});

	/* 3 --------------------------------------------------------------------------------------------- */
	
	$("#establecimientoAuto3").focus(function(){
		if ($("#distrito3").val() == ""){
			alertar("Seleccione el distrito");
			$("#establecimientoAuto3").val("");
			$("#establecimiento3").val("");
			$("#establecimientoId3").val("");
			$("#distrito3").focus();
		}
	});
	$("#establecimientoAuto3").change(function(){
		if ($("#establecimiento3").val() != $("#establecimientoAuto3").val()){
			$("#establecimientoAuto3").val("");
			$("#establecimiento3").val("");
			$("#establecimientoId3").val("");
		}
	});
	//autocompletar ESTABLECIMIENTO PUNTO 3	
    $("#establecimientoAuto3").autocomplete({
        source: function( request, response ) {
            var parametros = {
                "accion": 'autoCompletarEstablecimiento',
                "term" : request.term,
				"dist" : $("#distrito3").val()
            };
            $.ajax({
                data:  parametros,
                url: 'concurso',
                type:  'post',
                dataType: "json",
                success: function( data ) {
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
        minLength: 2,
        autoFocus: true,
        select: function( event, ui ) {
			$("#establecimientoId3").val(ui.item.id);
			$("#establecimiento3").val(ui.item.label);
        }
    });
	
	//$("#cantModHsCat3").mask("999",{placeholder:" "});
	//$("#ptsDocente").mask("999.99",{placeholder:" "});
	$("#dialog3").dialog({
		autoOpen: false,
		height: 400,
		width: 450,
		modal: true,
		buttons: {
			"Aceptar":  function() {
				//agregar fila
				if (($("#dirDocente3").val() != "") &&
					($("#distrito3").val() != "") &&
					($("#establecimientoAuto3").val() != "") &&
					($("#cargoMatEspCurr").val() != "") &&
					($("#asignatura3").val() != "") &&
					($("#cantModHsCat3").val() != "") &&
					($("#ptsDocente").val() != "")){

					var fila = $("<tr>"
						+"<td>"+$("#dirDocente3 option:selected").text()
							+"<input type=\"hidden\" name=\"dirDocente3[]\" value=\""+$("#dirDocente3").val()+"\" />"
							+"<input type=\"hidden\" name=\"dirDocente3text[]\" value=\""+$("#dirDocente3 option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#distrito3 option:selected").text()
							+"<input type=\"hidden\" name=\"distrito3[]\" value=\""+$("#distrito3").val()+"\" />"
							+"<input type=\"hidden\" name=\"distrito3text[]\" value=\""+$("#distrito3 option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#establecimientoAuto3").val()
							+"<input type=\"hidden\" name=\"establecimientoId3[]\" value=\""+$("#establecimientoId3").val()+"\" />"
							+"<input type=\"hidden\" name=\"establecimientoText3[]\" value=\""+$("#establecimiento3").val()+"\" />"
							+"</td>"
						+"<td>"+$("#cargoMatEspCurr option:selected").text()
							+"<input type=\"hidden\" name=\"cargoMatEspCurr[]\" value=\""+$("#cargoMatEspCurr").val()+"\" />"
							+"<input type=\"hidden\" name=\"cargoMatEspCurrText[]\" value=\""+$("#cargoMatEspCurr option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#asignatura3").val()
							+"<input type=\"hidden\" name=\"asignatura3[]\" value=\""+$("#asignatura3").val()+"\" />"
							+"</td>"
						+"<td>"+$("#cantModHsCat3").val()
							+"<input type=\"hidden\" name=\"cantModHsCat3[]\" value=\""+$("#cantModHsCat3").val()+"\" />"
							+"</td>"
						+"<td>"+$("#ptsDocente").val()
							+"<input type=\"hidden\" name=\"ptsDocente[]\" value=\""+$("#ptsDocente").val()+"\" />"
							+"</td>"
						+"<td class=\"derecha\"><button type=\"button\" onclick=\"quitarFila(this);return false;\"> - </button></td>"
						+"</tr>");
					$("#tbl3 tbody").append(fila);
					$( this ).dialog( "close" );
				}else{
					alertar("Debe completar todos los campos");
				}
			},
			"Cancelar": function() {$( this ).dialog( "close" );}
		},
		close: function() {
			//limpiar campos
			$("#dirDocente3").val("");
			$("#distrito3").val("");
			$("#establecimientoAuto3").val("");
			$("#cargoMatEspCurr").val("");
			$("#asignatura3").val("");
			$("#cantModHsCat3").val("");
			$("#ptsDocente").val("");
		}
	});
	
	/* 4 ------------------------------------------------------------------------ */
	$("#establecimientoAuto4a").focus(function(){
		if ($("#distrito4").val() == ""){
			alertar("Seleccione el distrito");
			$("#establecimientoAuto4a").val("");
			$("#establecimiento4a").val("");
			$("#establecimientoId4a").val("");
			$("#distrito4").focus();
		}
	});
	$("#establecimientoAuto4a").change(function(){
		if ($("#establecimiento4a").val() != $("#establecimientoAuto4a").val()){
			$("#establecimientoAuto4a").val("");
			$("#establecimiento4a").val("");
			$("#establecimientoId4a").val("");
		}
	});
	//autocompletar ESTABLECIMIENTO PUNTO 4a	
    $("#establecimientoAuto4a").autocomplete({
        source: function( request, response ) {
            var parametros = {
                "accion": 'autoCompletarEstablecimiento',
                "term" : request.term,
				"dist" : $("#distrito4").val()
            };
            $.ajax({
                data:  parametros,
                url: 'concurso',
                type:  'post',
                dataType: "json",
                success: function( data ) {
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
        minLength: 2,
        autoFocus: true,
        select: function( event, ui ) {
			$("#establecimientoId4a").val(ui.item.id);
			$("#establecimiento4a").val(ui.item.label);
        }
    });
	
	$("#establecimientoAuto4b").focus(function(){
		if ($("#distrito4").val() == ""){
			alertar("Seleccione el distrito");
			$("#establecimientoAuto4b").val("");
			$("#establecimiento4b").val("");
			$("#establecimientoId4b").val("");
			$("#distrito4").focus();
		}
	});
	$("#establecimientoAuto4b").change(function(){
		if ($("#establecimiento4b").val() != $("#establecimientoAuto4b").val()){
			$("#establecimientoAuto4b").val("");
			$("#establecimiento4b").val("");
			$("#establecimientoId4b").val("");
		}
	});
	//autocompletar ESTABLECIMIENTO PUNTO 4a	
    $("#establecimientoAuto4b").autocomplete({
        source: function( request, response ) {
            var parametros = {
                "accion": 'autoCompletarEstablecimiento',
                "term" : request.term,
				"dist" : $("#distrito4").val()
            };
            $.ajax({
                data:  parametros,
                url: 'concurso',
                type:  'post',
                dataType: "json",
                success: function( data ) {
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
        minLength: 2,
        autoFocus: true,
        select: function( event, ui ) {
			$("#establecimientoId4b").val(ui.item.id);
			$("#establecimiento4b").val(ui.item.label);
        }
    });
	
	$("#dialog4").dialog({
		autoOpen: false,
		height: 450,
		width: 450,
		modal: true,
		buttons: {
			"Aceptar":  function() {
				//agregar fila
				if (($("#cargo").val() != "") &&
					($("#dirDocente4").val() != "") &&
					($("#distrito4").val() != "") &&
					($("#establecimiento4a").val() != "") &&					
					($("#cantModHsCat4").val() != "") &&
					($("#cargoMat4").val() != "") &&
					($("#asignatura4").val() != "") &&
					($("#establecimiento4b").val() != "")){
					
					var fila = $("<tr>"						
						+"<td>"+$("#cargo option:selected").text()
							+"<input type=\"hidden\" name=\"cargo[]\" value=\""+$("#cargo").val()+"\" />"
							+"<input type=\"hidden\" name=\"cargoText[]\" value=\""+$("#cargo option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#dirDocente4 option:selected").text()
							+"<input type=\"hidden\" name=\"dirDocente4[]\" value=\""+$("#dirDocente4").val()+"\" />"
							+"<input type=\"hidden\" name=\"dirDocente4Text[]\" value=\""+$("#dirDocente4 option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#distrito4 option:selected").text()
							+"<input type=\"hidden\" name=\"distrito4[]\" value=\""+$("#distrito4").val()+"\" />"
							+"<input type=\"hidden\" name=\"distrito4Text[]\" value=\""+$("#distrito4 option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#establecimiento4a").val()
							+"<input type=\"hidden\" name=\"establecimiento4a[]\" value=\""+$("#establecimientoId4a").val()+"\" />"
							+"<input type=\"hidden\" name=\"establecimientoText4a[]\" value=\""+$("#establecimiento4a").val()+"\" />"
							+"</td>"
						+"<td>"+$("#cantModHsCat4").val()
							+"<input type=\"hidden\" name=\"cantModHsCat4[]\" value=\""+$("#cantModHsCat4").val()+"\" />"
							+"</td>"
						+"<td>"+$("#cargoMat4 option:selected").text()
							+"<input type=\"hidden\" name=\"cargoMat4[]\" value=\""+$("#cargoMat4").val()+"\" />"
							+"<input type=\"hidden\" name=\"cargoMat4Text[]\" value=\""+$("#cargoMat4 option:selected").text()+"\" />"
							+"</td>"
						+"<td>"+$("#asignatura4").val()
							+"<input type=\"hidden\" name=\"asignatura4[]\" value=\""+$("#asignatura4").val()+"\" />"
							+"</td>"
						+"<td>"+$("#establecimiento4b").val()
							+"<input type=\"hidden\" name=\"establecimiento4b[]\" value=\""+$("#establecimientoId4b").val()+"\" />"
							+"<input type=\"hidden\" name=\"establecimientoText4b[]\" value=\""+$("#establecimiento4b").val()+"\" />"
							+"</td>"
						+"<td class=\"derecha\"><button type=\"button\" onclick=\"quitarFila(this);return false;\"> - </button></td>"
						+"</tr>");
					$("#tbl4 tbody").append(fila);					
					$( this ).dialog( "close" );
				}else{
					alertar("Debe completar todos los campos");
				}
			},
			"Cancelar": function() {$( this ).dialog( "close" );}
		},
		close: function() {
			//limpiar campos
			$("#cargo").val("");
			$("#dirDocente4").val("");
			$("#distrito4").val("");
			$("#establecimientoAuto4a").val("");
			$("#establecimiento4a").val("");
			$("#establecimientoId4a").val("");
			$("#cantModHsCat4").val("");
			$("#cargoMat4").val("");
			$("#asignatura4").val("");
			$("#establecimientoAuto4b").val("");
			$("#establecimiento4b").val("");
			$("#establecimientoId4b").val("");
		}
	});
	
	//si traje datos del usuario
	if ($("#cargoSelect").val() != ""){
		cargarCargoSelected($("#cargoSelect").val());
	}
	
	if($("#confirmo").val() == "1"){
		$('#ruta input').prop("disabled","disabled");
		$('#ruta button').hide();
		$('#ruta select').prop("disabled","disabled");
	}
	
});

//function cambiarOtro(){
//	if($("#otro").is(':checked')){
//		$("#titCapDocente").val("");
//		$("#titCapDocente").prop("disabled","disabled");
//		$("#otroTitCapDocente").val("");
//		$("#otroTitCapDocente").removeAttr("disabled");
//	}else{
//		$("#otroTitCapDocente").val("");
//		$("#otroTitCapDocente").prop("disabled","disabled");
//		$("#titCapDocente").val("");
//		$("#titCapDocente").removeAttr("disabled");
//	}
//}

function quitarFila(fila){
	if (confirm("¿Está seguro de querer borrar esta fila?")){
		$(fila).closest("tr").remove();
	}
}

function openDialog2(){
	$("#dialog2").dialog("open");
}
function openDialog3(){
	$("#dialog3").dialog("open");
}
function openDialog4(){
	$("#dialog4").dialog("open");
}

/* -------------------------------- */
function cargarCargoSelected(cargoId){
	if (cargoId != ""){
		$("#cargoSelectedSalva").val($("#cargoSelect option:selected").text());
		var XHR = $.ajax({	
			type: "POST",
			url: "concurso",
			data:{  accion: 'retornaDistritoConcurso',
					concurso: $("#cargoSelect option:selected").text()
				}		
		});	
		XHR.done(function(response){
			var distritos = $.parseJSON(response);
			largo = distritos.length;
			var option;
			$("#distritoSelect").empty();
			if (largo>0){
				$("#distritoSelect").append($("<option value=\"\">Seleccione..</option>"));
				var selected = "";
				for (var x = 0; x < largo; x++){
					selected = "";
					if (($("#recargaDistCargo").val() != "") && (distritos[x]['ID_CONCURSO_DIS'] == $("#recargaDistCargo").val())){
						selected = "selected";
					}
					option = $("<option value=\""+distritos[x]['ID_CONCURSO_DIS']+"\" "+selected+" >"+distritos[x]['DESCRIPCION']+" ("+distritos[x]['REGION']+")</option>");
					$("#distritoSelect").append(option);
				}
			}
			//if ($("#recargaDistCargo").val() != ""){
			//	$("#distritoSelect").val($("#recargaDistCargo").val());
			//	//alert($("#recargaDistCargo").val());				
			//}
		});
	}	
	else{
		$("#distritoSelect").empty();
	}
}
//function cargarDistritoSelected(valor){
//	if (valor != ""){
//		var valores = valor.value.split("**");
//		$("#distritoSelectedId").val(valores[0]);	
//		$("#distritoText").val(valores[1]);	
//		$("#regionText").val(valores[2]);	
//	}else{
//		$("#distritoSelectedId").val("");	
//		$("#distritoText").val("");	
//		$("#regionText").val("");	
//	}
//}
//function cambiarDistrito(){
//	
//}

function isPuntajeKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
		if (charCode == 46){ //punto o coma
			return true;
		}
		return false; 
	}
    return true;
}

function validarPuntaje(){
	//ptsDocente
	if ($("#ptsDocente").val() != ""){
		if ($.isNumeric($("#ptsDocente").val())){
			if ($("#ptsDocente").val().length > 3){
				if (parseInt($("#ptsDocente").val()) > 999.99){
					alertar("Puntaje incorrecto");
					$("#ptsDocente").val("");
				}
			}
		}else{
			alertar("Puntaje incorrecto");
			$("#ptsDocente").val("");
		}
	}
}

function selectDirDocente3(valor){ //valor = id**(1|0)
	if (valor != ""){
		//habilita 12 y 13
		var valores = valor.split("**");
		var tipo;
		switch(valores[1]){
			case '1': tipo = 'NIVEL'; break;
			case '2': tipo = 'MODALIDAD'; break;
		}		
		var XHR = $.ajax({	
			type: "POST",
			url: "concurso",
			data:{  accion: 'cargosXmodalidad',
					tipo: tipo,//nivel o modalidad
					id: valores[0]
				}		
		});	
		XHR.done(function(response){
			var aux = $.parseJSON(response);
			largo = aux.length;
			var option;
			$("#cargoMatEspCurr").empty();
			if (largo>0){
				$("#cargoMatEspCurr").append($("<option value=\"\">Seleccione..</option>"));
				for (var x = 0; x < largo; x++){
					option = $("<option value=\""+aux[x]['ID_CMN']+"\">"+aux[x]['CODIGO']+" - "+aux[x]['DESCRIPCION']+"</option>");
					$("#cargoMatEspCurr").append(option);
				}
			}
		});
	}else{
		//deshabilita 12 y 13
		$("#cargoMatEspCurr").empty();
		$("#cargoMatEspCurr").append($("<option value=\"\">Seleccione..</option>"));
	}
}

//function seleccionaCargo(valor){
//	
//}

function selectDirDocente4(valor){
	if (valor != ""){
		//habilita 12 y 13
		var valores = valor.split("**");
		var tipo;
		switch(valores[1]){
			case '1': tipo = 'NIVEL'; break;
			case '2': tipo = 'MODALIDAD'; break;
		}		
		var XHR = $.ajax({	
			type: "POST",
			url: "concurso",
			data:{  accion: 'cargosXmodalidad',
					tipo: tipo,//nivel o modalidad
					id: valores[0]
				}		
		});	
		XHR.done(function(response){			
			var aux = $.parseJSON(response);
			largo = aux.length;
			var option;
			$("#cargoMat4").empty();
			if (largo>0){
				$("#cargoMat4").append($("<option value=\"\">Seleccione..</option>"));
				for (var x = 0; x < largo; x++){
					option = $("<option value=\""+aux[x]['ID_CMN']+"\">"+aux[x]['CODIGO']+" - "+aux[x]['DESCRIPCION']+"</option>");
					$("#cargoMat4").append(option);
				}
			}
		});
	}else{
		$("#cargoMat4").empty();
		$("#cargoMat4").append($("<option value=\"\">Seleccione..</option>"));
	}
}

function selectDistrito3(){
	if ($("#distrito3").val() == ""){
		$("#establecimientoAuto3").val("");
		$("#establecimiento3").val("");
		$("#establecimientoId3").val("");
	}
}
function selectDistrito4(){
	if ($("#distrito4").val() == ""){
		$("#establecimientoAuto4a").val("");
		$("#establecimientoAuto4b").val("");
		$("#establecimiento4a").val("");
		$("#establecimiento4b").val("");
		$("#establecimientoId4a").val("");
		$("#establecimientoId4b").val("");
	}
}

function guardarForm(){
	//validar si está todo cargado
	if (
		($("#cargoSelect").val() == "") ||
		($("#distritoSelect").val() == "") ||
		($("#tbl2 tbody tr").length == 0) ||
		($("#tbl3 tbody tr").length == 0) ||
		//($("#tbl4 tbody tr").length == 0) ||
		($("#antiDoc").val() == "") ||
		($("#antigDesemp").val() == ""))
	{
		alertar("Debe completar todos los datos");
		return false;	
	}
	var msg = "";
	//var all_answered = true;
	$("input:radio").each(function(){
		var name = $(this).attr("name");
		if($("input:radio[name="+name+"]:checked").length == 0)
		{		
			msg = "Debe completar todos los datos";
		}
	});
	if (msg != ""){
		alertar(msg);
		return false;
	}
	$( "#loading" ).show();
	//submit
	$("#formConcurso").submit();
}

function onSubmitForm(){
	//validar si quiere guardar temporalmente
	if (confirm("¿Desea guardar y confirmar definitivamente? \n Si acepta no podrá editar más sus datos.")){
		if (confirm("¿Está seguro de confirmar el guardado definitivo?, no podrá realizar más cambios")){
			$("#confirmo").val("1");
		}else{
			$("#confirmo").val("0");			
		}
	}else{
		$("#confirmo").val("0");
	}
	$("#accion").val("guardar");
	return true;
}