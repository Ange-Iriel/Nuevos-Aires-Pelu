document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecioEl = document.getElementById('total-precio');
  const totalTiempoEl = document.getElementById('total-tiempo');
  const carritoSeccion = document.getElementById('carrito');
  const whatsappBtn = document.getElementById('whatsapp-btn');

  let carrito = [];

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

  function obtenerTiempoEnMinutos(texto) {
    const horas = parseInt((texto.match(/(\d+)\s*hs/) || [0, 0])[1]);
    const minutos = parseInt((texto.match(/(\d+)\s*min/) || [0, 0])[1]);
    return horas * 60 + minutos;
  }

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

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

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

    let mensaje = "Hola! Me gustaría solicitar los siguientes servicios:%0A";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}%0A`;
    });
    mensaje += `%0ATotal: $${totalPrecio.toLocaleString()}%0ATiempo estimado: ${formatearTiempo(totalTiempo)}`;

    whatsappBtn.href = `https://wa.me/5493401510995?text=${mensaje}`;
  }

  // Opcional: mostrar/ocultar secciones tipo toggle
  document.querySelectorAll('.toggle-servicio').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Acordeón colapsable (si usás .accordion-header)
  document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecioEl = document.getElementById('total-precio');
  const totalTiempoEl = document.getElementById('total-tiempo');
  const carritoSeccion = document.getElementById('carrito');
  const whatsappBtn = document.getElementById('whatsapp-btn');

  let carrito = [];

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

  function obtenerPrecioYTiempo(texto) {
    const [precioTexto, tiempoTexto] = texto.split(' - ');
    const precio = parseInt(precioTexto.replace(/\D/g, ''));
    let tiempo = 0;

    if (/(\d+)\s*hs/.test(tiempoTexto)) {
      tiempo += parseInt(tiempoTexto.match(/(\d+)\s*hs/)[1]) * 60;
    }
    if (/(\d+)\s*min/.test(tiempoTexto)) {
      tiempo += parseInt(tiempoTexto.match(/(\d+)\s*min/)[1]);
    }
    if (/más/.test(tiempoTexto)) {
      tiempo += 180; // Asignamos mínimo 3 horas para "3hs o más"
    }

    return { precio, tiempo };
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let totalPrecio = 0;
    let totalTiempo = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}`;
      
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.style.marginLeft = '10px';
      btnEliminar.addEventListener('click', () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      });

      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);
      totalPrecio += item.precio;
      totalTiempo += item.tiempo;
    });

    totalPrecioEl.textContent = `$${totalPrecio.toLocaleString()}`;
    totalTiempoEl.textContent = formatearTiempo(totalTiempo);
    carritoSeccion.style.display = carrito.length > 0 ? 'block' : 'none';

    let mensaje = "Hola! Me gustaría solicitar los siguientes servicios:%0A";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} - $${item.precio.toLocaleString()} - ${formatearTiempo(item.tiempo)}%0A`;
    });
    mensaje += `%0ATotal: $${totalPrecio.toLocaleString()}%0ATiempo estimado: ${formatearTiempo(totalTiempo)}`;

    whatsappBtn.href = `https://wa.me/5493401510995?text=${mensaje}`;
  }

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const servicio = boton.closest('.service-item');
      const nombre = servicio.querySelector('h3')?.textContent || 'Servicio';
      const spanTexto = servicio.querySelector('span')?.textContent || '';

      const { precio, tiempo } = obtenerPrecioYTiempo(spanTexto);
      carrito.push({ nombre, precio, tiempo });
      actualizarCarrito();
    });
  });
});