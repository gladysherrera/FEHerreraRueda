"user strict";

// armo los arreglos trayendolos del localStorage
let arrayProductos = localStorage.getItem('productos');
let arrayPrecios = localStorage.getItem('precios');
let arrayCompras = localStorage.getItem('compras');
let arrayCantCompras = localStorage.getItem('cantCompras');
//convierte el JSON a arreglo
arrayProductos = JSON.parse(arrayProductos);
arrayPrecios = JSON.parse(arrayPrecios);
arrayCompras = JSON.parse(arrayCompras);
arrayCantCompras = JSON.parse(arrayCantCompras);


let total = 0;
for (let i = 0; i < arrayCompras.length; i++) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("conCompras");
    // ---- agrego el producto -----
    crearElemento("p", "primerCol", arrayProductos[i], contenedor);

    // ---- agrego precio unitario -----
    crearElemento("p", "otrasColumnas", `$ ${arrayPrecios[arrayCompras[i]]}`, contenedor);

    // ---- agrego cantidad -----
    crearElemento("p", "otrasColumnas", arrayCantCompras[i], contenedor);

    // ---- agrego subtotal -----
    let subtotal = arrayCantCompras[i] * arrayPrecios[arrayCompras[i]];
    total += subtotal;
    crearElemento("p", "otrasColumnas", `$ ${subtotal}`, contenedor);

    //lo agrego a la pagina
    let productoComprado = document.getElementById("productosComprados");
    productoComprado.appendChild(contenedor);
};

// ----- Resumen -----
contenedor = document.getElementById("contenedorResumen");
crearElemento("p", "aPagar", "Total a Pagar", contenedor);

crearElemento("p", "aPagar", `$ ${total}`, contenedor);


//evento para el boton de terminar compra
let btn = document.getElementById("btnCompra");
console.log("btn", btn);
btn.addEventListener("click", (e) => {
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Gracias por su compra",
        showConfirmButton: false,
        timer: 2000
    }).then(() => { location.href = "super.html"; });//promesa, se ejecuta cuando se termina el alert
});


//evento para el boton cancelar
btn = document.getElementById("btnCancelar");
btn.addEventListener("click", (e) => {
    Swal.fire({
        title: "Desea continuar? Perderá todos los elementos del carrito",
        showCancelButton: true,
        confirmButtonColor:"#036a0aa7",
        confirmButtonText: "  SI  ",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Su carrito está vacio",
                icon: "success",
                confirmButtonColor:"#036a0aa7"
              }).then(() => { location.href = "super.html"; }); // :)
        } 
    })
});

function crearElemento(etiqueta, clase, txt, padre) {
    elemento = document.createElement(etiqueta);
    elemento.classList.add(clase);
    let texto = document.createTextNode(txt);
    elemento.appendChild(texto);
    padre.appendChild(elemento);
}