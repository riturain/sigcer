<?php
@session_start();
/*
USAMOS:
=====================================
$_SESSION['sigcer']['ruta'] = "";
$_SESSION['sigcer']['menu'] = array();

$_SESSION['sigcer']['id_usuario'] = "";
$_SESSION['sigcer']['apyn'] = "";
$_SESSION['sigcer']['perfil_completo'] = "";
$_SESSION['sigcer']['cuip'] = "";
$_SESSION['sigcer']['email'] = "";
$_SESSION['sigcer']['id_persona'] = "";
$_SESSION['sigcer']['id_persona_rol'] = "";
$_SESSION['sigcer']['organismo'] = "";
$_SESSION['sigcer']['id_organismo'] = "";
$_SESSION['sigcer']['id_ley'] = "";
$_SESSION['sigcer']['es_autorizante'] = "";
$_SESSION['sigcer']['reporte_errores'] = "";
*/

class Session{
/*
$session = new Session();
$session->destroy() //cerrar sesión
$session->existe($dimension) //if (isset($_SESSION['sigcer'][$dimension]))
$session->getValue($dimension) //return $_SESSION['sigcer'][$dimension];
$session->setValue($dimension,$value) //$_SESSION['sigcer'][$dimension] = $value;
$session->delete($dimension) //unset($_SESSION['sigcer'][$dimension]);
$session->printAll(); //print_r($_SESSION['sigcer']);
$session->print($dimension); //print_r($_SESSION['sigcer'][$dimension]);
$session->flash($dimension); //
*/
    private $dimension = "sigcer";

    public function Session(){
        if (!isset($_SESSION[$this->getDimension()])){
            $_SESSION[$this->getDimension()] = array();
        }
    }

    public function destroy(){
        $_SESSION[$this->getDimension()] = array();
    }

    public function existe($subDime,$s2 = null,$s3 = null,$s4 = null){
        if ($s4 != null){
            if (isset($_SESSION[$this->getDimension()][$subDime][$s2][$s3][$s4])){
                return true;
            }
            return false;
            
        }
        if ($s3 != null){
            if (isset($_SESSION[$this->getDimension()][$subDime][$s2][$s3])){
                return true;
            }
            return false;
        }
        if ($s2 != null){
            if (isset($_SESSION[$this->getDimension()][$subDime][$s2])){
                return true;
            }
            return false;            
        }
        if (isset($_SESSION[$this->getDimension()][$subDime])){
            return true;
        }
        return false;        
    }

    public function usaFiltro($subDime){
        foreach ($this->getFilters() as $valor) {
            if ($_SESSION[$this->getDimension()][$subDime][$valor] != "-") {
                return true;
            }
        }
        return false;
    }

    public function getValue($subDime){
        if (!isset($_SESSION[$this->getDimension()])){
            $_SESSION[$this->getDimension()] = array();
        }
        if (isset($_SESSION[$this->getDimension()][$subDime])){
            return $_SESSION[$this->getDimension()][$subDime];
        }else{
            return false;
        }
    }

    public function setValue($subDime,$value){
        if (!isset($_SESSION[$this->getDimension()])){
            $_SESSION[$this->getDimension()] = array();
        }
        $_SESSION[$this->getDimension()][$subDime] = $value;
    }

    public function delete($subDime){
        if (isset($_SESSION[$this->getDimension()][$subDime])){
            unset($_SESSION[$this->getDimension()][$subDime]);
        }
    }

//  GETTERS Y SETTERS

    public function getDimension(){
        return $this->dimension;
    }
    public function setDimension($dim){
        $this->$dimension = $dim;
    }
    public function getFilters(){
        return $this->filtros;
    }

//  PRINT
    public function sessionPrintAll(){
        if (!isset($_SESSION[$this->getDimension()])){
            $_SESSION[$this->getDimension()] = array();
        }
        print_r($_SESSION[$this->getDimension()]);
    }

    public function sessionPrint($subDime = ""){
        if (!isset($_SESSION[$this->getDimension()])){
            $_SESSION[$this->getDimension()] = array();
        }
        if ($subDime == ""){
            print_r($_SESSION[$this->getDimension()]);
        }else{
            print_r($_SESSION[$this->getDimension()][$subDime]);
        }
    }

    public function to_string(){

        if (isset($_SESSION[$this->getDimension()])){
            return json_encode($_SESSION[$this->getDimension()]);
        }
        return "";

    }

    public function flash($subDime = ""){
        $aux = "";
        if (isset($_SESSION[$this->getDimension()][$subDime])){
            $aux = $_SESSION[$this->getDimension()][$subDime];
            $this->delete($subDime);
        }
        return $aux;
    }

    //echo del session más corto
    public function imprime($subDime = ""){
        if (isset($_SESSION[$this->getDimension()][$subDime])){
            echo $_SESSION[$this->getDimension()][$subDime];         
        }
    }

    //flash con echo ?
    /*
    public function flash_p($subDime = ""){
        $aux = "";
        if (isset($_SESSION[$this->getDimension()][$subDime])){
            $aux = $_SESSION[$this->getDimension()][$subDime];
            $this->delete($subDime);
        }
        echo $aux;
    }
    */
    public function datosSession(){
    
        return $_SESSION[$this->getDimension()];
    }
}

?>