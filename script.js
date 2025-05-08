document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecioEl = document.getElementById('total-precio');
  const totalTiempoEl = document.getElementById('total-tiempo');
  const carritoSeccion = document.getElementById('carrito');
  const whatsappBtn = document.getElementById('whatsapp-btn');

  let carrito = [];

  // Convierte un texto como "1 hs 30 min" a minutos
  function obtenerTiempoEnMinutos(texto) {
    const horas = parseInt((texto.match(/(\d+)\s*hs/) || [0, 0])[1]);
    const minutos = parseInt((texto.match(/(\d+)\s*min/) || [0, 0])[1]);
    return horas * 60 + minutos;
  }

  // Formatea minutos a "X hs Y min"
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

  // Agrega un servicio al carrito
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const servicio = boton.closest('.service-item');
      const nombre = servicio.querySelector('h3').textContent;
      const precioTexto = servicio.querySelector('.service-price').textContent;
      const tiempoTexto = servicio.querySelector('.service-time').textContent;

      const precio = parseInt(precioTexto.replace(/\D/g, ''));
      const tiempo = obtenerTiempoEnMinutos(tiempoTexto);

      carrito.push({ nombre, precio, tiempo });
      actualizarCarrito();
    });
  });

  // Elimina un ítem del carrito
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  // Actualiza la UI del carrito
  function actualizarCarrito() {
    carritoSeccion.style.display = carrito.length > 0 ? 'block' : 'none';
    listaCarrito.innerHTML = '';

    let totalPrecio = 0;
    let totalTiempo = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}`;

      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.classList.add('eliminar-item');
      eliminarBtn.setAttribute('aria-label', `Eliminar ${item.nombre}`);
      eliminarBtn.addEventListener('click', () => eliminarDelCarrito(index));

      li.appendChild(eliminarBtn);
      listaCarrito.appendChild(li);

      totalPrecio += item.precio;
      totalTiempo += item.tiempo;
    });

    totalPrecioEl.textContent = `$${totalPrecio.toLocaleString()}`;
    totalTiempoEl.textContent = formatearTiempo(totalTiempo);
    actualizarWhatsApp(totalPrecio, totalTiempo);
  }

  // Genera el enlace de WhatsApp con el resumen del carrito
  function actualizarWhatsApp(totalPrecio, totalTiempo) {
    let mensaje = "Hola! Me gustaría solicitar los siguientes servicios:%0A";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}%0A`;
    });
    mensaje += `%0ATotal: $${totalPrecio.toLocaleString()}%0ATiempo estimado: ${formatearTiempo(totalTiempo)}`;

    whatsappBtn.href = `https://wa.me/5493401510995?text=${mensaje}`;
  }

  // Mostrar/ocultar secciones tipo toggle
  document.querySelectorAll('.toggle-servicio').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Acordeón para mostrar contenido colapsable
  document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
});
