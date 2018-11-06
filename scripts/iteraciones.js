var pAcumulado = 0;

function iteracion1 (){

zAcumulado();
porcentajeZ();
porcentajeAcumuladoZ();
generaAleatorio();
comparaVec(poblacion)
console.log(poblacion)
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
    console.log(element.pAcumulado)

    if (element.pAcumulado >= 0.99){
        element.pAcumulado =1;
    }
    });
}

/*Funcion que compara los vectores que aparecen dentro del rango */
function comparaVec(array)
{
    /*comparando los valores de %zac y #aleat01 y con los subindices
    y con el numero de vectores n*/
    //array.forEach(comparaVec);
    for (var i = 0;i<poblacion-1 ;i++){

        if(i==0)
        {
            //Compara con 0 y el actual 
            if(0 < array.aleatorio && array[i].cromosomazAcumulado > array.aleatorio)
            {
                //dentro del rango
                console.log("entre en rangp 1")
                //array[i]=narray[i];
            }
        }else{
            //Compara actual y el siguiente 
            if(array[i] < array.aleatorio && array[i+1].cromosomazAcumulado > array.aleatorio)
            {
                console.log("entre en rangp 2")
            }
        }
    
    }

    
}

function generaAleatorio(){

    poblacion.forEach(element => {
        element.aleatorio = aleatorio01()
    }
        
        
        
        );

}
/*Funcion aleatorio entre 0 y 1 */
function aleatorio01()
{
    return parseFloat(ale01=Math.random().toFixed(2));
}
