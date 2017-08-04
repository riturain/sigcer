{% if session.existe('rojo') %}
    <div id="mensajeCarga" name="error" style="display:none;">{{session.flash('rojo')|raw}}</div>
{% endif %}
{% if session.existe('verde') %}
    <div id="mensajeCarga" name="done" style="display:none;">{{session.flash('verde')|raw}}</div>
{% endif %}
{% if session.existe('amarillo') %}
    <div id="mensajeCarga" name="warning" style="display:none;">{{session.flash('amarillo')|raw}}</div>
{% endif %}
{% if session.existe('celeste') %}
    <div id="mensajeCarga" name="info" style="display:none;">{{session.flash('celeste')|raw}}</div>
{% endif %}