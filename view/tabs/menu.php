<ul id="slide-out" class="side-nav gob white-text">
    <li class="{% if isMobile %}force-hide{% endif %}"><div class="background"></div></li>
    <li class="divider {% if isMobile %}force-hide{% endif %}"></li>
    <li class="{% if isMobile %}force-hide{% endif %}">
        <a id="search-menu">
            <i class="fa fa-search" aria-hidden="true"></i>
            <span><input id="search-menu-input"></span>
        </a>
    </li>
    <li class="divider {% if isMobile %}force-show{% endif %}"></li>
    {% set cerrarPadre = false %}
    {% for item in menu %}
        {% if cerrarPadre and item.Nivel == 0 %}
            </ul>
            </div>
            </li>
            </ul>
            </li>
            {% set cerrarPadre = false %}
        {% endif %}
        {% if item.Nivel == 0 and item.CantHijos == 0 %}                   
            <li>
                <a href="{{item.Url}}" class="waves-effect waves-sigcer truncate">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <span>{{item.Nombre|raw}}</span>
                </a>
            </li>
        {% endif %}

        {% if item.Nivel == 0 and item.CantHijos > 0 %}
            <li class="{% if isMobile %}force-show{% endif %}">
                <ul class="collapsible collapsible-accordion">
                    <li><a class="collapsible-header waves-effect waves-siape">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                        <span>{{item.Nombre|raw}}</span>
                        </a>
                        <div class="collapsible-body">
                            <ul>
                            {% set cerrarPadre = true %}                                
        {% endif %}

        {% if item.Nivel > 0 %}
            <li class="li-submenu">
                <a href="{{item.Url}}" class="waves-effect waves-sigcer side-nav-submenu">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <span>{{item.Nombre|raw}}</span>
                </a>
            </li>

        {% endif %}            
    {% endfor %}
    {% if cerrarPadre %}
            </ul>
            </div>
            </li>
            </ul>
            </li>
        {% set cerrarPadre = false %}
    {% endif %}
    <li class="divider {% if isMobile %}force-show{% endif %}"></li>
    <li class="{% if isMobile %}force-show{% endif %}">
        <a href="cerrar" class="waves-effect waves-sigcer truncate">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
            <span>Cerrar sesión</span>
        </a>
    </li>            
</ul>