"use strict";
//creo el numero random
let numeroRandom=Math.floor(Math.random()*10000+1);
// hago un console log para verificar el numero random
//traigo del html el elemento que quiero modificar
let numeroRandomHtml=document.querySelector("#numeroRandom");
//modifico el valor del dom
numeroRandomHtml.innerHTML=numeroRandom;
//me fijo con un console log si obtengo el valor de la variable nombre
let button=document.querySelector("#boton");
button.addEventListener("click",verificacion);
function verificacion(evento){ 
    evento.preventDefault();
    //declaro una variable en donde guardo el valor del formulario completo con todos sus inputs
    let formulario=document.querySelector("#formulario");
    //declaro una variable llamada formdata donde guardo el valor de formulario(la variable)
    let formData=new FormData(formulario);
    //declaro una variable llamada nombre donde a traves del formdata me traigo el valor del input con el name del mismo
    let nombre=formData.get("nombre");
    //verifico que la variable no este vacia
    let apellido=formData.get("apellido");
    let email=formData.get("email");
    let jugadorPreferido=formData.get("jugadorPreferido");
    let inputCliente=formData.get("inputCliente");
    let verificar=document.querySelector("#verificar");
    if (Number(inputCliente)===numeroRandom) {
        verificar.innerHTML="el captcha es correcto enviado";
        //resetea formulario
        formulario.reset();
        
    } else {
        verificar.innerHTML="el captcha es incorrecto";
        
    }

}

