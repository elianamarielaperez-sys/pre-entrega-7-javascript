const inputNombre = document.querySelector("#nombreProducto");

const inputPrecio = document.querySelector("#precioProducto");

const botonAgregar = document.querySelector("#btnAgregar");

const inputBusqueda = document.querySelector("#busquedaProducto");

const mensaje = document.querySelector("#mensaje");

const productos = [
    {
        id: 1,
        nombre: "Remera",
        precio: 20000
    },
    {
        id: 2,
        nombre: "Calza",
        precio: 40000
    },
    {
        id: 3,
        nombre: "Campera",
        precio: 60000
    }
];

const contenedorProductos = document.querySelector("#contenedorProductos");


function renderizarProductos() {
    contenedorProductos.innerHTML = "";
    const busqueda = inputBusqueda.value.toLowerCase();


    for (const producto of productos) {
        if (producto.nombre.toLowerCase().includes(busqueda)) {
            contenedorProductos.innerHTML += `
            <div>
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button data-id="${producto.id}">Eliminar</button>
            </div>
        `;

        }

    }
}
renderizarProductos()

inputBusqueda.addEventListener("keyup", () => {
    renderizarProductos();
});

contenedorProductos.addEventListener("click", (evento) => {
    if (!evento.target.matches("button")) return;

    const idProducto = Number(evento.target.dataset.id);

    const productoEncontrado = productos.findIndex(
        producto => producto.id === idProducto
    );

    if (productoEncontrado !== -1) {
        productos.splice(productoEncontrado, 1)
        mensaje.textContent = "Producto eliminado";
        renderizarProductos();
    }

});

let siguienteId = 4;

botonAgregar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const precio = Number(inputPrecio.value);
    if (nombre === "" || isNaN(precio) || precio <= 0) {
        mensaje.textContent = "Por favor, ingresá un nombre y un precio válido.";
        return;
    }
    const nuevoProducto = {
        id: siguienteId,
        nombre: nombre,
        precio: precio
    };
    siguienteId++;
    productos.push(nuevoProducto);
    mensaje.textContent = "Producto agregado";

    inputNombre.value = "";
    inputPrecio.value = "";

    renderizarProductos()
});
