//$(document).ready(function(){
//	
//});

//function traerStats(stat){
//	var XHR = $.ajax({
//		type: "POST",		
//		url: "adm_stats.php",
//		data: {
//			accion: stat			
//		},
//		dataType: 'json',
//		//beforeSend: function(){				
//		//	alert("cargando..");
//		//}
//	});
//	XHR.done(function(data){		
//		var largo = data.length;		
//		var grafico = [];
//		var aux = [];
//		var pregunta = data[0]['PREGUNTA'];
//		for (var x = 0; x < largo; x++){
//			//var person = {firstName:"John", lastName:"Doe", age:46};
//			if (pregunta == data[x]['PREGUNTA']){
//				aux.push({name:data[x]['RESPUESTA'], data: data[x]['CANT']});
//			}else{
//				pregunta = data[x]['PREGUNTA'];
//				grafico.push(JSON.stringify(aux));
//				aux = [];
//			}
//		}	
//		var size = grafico.length;
//		for (var x = 0; x < size; x++){
//			alert(grafico[x]);
//			/*
//			$("#container").append($("<div id=\"grafico_"+x+"\"></div>"));
//			
//			$("#grafico_"+x+"").highcharts({
//				chart: {	type: 'bar' },
//				title: {	text: data[x]['PREGUNTA']	},
//				subtitle: {	text: 'sigcer: <a href="http://rrhh.gba.gov.ar">RRHH</a>'	},
//				xAxis: {	categories: ["Pregunta "+x+": "+actual],
//							title: {	text: null	}
//						},
//				yAxis: {	min: 0,
//							title: {	text: 'Cantidad',
//										align: 'high' },
//							labels: { 	overflow: 'justify'	}
//						},
//				tooltip: {	valueSuffix: ' .'	},
//				plotOptions: {	bar: {	dataLabels: {	enabled: true	}	}	},
//				legend: {
//					layout: 'vertical',
//					align: 'right',
//					verticalAlign: 'top',
//					x: -40,
//					y: 80,
//					floating: true,
//					borderWidth: 1,
//					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
//					shadow: true
//				},
//				credits: {
//					enabled: false
//				},
//				series: datos
//			});*/
//		}
//	});
//	XHR.fail(function(data){
//		alert("hubo un error al traer los datos");
//	});
//}