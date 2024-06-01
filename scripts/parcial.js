'use strict';

// Array de productos
const productos = [
    {
        filtro: 'indumentaria',
        nombre: 'Buzo The Eras Tour',
        descripcion: 'Buzo de cuello redondo gris jaspeado con "Taylor Swift The Eras Tour" y fotos impresas en el frente.',
        precio: 200,
        img: 'img/producto1.jpg',
        cantidad: 1,
    },
    {
        filtro: 'libreria',
        nombre: 'Cuaderno A4 Evermore',
        descripcion: 'Cuaderno encuadernado en espiral con la foto del álbum Evermore y "ts" impreso en el frente, "Taylor Swift Evermore Album" impreso en el reverso y páginas rayadas. Contiene 100 páginas.',
        precio: 10,
        img: 'img/producto2.jpg',
        cantidad: 1,
    },
    {
        filtro: 'musica',
        nombre: 'Midnights CD',
        descripcion: 'Incluye 13 canciones con letras alternas y claras, 1 de 4 álbumes coleccionables con arte de portada y contraportada únicos 1 de 4 ilustraciones de disco únicas y coleccionables y un folleto de letras coleccionable con fotos nunca antes vistas.',
        precio: 50,
        img: 'img/producto3.jpg',
        cantidad: 1,
    },
    {
        filtro: 'indumentaria',
        nombre: 'Remera The Eras Tour',
        descripcion: 'Camiseta azul con fotos de la era del álbum de 1989 de Taylor Swift y "Taylor Swift The Eras Tour".',
        precio: 100,
        img: 'img/producto4.jpg',
        cantidad: 1,
    },
    {
        filtro: 'accesorios',
        nombre: 'Gorro Taylor Swift',
        descripcion: 'Gorro de punto rojo con vuelta y etiqueta "Taylor Swift" tejida. 100% acrílico.',
        precio: 30,
        img: 'img/producto5.jpg',
        cantidad: 1,
    },
    {
        filtro: 'musica',
        nombre: 'Lover Vinilo',
        descripcion: 'Incluye dos discos y posters de la era del álbum "Lover".',
        precio: 50,
        img: 'img/producto6.jpg',
        cantidad: 1,
    },
    {
        filtro: 'accesorios',
        nombre: 'Pulsera Taylor Swift',
        descripcion: 'Brazalete de oro con cierre de broche ajustable y dije "TS" grabado, con 12 gemas, cada una de las cuales representa un álbum de Taylor Swift.',
        precio: 20,
        img: 'img/producto7.jpg',
        cantidad: 1,
    },
    {
        filtro: 'libreria',
        nombre: 'Set Cuaderno + Lápices',
        descripcion: 'Libro de actividades con 13 páginas con fotos de Taylor Swift y "Taylor Swift The Eras Tour" y "Activity Book" impreso en el frente con un juego de 10 lápices de colores con "Taylor Swift The Eras Tour" impreso en el lateral.',
        precio: 15,
        img: 'img/producto8.jpg',
        cantidad: 1,
    },
];

// Array de productos en el carrito
let carrito = [];

// Cantidad total de productos en el carrito y precios
let cantidadTotal = 0;
let total = 0;

// Elementos del DOM
const contenidoShop = document.getElementById('contenidoShop');
const verCarrito = document.getElementById('carrito');
const modalCarrito = document.getElementById('modalCarrito');
const totalCarrito = document.getElementById('totalCarrito');

// Elemento para mostrar la notificación
const notificacion = document.getElementById('notificacion');

// Función para mostrar los productos en la página
function mostrarProductos() {
    // Obtener el valor seleccionado del filtro
    const filtroSeleccionado = document.getElementById('filtro').value;

    // Limpiar el contenidoShop antes de mostrar los productos
    contenidoShop.innerHTML = '';

    productos.forEach(producto => {
        // Verificamos si el producto coincide con el filtro seleccionado
        if (filtroSeleccionado === 'todos' || producto.filtro === filtroSeleccionado) {
            // Creamos el contenedor principal del producto 
            const contenido = document.createElement('div');
            contenido.className = 'product';

            // Crear elementos internos del contenedor
            const imagen = document.createElement('img');
            imagen.src = producto.img;

            const h3 = document.createElement('h3');
            h3.textContent = producto.nombre;

            const h4 = document.createElement('h4');
            h4.textContent = `$${producto.precio}`;

            const botonComprar = document.createElement('button');
            botonComprar.className = 'comprar';
            botonComprar.dataset.producto = producto.nombre;
            botonComprar.textContent = 'COMPRAR';

            const botonVerMas = document.createElement('button');
            botonVerMas.className = 'verMas';
            botonVerMas.dataset.producto = producto.nombre;
            botonVerMas.textContent = 'Ver más';

            // Agregamos elementos internos al contenedor principal
            contenido.append(imagen, h3, h4, botonComprar, botonVerMas);

            // Agregar el contenedor principal al elemento contenidoShop
            contenidoShop.appendChild(contenido);

            // Manejar eventos para los botones
            botonComprar.addEventListener('click', () => {
                agregarAlCarrito(producto.nombre);
                mostrarNotificacion();
                mostrarTotalCarrito();
            });

            botonVerMas.addEventListener('click', () => {
                mostrarModal(producto.nombre);
            });
        }
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto) {
    let productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        let producto = productos.find(producto => producto.nombre === nombreProducto);
        carrito.push({ ...producto });
    }

    cantidadTotal += 1;
    total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    actualizarCantidad();
    mostrarTotalCarrito();
}

// Función para abrir carrito
function abrirCarrito() {
    modalCarrito.innerHTML = '';

    // Agregamos el estilo para que se vea en pantalla
    modalCarrito.style.display = 'block';

    // Creamos contenedor general
    const carritoContainer = document.createElement('div');
    carritoContainer.className = 'carritoContainer';

    // Creamos el header del carrito
    const modalHeader = document.createElement('header');
    const modalHeaderTitle = document.createElement('h2');
    modalHeaderTitle.innerText = 'Mi carrito';

    modalHeader.appendChild(modalHeaderTitle);

    // Creamos un botón que nos permita cerrar la modal
    const modalCerrar = document.createElement('button');
    modalCerrar.className = 'eliminar';
    modalCerrar.innerText = 'x';

    modalHeader.appendChild(modalCerrar);

    // Programamos la función que nos permite cerrar la modal con clickear la X
    modalCerrar.addEventListener('click', () => {
        modalCarrito.style.display = 'none';
    });

    // Creamos el contenedor para los productos
    const modalProductosContainer = document.createElement('div');
    modalProductosContainer.className = 'productosContainer';

    // forEach para recorrer los productos del carrito y crear su contenido
    carrito.forEach(producto => {
        const modalProducto = document.createElement('div');
        modalProducto.className = 'productoCarrito';

        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.img;
        imagenProducto.alt = producto.nombre;

        const contenidoProducto = document.createElement('div');
        contenidoProducto.className = 'contenidoProducto';

        const nombreProducto = document.createElement('h4');
        nombreProducto.innerText = producto.nombre;

        const precioProducto = document.createElement('h5');
        precioProducto.innerText = `$${producto.precio}`;

        const cantidadProducto = document.createElement('p');
        cantidadProducto.innerText = `Cantidad: ${producto.cantidad}`;

        const eliminarProducto = document.createElement('span');
        eliminarProducto.className = 'eliminar';
        eliminarProducto.innerText = 'x';

        eliminarProducto.addEventListener('click', () => {
            quitarProducto(producto);
        });

        contenidoProducto.append(nombreProducto, precioProducto, cantidadProducto);
        modalProducto.append(imagenProducto, contenidoProducto, eliminarProducto);
        modalProductosContainer.appendChild(modalProducto);
    });

    carritoContainer.append(modalHeader, modalProductosContainer);

    const modalCantidad = document.createElement('div');
    const modalCantidadTotal = document.createElement('h3');
    modalCantidadTotal.innerText = `Cantidad total: ${cantidadTotal}`;
    const modalPrecioTotal = document.createElement('h3');
    modalPrecioTotal.innerText = `Precio total: $${total}`;

    modalCantidad.append(modalCantidadTotal, modalPrecioTotal);
    carritoContainer.appendChild(modalCantidad);

    modalCarrito.appendChild(carritoContainer);
}

// Función para quitar un producto del carrito
function quitarProducto(producto) {
    carrito = carrito.filter(item => item !== producto);
    cantidadTotal -= producto.cantidad;
    total -= producto.precio * producto.cantidad;
    actualizarCantidad();
    mostrarTotalCarrito();
    abrirCarrito();
}

// Función para actualizar la cantidad de productos en el botón del carrito
function actualizarCantidad() {
    verCarrito.innerText = `Carrito (${cantidadTotal})`;
}

// Función para mostrar el precio total del carrito
function mostrarTotalCarrito() {
    totalCarrito.textContent = `Total: $${total}`;
}

// Función para mostrar una notificación
function mostrarNotificacion() {
    const notificacionCartel = document.createElement('div');
    notificacionCartel.className = 'notificacionCartel';
    notificacionCartel.innerText = '¡Producto agregado al carrito!';

    if (!notificacion) {
        console.error('El elemento notificacion no se encontró en el DOM.');
        return;
    }

    // Eliminar notificacionCartel si ya existe
    const notificacionActual = notificacion.querySelector('.notificacionCartel');
    if (notificacionActual) {
        notificacion.removeChild(notificacionActual);
    }

    notificacion.appendChild(notificacionCartel);

    // Ocultar el cartelito después de 3 segundos
    setTimeout(() => {
        notificacion.removeChild(notificacionCartel);
    }, 3000);
}

// Función para mostrar el modal con información detallada del producto
function mostrarModal(nombreProducto) {
    const producto = productos.find(producto => producto.nombre === nombreProducto);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modalContainer';

    const modalContent = document.createElement('div');
    modalContent.className = 'modalContent';

    const botonCerrar = document.createElement('button');
    botonCerrar.className = 'cerrarModal';
    botonCerrar.innerText = '×';

    const imagenProducto = document.createElement('img');
    imagenProducto.src = producto.img;

    const nombreProductoElemento = document.createElement('h3');
    nombreProductoElemento.innerText = producto.nombre;

    const descripcionProducto = document.createElement('p');
    descripcionProducto.innerText = producto.descripcion;

    const precioProducto = document.createElement('h4');
    precioProducto.innerText = `$${producto.precio}`;

    const botonComprarModal = document.createElement('button');
    botonComprarModal.className = 'comprarModal';
    botonComprarModal.dataset.producto = producto.nombre;
    botonComprarModal.innerText = 'COMPRAR';

    modalContent.append(botonCerrar, imagenProducto, nombreProductoElemento, descripcionProducto, precioProducto, botonComprarModal);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    botonCerrar.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });

    botonComprarModal.addEventListener('click', () => {
        agregarAlCarrito(producto.nombre);
        mostrarNotificacion();
        document.body.removeChild(modalContainer);
    });
}

// Event listener para el botón de ver carrito
verCarrito.addEventListener('click', () => {
    modalCarrito.classList.toggle('active');
});

// Event listener para el filtro de productos
document.getElementById('filtro').addEventListener('change', mostrarProductos);

// Mostrar los productos al cargar la página
mostrarProductos();