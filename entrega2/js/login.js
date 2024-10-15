// Obtener los elementos de los formularios y botones para cambiar de formulario
    const botonRegistrar = document.querySelectorAll('.botonRegistrar');
    const formularioRegistro = document.getElementById('contenedorFormularioRegistro');
    const formularioLogin = document.getElementById('contenedorFormularioLogin');
    const mensajeExito = document.getElementById('mensajeExito');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');

    // Simular registro exitoso
    botonRegistrar.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            formularioRegistro.classList.add('hidden');
            formularioLogin.classList.add('hidden');
        setTimeout(() => {
                mensajeExito.classList.add('show'); 
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000); 
        }, 500); 
    });
    })
    


        
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



