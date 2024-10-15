document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.logoMenu');
    const menuCategory = document.querySelector('.menu');


    // Función para mostrar u ocultar el menú del perfil
    function togglemenuCategory() {
        menuCategory.classList.toggle("hidden");
    }

    // Cerrar el menú si se hace clic en cualquier parte fuera de él
    function closemenuCategory(event) {
        if (!event.target.closest('.menuCategory')) {
            menuCategory.classList.add("hidden");
        }
    }

    // Escuchar el clic en el botón del perfil
    menuButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Evita que el evento cierre el menú cuando hacemos clic en el botón
        togglemenuCategory();
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', closemenuCategory);
});