// Obtener los elementos de los formularios y los botones para cambiar
const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
const formularioLogin = document.getElementById('contenedorFormularioLogin');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

switchToRegister.addEventListener("click" , () => {
    formularioRegistro.classList.remove("hidden")
    formularioLogin.classList.add("hidden")
})

switchToLogin.addEventListener("click", () => {
    formularioRegistro.classList.add("hidden");
    formularioLogin.classList.remove("hidden");
});

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

const botonesIngreso = document.querySelectorAll('.botonRegistrar');
botonesIngreso.forEach((boton) => {
    boton.addEventListener("click", () => {
        window.location.href = "../index.html"; 
    });
});

