"use strict";

let bandera = 0;

let novedades = document.getElementById("pNovedades");

//la funcion va sin parentesis (así se pasa por referencia, o sea, se pasa el nombre de la fe para que se ejecute cuando sea necesario)
//pero si pongo setInterval(cambiarTexto(),3000); la estoy invocando, y se ejecuta en el momento
setInterval(cambiarTexto, 3000);

function cambiarTexto() {
    let texto = "";
    if (bandera == 0) {
        texto = "¡Mirá nuestras OFERTAS!";
        bandera = 1;
    } else {
        texto = "Ahora podés hacer tu compra online";
        bandera = 0;
    }
    novedades.textContent = ""; //sino hago eso me agrega la nueva frase al anterior
    novedades.textContent = texto;
}
