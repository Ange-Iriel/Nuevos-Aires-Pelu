document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecioEl = document.getElementById('total-precio');
  const totalTiempoEl = document.getElementById('total-tiempo');
  const carritoSeccion = document.getElementById('carrito');
  const whatsappBtn = document.getElementById('whatsapp-btn');

  let carrito = [];

  // Función para formatear los tiempos de minutos a horas y minutos.
  function formatearTiempo(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horas > 0 && minutosRestantes > 0) {
      return `${horas} hs ${minutosRestantes} min`;
    } else if (horas > 0) {
      return `${horas} hs`;
    } else {
      return `${minutosRestantes} min`;
    }
  }

  // Agregar servicio al carrito
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const servicio = boton.closest('.service-item');
      const nombre = servicio.querySelector('h3').textContent;
      const precioTexto = servicio.querySelector('.service-price').textContent;
      const tiempoTexto = servicio.querySelector('.service-time').textContent;

      const precio = parseInt(precioTexto.replace(/\D/g, ''));
      const tiempo = tiempoTexto.includes("hs")
        ? parseInt(tiempoTexto.replace(/\D/g, '')) * 60
        : parseInt(tiempoTexto.replace(/\D/g, ''));

      carrito.push({ nombre, precio, tiempo });

      actualizarCarrito();
    });
  });

  // Actualizar el carrito y los totales
  function actualizarCarrito() {
    carritoSeccion.style.display = 'block';
    listaCarrito.innerHTML = '';

    let totalPrecio = 0;
    let totalTiempo = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}`;

      // Crear botón de eliminar
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.classList.add('eliminar-item');
      eliminarBtn.addEventListener('click', () => eliminarDelCarrito(index));

      // Agregar el botón de eliminar al item
      li.appendChild(eliminarBtn);
      listaCarrito.appendChild(li);

      totalPrecio += item.precio;
      totalTiempo += item.tiempo;
    });

    totalPrecioEl.textContent = `$${totalPrecio.toLocaleString()}`;
    totalTiempoEl.textContent = formatearTiempo(totalTiempo);

    // Actualizar mensaje de WhatsApp
    let mensaje = "Hola! Me gustaría solicitar los siguientes servicios:%0A";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}%0A`;
    });
    mensaje += `%0ATotal: $${totalPrecio.toLocaleString()}%0ATiempo estimado: ${formatearTiempo(totalTiempo)}`;

    const numeroWhatsApp = "5491123456789";  // Cambia por tu número de WhatsApp
    whatsappBtn.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  }

  // Función para eliminar un item del carrito
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el servicio en la posición indicada
    actualizarCarrito(); // Actualizar la lista y los totales
  }
});