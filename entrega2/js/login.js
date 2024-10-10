// Obtener los elementos de los formularios y los botones para cambiar
const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
const formularioLogin = document.getElementById('contenedorFormularioLogin');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

switchToLogin.addEventListener("click" , () => {
    formularioLogin.classList.remove("hidden")
    formularioRegistro.classList.add("hidden")
})

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

