"use strict";

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let telefono = document.getElementById("telefono");
let asunto = document.getElementById("asunto");
let consulta = document.getElementById("consulta");
let btnEnviar = document.getElementById("enviar");

let info = [];

btnEnviar.addEventListener("click", (e) => {
    e.preventDefault(); /*para que no se actualice la pagina cuando pulsa enviar*/
    info[0] = nombre.value;
    info[1] = apellido.value;
    info[2] = correo.value;
    info[3] = telefono.value;
    info[4] = asunto.value;
    info[5] = consulta.value;

    let error = 0;
    for (let i = 0; i < info.length; i++) {
        if (info[i] == "") {
            error = 1;
        }
    }

    if (error == 1) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Faltan completar datos",
            confirmButtonColor: "#036a0aa7"
        });
    } else {
        let blob = new Blob([info], { type: "text/plain;charset=utf-8" }); //corchetes para que separe con ,

        saveAs(blob, "contacto.txt"); //de la libreria FileSaver
 
        Swal.fire({ 
            position: "center",
            icon: "success",
            title: "Consulta enviada",
            showConfirmButton: false,
            timer: 2500
        });
        nombre.value = "";
        apellido.value = "";
        correo.value = "";
        telefono.value = "";
        asunto.value = "";
        consulta.value = "";
    }

})