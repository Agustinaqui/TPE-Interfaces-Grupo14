document.addEventListener("DOMContentLoaded", () => {
    //[OPCIONAL] Punto 1
    const header = document.getElementById('header');
    const loader = document.getElementById('loader');
    const content = document.querySelector('.indexLoad');
    const progressImage = document.getElementById('progress');

    let progress = 0;
    const totalImages = 11;
    document.body.style.overflow = 'hidden';
    content.style.display = 'none';
    const loadingInterval = setInterval(() => {
        progress++;

        const imageIndex = Math.floor((progress / 100) * totalImages);
        progressImage.src = `../images/${imageIndex}.png`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            loader.style.display = 'none';
            content.style.display = 'block';
            document.body.style.overflow = 'auto';
            header.classList.remove('hidden');
            window.scrollTo(0, 0); //hace que al recargar la pagina siempre vuelva al principio de la misma
        }
    }, 70);
});



function playVideo() {
    const iframe = document.getElementById("youtube-video");
    const playButton = document.querySelector(".play-button");
    const videoImage = document.querySelector(".video-image");
    // Ocultar el botón de reproducción
    playButton.style.display = "none";
    videoImage.style.zIndex = "1";

    // Enviar el comando "play" al iframe
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
    );
}

const imagen = document.getElementById("dynamic-image");

document.addEventListener("scroll", () => {
    // Para los parrafos de la seccion scroll de numeros y textos
    const paragraphs = document.querySelectorAll(".text");

    let imagenCambiada = false;

    paragraphs.forEach((p, index) => {
        const rect = p.getBoundingClientRect();
        const isVisible = rect.top >= 130 && rect.bottom <= window.innerHeight - 150;

        if (isVisible) {

            p.classList.add("visible");
            let imgSrcIndex = imagen.src.split("/");
            imgSrcIndex = imgSrcIndex[imgSrcIndex.length-1];
            imgSrcIndex = imgSrcIndex.split(".")[0]

            if (!imagenCambiada && (Number)(imgSrcIndex) != index) {
                imagen.style.opacity = 0;

                setTimeout(() => {
                    imagen.src = `../images/${index}.png`;
                    imagen.style.opacity = 1; 
                }, 250); 

                imagenCambiada = !imagenCambiada;
            }
        } else {
            p.classList.remove("visible");
        }
    });

    // =========

    // Para la seccion de video y personaje

    const parallaxSection = document.querySelector(".conteiner5");
    const image = document.querySelector(".personaje");
    const video = document.querySelector(".video");

    const sectionTop = parallaxSection.offsetTop;
    const sectionHeight = parallaxSection.offsetHeight;
    const scrollY = window.scrollY;

    // Calcula cuánto scroll se ha hecho dentro de la sección
    const scrollInSection = scrollY - sectionTop;

    // Si el scroll está dentro de la sección, aplica el efecto parallax
    if (scrollY >= sectionTop - 300 && scrollY < sectionTop + sectionHeight) {
        const imageSpeed = 0.1; // Más lento
        const videoSpeed = 0.3; // Más rápido

        // Aplica la transformación solo mientras se está dentro de la sección
        image.style.transform = `translateY(-${scrollInSection * imageSpeed}px)`;
        video.style.transform = `translateY(-${scrollInSection * videoSpeed}px)`;
        console.log(imge);
    } else {
        // Restablece las transformaciones si está fuera de la sección
        image.style.transform = "translateY(0)";
        video.style.transform = "translateY(0)";
    }
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuItemsContainer = document.getElementById('menu-items-container');

    menu.classList.toggle('open'); // cambia la forma de las 3 lineas a una cruz
    menuItemsContainer.classList.toggle('active'); // aca se desplgiea el menu con los items
}

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona los elementos que deseas animar
    const elementos = document.querySelectorAll(".parallax-layer");
  
    const handleScroll = () => {
      const scrollY = window.scrollY; // Obtener el desplazamiento vertical
  
      elementos.forEach((elemento, index) => {
        const scale = 1 + scrollY * 0.001; // Aumenta el tamaño proporcionalmente al scroll
  
        let offsetX;
        if (elemento.classList.contains("izquierda")) {
          // Si es el árbol 1, muévelo hacia la izquierda
          offsetX = -scrollY * (0.1 + index * 0.02);
        } else {
          // Los demás se mueven hacia la derecha
          offsetX = scrollY * (0.1 + index * 0.02);
        }
  
        // Combina el aumento de tamaño y el desplazamiento lateral
        elemento.style.transform = `scale(${scale}) translateX(${offsetX}px)`;
      });
    };
  
    window.addEventListener("scroll", handleScroll);
  
    handleScroll();
  });
  



window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
    if (window.scrollY > 50) {
        logo.style.width = '150px';
        logo.style.height = '86px';
        logo.style.marginTop = '0px';
    } else if (window.scrollY === 0) { //si el scroll es igual a cero, o sea esta al principio de la pagina, el logo vuelve a su tamaño inical
        logo.style.width = '560px';
        logo.style.height = '320px';
        logo.style.marginTop = '75px';
    }
});

window.addEventListener('load', function () {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
    if (window.scrollY > 50) {
        logo.style.width = '150px';
        logo.style.height = '86px';
        logo.style.marginTop = '0px';
    } else if (window.scrollY === 0) {
        logo.style.width = '560px';
        logo.style.height = '320px';
        logo.style.marginTop = '75px';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const images = ["../images/cardGrande.png", "../images/imgCard1.png", "../images/imgCard2.png", "../images/imgCard3.png"]; // Array de imágenes
    const cardImage = document.getElementById("card-image");
    let currentIndex = 0;

    const changeImage = () => {
        //aplica el rebote en la card 
        cardImage.classList.add("bounce");

        //cambian la imagen de la card
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            cardImage.src = images[currentIndex];

            //se eliminar el efecto del rebote para agregarselo a la nueva imagen
            cardImage.classList.remove("bounce");
        }, 500); // Duración de la animación
    };

    // cambia la imagen cada 3 segundos - Punto 6
    setInterval(changeImage, 3000);
});

//inciso 7
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card1, .card2, .card3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 300);
            } else {
                entry.target.classList.remove('visible'); //se elimina laclase visible si la card ya no esta visible
            }
        });
    }, {
        threshold: 0.1 // se detecta cuando se "ve" el 10% de la card
    });

    cards.forEach(card => observer.observe(card));
});

//inciso 8
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.conteiner2');
    const image = document.getElementById('floating-image');

    container.addEventListener('mousemove', (event) => {
        //obtiene el tamaño del container
        const rect = container.getBoundingClientRect();

        //calcula la pos del mouse en base al cantainer
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        //invierte las direcciones 
        const offsetX = (mouseX / rect.width - 0.5) * 50; // la imagen se mueve a la izquierda cuando el mouse va a la derecha
        const offsetY = (mouseY / rect.height - 0.5) * 50; // laimagen se mueve hacia abajo cuando el mouse sube


        //const scale = 1 + (Math.abs(mouseX / rect.width - 0.5) * 0.3);
        // aplica transformaciones
        image.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`// scale(${scale})`;
    });

    container.addEventListener('mouseleave', () => {
        image.style.transform = 'translate(0, 0) scale(1)';
    });
});



