var poblacion = [];
var poblacionAlInicio = [];
var i,j;
var sumaTotal = 0;
var datosGeneraciones = [];
//restricciones
var r1 = [0,0,0,0,"",0]; //a,b,c,d, <=>, restriccion
var r2 = [0,0,0,0,"",0];
var r3 = [0,0,0,0,"",0];
var r4 = [0,0,0,0,"",0];
var r5 = [0,0,0,0,"",0];
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

    poblacionInicial 	= parseInt($('#poblacion').val());
    generaciones 		= parseInt($('#generaciones').val());
    

    //guardamos las restricciones
    r1 = restricciones(1);
    r2 = restricciones(2);
    r3 = restricciones(3);
    r4 = restricciones(4);
    r5 = restricciones(5);
    
    //creamos los rangos de cada una de las varibles}
    
    rangoX = rangos(1,r1,r2,r3,r4)
    rangoY = rangos(2,r1,r2,r3,r4)
    rangoZ = rangos(3,r1,r2,r3,r4)
    rangoW = rangos(4,r1,r2,r3,r4) 
    // obtenemos los tamaños de cromosomas de cada variable    
    mjX = numMJ(rangoX[0],rangoX[1],1);//enviamos limite inf, limite sup, precision de bit    
    mjY = numMJ(rangoY[0],rangoY[1],1);//enviamos limite inf, limite sup, precision de bit
    mjZ = numMJ(rangoZ[0],rangoZ[1],4);//enviamos limite inf, limite sup, precision de bit
    mjW = numMJ(rangoW[0],rangoW[1],1);//enviamos limite inf, limite sup, precision de bit
        
    genes = mjX + mjY + mjZ + mjW; // definimos el tamaño del vector
    
    iniciaPoblacion();
    
    
}

/*Funcion carga una población inicial para evolucionar*/
function iniciaPoblacion(){
    console.log('--- Poblacion Inicial ---');
    poblacion = [];
    for(i=0;i<poblacionInicial;i++){
        
        var objetoInicial = {
            cromosomaindice:0,
            cromosomaArray:[],
            cromosomaValor:0
        };
        objetoInicial.cromosomaindice = i+1;
        
        for(j=0;j<genes;j++){
            var aleatorio = numeroAleatorio();
            objetoInicial.cromosomaArray.push(aleatorio);
        }
        objetoInicial.cromosomaValor = parseInt(objetoInicial.cromosomaArray.join(""),2);// convertimos el binario de la cadena a decimal
        poblacion.push(objetoInicial);//incluimos a el individuo en nuestra poblacion
    }
    poblacionAlInicio = poblacion; //Guarda la poblacion al inicio para comparar.
    
}

//guarda las Restricciones en arreglos: giTnoy7n
function restricciones(n){
    var r = [0,0,0,0,"",0]
    var letra = ["a","b","c","d","s","cons"]
    if (n == 1 ){
        for (var i = 0; i < 6; i++)
        r[i] = $('#r1'+letra[i]+'').val();
    }
    if (n == 2) {
        for (var i = 0; i < 6; i++)
        r[i] = $('#r2'+letra[i]+'').val();
    }
    if (n == 3) {
        for (var i = 0; i < 6; i++) 
        r[i] = $('#r3'+letra[i]+'').val();
    }
    if (n == 4) {
        for (var i = 0; i < 6; i++)
        r[i] = $('#r4'+letra[i]+'').val();
    }
    if (n == 5) {
        for (var i = 0; i < 6; i++)
            r[i] = $('#r5'+letra[i]+'').val();
    }
    return r;
}

//
function rangos(elem,r1,r2,r3,r4,r5){
    
    switch (elem) {
        case 1:
            
            return elem = [0,4]
            break;
        case 2:
            
            return elem = [2,8]
            break;
        case 3:
            
            return elem = [0,0]
            break;
        case 4:
            return elem = [0,0]
            break;        
    }
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