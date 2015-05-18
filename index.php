<!DOCTYPE html>
<html>
	<head>
		<title>Pong</title>
		<link rel="stylesheet" type="text/css" href="static/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="static/css/style.css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"> </script>
		<script src="http://code.createjs.com/easeljs-0.4.2.min.js"></script>
		<script src="http://code.createjs.com/tweenjs-0.2.0.min.js"></script>
		<script src="http://code.createjs.com/soundjs-0.2.0.min.js"></script>
		<script src="http://code.createjs.com/preloadjs-0.1.0.min.js"></script>
		<script src="http://code.createjs.com/movieclip-0.4.1.min.js"></script>
		<script src="assets/soundjs.flashplugin-0.2.0.min.js"></script>
		<script src="static/js/basico_php_ler_serial.js"></script>
	
		<script src="Main.js"></script>
		
	</head>
	<body onload="Main();">
		<div id="tabela">
			<table class="table">
			  <tr>
			    <th>BPM</th>
			    <th>NIVEL</th>
			  </tr>
			  <tr >
			    <td>BPM<-70</td>
			    <td>FACIL (3)</td>
			  </tr>
			  <tr >
			    <td>70<-BPM<-80</td>
			    <td>MEDIO (4)</td>
			  </tr>
			  <tr >
			    <td>80<-BPM<-90</td>
			    <td>DIFICIL (5)</td>
			  </tr>
			  <tr >
			    <td>90<-BPM</td>
			    <td>HARD (6)</td>
			  </tr>
			</table>
		</div>
		<div id="dados">
			<table class="table">
			  <tr>
			    <th>SEU BPM</th>
			  </tr>
			  <tr>
			    <th><p class="valor">0.0</p></th>
			  </tr>
			  <tr>
			    <th>SEU NIVEL</th>
			  </tr>
			  <tr>
			    <th>
			    	<p id="nivel_bpm"></p>
			    </th>
			  </tr>
			</table>
		</div>
		<div>
			<canvas id="PongStage" width="480" height="320"></canvas>
		</div>	
	</body>
</html>