// Obtener los elementos de los formularios y botones para cambiar de formulario
const botonRegistrar = document.querySelectorAll('.botonRegistrar');
const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
const formularioLogin = document.getElementById('contenedorFormularioLogin');
const mensajeExito = document.getElementById('mensajeExito');
const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

const formRegistro = document.getElementById("form-registro");
const formLogin = document.getElementById("form-login");

// Función para obtener los errores de validación
function getErrorVerificacionForm(form) {
    const error = {};
    const inputs = form.querySelectorAll('.inputRegistro');
    inputs.forEach(input => {
        if (input.required && input.value.trim() === "") {
            error[input.title] = `X`;
        }
    });
    return error;
}

// Mostrar mensajes de ayuda debajo de los campos
function mostrarAyudaForm(form, error) {
    const inputs = form.querySelectorAll('.inputRegistro');
    const advertencias = form.querySelectorAll('.advertencia-form');

    inputs.forEach((input, index) => {
        const advertencia = advertencias[index];
        if (error[input.title]) {
            advertencia.style.display = 'block';
            advertencia.textContent = error[input.title];
        } else {
            advertencia.style.display = 'none';
        }
    });
}

// Verificar si los datos son válidos
function verificarDatos(form) {
    const inputs = form.querySelectorAll('.inputRegistro');
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.required && input.value.trim() === "") {
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
function mostrarAyudaForm(form, error) {
    const inputs = form.querySelectorAll(".inputRegistro"); // Seleccionar todos los inputs
    const advertencias = form.querySelectorAll(".advertencia-form"); // Seleccionar advertencias
  
    // Limpiar estilos y mensajes previos
    inputs.forEach((input) => {
      input.classList.remove("input-error");
    });
    advertencias.forEach((adv) => {
      adv.style.display = "none";
    });
  
    // Aplicar errores
    Object.keys(error).forEach((key) => {
      const input = [...inputs].find((inp) => inp.title === key);
      const advertencia = input.nextElementSibling;
  
      if (input) {
        input.classList.add("input-error"); // Agregar borde rojo resplandeciente
      }
  
      if (advertencia) {
        advertencia.style.display = "block"; // Mostrar mensaje de error
        advertencia.textContent = error[key]; // Asignar texto de error
      }
    });
  }
  
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
});