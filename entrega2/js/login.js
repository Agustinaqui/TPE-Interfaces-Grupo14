// Obtener los elementos de los formularios y botones para cambiar de formulario
    const botonRegistrar = document.querySelector('.botonRegistrar');
    const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
    const formularioLogin = document.getElementById('contenedorFormularioLogin');
    const mensajeExito = document.getElementById('mensajeExito');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');

    // Simular registro exitoso
    botonRegistrar.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el envío real del formulario

        // Animación de fade out del formulario de registro
        formularioRegistro.classList.add('hidden');

        // Mostrar mensaje de éxito después de que se desvanezca el formulario
        setTimeout(() => {
            mensajeExito.classList.add('show'); // Muestra el mensaje de éxito
            // Redirigir a index.html después de 2 segundos
            setTimeout(() => {
                window.location.href = "../index.html"; // Cambia la ruta según tu estructura de carpetas
            }, 2000); // 2000 ms = 2 segundos
        }, 500); // Tiempo sincronizado con la duración de la animación
    });
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

const botonesIngreso = document.querySelectorAll('.botonRegistrar');
botonesIngreso.forEach((boton) => {
    boton.addEventListener("click", () => {
        window.location.href = "../index.html"; 
    });
});

