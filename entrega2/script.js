// Obtener los elementos de los formularios y los botones para cambiar
const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
const formularioLogin = document.getElementById('contenedorFormularioLogin');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');
const flechaLeft = document.querySelector('.flecha-left');
const flechaRight = document.querySelector('.flecha-right');
const slideS = document.querySelector('.slides');
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('show-menu'); 
});

switchToRegister.addEventListener("click" , () => {
    formularioRegistro.classList.remove("hidden")
    formularioLogin.classList.add("hidden")
})

const recaptchas = document.querySelectorAll('.recaptcha');

recaptchas.forEach((recaptcha) => {
    recaptcha.addEventListener("click", () => {
        if (recaptcha.src.includes("recaptcha.jpg")) {
            recaptcha.src = "../images/recaptchaGreen.jpg";  
        } else {
            recaptcha.src = "../images/recaptcha.jpg"; 
        }
    });
});

slideS.addEventListener("wheel", (e) => {
    slideS.scrollLeft += e.deltaY;
});

flechaLeft.addEventListener("click", () => {
    console.log('click');
    slideS.scrollLeft -= 100;
});

flechaRight.addEventListener("click", () => {
    slideS.scrollLeft += 100;
});





