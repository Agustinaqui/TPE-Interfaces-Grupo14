document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.querySelector('.botonMenuPerfil');
    const profileMenu = document.querySelector('.menuPerfil');


    // Función para mostrar u ocultar el menú del perfil
    function toggleProfileMenu() {
        profileMenu.classList.toggle("hidden");
    }

    // Cerrar el menú si se hace clic en cualquier parte fuera de él
    function closeProfileMenu(event) {
        if (!event.target.closest('.profileMenu')) {
            profileMenu.classList.add("hidden");
        }
    }

    // Escuchar el clic en el botón del perfil
    profileButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Evita que el evento cierre el menú cuando hacemos clic en el botón
        toggleProfileMenu();
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', closeProfileMenu);
});
