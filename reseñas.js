 const slider = document.getElementById('slider');
  const total = slider.children.length;
  let index = 0;

  setInterval(() => {
    index = (index + 1) % total;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }, 6000); // cada 6 segundos cambia

  setInterval(() => {
  index = (index + 1) % total;
  slider.style.transform = `translateX(-${index * 100}%)`;
}, 8000); // 8 segundos en lugar de 6
