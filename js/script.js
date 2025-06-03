// Estas variables se usan en toda la aplicación
let slideActual = 0; 
let carrito = []; 

// En una aplicación real, esto vendría de una base de datos
const productos = [
    {
        id: 1,
        nombre: "Reloj Clásico",
        precio: 400000.00,
        categoria: "relojes",
        imagen: "/reloj-clasico.png",
        descripcion: "Reloj elegante de acero inoxidable con movimiento de cuarzo suizo. Perfecto para ocasiones formales y casuales."
    },
    {
        id: 2,
        nombre: "Billetera Premium",
        precio: 120000.00,
        categoria: "billeteras",
        imagen: "/billetera-premiun.png",
        descripcion: "Billetera de cuero genuino con múltiples compartimentos para tarjetas y billetes. Diseño minimalista y elegante."
    },
    {
        id: 3,
        nombre: "Gafas Deportivas",
        precio: 159000.00,
        categoria: "gafas",
        imagen: "/gafas-deportivas.png",
        descripcion: "Gafas de sol con protección UV400 y marco resistente. Ideales para actividades deportivas y al aire libre."
    },
    {
        id: 4,
        nombre: "Reloj Deportivo",
        precio: 200000.00,
        categoria: "relojes",
        imagen: "reloj-deportivo.png",
        descripcion: "Reloj deportivo resistente al agua con cronómetro y múltiples funciones. Perfecto para atletas y aventureros."
    },
    {
        id: 5,
        nombre: "Billetera Compacta",
        precio: 60000.00,
        categoria: "billeteras",
        imagen: "billetera-compacta.png",
        descripcion: "Billetera compacta de cuero sintético con diseño moderno. Ideal para llevar lo esencial de forma organizada."
    },
    {
        id: 6,
        nombre: "Gafas Clásicas",
        precio: 129000.00,
        categoria: "gafas",
        imagen: "gafas-clasicas.png",
        descripcion: "Gafas de sol clásicas con lentes polarizadas y marco de acetato. Un estilo atemporal que nunca pasa de moda."
    },
    {
        id: 7,
        nombre: "Cinturón de Cuero",
        precio: 79999.00,
        categoria: "cinturones",
        imagen: "cinturon-cuero.png",
        descripcion: "Cinturón de cuero genuino con hebilla de metal pulido. Accesorio esencial para cualquier guardarropa masculino."
    },
    {
        id: 9,
        nombre: "Reloj Inteligente",
        precio: 799999.00,
        categoria: "relojes",
        imagen: "teloj-inteligente.png",
        descripcion: "Reloj inteligente con múltiples funciones de salud y conectividad. La tecnología al servicio del estilo."
    },
    {
        id: 10,
        nombre: "Gafas Aviador",
        precio: 189990.00,
        categoria: "gafas",
        imagen: "/gafas-aviador.png",
        descripcion: "Gafas estilo aviador con marco dorado y lentes espejadas. Un clásico que define personalidad y estilo."
    }
];

// ===== FUNCIONES DEL CARRUSEL =====

/**
 * Cambia al siguiente o anterior slide del carrusel
 * @param {number} direccion - 1 para siguiente, -1 para anterior
 */
function cambiarSlide(direccion) {
    const slides = document.querySelectorAll('.slide');
    
    
    slides[slideActual].classList.remove('activo');
    

    slideActual += direccion;
    
    
    if (slideActual >= slides.length) {
        slideActual = 0;
    }
    else if (slideActual < 0) {
        slideActual = slides.length - 1;
    }
    
    // Activar el nuevo slide
    slides[slideActual].classList.add('activo');
}

/**
 * Inicia el carrusel automático que cambia cada 5 segundos
 */
function iniciarCarruselAutomatico() {
    setInterval(function() {
        cambiarSlide(1); // Avanzar al siguiente slide
    }, 5000); // Cada 5000 milisegundos (5 segundos)
}

/**
 * Redirige a la página de productos
 */
function irAProductos() {
    window.location.href = 'productos.html';
}

// ===== FUNCIONES DEL CARRITO =====

/**
 * Agrega un producto al carrito
 * @param {number} productoId
 */
function agregarAlCarrito(productoId) {

    const producto = productos.find(p => p.id === productoId);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    
    const productoExistente = carrito.find(item => item.id === productoId);
    
    if (productoExistente) {
        
        productoExistente.cantidad += 1;
    } else {
        
        carrito.push({
            ...producto, 
            cantidad: 1
        });
    }
    
    
    actualizarContadorCarrito();
    mostrarNotificacion(producto.nombre + ' agregado al carrito');
    

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');

    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contador.textContent = totalItems;
}


function abrirCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'block';
    mostrarProductosCarrito();
}


// Cierra el modal del carrito
function cerrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'none';
}

// Muestra todos los productos del carrito en el modal
function mostrarProductosCarrito() {
    const contenedor = document.getElementById('productos-carrito');
    const totalElement = document.getElementById('total-carrito');
    
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
        totalElement.textContent = '00.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    
    carrito.forEach(function(item) {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>${item.precio.toFixed(2)}$ c/u</p>
                    <div class="carrito-item-controles">
                        <button class="cantidad-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span style="margin: 0 10px; font-weight: bold;">${item.cantidad}</span>
                        <button class="cantidad-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        <button class="eliminar-btn" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                    </div>
                </div>
                <div style="font-weight: bold; color: #e74c3c;">
                    ${subtotal.toFixed(2)}$
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    totalElement.textContent = total.toFixed(2);
}

/**
 * Cambia la cantidad de un producto en el carrito
 * @param {number} productoId - ID del producto
 * @param {number} cambio - Cantidad a cambiar (+1 o -1)
 */

function cambiarCantidad(productoId, cambio) {
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        item.cantidad += cambio;
    
        
        if (item.cantidad <= 0) {
            eliminarDelCarrito(productoId);
            return;
        }
        
        
        actualizarContadorCarrito();
        mostrarProductosCarrito();
        
    
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

/**
 * Elimina completamente un producto del carrito
 * @param {number} productoId - ID del producto a eliminar
 */


function eliminarDelCarrito(productoId) {
    
    carrito = carrito.filter(item => item.id !== productoId);
    
    
    actualizarContadorCarrito();
    mostrarProductosCarrito();
    
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function irAPagar() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    

    cerrarCarrito();
    
    mostrarModalPago();
}

function mostrarModalPago() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    const modalHTML = `
        <div id="modal-pago" class="modal" style="display: block;">
            <div class="modal-contenido">
                <div class="modal-header">
                    <h2>Proceso de Pago</h2>
                    <span class="cerrar" onclick="cerrarModalPago()">&times;</span>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h3>Total a Pagar: $${total.toFixed(2)}</h3>
                    </div>
                    
                    <form id="formulario-pago" onsubmit="procesarPago(event)">
                        <div class="grupo-form">
                            <label for="nombre-tarjeta">Nombre en la Tarjeta</label>
                            <input type="text" id="nombre-tarjeta" required>
                        </div>
                        
                        <div class="grupo-form">
                            <label for="numero-tarjeta">Número de Tarjeta</label>
                            <input type="text" id="numero-tarjeta" placeholder="1234 5678 9012 3456" required>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="grupo-form">
                                <label for="fecha-vencimiento">Fecha de Vencimiento</label>
                                <input type="text" id="fecha-vencimiento" placeholder="MM/AA" required>
                            </div>
                            
                            <div class="grupo-form">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123" required>
                            </div>
                        </div>
                        
                        <div class="grupo-form">
                            <label for="direccion-facturacion">Dirección de Facturación</label>
                            <textarea id="direccion-facturacion" rows="3" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secundario" onclick="cerrarModalPago()">Cancelar</button>
                    <button class="btn-principal" onclick="procesarPago(event)">Pagar Ahora</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}


function cerrarModalPago() {
    const modal = document.getElementById('modal-pago');
    if (modal) {
        modal.remove();
    }
}

/**
 * Procesa el pago
 * @param {Event} event - Evento del formulario
 */
function procesarPago(event) {
    if (event) event.preventDefault();
    

    const modalBody = document.querySelector('#modal-pago .modal-body');
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="cargando">Procesando pago</div>
        </div>
    `;
    
    
    setTimeout(function() {

        modalBody.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;"></i>
                <h3 style="color: #27ae60; margin-bottom: 1rem;">¡Pago Exitoso!</h3>
                <p>Tu pedido ha sido procesado correctamente.</p>
                <p><strong>Número de orden:</strong> #${Math.floor(Math.random() * 100000)}</p>
                <p>Recibirás un email de confirmación en breve.</p>
            </div>
        `;
        
    
        const modalFooter = document.querySelector('#modal-pago .modal-footer');
        modalFooter.innerHTML = `
            <button class="btn-principal" onclick="finalizarCompra()">Continuar Comprando</button>
        `;
        
    }, 2000); 
}

function finalizarCompra() {
    
    carrito = [];
    localStorage.removeItem('carrito');
    
    
    actualizarContadorCarrito();
    

    cerrarModalPago();
    
    
    mostrarNotificacion('¡Gracias por tu compra!');
}

// ===== FUNCIONES DE PRODUCTOS =====

function cargarProductos() {
    const contenedor = document.getElementById('todos-productos');
    if (!contenedor) return; // No estamos en la página de productos
    
    mostrarProductos(productos);
}


function cargarProductosDestacados() {
    const contenedor = document.getElementById('productos-destacados');
    if (!contenedor) return; // No estamos en la página principal
    
    // Mostrar solo los primeros 3 productos
    const productosDestacados = productos.slice(0, 3);
    mostrarProductosDestacados(productosDestacados);
}

/**
 * Muestra una lista de productos en el grid
 * @param {Array} listaProductos - Array de productos a mostrar
 */
function mostrarProductos(listaProductos) {
    const contenedor = document.getElementById('todos-productos');
    
    if (listaProductos.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No se encontraron productos</p>';
        return;
    }
    
    let html = '';
    
    listaProductos.forEach(function(producto) {
        html += `
            <div class="producto-card fade-in">
                <img src="${producto.imagen}" alt="${producto.nombre}" onclick="verDetalleProducto(${producto.id})">
                <h3>${producto.nombre}</h3>
                <p class="precio">${producto.precio.toFixed(2)}$</p>
                <button class="agregar-carrito-btn" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
                <button class="btn-secundario" onclick="verDetalleProducto(${producto.id})" style="margin-top: 0.5rem; width: 100%;">
                    Ver Detalles
                </button>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

/**
 * Muestra productos destacados en la página principal
 * @param {Array} listaProductos - Array de productos destacados
 */
function mostrarProductosDestacados(listaProductos) {
    const contenedor = document.getElementById('productos-destacados');
    
    let html = '';
    
    listaProductos.forEach(function(producto) {
        html += `
            <div class="producto-card fade-in">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">${producto.precio.toFixed(2)}$</p>
                <button class="agregar-carrito-btn" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

/**
 * Filtra productos por categoría
 * @param {string} categoria - Categoría a filtrar ('todos' para mostrar todos)
 */
function filtrarProductos(categoria) {
    
    const botones = document.querySelectorAll('.filtro-btn');
    botones.forEach(function(btn) {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');
    
    let productosFiltrados;
    if (categoria === 'todos') {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(function(producto) {
            return producto.categoria === categoria;
        });
    }
    
    mostrarProductos(productosFiltrados);
}

/**
 * Muestra los detalles de un producto en un modal
 * @param {number} productoId - ID del producto
 */
function verDetalleProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    
    document.getElementById('modal-imagen').src = producto.imagen;
    document.getElementById('modal-imagen').alt = producto.nombre;
    document.getElementById('modal-nombre').textContent = producto.nombre;
    document.getElementById('modal-precio').textContent = '$' + producto.precio.toFixed(2);
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    
    
    const btnAgregar = document.getElementById('modal-agregar');
    btnAgregar.onclick = function() {
        agregarAlCarrito(productoId);
        cerrarModalProducto();
    };

    document.getElementById('modal-producto').style.display = 'block';
}


function cerrarModalProducto() {
    document.getElementById('modal-producto').style.display = 'none';
}

// ===== FUNCIONES DE CONTACTO =====

/**
 * Envía el formulario de contacto (simulado)
 * @param {Event} event - Evento del formulario
 */
function enviarFormulario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Simular envío
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const textoOriginal = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(function() {
    
        alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
        
        
        event.target.reset();
        
        
        submitBtn.textContent = textoOriginal;
        submitBtn.disabled = false;
        
    
        console.log('Datos del formulario:', {
            nombre: nombre,
            email: email,
            telefono: telefono,
            asunto: asunto,
            mensaje: mensaje
        });
    }, 1500);
}

// ===== FUNCIONES AUXILIARES =====

/**
 * Muestra una notificación temporal
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarNotificacion(mensaje) {

    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notificacion.textContent = mensaje;
    
    
    document.body.appendChild(notificacion);
    
    
    setTimeout(function() {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

// ===== INICIALIZACIÓN =====

/**
 * Función que se ejecuta cuando la página termina de cargar
 */
document.addEventListener('DOMContentLoaded', function() {
    
    cargarCarritoDesdeStorage();
    
    
    if (document.querySelector('.carrusel-container')) {
        iniciarCarruselAutomatico();
    }
    

    cargarProductos();
    
    
    cargarProductosDestacados();
    
    
    window.addEventListener('click', function(event) {
        const modalCarrito = document.getElementById('modal-carrito');
        const modalProducto = document.getElementById('modal-producto');
        const modalPago = document.getElementById('modal-pago');
        
        if (event.target === modalCarrito) {
            cerrarCarrito();
        }
        if (event.target === modalProducto) {
            cerrarModalProducto();
        }
        if (event.target === modalPago) {
            cerrarModalPago();
        }
    });
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
