/*um array de 600 posições, com itens flutuanes, ao add um na ultima 
posição o primeiro se apaga e todos descem um indice. Nao dá pra inicar todos em 0,
 por causa de quando buscar o valor minimo */
var cont;
var Peak_Threshold;
var Minima;
var ADC_Range;
var Sampling_Time = 5;
var Peak_Magnitude;
var Minimum_Peak_Separation = 50;
var Peak_Threshold_Factor = 80;
var Moving_Average_Num = 10;
var Num_Samples = 600;
var valores = [];
var Pulse_Rate;
var ZeroFlag;
var Range;
var Sum_Points;
var Index1;
var Index2;
var Index3;
var Peak1;
var Peak2;
var Peak3;
var PR1;
var PR2;
var BPM;
var bpm_final;


function ler_batimentos(ADC_Value){
	console.log(Array.isArray(ADC_Value));
	RemoveDC(ADC_Value);
	console.log("ADC_Range = "+ADC_Range);
	if(ADC_Range < 50){ /*indica que é so ruido*/
		/*se a diferença entre o pico e o vale for menor que 50, todo o array receberá valor 0, pois diferença menor que 50 idica que não tem pulsação é so ruido*/
	    ZeroFlag = 1;
	    ZeroData(ADC_Value);
	    BPM = 0; 
	    /*fiz isso pq se apos o array setado em zero na função ScaleData retorna um NaN, já que vai dividir os indices por 0, pois o range(diferença entre picos) vai dá 0, e uma divisão por 0 é infinita*/
	} else {
		ZeroFlag=0;
		ScaleData(ADC_Value);
	  	FilterData(ADC_Value);
	  	ComputeHeartRate(ADC_Value);
	}
	/*$("#valor").append("</br>"+BPM);*/
	atualizar_bpm(BPM);
}
function atualizar_bpm(BPM){
	console.log("BPM = ="+BPM);
/*	para mostrar apenas 1 valor apos a virgula*/
    bpm_final = BPM.toFixed(1);
	$('#valor').html(bpm_final);
}
function RemoveDC(ADC_Value){/*Encontra a diferença entre o pico e o vale*/
	Find_Minima(ADC_Value,0);
    Find_Peak(ADC_Value,0);
    ADC_Range = Peak_Magnitude-Minima;
    console.log("Peak_Magnitude = "+Peak_Magnitude);
    console.log("Minima = "+Minima);

/*    Normatiza o array de amostra, subtrai de cada amostra o valor minimo encontrado no array, fazendo com q toda a onda desça para o eixo x*/
    for (var i = 0; i < Num_Samples; i++){ 
	    ADC_Value[i] = ADC_Value[i] - Minima;
	}    
	Minima = 0;
    
}
function Find_Peak(ADC_Value, num){/*Encontra o valor maximo entre o array de taxas*/
	Peak_Magnitude = 0;
	for (var m = num; m < (Num_Samples-num); m++) {
		if(Peak_Magnitude < ADC_Value[m]){
        	Peak_Magnitude = ADC_Value[m];   	
     	}
	};
}
function Find_Minima(ADC_Value, num){ /*Encontra o valor minimo entre o array de taxas*/
    Minima = 1024;
        for (var m = num; m < (Num_Samples-num); m++) {
             if(Minima > ADC_Value[m]){
                  Minima = ADC_Value[m];         
        }
    } 
}
function ZeroData(ADC_Value){ /*todos os valores so array recebem 0*/
    for (var i = 0; i < Num_Samples; i++){
        ADC_Value[i] = 0;     
  }
}
function ScaleData(ADC_Value){
 /*padroniza os valores do aray, evitando por exemplo uma sequencia x 2x 3x 99x 5x, ai ele tipo tipa a media e realoca o array*/
	Find_Peak(ADC_Value,0);
	console.log("minima segunda = "+Minima);
	Range = Peak_Magnitude - Minima;
	// escala valores entre 1 e 1023 
	for (var i = 0; i < Num_Samples; i++){
		ADC_Value[i] = 1 + ((ADC_Value[i]-Minima)*1022)/Range;
	}
	Find_Peak(ADC_Value,0);
	Find_Minima(ADC_Value,0);  
	console.log("Peak_Magnitude = "+Peak_Magnitude);
    console.log("Minima terceira = "+Minima);
}
function FilterData(ADC_Value){
	Num_Points = 2*Moving_Average_Num+1;
	for (var i = Moving_Average_Num; i < Num_Samples-Moving_Average_Num; i++){
		Sum_Points = 0;
		for(var k =0; k < Num_Points; k++){   
			Sum_Points = Sum_Points + ADC_Value[i-Moving_Average_Num+k]; 
		}    
		ADC_Value[i] = Sum_Points/Num_Points; 
	} 
	Find_Peak(ADC_Value,Moving_Average_Num);
	Find_Minima(ADC_Value,Moving_Average_Num);  
	console.log("Peak Magnitude2= "+ Peak_Magnitude + ", Minima2 = "+ Minima);
}
function ComputeHeartRate(ADC_Value){
	Find_Peak(ADC_Value, Moving_Average_Num);
	Find_Minima(ADC_Value, Moving_Average_Num);
	console.log("Peak Magnitude3= "+ Peak_Magnitude + ", Minima = "+ Minima); 
	Range = Peak_Magnitude - Minima;
	console.log("Range = "+ Range); 
	Peak_Threshold = Peak_Magnitude*Peak_Threshold_Factor;
	console.log("Peak_Threshold = "+ Peak_Threshold); 
	Peak_Threshold = Peak_Threshold/100;
	/*Agora vai buscar 3 picos consecutivos*/
	Peak1 = 0;
	Peak2 = 0;
	Peak3 = 0;
	Index1 = 0;
	Index2 = 0;
	Index3 = 0;
	/*Busca o primeiro pico*/
	for (var j = Moving_Average_Num; j < Num_Samples-Moving_Average_Num; j++){
	  if(ADC_Value[j] >= ADC_Value[j-1] && ADC_Value[j] > ADC_Value[j+1] && ADC_Value[j] > Peak_Threshold && Peak1 == 0){
	       Peak1 = ADC_Value[j];
	       Index1 = j; 
	  }
	  /*Procura pelo segundo pico, que esteja no minimo a uma distancia de 10 amostras*/
	  if(Peak1 > 0 && j > (Index1+Minimum_Peak_Separation) && Peak2 == 0){
	     if(ADC_Value[j] >= ADC_Value[j-1] && ADC_Value[j] > ADC_Value[j+1] && 
	     ADC_Value[j] > Peak_Threshold){
	        Peak2 = ADC_Value[j];
	        Index2 = j; 
	     } 
	  } /*Peak1 > 0*/
	  
	  /*Procura pelo terceiro pico, que esteja no minimo a uma distancia de 10 amostras*/
	  if(Peak2 > 0 && j > (Index2+Minimum_Peak_Separation) && Peak3 == 0){
	     if(ADC_Value[j] >= ADC_Value[j-1] && ADC_Value[j] > ADC_Value[j+1] && 
	     ADC_Value[j] > Peak_Threshold){
	        Peak3 = ADC_Value[j];
	        Index3 = j; 
	     } 
	  } /*Peak2 > 0*/

	}  
	PR1 = (Index2-Index1)*Sampling_Time; // In milliseconds
	PR2 = (Index3-Index2)*Sampling_Time;
	console.log("PR1 = "+PR1+", PR2 = "+PR2);
	
	/*Se Math.abs(PR1-PR2) não for maior que 100 ele repete o ultimo valor do BPM*/
	if(PR1 > 0 && (Math.abs(PR1-PR2)) < 100){
		Pulse_Rate = (PR1+PR2)/2;
		BPM = 60000/Pulse_Rate; // In BPM
		console.log("Index2= "+ Index2 + ", Index1 = "+ Index1+", PulseRate= "+Pulse_Rate); 
		console.log("Peak Magnitude= "+ Peak_Magnitude + ", Minima = "+ Minima); 
		console.log("BPM= "+ BPM); 
	}
}

$(document).ready(function(){
	console.log("iniciou");
	setInterval(function(){
	  	$.ajax({
	        type: "GET",
	        url: "return_of_python.php",
	        success: function (data){
	        	console.log(data.length); 
      			ler_batimentos(data);        	
			},
			dataType: "json"
	    });
	}, 3000);	
});
