{% if estilo != "login" %}
    {% if not isMobile %}
        <header id="header" class="page-topbar gob">
            <!-- DROPDOWN OPCIONES -->
            <ul id="menu-usuario" class="dropdown-content">
                <li><a href="mis_tramites"><i class="fa fa-files-o" aria-hidden="true"></i><span>Mis trámites</span></a></li>
                <li class="divider"></li>
                <li><a href="paseo_interactivo"><i class="fa fa-question-circle" aria-hidden="true"></i><span>Mostrar paseo interactivo</span></a></li>
                <li class="divider"></li>
                <li><a href="cerrar"><i class="fa fa-unlock-alt" aria-hidden="true"></i><span>Cerrar sesión</span></a></li>
            </ul>
            <!-- MENÚ SUPERIOR -->  
            <nav class="z-depth-1">
                <div class="nav-wrapper">  
                    <ul id="boton-menu" class="left tooltipped" data-position="bottom" data-delay="1000" data-tooltip="Abrir Menú"> 
                        <li><a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">&#xE5D2;</i></a></li>
                    </ul>
                    <span id="home-shortcut" class="tooltipped" data-position="bottom" data-delay="1000" data-tooltip="Ir a Inicio"></span>
                    <ul id="boton-menu-usuario" class="right hide-on-med-and-down">
                        <li>
                            <a class="dropdown-button text-white row tooltipped" data-position="bottom" data-delay="1000" data-tooltip="Abrir Menú de Usuario" href="#!" data-activates="menu-usuario">
                                <div class="col">
                                    <div class="row" id="header-nombre-usuario">
                                        <div class="col s12">
                                            {% if session.existe('id_usuario') %}{{session.getValue('nyap')|raw}}{% endif %}	
                                        </div>
                                    </div>
                                    <div class="row" id="header-organismo-usuario">
                                        <div class="col s12">
                                            {{session.getValue('organismo')|lower}}
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <img id="imagen-perfil"class="circle" src="{% if session.existe('foto') and session.getValue('foto') != '' %}data:image/jpeg;base64,{{session.getValue('foto')}}{% else %}public/images/perfil/perfil.png{% endif %}"/>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    {% endif %}

    {% if isMobile %}
        <div class="top-mobile-bar">
            <ul class="left" id="boton-menu-mobile-bar"> 
                <li><a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">&#xE5D2;</i></a></li>
            </ul>
        </div>
    {% endif %}
{% endif %}