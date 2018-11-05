var poblacion = [];
var poblacionAlInicio = [];
var i,j;
var sumaTotal = 0;
var fitnessAcumulado = 0;
var datosGeneraciones = [];

var r1 = [0,0,0,0,"",0] //a,b,c,d, <=>, restriccion
var r2 = [0,0,0,0,"",0]
var r3 = [0,0,0,0,"",0]
var r4 = [0,0,0,0,"",0]
var r5 = [0,0,0,0,"",0]
//Variables iniciales
var pc = 0.70;
var genes = 30; // numero de bits que utlizaremos 
var pm = 0.0555;
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

    poblacionInicial 	= $('#poblacion').val();
    generaciones 		= $('#generaciones').val();
    
    iniciaPoblacion();
    restricciones();
    
    document.writeln("la poblacion inicial es de" + poblacionInicial)

}

/*Funcion carga una población inicial para evolucionar*/
function iniciaPoblacion(){
    console.log('--- Poblacion Inicial ---');
    poblacion = [];
    for(i=0;i<poblacionInicial;i++){
        
        var objetoInicial = {
            cromosomaArray:[]
        };
        objetoInicial.cromosomaindice = i;
        for(j=0;j<genes;j++){
            var aleatorio = numeroAleatorio();
            objetoInicial.cromosomaArray.push(aleatorio);
        }
        poblacion.push(objetoInicial);
    }
    poblacionAlInicio = poblacion; //Guarda la poblacion al inicio para comparar.
    r1 = restricciones(1);
    r2 = restricciones(2);
    r3 = restricciones(3);
    r4 = restricciones(4);
    r5 = restricciones(5);
    
    // imprimimos que si se guardan los valores de las restricciones en los arreglos
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


//Probabilidad de selección


//Genera un número aleatorio.
function numeroAleatorio(){
    var numero = Math.round(Math.random());
    return numero;
}

/*Funcion que saca el valor MJ de las variables */
function numMJ()
{
    var bj;
    var aj;
    var n;
    var res;
    var resf;
    res=( Math.log(bj-aj)*( Math.pow(10,n) ))/Math.log(2);
    resf=Math.ceil(res);//Valor Techo
    return resf;
}

/*Funcion convertidora binario a decimal*/
function conv()
{
    var binario;
    var decimal=parseInt(binario,2);
    return decimal;
}

/*Funcion CrearCromosoma*/
function creaC()
{
    var vec=[];
    /*Donce n es el valor de bits que tendra cada cromosoma */
    for(var i=0; i<n; i++)
    {
        num=Math.random;
        if(num>=0.5)
        {
            num=1;
        }else{
            num=0;
        }
        vec.push(num);
    }
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