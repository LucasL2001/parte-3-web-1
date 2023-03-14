"use strict";
const BASEURL = "https://63f9066b23ad39d6dd9852e7.mockapi.io/riverPlate/";
const boton = document.querySelector("#boton");
boton.addEventListener("click", agregarUsuario);



const traerTabla = async ()=>{
    const respuesta = await fetch(BASEURL,{
        method: 'GET',
        headers: {'content-type':'application/json'},
    });
    if (respuesta.status === 200) {
        console.log("Traido");
    }
    const usuarios = await respuesta.json();
    
    return usuarios;
    
}
function traerTablaPaginada(){
    const url = new URL(BASEURL);
    url.searchParams.append('completed', false);
    url.searchParams.append('page', 1);
    url.searchParams.append('limit', 10);
    if(typeof page === 'number'&& typeof limit === 'number'){
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type':'application/json'
            },
        }).then(res => {
            if (res.ok)
                return res.json()
        }).then(usuarios => {
            console.log(usuarios);
            return usuarios
        }).catch(error => {
            console.error(error)
        })
    }
}
traerTablaPaginada()
async function cargarTabla(usuarios) {
    const promi = await usuarios;
    document.querySelector('#table').innerHTML = ''
    for (let index = 0; index < promi.length; index++) {
        document.querySelector("#table").innerHTML += `
                <tr>
                    <td>${promi[index].nombre}</td>
                    <td>${promi[index].apellido}</td>
                    <td>${promi[index].email}</td>
                    <td>${promi[index].equipo}</td>
                    <td><button id=${promi[index].id} class = 'editar'>Editar</button></td>
                    <td><button id=${promi[index].id} class = 'borrar'>Borrar</button></td>                    
                </tr>    
                    `;
    }
    document.querySelector('#table').innerHTML += `<button class='completa'>Cargar tabla completa</button>`
    document.querySelector('#table').innerHTML += `<button class='paginada'>Cargar tabla paginada</button>`

    document.querySelectorAll('.editar').forEach(b=>{
        b.addEventListener('click', editarFila)
    })
    document.querySelectorAll('.borrar').forEach(b=>{
        b.addEventListener('click', borrarFila)
    })
}
async function agregarUsuario(e) {
    e.preventDefault();
    let formulario = document.querySelector("#form");
    let formData = new FormData(formulario);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let email = formData.get("email");
    let equipo = formData.get("equipo");
    console.log(nombre);
    let usuarios = {
        "nombre": nombre,
        "apellido": apellido,
        "email": email,
        "equipo": equipo,
    }
    try {
        let res = await fetch(BASEURL, {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(usuarios)

        })
        if (res.status == 201) {
            console.log("creado!");
            cargarTabla(traerTabla());
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function editarFila(event) {
    event.preventDefault();
    let formulario = document.querySelector("#form");
    let formData = new FormData(formulario);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let email = formData.get("email");
    let equipo = formData.get("equipo");
    console.log(nombre);
    let usuarios = {
        "nombre": nombre,
        "apellido": apellido,
        "email": email,
        "equipo": equipo,
    }
    try {
        let respuesta = await fetch(URL + this.id, {
            "method": "PUT",
            "headers": { 'Content-Type': 'application/json' },
            "body": JSON.stringify(usuarios)

        })
        if (respuesta.status === 200) {
            console.log("Editado");
            cargarTabla();
        }
    } catch (error) {
        console.log(error);
    }

}
async function borrarFila(){
    try {
        let respuesta = await fetch(BASEURL + this.id, {
            "method": "DELETE",
        })
        if (respuesta.status === 200) {
            console.log("Borrado");
            cargarTabla();
        }
    } catch (error) {
        console.log(error);
    }
}
//funcionamiento principal
cargarTabla(traerTabla());