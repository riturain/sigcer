<?php
/**
 * Created by PhpStorm.
 * User: flezano@gmail.com
 * Date: 6/12/2016
 * Time: 9:43 AM
 *
 * ARchivo de funciones comunes para toda la App
 */

function salirApp($session)
{
    $session->destroy();
    unset($_SESSION['refererUrl']);
    header("Location: " . get_url('login'));
    exit;
}

/**
 * paginasIgnoradasUrlReferer
 *
 * Array de url excluidas para guardar y luego redireccionar
 *
 */
function paginasIgnoradasUrlReferer()
{
    return array(
        '/login',
        '/cerrar',
        '/session',
        '/check_organismo',
        '/favicon.ico'
    );
}

/**
 * irUrl
 *
 * Genera la url destino para la redireccion cuando se accede desde fuera de la app
 *
 */
function irUrl()
{
    $paginasIgnoradasUrlReferer = paginasIgnoradasUrlReferer();
    $irUrl = (isset($_SESSION['refererUrl']) && !in_array($_SESSION['refererUrl'], $paginasIgnoradasUrlReferer))
        ? $_SESSION['refererUrl']
        : 'home';
    return $irUrl;
}






