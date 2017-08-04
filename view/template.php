{% extends "./layoutTwig.php" %}
{% block contenido %}  
<section>
    <div class="row">
        <div class="col s12">
            <h1>Prueba H1</h1>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <h2>Prueba H2</h2>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <h3>Prueba H3</h3>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <h4>Prueba H4</h4>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <h5>Prueba H5</h5>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <div class="row botonera">
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i>Botón Volver</a>
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-plus" aria-hidden="true"></i>Botón Agregar</a>
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-trash" aria-hidden="true"></i>Botón Quitar</a>
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-eye" aria-hidden="true"></i>Botón Ver</a>
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-print" aria-hidden="true"></i>Botón Imprimir</a>
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-check" aria-hidden="true"></i>Botón Aplicar</a>
                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-floppy-o" aria-hidden="true"></i>Botón Guardar</a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <div class="row botonera">
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip..." onclick="imprimir('testimpresion', []);"><i class="fa fa-print" aria-hidden="true"></i>Imprimir</a>
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip...">Tooltip</a>
                <a class="waves-effect waves-light btn tooltipped" href="#modalprueba" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip...">Modal Normal</a>
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip..." onclick="msgBox('Título del Modal', 'warning', 'Este es el texto que se va a mostrar en el mensaje... puede ser cualquier cosa, incluso elementos para solicitar campos.', 'ConfirmCancel', 'alert(\'El usuario presionó aceptar\');');">Modal Script</a>
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip..." onclick="alerta('Esto es un toast de alerta.','warning');">Toast Warning</a>
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip..." onclick="alerta('Esto es un toast de peligro.','error');">Toast Error</a>
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip..." onclick="alerta('Esto es un toast de info.','done');">Toast Correcto</a>
                <a class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Esto es un tooltip..." onclick="alerta('Ingrese una actitud o conocimiento.','info');">Toast Info</a>
            </div>
        </div>
    </div>
</section>

<section class="printable">
    <div class="row">
        <div class="col s12">
            <h5>Ejemplo Formulario</h5>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12 l6">
            <input type="text" id="campo1" name="campo1" />
            <label for="campo1">Campo 1: </label>
        </div>
        <div class="input-field col s12 l6">
            <input class="datepicker" type="text" id="campo2" name="campo2" />
            <label for="campo2">Date Picker: </label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12 ">
            <select id="option1">
                <option value="">Seleccione una Opción</option>
                <option  value='1'>Valor 1</option>
                <option  value='2'>Valor 2</option>
                <option  value='3'>Valor 3</option>
                <option  value='4'>Valor 4</option>
            </select>
            <label for="option1">Select 1: </label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s6 ">
            <select id="option2">
                <option value="">Seleccione una Opción</option>
                <option  value='1'>Valor 1</option>
                <option  value='2'>Valor 2</option>
                <option  value='3'>Valor 3</option>
                <option  value='4'>Valor 4</option>
            </select>
            <label for="option2">Select 2: </label>
        </div>
        <div class="input-field col s6 ">
            <select id="option3" class="browser-default">
                <option value="">Seleccione una Opción</option>
                <option  value='1'>Valor 1</option>
                <option  value='2'>Valor 2</option>
                <option  value='3'>Valor 3</option>
                <option  value='4'>Valor 4</option>
            </select>
            <label for="option3">Select 3: </label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s6 ">
            <select id="option4" class="browser-default">
                <option value="">Seleccione una Opción</option>
                <option  value='1'>Valor 1</option>
                <option  value='2'>Valor 2</option>
                <option  value='3'>Valor 3</option>
                <option  value='4'>Valor 4</option>
                <option  value='5'>Valor 1</option>
                <option  value='6'>Valor 2</option>
                <option  value='7'>Valor 3</option>
                <option  value='8'>Valor 4</option>
            </select>
            <label for="option4">Select 4: </label>
        </div>
        <div class="input-field col s6 ">
            <select id="option5">
                <option value="">Seleccione una Opción</option>
                <option  value='1'>Valor 1</option>
                <option  value='2'>Valor 2</option>
                <option  value='3'>Valor 3</option>
                <option  value='4'>Valor 4</option>
            </select>
            <label for="option5">Select 5: </label>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12">
            <input type="text" id="campo3" name="campo3" />
            <label for="campo3">Campo 3: </label>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12 l3">
            <input type="text" id="campo11" name="campo11" />
            <label for="campo1">Campo 11: </label>
        </div>
        <div class="input-field col s12 l3">
            <select id="campo12">
                <option value="">Seleccione una Opción</option>
                <option  value='1'>Valor 1</option>
                <option  value='2'>Valor 2</option>
                <option  value='3'>Valor 3</option>
                <option  value='4'>Valor 4</option>
            </select>
            <label for="campo12">Campo 12: </label>
        </div>

        <div class="input-field col s12 l3">
            <input type="checkbox" name="campo13" id="campo13" >
            <label for="campo13">Actualmente</label>
        </div>
        <div class="input-field col s12 l3">
            <input type="number" id="campo14" name="campo14" />
            <label for="campo14">Campo 14: </label>
        </div>
    </div>
</section>


<section class="printable">
    <div class="row">
        <div class="col s12">
            <h5>Ejemplo Acordeon</h5>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="collapsible" data-collapsible="accordion">
                <li>
                    <div class="collapsible-header">Item 1</div>
                    <div class="collapsible-body">
                        <p>Esto es Texto:<br>Mas Texto....<br>mucho mas texto...</p>
                        <div class="row botonera">
                            <div class="col s12">
                                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-plus" aria-hidden="true"></i>Botón Agregar</a>
                                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-trash" aria-hidden="true"></i>Botón Quitar</a>
                                <a class="waves-effect waves-light btn" href="#"><i class="fa fa-eye" aria-hidden="true"></i>Botón Ver</a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">Item 2</div>
                    <div class="collapsible-body"><p>Esto es Texto:<br>Mas Texto....<br>mucho mas texto...</p></div>
                </li>
                <li>
                    <div class="collapsible-header">Item 3</div>
                    <div class="collapsible-body"><p>Esto es Texto:<br>Mas Texto....<br>mucho mas texto...</p></div>
                </li>
                <li>
                    <div class="collapsible-header">Item 4</div>
                    <div class="collapsible-body">

                        <div class="row">
                            <div class="col s12">
                                <h2>Ejemplo Tabla en Acordión</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <table id="tabla3" class="responsive-table striped centered datatable">
                                    <thead>
                                        <tr>
                                            <th data-field="campo1">Campo 1</th>
                                            <th data-field="campo2">Campo 2</th>
                                            <th data-field="campo3">Campo 3</th>
                                            <th data-field="campo4">Campo 4</th>
                                            <th data-field="campo5">Campo 5</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Prueba 1A<div class="chip">Chip</div></td>
                                            <td>Prueba 1B</td>
                                            <td>Prueba 1C</td>
                                            <td>Prueba 1D</td>
                                            <td>Prueba 1E</td>
                                        </tr>
                                        <tr>
                                            <td>Prueba 2A<div class="chip gob">Chip</div></td>
                                            <td>Prueba 2B</td>
                                            <td>Prueba 2C</td>
                                            <td>Prueba 2D</td>
                                            <td>Prueba 2E</td>
                                        </tr>
                                        <tr>
                                            <td>Prueba 3A<div class="chip red">Chip</div></td>
                                            <td>Prueba 3B</td>
                                            <td>Prueba 3C</td>
                                            <td>Prueba 3D</td>
                                            <td>Prueba 3E</td>
                                        </tr>
                                    </tbody>
                                </table>                
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>

<section class="printable">
    <div class="row">
        <div class="col s12">
            <h5>Ejemplo Tabla</h5>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <table id="tabla1" class="responsive-table striped centered datatable">
                <thead>
                    <tr>
                        <th data-field="campo1">Campo 1</th>
                        <th data-field="campo2">Campo 2</th>
                        <th data-field="campo3">Campo 3</th>
                        <th data-field="campo4" class="thbutton"></th>
                        <th data-field="campo5" class="thbutton"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prueba 1A</td>
                        <td>Prueba 1B</td>
                        <td>Prueba 1C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 2A</td>
                        <td>Prueba 2B</td>
                        <td>Prueba 2C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 3A</td>
                        <td>Prueba 3B</td>
                        <td>Prueba 3C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 1A</td>
                        <td>Prueba 1B</td>
                        <td>Prueba 1C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 2A</td>
                        <td>Prueba 2B</td>
                        <td>Prueba 2C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 3A</td>
                        <td>Prueba 3B</td>
                        <td>Prueba 3C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 1A</td>
                        <td>Prueba 1B</td>
                        <td>Prueba 1C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 2A</td>
                        <td>Prueba 2B</td>
                        <td>Prueba 2C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 3A</td>
                        <td>Prueba 3B</td>
                        <td>Prueba 3C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 1A</td>
                        <td>Prueba 1B</td>
                        <td>Prueba 1C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 2A</td>
                        <td>Prueba 2B</td>
                        <td>Prueba 2C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 3A</td>
                        <td>Prueba 3B</td>
                        <td>Prueba 3C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 1A</td>
                        <td>Prueba 1B</td>
                        <td>Prueba 1C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 2A</td>
                        <td>Prueba 2B</td>
                        <td>Prueba 2C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td>Prueba 3A</td>
                        <td>Prueba 3B</td>
                        <td>Prueba 3C</td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></td>
                        <td class="waves-effect waves-light btn tooltipped" data-position="top" data-delay="50" data-tooltip="Ver"><i class="fa fa-eye" aria-hidden="true"></i></td>
                    </tr>
                </tbody>
            </table>                
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <div class="row botonera">
                <a class="waves-effect waves-light btn" onclick="refreshDataTable('#tabla1');"><i class="fa fa-chevron-up" aria-hidden="true"></i>Prueba Refresh Datatable</a>
            </div>
        </div>
    </div>



</section>



<section class="printable">
    <div class="row">
        <div class="col s12">
            <h5>Ejemplo Pestañas</h5>
        </div>
    </div>
    <div class="row">
        <div class="col s12">

            <ul class="tabs">
                <li class="tab"><a class="active" href="#tabs-1">Pestaña 1</a></li>
                <li class="tab"><a href="#tabs-2">Pestaña 2</a></li>
                <li class="tab"><a href="#tabs-3">Pestaña 3</a></li>
                <li class="tab"><a href="#tabs-4">Pestaña 4</a></li>
            </ul>
            <div id="tabs-1" class="tab-content">
                <p> texto adentro del tab 1 </p>
                <div class="row botonera">
                    <div class="col s12">
                        <a class="waves-effect waves-light btn" href="#"><i class="fa fa-plus" aria-hidden="true"></i>Botón Agregar</a>
                        <a class="waves-effect waves-light btn" href="#"><i class="fa fa-trash" aria-hidden="true"></i>Botón Quitar</a>
                        <a class="waves-effect waves-light btn" href="#"><i class="fa fa-eye" aria-hidden="true"></i>Botón Ver</a>
                    </div>
                </div>
            </div>
            <div id="tabs-2" class="tab-content">
                <div class="row">
                    <div class="col s12">
                        <h3>Ejemplo Tabla en Tabs</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <table id="tabla2" class="responsive-table striped centered datatable">
                            <thead>
                                <tr>
                                    <th data-field="campo1">Campo 1</th>
                                    <th data-field="campo2">Campo 2</th>
                                    <th data-field="campo3">Campo 3</th>
                                    <th data-field="campo4">Campo 4</th>
                                    <th data-field="campo5">Campo 5</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Prueba 1A</td>
                                    <td>Prueba 1B</td>
                                    <td>Prueba 1C</td>
                                    <td>Prueba 1D</td>
                                    <td>Prueba 1E</td>
                                </tr>
                                <tr>
                                    <td>Prueba 2A</td>
                                    <td>Prueba 2B</td>
                                    <td>Prueba 2C</td>
                                    <td>Prueba 2D</td>
                                    <td>Prueba 2E</td>
                                </tr>
                                <tr>
                                    <td>Prueba 3A</td>
                                    <td>Prueba 3B</td>
                                    <td>Prueba 3C</td>
                                    <td>Prueba 3D</td>
                                    <td>Prueba 3E</td>
                                </tr>

                            </tbody>
                        </table>                
                    </div>
                </div>
            </div>
            <div id="tabs-3" class="tab-content">
                <div class="row">
                    <div class="col s12">
                        <h5>Prueba H5</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <div class="card">
                            <div class="card-content white">
                                Prueba de tarjeta
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="tabs-4" class="tab-content">
                <div class="row">
                    <div class="col s12">
                        <h4>Prueba H4</h4>
                    </div>
                </div>
                <p> texto adentro del tab 4 </p>
            </div>
        </div>
    </div>
</section>




<section class="printable">
    <div class="row">
        <div class="col s12">
            <h5>Ejemplo Paginado</h5>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="pagination">
                <li class="disabled"><a href="#!"><i class="material-icons">&#xE045;</i></a></li>
                <li class="active"><a href="#!">1</a></li>
                <li><a href="#!">2</a></li>
                <li><a href="#!">3</a></li>
                <li><a href="#!">4</a></li>
                <li><a href="#!">5</a></li>
                <li><a href="#!"><i class="material-icons">&#xE044;</i></a></li>
            </ul>
        </div>
    </div>
</section>


<div id='modalprueba' class='modal modal-fixed-footer'>
    <div class="modal-content">
        <div class="row">
            <div class="col s12">
                <h3>Título del Modal</h3>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m2 l2 center-align">
                <i class="large material-icons">&#xE000;</i>
            </div>
            <div class="col s12 m10 l10">
                Este es el texto que se va a mostrar en el mensaje... puede ser cualquier cosa, incluso elementos para solicitar campos.
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect btn-flat waves-red" name="no" value="no" onclick="">Cancelar</a>
        <a class="modal-action modal-close waves-effect btn-flat waves-green" name="si" value="si" onclick="">Aceptar</a>
    </div>
</div>
{% endblock %}