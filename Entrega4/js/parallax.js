document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
  
    document.querySelectorAll('.parallax-layer').forEach(layer => {
      const speed = layer.dataset.speed;
  
      // Movimiento hacia arriba (común a todos)
      let transformY = scrollY * -speed;
  
      // Movimiento lateral basado en la clase
      let transformX = 0;
      if (layer.classList.contains('derecha')) {
        transformX = scrollY * speed * 0.2; // Movimiento hacia la derecha
      } else if (layer.classList.contains('izquierda')) {
        transformX = scrollY * -speed * 0.2; // Movimiento hacia la izquierda
      }
  
      // Aplicar transformaciones
      layer.style.transform = `translate(${transformX}px, ${transformY}px)`;
    });
  });
  