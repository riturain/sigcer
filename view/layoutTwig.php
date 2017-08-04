<!DOCTYPE html> 
<html lang="es-ES">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" charset="ISO-8859-1"/>
		<title>SIGCER - {{title|raw}}</title>
		<META HTTP-EQUIV="Expires" CONTENT="0"/>
		<meta name="description" content="Sistema SENASA SIGCER Lácteos y Apícolas"/>
		<meta name="keywords" content="sigcer, PORTAL, RRHH, AAFF, Asignaciones Familiares, BSAS"/>
		<meta name="author" content="sigcer - PORTAL - RRHH"/>
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="-1"/>
		<meta http-equiv="expires" content="tue, 01 jan 1980 1:00:00 gmt" />
		<meta http-equiv="pragma" content="no-cache" />
		<link rel="icon" type="image/png" href="./public/images/favicon.ico?v={{ver}}"			/>
		<link rel="stylesheet" href="./public/css/jquery.dataTables.css?v={{ver}}"				/>
		<link rel="stylesheet" href="./public/js/jquery.validate/jquery.validate.css?v={{ver}}"	/>
		<link rel="stylesheet" href="./public/css/font-awesome.min.css?v={{ver}}"				/>
		<link rel="stylesheet" href="./public/css/materialize/materialize.min.css?v={{ver}}"	/>
		<link rel="stylesheet" href="./public/css/sigcer/sigcer-materialize.css?v={{ver}}"		/>
		<link rel="stylesheet" href="./public/css/loaders.min.css?v={{ver}}"					/>	
		{% if css %}
			{% for elCss in css %}
				<link rel='stylesheet' href='./public/css/{{elCss}}.css?v={{ver}}'				/>
			{% endfor %}			
		{% endif %}
		{% block stylesheets %}
		{% endblock %}
	</head>
	<body>
		{% embed "./tabs/avisos.php" %}
        {% endembed %}
		<noscript>
			<div class="row">
				<div class="noscript-body">
					<div class="noscript-content">
						<h6>El sitio de SIGCER necesita JavaScript para funcionar</h6>
						<p>Construimos SIGCER utilizando las últimas tecnologías. Esto permite que SIGCER sea más fácil y rápido de utilizar. Desafortunadamente, su navegador no soporta esas tecnologías.<br><br>Puede ver aquí las <a href="http://www.enable-javascript.com/es/" target="_blank">instrucciones para habilitar JavaScript en su navegador</a> y continuar utilizando SIGCER.</p>
					</div>
				</div>
			</div>
		</noscript>
		<div id="loading" class="spinner">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
		
        {% embed "./tabs/header.php" %}{% endembed %}
		<main>
        {% embed "./tabs/menu.php" %}{% endembed %}
            
            <div class="container">
                <div class="row">	
                    <div class="col s12 m12 l12">
                        {% if estilo != "login" %}
                            <div class="row" id="ayuda">	
                                <div class="col s12 m12 l12">
                                    <h1>{{title|raw}}{% if not isMobile %}<a name="bot_help" id="bot_help" href="javascript:openHelp('{{title|raw}}');" class="bot_help tooltipped unprintable" data-position="top" data-delay="50" data-tooltip="¿Necesita ayuda en esta página?"><i class="fa fa-question-circle gob-text" aria-hidden="true"></i></a>{% endif %}</h1>
                                </div>
                            </div>
                        {% endif %}

                        {% block contenido %}{% endblock %}
                        
                    </div>	
                </div>
            </div>
		</main>
		
        {% if estilo != "login" %}
			<footer class="page-footer grey-text text-lighten-4">
				<div class="container">
					<div class="row">
						<div class="col l4 s12">
							<div class="row">
                                <center>
								    <img src="public/images/ese.png">
                                </center>
							</div>
							<div class="row">
                                <center>
								<h6>SIGCER</h6>
                                </center>
							</div>
						</div>
						<div class="col l8 s12">							
                            <p>Servicio Nacional de Sanidad y Calidad Agroalimentaria - Dirección de Tecnología de la Información</p>
                            <p>Av. Paseo Colón 367 - Piso 11 - Capital Federal - C1063ACD - Buenos Aires, Argentina</p>
                            <p><i class="fa fa-copyright" aria-hidden="true"></i>Copyright 2017 sigcer</p>
						</div>
					</div>
				</div>
				{% if not isMobile %}<div class='volverarriba'><i class="fa fa-chevron-up" aria-hidden="true"></i></div>{% endif %}
			</footer>
		{% endif %}
        
		<script language="javascript" src="./public/js/jquery-1.8.3.min.js?v={{ver}}">                      </script>
		<script language="javascript" src="./public/js/jquery.dataTables.js?v={{ver}}">						</script>
		<script language="javascript" src="./public/js/jquery.validate/jquery.validate.js?v={{ver}}">		</script>
		<script language="javascript" src="./public/js/maskedinput.js?v={{ver}}">							</script>
		<script language="javascript" src="./public/js/validadorMaterialize.js?v={{ver}}">					</script>
		<script language="javascript" src="./public/js/materialize.min.js?v={{ver}}">						</script>
		<script language="javascript" src="./public/js/commons.js?v={{ver}}">								</script>
		<script language="javascript" src="./public/js/bootstrap-tour.js?v={{ver}}">						</script>
		<script language="javascript" src="./public/js/funcionesMaterialize.js?v={{ver}}">					</script>
		<script language="javascript" src="./public/js/materialize-autocomplete.js?v={{ver}}">				</script>
		<script language="javascript" src="./public/js/jquery.Jcrop.min.js?v={{ver}}">						</script>
		
		{% if js %}
			{% for elJs in js %}
				<script language="javascript" src="./public/js/section/{{elJs}}.js?v={{ver}}">				</script>
			{% endfor %}			
		{% endif %}
		
		{% if estilo != "login" %}
			{% if not isMobile %}
				<script language="javascript" src="./public/ayuda/general.js?v={{ver}}">						</script>
				<script language="javascript" src="./public/ayuda/{{session.getValue('ruta')}}.js?v={{ver}}">	</script>
			{% endif %}
		{% endif %}
		
		{% block scripts %}
		{% endblock %}
	</body>
</html>

