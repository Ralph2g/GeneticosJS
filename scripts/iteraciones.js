var pAcumulado = 0;

function iteracion1 (){

zAcumulado();
porcentajeZ();
porcentajeAcumuladoZ();
generaAleatorio();
comparaVec(poblacion);
console.log(poblacion);
masDebil();
muta();

generaciones = generaciones - 1;
if (generaciones >= 1){
//reiniciaNivel();
iteracion1() 
}else if(generaciones == 0){
masFuerte();
console.log("El cromosoma mas fuerte es:" + cromosomaFuerte);
}


}

function zAcumulado(){
    poblacion.forEach(element => {
    acumulado += element.cromosomaZ;
});
}

function porcentajeZ(){
    poblacion.forEach(element => {
        element.cromosomazAcumulado = ((element.cromosomaZ)/acumulado)
    });
    
}

function porcentajeAcumuladoZ(){
    poblacion.forEach(element => {

    pAcumulado += element.cromosomazAcumulado;
    element.pAcumulado = pAcumulado;
    if (element.pAcumulado >= 0.99)
        element.pAcumulado =1;
    });
}
function generaAleatorio(){
    poblacion.forEach(element => {
        element.aleatorio = aleatorio01()
    });
}

/*Funcion aleatorio entre 0 y 1 */
function aleatorio01()
{
    return parseFloat(ale01=Math.random().toFixed(2));
}
/*Funcion que compara los vectores que aparecen dentro del rango */
function comparaVec(array){
    for (var i = 0;i<= poblacionInicial-1 ;i++){
        
        compara(poblacion[i].aleatorio,i);
        
        
    }
}

function compara(aleatorio,indice){
    
    if (aleatorio <= poblacion[indice].pAcumulado)
        poblacion[indice].nivel += 1;
    else
        compara(aleatorio,indice+1)
    
}

function masDebil(){
    
    var debil = poblacion[0].nivel;
    cromosomaDebil = 0;
    
    for (var i = 1; i < poblacion.length; i++) {
        
        if (debil > poblacion[i].nivel ) {
            debil = poblacion[i].nivel;
            cromosomaDebil = i;
        }
    }
    
}
function masFuerte (){
    var fuerte = poblacion[0].nivel;
    
    for (var i = 1; i < poblacion.length; i++) {
        if (fuerte < poblacion[i].nivel ) {
            fuerte = poblacion[i].nivel;
            cromosomaFuerte = i;
        }
    }
}


function reiniciaNivel(){
    
    poblacion.forEach( element => {
        element.nivel = 0;
    });
    
}