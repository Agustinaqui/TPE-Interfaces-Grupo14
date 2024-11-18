document.addEventListener("DOMContentLoaded", () => {
    //[OPCIONAL] Punto 1
    const header = document.getElementById('header');
    const loader = document.getElementById('loader');
    const content = document.querySelector('.indexLoad');
    const progressImage = document.getElementById('progress'); 
    let progress = 0;
    const totalImages = 11;
    content.style.display='none';
    const loadingInterval = setInterval(() => {
        progress++;

        const imageIndex = Math.floor((progress / 100) * totalImages);
        progressImage.src = `../images/${imageIndex}.png`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            loader.style.display = 'none';
            content.style.display = 'block';
            document.body.style.overflow='auto';
            header.classList.remove('hidden');
        }
    }, 70); 
});


function toggleMenu() {
    const menuLogo = document.getElementById('logo-menu');
    if (menuLogo) {
        const currentSrc = menuLogo.src;
        if (currentSrc.includes('logoMenu.png')) {
            menuLogo.src = '../images/logoCruz.png';
        } else {
            menuLogo.src = '../images/logoMenu.png';
        }
    }
}

window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
    if (window.scrollY > 50) {
        logo.style.width = '150px'; 
        logo.style.height = '86px';
        logo.style.marginTop='0px';
    } else if (window.scrollY === 0) { //si el scroll es igual a cero, o sea esta al principio de la pagina, el logo vuelve a su tamaño inical
        logo.style.width = '560px';
        logo.style.height = '320px';
        logo.style.marginTop='75px';
    }
  });

  window.addEventListener('load', function () {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
    if (window.scrollY > 50) {
        logo.style.width = '150px';  
        logo.style.height = '86px';
        logo.style.marginTop='0px';
    } else if (window.scrollY === 0) {
        logo.style.width = '560px';
        logo.style.height = '320px';
        logo.style.marginTop='75px';
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



