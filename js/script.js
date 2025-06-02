// ===== VARIABLES GLOBALES =====
// Estas variables se usan en toda la aplicación

let slideActual = 0; // Índice del slide actual del carrusel
let carrito = []; // Array que guarda los productos del carrito

// Base de datos de productos (simulada)
// En una aplicación real, esto vendría de una base de datos
const productos = [
    {
        id: 1,
        nombre: "Reloj Clásico",
        precio: 400000.00,
        categoria: "relojes",
        imagen: "/fotos/reloj-clasico.png?height=250&width=250",
        descripcion: "Reloj elegante de acero inoxidable con movimiento de cuarzo suizo. Perfecto para ocasiones formales y casuales."
    },
    {
        id: 2,
        nombre: "Billetera Premium",
        precio: 120000.00,
        categoria: "billeteras",
        imagen: "/fotos/billetera-premiun.png",
        descripcion: "Billetera de cuero genuino con múltiples compartimentos para tarjetas y billetes. Diseño minimalista y elegante."
    },
    {
        id: 3,
        nombre: "Gafas Deportivas",
        precio: 159000.00,
        categoria: "gafas",
        imagen: "/fotos/gafas-deportivas.png",
        descripcion: "Gafas de sol con protección UV400 y marco resistente. Ideales para actividades deportivas y al aire libre."
    },
    {
        id: 4,
        nombre: "Reloj Deportivo",
        precio: 200000.00,
        categoria: "relojes",
        imagen: "/fotos/reloj-deportivo.png",
        descripcion: "Reloj deportivo resistente al agua con cronómetro y múltiples funciones. Perfecto para atletas y aventureros."
    },
    {
        id: 5,
        nombre: "Billetera Compacta",
        precio: 60000.00,
        categoria: "billeteras",
        imagen: "/fotos/billetera-compacta.png",
        descripcion: "Billetera compacta de cuero sintético con diseño moderno. Ideal para llevar lo esencial de forma organizada."
    },
    {
        id: 6,
        nombre: "Gafas Clásicas",
        precio: 129000.00,
        categoria: "gafas",
        imagen: "/fotos/gafas-clasicas.png",
        descripcion: "Gafas de sol clásicas con lentes polarizadas y marco de acetato. Un estilo atemporal que nunca pasa de moda."
    },
    {
        id: 7,
        nombre: "Cinturón de Cuero",
        precio: 79999.00,
        categoria: "cinturones",
        imagen: "/fotos/cinturon-cuero.png",
        descripcion: "Cinturón de cuero genuino con hebilla de metal pulido. Accesorio esencial para cualquier guardarropa masculino."
    },
    {
        id: 9,
        nombre: "Reloj Inteligente",
        precio: 799999.00,
        categoria: "relojes",
        imagen: "/fotos/teloj-inteligente.png",
        descripcion: "Reloj inteligente con múltiples funciones de salud y conectividad. La tecnología al servicio del estilo."
    },
    {
        id: 10,
        nombre: "Gafas Aviador",
        precio: 189990.00,
        categoria: "gafas",
        imagen: "/fotos/gafas-aviador.png",
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
    
    // Quitar la clase 'activo' del slide actual
    slides[slideActual].classList.remove('activo');
    
    // Calcular el nuevo índice
    slideActual += direccion;
    
    // Si llegamos al final, volver al principio
    if (slideActual >= slides.length) {
        slideActual = 0;
    }
    // Si vamos hacia atrás desde el primero, ir al último
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
 * @param {number} productoId - ID del producto a agregar
 */
function agregarAlCarrito(productoId) {
    // Buscar el producto en la base de datos
    const producto = productos.find(p => p.id === productoId);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);
    
    if (productoExistente) {
        // Si ya existe, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregarlo con cantidad 1
        carrito.push({
            ...producto, // Copiar todas las propiedades del producto
            cantidad: 1
        });
    }
    
    // Actualizar la interfaz
    actualizarContadorCarrito();
    mostrarNotificacion(producto.nombre + ' agregado al carrito');
    
    // Guardar en localStorage para que persista al recargar la página
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

/**
 * Actualiza el número que aparece en el icono del carrito
 */
function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');
    // Sumar todas las cantidades de productos en el carrito
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contador.textContent = totalItems;
}

/**
 * Abre el modal del carrito
 */
function abrirCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'block';
    mostrarProductosCarrito();
}

/**
 * Cierra el modal del carrito
 */
function cerrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'none';
}

/**
 * Muestra todos los productos del carrito en el modal
 */
function mostrarProductosCarrito() {
    const contenedor = document.getElementById('productos-carrito');
    const totalElement = document.getElementById('total-carrito');
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
        totalElement.textContent = '00.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    // Crear HTML para cada producto en el carrito
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
        
        // Si la cantidad llega a 0, eliminar el producto
        if (item.cantidad <= 0) {
            eliminarDelCarrito(productoId);
            return;
        }
        
        // Actualizar la interfaz
        actualizarContadorCarrito();
        mostrarProductosCarrito();
        
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

/**
 * Elimina completamente un producto del carrito
 * @param {number} productoId - ID del producto a eliminar
 */
function eliminarDelCarrito(productoId) {
    // Filtrar el carrito para quitar el producto
    carrito = carrito.filter(item => item.id !== productoId);
    
    // Actualizar la interfaz
    actualizarContadorCarrito();
    mostrarProductosCarrito();
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

/**
 * Procede al proceso de pago
 */
function irAPagar() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Cerrar modal del carrito
    cerrarCarrito();
    
    // Mostrar modal de pago
    mostrarModalPago();
}

/**
 * Muestra el modal de pago simulado
 */
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

/**
 * Cierra el modal de pago
 */
function cerrarModalPago() {
    const modal = document.getElementById('modal-pago');
    if (modal) {
        modal.remove();
    }
}

/**
 * Procesa el pago (simulado)
 * @param {Event} event - Evento del formulario
 */
function procesarPago(event) {
    if (event) event.preventDefault();
    
    // Simular procesamiento de pago
    const modalBody = document.querySelector('#modal-pago .modal-body');
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="cargando">Procesando pago</div>
        </div>
    `;
    
    // Simular delay de procesamiento
    setTimeout(function() {
        // Mostrar confirmación
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;"></i>
                <h3 style="color: #27ae60; margin-bottom: 1rem;">¡Pago Exitoso!</h3>
                <p>Tu pedido ha sido procesado correctamente.</p>
                <p><strong>Número de orden:</strong> #${Math.floor(Math.random() * 100000)}</p>
                <p>Recibirás un email de confirmación en breve.</p>
            </div>
        `;
        
        // Cambiar botones
        const modalFooter = document.querySelector('#modal-pago .modal-footer');
        modalFooter.innerHTML = `
            <button class="btn-principal" onclick="finalizarCompra()">Continuar Comprando</button>
        `;
        
    }, 2000); // Esperar 2 segundos
}

/**
 * Finaliza el proceso de compra
 */
function finalizarCompra() {
    // Vaciar carrito
    carrito = [];
    localStorage.removeItem('carrito');
    
    // Actualizar interfaz
    actualizarContadorCarrito();
    
    // Cerrar modal
    cerrarModalPago();
    
    // Mostrar notificación
    mostrarNotificacion('¡Gracias por tu compra!');
}

// ===== FUNCIONES DE PRODUCTOS =====

/**
 * Carga y muestra todos los productos en la página de productos
 */
function cargarProductos() {
    const contenedor = document.getElementById('todos-productos');
    if (!contenedor) return; // No estamos en la página de productos
    
    mostrarProductos(productos);
}

/**
 * Carga productos destacados en la página principal
 */
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
    // Actualizar botones de filtro
    const botones = document.querySelectorAll('.filtro-btn');
    botones.forEach(function(btn) {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');
    
    // Filtrar productos
    let productosFiltrados;
    if (categoria === 'todos') {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(function(producto) {
            return producto.categoria === categoria;
        });
    }
    
    // Mostrar productos filtrados
    mostrarProductos(productosFiltrados);
}

/**
 * Muestra los detalles de un producto en un modal
 * @param {number} productoId - ID del producto
 */
function verDetalleProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    // Llenar el modal con los datos del producto
    document.getElementById('modal-imagen').src = producto.imagen;
    document.getElementById('modal-imagen').alt = producto.nombre;
    document.getElementById('modal-nombre').textContent = producto.nombre;
    document.getElementById('modal-precio').textContent = '$' + producto.precio.toFixed(2);
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    
    // Configurar botón de agregar al carrito
    const btnAgregar = document.getElementById('modal-agregar');
    btnAgregar.onclick = function() {
        agregarAlCarrito(productoId);
        cerrarModalProducto();
    };
    
    // Mostrar modal
    document.getElementById('modal-producto').style.display = 'block';
}

/**
 * Cierra el modal de detalles del producto
 */
function cerrarModalProducto() {
    document.getElementById('modal-producto').style.display = 'none';
}

// ===== FUNCIONES DE CONTACTO =====

/**
 * Envía el formulario de contacto (simulado)
 * @param {Event} event - Evento del formulario
 */
function enviarFormulario(event) {
    event.preventDefault(); // Evitar que se recargue la página
    
    // Obtener datos del formulario
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
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
        
        // Limpiar formulario
        event.target.reset();
        
        // Restaurar botón
        submitBtn.textContent = textoOriginal;
        submitBtn.disabled = false;
        
        // En una aplicación real, aquí enviarías los datos al servidor
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
    // Crear elemento de notificación
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
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(function() {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

/**
 * Carga el carrito desde localStorage
 */
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
    // Cargar carrito desde localStorage
    cargarCarritoDesdeStorage();
    
    // Iniciar carrusel automático si estamos en la página principal
    if (document.querySelector('.carrusel-container')) {
        iniciarCarruselAutomatico();
    }
    
    // Cargar productos si estamos en la página de productos
    cargarProductos();
    
    // Cargar productos destacados si estamos en la página principal
    cargarProductosDestacados();
    
    // Cerrar modales al hacer clic fuera de ellos
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
    
    // Agregar animaciones CSS para las notificaciones
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

/* 
===== DOCUMENTACIÓN DEL CÓDIGO =====

Este archivo JavaScript maneja toda la funcionalidad del ecommerce MenStyle:

1. VARIABLES GLOBALES:
   - slideActual: Controla qué slide del carrusel se está mostrando
   - carrito: Array que guarda todos los productos agregados al carrito
   - productos: Base de datos simulada con todos los productos disponibles

2. FUNCIONES DEL CARRUSEL:
   - cambiarSlide(): Cambia entre slides del carrusel
   - iniciarCarruselAutomatico(): Hace que el carrusel cambie automáticamente
   - irAProductos(): Redirige a la página de productos

3. FUNCIONES DEL CARRITO:
   - agregarAlCarrito(): Añade productos al carrito
   - actualizarContadorCarrito(): Actualiza el número en el icono del carrito
   - abrirCarrito() / cerrarCarrito(): Controlan el modal del carrito
   - mostrarProductosCarrito(): Muestra todos los productos en el carrito
   - cambiarCantidad(): Permite aumentar/disminuir cantidad de productos
   - eliminarDelCarrito(): Quita productos del carrito completamente

4. FUNCIONES DE PAGO:
   - irAPagar(): Inicia el proceso de pago
   - mostrarModalPago(): Muestra el formulario de pago
   - procesarPago(): Simula el procesamiento del pago
   - finalizarCompra(): Completa la compra y vacía el carrito

5. FUNCIONES DE PRODUCTOS:
   - cargarProductos(): Carga todos los productos en la página
   - mostrarProductos(): Muestra productos en formato de tarjetas
   - filtrarProductos(): Filtra productos por categoría
   - verDetalleProducto(): Muestra detalles de un producto específico

6. FUNCIONES DE CONTACTO:
   - enviarFormulario(): Maneja el envío del formulario de contacto

7. FUNCIONES AUXILIARES:
   - mostrarNotificacion(): Muestra mensajes temporales al usuario
   - cargarCarritoDesdeStorage(): Recupera el carrito guardado

8. PERSISTENCIA DE DATOS:
   - Usa localStorage para guardar el carrito entre sesiones
   - El carrito se mantiene aunque cierres y abras el navegador

9. EVENTOS:
   - DOMContentLoaded: Se ejecuta cuando la página termina de cargar
   - Click en modales: Permite cerrar modales haciendo clic fuera

El código está diseñado para ser fácil de entender y modificar por principiantes.
Cada función tiene comentarios explicando qué hace y cómo funciona.
*/