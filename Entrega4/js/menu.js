document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById('header');
    const loader = document.getElementById('loader');
    const content = document.querySelector('.indexLoad');
    const progressImage = document.getElementById('progress'); 
    let progress = 0;
    const totalImages = 11;
    content.style.display='none';
    const loadingInterval = setInterval(() => {
        progress++;

        // Calcular la imagen que debe mostrarse
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
    } else {
        console.error('Elemento con id "menu-logo" no encontrado');
    }
}

window.addEventListener('scroll', function () {
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




