document.addEventListener('DOMContentLoaded', () => {
    console.log("Efecto Parallax Iniciado");
  
    // Efecto Parallax
    window.addEventListener('scroll', () => {
      const layers = document.querySelectorAll('.parallax-layer');
      const scrollPosition = window.scrollY;
  
      layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
        const offset = scrollPosition * speed;
  
        // Movimiento hacia arriba
        layer.style.transform = `translateY(-${offset}px)`;
      });
    });
  
    // Animación al entrar en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    // Observar cada capa
    document.querySelectorAll('.parallax-layer').forEach((el) => {
      observer.observe(el);
    });
  });
  