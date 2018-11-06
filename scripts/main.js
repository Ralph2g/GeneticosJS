var poblacion = [];
var poblacionAlInicio = [];
var i,j;
var sumaTotal = 0;
var datosGeneraciones = [];
var numA;
//restricciones
var r1 = []; //a,b,c,d, <=>, restriccion
var r2 = [];
var r3 = [];
var r4 = [];
var r5 = [];
//
var rx=[];
var ry=[];
var rz=[];
var rw=[];
//Rangos de las variables 
var rangoX = [0,0];// rango de las variables
var rangoY = [0,0];// rango de las variables
var rangoZ = [0,0];// rango de las variables
var rangoW = [0,0];// rango de las variables
//Variables iniciales
var genes = 30; // numero de bits que utlizaremos
var mjX = 0;// numero de cromosomas de cada variable
var mjY = 0;// numero de cromosomas de cada variable
var mjZ = 0;// numero de cromosomas de cada variable
var mjW = 0;// numero de cromosomas de cada variable

var poblacionInicial = 50;
var generaciones = 30;
var x = "poblacion"
$(document).ready(function(){
    $('form').submit(function(){
        return false;
    });
    $('#activa-evo').on('click', evoluciona);
});

/*Funcion que genera el algoritmo genetico*/
function evoluciona(){

    poblacionInicial 	= parseFloat($('#poblacion').val());
    generaciones 		= parseFloat($('#generaciones').val());
    

    //guardamos las restricciones
    r1 = restricciones(1);
    r2 = restricciones(2);
    r3 = restricciones(3);
    r4 = restricciones(4);
    r5 = restricciones(5);
    
    //creamos los rangos de cada una de las varibles}
    console.log("r1");
    console.log(r1);
    console.log("r2");
    console.log(r2);
    rangos()

    // obtenemos los tamaños de cromosomas de cada variable    
    mjX = numMJ(rangoX[0],rangoX[1],1);//enviamos limite inf, limite sup, precision de bit    
    mjY = numMJ(rangoY[0],rangoY[1],1);//enviamos limite inf, limite sup, precision de bit
    mjZ = numMJ(rangoZ[0],rangoZ[1],4);//enviamos limite inf, limite sup, precision de bit
    mjW = numMJ(rangoW[0],rangoW[1],1);//enviamos limite inf, limite sup, precision de bit
        
    genes = mjX + mjY + mjZ + mjW; // definimos el tamaño del vector
    
    iniciaPoblacion();
    console.log(poblacion);
    muta();


    
}

/*Funcion carga una población inicial para evolucionar*/
function iniciaPoblacion(){
    console.log('--- Poblacion Inicial ---');
    poblacion = [];
    for(i=0;i<poblacionInicial;i++){
        
        var objetoInicial = {
            cromosomaindice:0,
            cromosomaArray:[],
            cromosomaValor:0,
            cromosomaArrayX:[],
            cromosomaArrayY:[],
            cromosomaArrayZ:[],
            cromosomaArrayW:[],
            cromosomaValorX:0,
            cromosomaValorY:0,
            cromosomaValorZ:0,
            cromosomaValorW:0,
            
        };
        objetoInicial.cromosomaindice = i+1;
        do {
            var valido = false;
            for(j=0;j<genes;j++){
                var aleatorio = numeroAleatorio();
                objetoInicial.cromosomaArray.push(aleatorio);
            }
            objetoInicial.cromosomaValor = parseFloat(parseInt(objetoInicial.cromosomaArray.join(""),2));// convertimos el binario de la cadena a decimal
            // Cortamos los arreglos en los tamaños correspondientes
            objetoInicial.cromosomaArrayX = objetoInicial.cromosomaArray.slice(0,mjX);//PRIMERO QUE IMPRIME, UNO ANTES DEL QUE IMPRIME
            objetoInicial.cromosomaArrayY = objetoInicial.cromosomaArray.slice(mjX,mjY+mjX);
            objetoInicial.cromosomaArrayZ = objetoInicial.cromosomaArray.slice(mjX+mjY,mjZ+mjX+mjY);
            objetoInicial.cromosomaArrayW = objetoInicial.cromosomaArray.slice(mjZ+mjX+mjY,mjZ+mjX+mjY+mjW);
            
            objetoInicial.cromosomaValorX = valArreglo(objetoInicial.cromosomaArrayX)
            objetoInicial.cromosomaValorY = valArreglo(objetoInicial.cromosomaArrayY)
            objetoInicial.cromosomaValorZ = valArreglo(objetoInicial.cromosomaArrayZ)
            objetoInicial.cromosomaValorW = valArreglo(objetoInicial.cromosomaArrayW)
            
            
            
            if (evaluaCromosoma(objetoInicial.cromosomaValorX,objetoInicial.cromosomaValorY,objetoInicial.cromosomaArrayZ,objetoInicial.cromosomaArrayW))
                valido = true;
        
        }while (valido == false)// fin del while
        

        
        
        
        poblacion.push(objetoInicial);//incluimos a el individuo en nuestra poblacion
        
        
    }// fin del for que genera poblacion individual
    poblacionAlInicio = poblacion; //Guarda la poblacion al inicio para comparar.
    
}

//guarda las Restricciones en arreglos: giTnoy7n
function restricciones(n){
    var r = [0,0,0,0,"",0]
    var letra = ["a","b","c","d","s","cons"]
    if (n == 1 ){
        for (var i = 0; i < 6; i++){
            if (i != 4) 
                r[i] = parseFloat( $('#r1'+letra[i]+'').val() );
            else
                r[i] = $('#r1'+letra[i]+'').val();
                
        }
    }
    if (n == 2) {
        for (var i = 0; i < 6; i++){
            if (i != 4)
            r[i] = parseFloat( $('#r2'+letra[i]+'').val() );
            else
            r[i] = $('#r2'+letra[i]+'').val();
        }
    }
    if (n == 3) {
        for (var i = 0; i < 6; i++){
            if (i != 4)
            r[i] = parseFloat( $('#r3'+letra[i]+'').val() );
            else
            r[i] = $('#r3'+letra[i]+'').val();
        } 
    }
    if (n == 4) {
        for (var i = 0; i < 6; i++){
            if (i != 4)
            r[i] = parseFloat( $('#r4'+letra[i]+'').val() );
            else
            r[i] = $('#r4'+letra[i]+'').val();
        }
        
    }
    if (n == 5) {
        for (var i = 0; i < 6; i++){
            if (i != 4)
            r[i] = parseFloat($('#r5'+letra[i]+'').val() );
            r[i] = $('#r5'+letra[i]+'').val();
        }

    }
    return r;
}

/*Ahora si es rangos */
function rangos(){
    //var rx=[]; objetoInicial.cromosomaArray.push(aleatorio);
    /* cualquiernumero/!=0 */
    if (restriccionValida(r1))
        dividirValores(r1);
    
    if (restriccionValida(r2))
        dividirValores(r2);
        
    if (restriccionValida(r3)) 
        dividirValores(r3);
        
    if (restriccionValida(r4))
        dividirValores(r4);
        
    if (restriccionValida(r5)) 
        dividirValores(r5);
    
    
    rangoX = [0,infinito(Math.max(...rx))];

    rangoY = [0,infinito(Math.max(...ry))];

    rangoZ = [0,infinito(Math.max(...rz))];

    rangoW = [0,infinito(Math.max(...rw))];
    console.log(typeof(rangoW[1]));

}

function restriccionValida(res){
    if (res[0] == 0 && res[1] == 0 && res[2] == 0 && res[3] == 0){
        return false;
    }else {
        return true;
    }
}

function dividirValores(res){
    console.log("Entre ala funcion");
    if(res[0] != 0)
        rx.push(res[5]/res[0]);
    if(res[1] != 0)
        ry.push(res[5]/res[1]);
    if(res[2] != 0)
        rz.push(res[5]/res[2]);
    if(res[3] != 0)
        rw.push(res[5]/res[3]);
        
        console.log(res);
        return 
}
function infinito(number){
    
    if (isFinite(number)) {
        
        return number;
    }
    else 
        return 0;
}
/*Funcion que saca el valor MJ de las variables */
function numMJ(aj,bj,n)
{
    var resultado;
    if (aj == 0 && bj == 0) 
        return resultado = 0;
    else {
    resultado = Math.ceil( Math.log((bj-aj)*( Math.pow(10,n) ))/Math.log(2));//valor techo
    return resultado;
    }
}
//Genera un número aleatorio.
function numeroAleatorio(){
    var numero = Math.round(Math.random());
    return numero;
}


/*Funcion de valor para Xi*/
function numXi()
{
    var aj;
    var decimal;
    var bj;
    var mj;
    var Xn;
    Xn=aj+decimal( (bj-aj)/((Math.pow(2,mj))-1) );
    return Xn;
}
function valArreglo(arreglo){
    var numero = parseFloat(parseInt(arreglo.join(""),2));
    if(isNaN(numero))
        return null;
    else 
        return numero
}

function evaluaCromosoma(cromoX,cromoY,cromoZ,cromoW){


    return true;    
}

function muta()
{
    /*Obteniendo el tamaño del vector */
    var tamV=mjX+mjY+mjZ+mjW;
    console.log( typeof(tamV) );
    console.log(  Math.round(Math.random()*(tamV-1)) );
    /*Generando el numero aleatorio entre 0 y el tamaño del vector */
    numA= parseInt( Math.round(Math.random()*(tamV-1)) );
    console.log(numA);
    /*
    if(objetoInicial.cromosomaArray[numA]==0)
    {
        objetoInicial.cromosomaArray[numA]==1;
    }else
        objetoInicial.cromosomaArray[numA]==0;*/
        
}




// imprimimos que si se guardan los valores de las restricciones en los arreglos 
/*
    for (var i = 0; i < r1.length; i++)
    document.writeln(r1[i]+"<br>")
    
    for (var i = 0; i < r2.length; i++)
    document.writeln(r2[i]+"<br>")
    
    for (var i = 0; i < r3.length; i++)
    document.writeln(r3[i]+"<br>")
    
    for (var i = 0; i < r4.length; i++)
    document.writeln(r4[i]+"<br>")
    
    for (var i = 0; i < r5.length; i++)
    document.writeln(r5[i]+"<br>")
    */