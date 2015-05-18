<?php
header("Content-Type: application/json; charset=utf-8");

$input = '/home/thais/sandbox/python_bk/python_com_php_serial/array_da_serial.py';
$output=array();

exec($input,$output,$soma);
/*var_dump($output[0]);*/

$valores = explode(',', $output[0]);
$valores_finais = array();
for ($i=0; $i < 600 ; $i++) { 
	preg_match("/\d+/", $valores[$i], $matches);
	$valores_finais[$i] = (int)$matches[0];
}	
/*var_dump($valores_finais);*/



$jsonData = json_encode($valores_finais);
echo ($jsonData) ;

/*for($i=0; $i < 600; $i++) { 
	echo "</br>";
	echo($valores_finais[$i]);
}*/


/*echo(intval($output[0]));
echo($output[0]);*/

?>