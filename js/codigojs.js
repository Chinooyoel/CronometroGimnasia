
window.onload = () =>{
    /*let Cronometro = {
        x : 0,
        hora : 0,
        minuto: 0,
        segundo : 0,
        iniciar : (hora, minuto, segundo) => {
            this.x = setInterval(() => {
                segundo ++;
                console.log(segundo)
                if(segundo == 60){
                    segundo = 0;
                    minuto ++;
                    if(minuto == 60){
                        minuto = 0;
                        hora ++;
                        if(hora == 24){
                            hora = 0;
                        }
                    }
                }
                //console.log(hora + " " + minuto + " " + segundo)
            }, 1000);
        },
        parar : () => {
            clearInterval(this.x);
        }
    }

    Cronometro.iniciar(Cronometro.segundo, Cronometro.minuto, Cronometro.hora);
    let j = setInterval(() => {
       console.log(`${Cronometro.hora} : ${Cronometro.minuto} : ${Cronometro.segundo}`)
    }, 1000)
    */
    let numeroDeSerie = 1;
    let  x, z, y;
    let reloj = {
        hora: 0,
        minuto: 0,
        segundo: 0
    }
    let activoTemporizador = false;
    let hayEjercicio = false;
    document.getElementById("iniciarCronometro").addEventListener("click", () => {
        x = setInterval(()=> {
            reloj.segundo ++;
            if(reloj.segundo == 60){
                reloj.segundo = 0;
                reloj.minuto ++;
                if(reloj.minuto == 60){
                    reloj.minuto = 0;
                    reloj.hora ++;
                    if(reloj.hora == 24){
                        reloj.hora = 0;
                    }
                }
            }

            modificarCronometroHTML(reloj);
        } , 1000);

        return x;
    })
    document.getElementById("pararCronometro").addEventListener("click", () => {
        clearInterval(x);
        finalizarTemporizador(z);
    })
    document.getElementById("nuevoEjercicio").addEventListener("click", () => {
        if(activoTemporizador == false){
            nuevoEjercicio();
            actualizarIndiceDeCantidadDeNodos(document.querySelectorAll("#contenedor h2"),"Ejercicio")
            numeroDeSerie = 1;
            hayEjercicio = true;
        }

    } );
    document.getElementById("nuevaSerie").addEventListener("click", () => {
        if( hayEjercicio === true && activoTemporizador == false){
            nuevaSerie(reloj, numeroDeSerie);
            numeroDeSerie ++;
            activoTemporizador = true;
            z = iniciarTemporizador(z,60);
            y = setTimeout( () => {
                activoTemporizador = false;
            },60*1000);
        }

    });
    document.getElementById("restablecerCronometro").addEventListener("click", () => {
        clearInterval(x);
        reloj.minuto = 0;
        reloj.segundo = 0;
        reloj.hora = 0;
        modificarCronometroHTML(reloj);
    })
    document.getElementById("finEjercicio").addEventListener("click", () =>{
        if(hayEjercicio === true && activoTemporizador == false){
            nuevaSerie(reloj, numeroDeSerie);
            activoTemporizador = true;
            z = iniciarTemporizador(z,150);
            y = setTimeout( () => {
                activoTemporizador = false;
            },150*1000);
            nuevoEjercicio();
            actualizarIndiceDeCantidadDeNodos(document.querySelectorAll("#contenedor h2"),"Ejercicio")
            numeroDeSerie = 1;
        }
    })
    document.getElementById("pararTemporizador").addEventListener("click", () => {
        z = finalizarTemporizador(z)
        y = finalizarTemporizador(y);
        activoTemporizador = false;
    } )
}

function modificarCronometroHTML(reloj){
    modificarTextoDeUnNodo(agregarCero(reloj.segundo), document.getElementById("segundo"));
    modificarTextoDeUnNodo(agregarCero(reloj.minuto), document.getElementById("minuto"));
    modificarTextoDeUnNodo(agregarCero(reloj.hora), document.getElementById("hora"));
}


function nuevoEjercicio(){
    let nuevo_h2 = document.createElement("h2");
    let nuevo_ul = document.createElement("ul");
    let nuevo_article = document.createElement("article");
    nuevo_article.classList.add("articulo_ejercicio")
 

    //Agregar la clase eliminar a los nuevo_button, su texto, y el evento
    let nuevo_button = document.createElement("button");
    nuevo_button.classList.add("botonEliminar");
    nuevo_button.appendChild(document.createTextNode("Eliminar Ejercicio"));
    nuevo_button.addEventListener("click", (e) => {
        eliminarEjercicio(e);
        actualizarIndiceDeCantidadDeNodos(document.querySelectorAll("#contenedor h2"),"Ejercicio")
    } )


    //Crea el hijo article, el nieto h2 y el texto de h2
    document.getElementById("contenedor").appendChild(nuevo_article).appendChild(nuevo_h2);
    //Crear boton Eliminar
    document.getElementById("contenedor").appendChild(nuevo_article).appendChild(nuevo_button);
    //Crea el hijo lista
    document.querySelector("#contenedor").lastChild.appendChild(nuevo_ul);


}

function eliminarEjercicio(e){
    //Eliminamos al padre del boton
    e.target.parentNode.remove();
}

function nuevaSerie(objetoTiempo, numeroDeSerie){
    let nuevo_li = document.createElement("li");

    let nuevo_button = document.createElement("button");
    nuevo_button.classList.add("botonEliminarCronometro");
    nuevo_button.appendChild(document.createTextNode("X"));
    nuevo_button.addEventListener("click", (e) => {
        eliminarEjercicio(e);        
        //actualizarIndiceDeCantidadDeNodos(document.querySelectorAll(e.target.parentNode.parentNode),"Serie")
    } )

    document.querySelector("#contenedor").lastChild.lastChild.appendChild(nuevo_li);

    modificarTextoDeUnNodo(`${numeroDeSerie}°Serie ${agregarCero(objetoTiempo.hora)}:${agregarCero(objetoTiempo.minuto)}:${agregarCero(objetoTiempo.segundo)}`,
    document.getElementById("contenedor").lastChild.lastChild.lastChild);

    document.querySelector("#contenedor").lastChild.lastChild.lastChild.appendChild(nuevo_button);
}

function actualizarIndiceDeCantidadDeNodos(arraysDeHijosNodos, textoInformativo){
    //Recorremos el arrays de h2 y actualizamos su numero de ejercicio
    for( i = 0; i < arraysDeHijosNodos.length; i++ ) {
        arraysDeHijosNodos[i].innerHTML = `${textoInformativo} ${(i+1)}`
    }
}

function agregarCero(numero){
    let resultado = numero;
    if( numero < 10){
        resultado = "0" + numero
    }

    return resultado;
}
function modificarTextoDeUnNodo(textoAModificar, nodo){
    nodo.innerHTML = textoAModificar;
}

function iniciarTemporizador(variableInterval, tiempo){
    variableInterval = setInterval(() => {
        tiempo --;
        if(tiempo == 0){
            finalizarTemporizador(variableInterval);
        }
        modificarTextoDeUnNodo(tiempo, document.getElementById("temporizador"))
    },1000)

    return variableInterval;
}

function finalizarTemporizador(variableInterval){
    clearInterval(variableInterval)
}
