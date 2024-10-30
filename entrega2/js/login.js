// Obtener los elementos de los formularios y botones para cambiar de formulario
const botonRegistrar = document.querySelectorAll('.botonRegistrar');
const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
const formularioLogin = document.getElementById('contenedorFormularioLogin');
const mensajeExito = document.getElementById('mensajeExito');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

const formRegistro = document.getElementById("form-registro")
const formLogin = document.getElementById("form-login")

// Simular registro exitoso
botonRegistrar.forEach((btn) => {
    let formDeseado = btn.id.split("-")[1];

    let form = formDeseado == "registro" ? formRegistro : formLogin;

    btn.addEventListener('click', (event) => {
        event.preventDefault();

        if (verificarDatos(form)) {
            formularioRegistro.classList.add('hidden');
            formularioLogin.classList.add('hidden');
            setTimeout(() => {
                mensajeExito.classList.add('show');
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            }, 500);
        } else {
            const error = getErrorVerificacionForm(form);
            mostrarAyudaForm(form, error);
        }
    });
})

function getErrorVerificacionForm(form) {
    const error = {};
    for (let i = 0; i < form.children.length; i++) {
        const hijo = form.children[i];
        if (hijo.required && hijo.value == "") {
            error[`${hijo.title}`] = `Faltó ingresar el valor de "${hijo.title}"`
        }
    }
    return error;
}

function mostrarAyudaForm(form, error) {

    console.log(form);
    console.log(error);

}


function verificarDatos(form) {

    for (let i = 0; i < form.children.length; i++) {
        const hijo = form.children[i];
        if (hijo.required && hijo.value == "") {
            return false;
        }
    }

    return true;

}

// Cambiar entre formularios de Login y Registro
switchToLogin.addEventListener('click', () => {
    formularioRegistro.classList.add("hidden");
    formularioLogin.classList.remove("hidden");
});

switchToRegister.addEventListener('click', () => {
    formularioRegistro.classList.remove("hidden");
    formularioLogin.classList.add("hidden");
});

// Recaptcha: Simulación de clic
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



