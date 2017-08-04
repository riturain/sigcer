<?php
class SQL2K{
	// DATOS DE LA BASE
	private $serverName = 'HP-GUACHON\SQLEXPRESS'; //localhost
	private $database = 'ACLYA';
	private $user = 'sa';
	private $pass = 'Senasa2016';

	private $conexion;

	public function SQL2K(){
		if (!isset($this->conexion)){
			$connectionInfo = array( "Database"=>$this->database, "UID"=>$this->user, "PWD"=>$this->pass, 'ReturnDatesAsStrings'=>true);
			$this->conexion = sqlsrv_connect( $this->serverName, $connectionInfo);

			if( $this->conexion === false ){
				$err = sqlsrv_errors();
				echo "No se puede conectar a la base de datos: ";
				//echo "<pre>";
				//print_r($err);
				//echo "</pre>";
			}
		}
	}

	public function disconnect(){
		sqlsrv_close($this->conexion);
	}

	public function execute($procedure, $incoming = array()){
		$retOut = 0;
		$hasOut = false;
		$params = array();
		$consulta = "{CALL $procedure(";
		
		//$_SESSION['debug'][] = $incoming;

		foreach($incoming as $key => $value){
			if (substr($consulta, -1) == '?'){
				$consulta .=",?";
			}else{
				$consulta .= "?";
			}
			if ($value['is_out']){
				$hasOut = true;
				$params[] = array($retOut, SQLSRV_PARAM_INOUT, $value['type']);
			}else{
				$params[] = array($value['value'],SQLSRV_PARAM_IN);
			}
		}
		$consulta .= ")}";
		
		/* Execute the query. */				
		$stmt = sqlsrv_query($this->conexion, $consulta, $params);		
		
		if ($hasOut){			
			return $retOut;
		}else{
			return $stmt;
		}
	}

	public function getConexion(){
		return $this->conexion;
	}

	public function consultar($consulta){
		$res = array();
		$stmt = sqlsrv_query($this->conexion, $consulta);
		while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
			$res[] = $row;
		}
		sqlsrv_free_stmt($stmt);
		return $res;
	}

	public function fetchAllRow($resp){
		$res = array();
		while( $arr = sqlsrv_fetch_array( $resp, SQLSRV_FETCH_NUMERIC) ) {
			$res[] = $arr;
		}
		return $res;
		// DEVUELVE $res[0][numeroDeCampo*], $res[1][numeroDeCampo*]
	}

	public function fetchRow($resp){
		return sqlsrv_fetch_array($resp, SQLSRV_FETCH_NUMERIC);
	}

	public function fetchAllAssoc($resp){
		$res = array();
		while ($arr = sqlsrv_fetch_array($resp, SQLSRV_FETCH_ASSOC)){
			$res[] = $arr;
		}
		return $res;
		// DEVUELVE $res[0][nombreCampo], $res[1][nombreCampo]
	}

	public function fetchAssoc($resp){
		return sqlsrv_fetch_array($resp, SQLSRV_FETCH_ASSOC);

	}
}

?>