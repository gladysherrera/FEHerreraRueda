"use strict"

const arrayPrecios = [4450, 2856, 2370, 960, 7000, 1190, 1250, 1700, 2200, 2784, 899, 3620, 9100, 2332, 1200, 2400, 3600, 1385, 2015, 1539, 1370, 1370, 1875, 900, 1788, 1309, 2215, 9389, 5797, 1650];
const arrayProductos = ["aceite maiz arcor botella 900 ml", "acelga congelada granja del sol 500g", "acelga congelada lucchetti 450g", "agua mineral sin gas villa del sur 2 25", "aromatizante de ambiente liquido campos de lavanda glade 21ml", "arroz con leche clasico tregar 180 grm", "arroz con leche con canela tregar 180 grm", "arroz preparado sabor cheddar lucchetti 240 grm", "arroz preparado sabor tomatado lucchetti 240 grm", "arvejas congeladas granja del sol 300g", "arvejas secas arcor 300 grm", "bizcochuelo vainilla arcor paq 500 grm", "bocadito de pollo lucchetti paq 800 grm", "bombon surtidosselec arcor cja 2286 grm", "brahma cerveza 1 litro", "brocoli congelado granja del sol 400g", "brownies sabor chocolate arcor 425 grm", "budin marmolado arcor fwp 215 grm", "cabellos de angel lucchetti     paquete 500 gr", "capelettis rellenos con pollo y verdura mendia 500g", "caramelos duros menta con chocolate arcor 140g", "caramelos rellenos miel arcor paq 140 grm", "choclos  granja del bsa 300 grm", "chocolate arcor con leche tab 25 grm", "chocolate con leche y mani arcor fwp 95 grm", "crema de leche la paulina 200cc", "crema leche doble ilolay 350 grm", "cremoso fraccionado tregar xkg 1 kgm", "dulce leche clasico sancor pot 400 grm", "fideos spaghetti rina 500g"];
let arrayStock = [5, 8, 2, 10, 3, 5, 3, 3, 2, 5, 7, 2, 1, 4, 6, 4, 3, 5, 5, 6, 4, 5, 4, 3, 5, 2, 3, 4, 5, 5];
let compras = [];
let cantCompras = [];


//dibujo las cards
mostrarProductos(arrayProductos, arrayPrecios, arrayStock);


let cajaCard = document.getElementsByClassName("btnComprar");
//lanzo los eventos a cada boton de las cards
for (let subi = 0; subi < cajaCard.length; subi++) {
    cajaCard[subi].addEventListener("click", (e) => {
        let nroCard = e.target.closest(".card"); //me da null el e.target.id
        controlStock(arrayStock, nroCard.id);
    })
}


function controlStock(arrayStock, nroCard) {
    let elementoInput = document.getElementById(`num${nroCard}`);
   
    if (elementoInput.value == 0) {
        Swal.fire({
            title: "debe ingresar la cantidad a comprar",
            confirmButtonColor:"#036a0aa7",
            icon: "error"
          });  
    } else {
        if (elementoInput.value > arrayStock[nroCard]) {
            Swal.fire({
                title: "la cantidad a comprar supera el stock",
                confirmButtonColor:"#036a0aa7",
                icon: "error"
              });
              elementoInput.value = 0;
        } else {
            comprarProducto(arrayStock,arrayProductos,arrayPrecios,compras,cantCompras, parseInt(nroCard), elementoInput )
        }
    }
}

function comprarProducto(stock, productos, precios, compras, cantCompras, id, cantidadProducto) {

    //actualizo el stock
    stock[id] -= cantidadProducto.value;
    let divStock = document.getElementById(`stock${id}`);
    divStock.textContent = `Stock : ${stock[id]} unidades`;

    //agrego el id del producto al arreglo compras y la cantidad en cantCompras
    compras[compras.length] = id;
    cantCompras[compras.length-1] = parseInt(cantidadProducto.value);

   
    Swal.fire({
        title: `Seleccionó ${cantidadProducto.value} unidades  `   ,
        text: `de ${productos[id]} por un total de $ ${precios[id]*cantidadProducto.value}`,
        icon: "warning",
        iconColor:"#036a0aa7",
        showCancelButton: true,
        confirmButtonColor: "#036a0aa7",
        cancelButtonColor: "#E09900",
        cancelButtonText: "Finalizar compra",
        confirmButtonText: "Seguir comprando"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1000
              });
        }
       if (result.isDismissed) { //ir al Carrito
        localStorage.setItem('productos', JSON.stringify(productos)); //strinngify: convierte el arreglo a una cadena JSON
        localStorage.setItem('precios', JSON.stringify(precios));
        localStorage.setItem('compras', JSON.stringify(compras));
        localStorage.setItem('cantCompras', JSON.stringify(cantCompras));
        
        location.href = "carrito.html";
       } 
      });
    cantidadProducto.value = 0;//en el input pongo 0 
};



function mostrarProductos(arrayProductos, arrayPrecios, arrayStock) {
    let cardContenedor = document.getElementById("cardContainer");

    for (let i = 0; i < arrayProductos.length; i++) {
        //creo la card
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `${i}`);

        //agrego la imagen
        let elemento = document.createElement("img");
        elemento.classList.add("cardImagen");
        elemento.setAttribute("src", `./imagenes2/${arrayProductos[i]}.jpg`);
        elemento.setAttribute("alt", `${arrayProductos[i]}`);
        card.appendChild(elemento);

        //agrego el nombre del producto
        elemento = document.createElement("h2");
        elemento.classList.add("cardTitulo");
        let texto = document.createTextNode(`${arrayProductos[i]}`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //agrego el precio
        elemento = document.createElement("p");
        elemento.classList.add("cardPrecio");
        texto = document.createTextNode(`$ ${arrayPrecios[i]}`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //agrego el stock
        elemento = document.createElement("p");
        elemento.classList.add("cardStock");
        elemento.setAttribute("id", `stock${i}`)
        texto = document.createTextNode(`Stock : ${arrayStock[i]} unidades`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //div contenedor del input y su label
        let elementoDiv = document.createElement("div");
        elementoDiv.classList.add("cardContador");

            //agrego el label 
            elemento = document.createElement("label");
            texto = document.createTextNode("tus unidades: ");
            elemento.appendChild(texto);
            elemento.classList.add("valorLabel");
            elementoDiv.appendChild(elemento);

            //creo el input
            elemento = document.createElement("input");
            elemento.classList.add("valorContador");
            elemento.setAttribute("type", "number");
            elemento.setAttribute("id", `num${i}`);
            elemento.setAttribute("min", 0);
            elemento.setAttribute("value", 0);
            elementoDiv.appendChild(elemento);

        card.appendChild(elementoDiv);

        //agrego boton comprar
        elemento = document.createElement("button");
        elemento.classList.add("btnComprar");
        texto = document.createTextNode(`Comprar`);
        elemento.appendChild(texto);
        card.appendChild(elemento);

        //agrego todo a la card
        cardContenedor.appendChild(card);
    }
}