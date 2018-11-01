var poblacion = [];
var poblacionAlInicio = [];
var i,j;
var sumaTotal = 0;
var fitnessAcumulado = 0;
var datosGeneraciones = [];

//Variables iniciales
var pc = 0.70;
var genes = 30; // numero de bits que utlizaremos 
var pm = 0.0555;
var poblacionInicial = 50;
var generaciones = 30;

$(document).ready(function(){
    $('form').submit(function(){
        return false;
    });
    $('#activa-evo').on('click', evoluciona);
});

/*Funcion que genera el algoritmo genetico*/
function evoluciona(){

    poblacionInicial 	= $('#poblacion').val();
    pc 					= $('#cruzamiento').val();
    pm 					= $('#mutacion').val();
    generaciones 		= $('#generaciones').val();
    iniciaPoblacion();

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
    console.log(poblacion);
}


/*Evalua la población asignado su calificacion(Fitness)*/



//Probabilidad de selección


//Genera un número aleatorio.
function numeroAleatorio(){
    var numero = Math.round(Math.random());
    return numero;
}