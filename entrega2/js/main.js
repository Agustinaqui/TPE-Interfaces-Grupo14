
//animacion de carga

inicializarCarrouseles()

//carga de carrito
inicializarCarrito()


async function inicializarCarrouseles() {

    const carrouselRecomendadosNode = document.getElementById("carrousel-recomendado");

    const juegos = await (await fetch("./juegos.json")).json();

    let juegosCount = 0;

    juegos.forEach(juego => {

        let cardType = "card-free";
        if (juego.precio > 0) {
            cardType = juego.jugable ? "card-owned" : "card-venta";
        }
        let priceText = juego.precio > 0 ? "$" + juego.precio : "Free";

        let favTagFondo = juego.fav ? "tag-fav-blanco.png" : "tag-fav-gris.png"

        let favTagIcono = juego.fav ? "favoritoSeleccionado.png" : "favorito.png"

        let topTagFondo = juego.jugable ? "tag-disponible.png" : "tag-precio.png";

        let playBotonIcon = juego.jugable ? "playIcon.png" : "carritoCard.png";

        let card = `<div class="card ${cardType}">
                        <div class="card-top">
                            <div class="card-tag-disp">
                                <img class="card-tag-disp-fondo" src="./images/tags/${topTagFondo}" alt="fondo de etiqueta superior">
                                <img class="card-tag-disp-icono" src="./images/iconos/comprado.png" alt="fondo de etiqueta superior">
                                <p class="textoLabel cardTagDispText">
                                    ${priceText}
                                </p>
                            </div>

                            <div class="card-tag-fav">

                                <img src="./images/tags/${favTagFondo}" alt="favorito">
                                <img class="card-tag-fav-icono" src="./images/iconos/${favTagIcono}" alt="">
                            </div>

                        </div>

                        <img class="card-imagen" src="./images/${juego.img}" alt="imagen del juego">

                        <div class="card-bottom">

                            <h3 class="card-titulo">${juego.nombre}</h3>
                            <div class="cardBotonPlay" id="gamecard-${juegosCount++}">

                                <img src="./images/iconos/${playBotonIcon}" alt="">
                            </div>

                        </div>


                    </div>`;

        carrouselRecomendadosNode.innerHTML += card;

    });




}


function inicializarCarrito() {

    const textCarritoNode = document.getElementById("carrito-text");

    let carritoCount = 0;

    updateCarritoCount();

    document.getElementById("gamecard-1").addEventListener("click", addToCart);

    // Al apretar el boton del carrito en una card, añaden al carrito el juego 
    function addToCart(event) {
        if (carritoCount == 0) {
            // cambiar el icono del carrito al que tiene el cartelito
        }

        carritoCount++;
        console.log(carritoCount);

        // cambiar el icono de la card por carrito seleccionado
        let gameId = event.target.offsetParent.children[1].id;
        changeIconToAdded(gameId);
        updateCarritoCount();

    }

    function removeFromCart(event) {
        if (carritoCount > 0) {
            carritoCount--;
        }
        if (carritoCount == 0) {
            // cambiar el icono del carrito al que esta vacio

        }
        console.log(carritoCount);

        // cambiar el icono de la card por carrito seleccionado
        let gameId = event.target.offsetParent.children[1].id;
        changeIconBack(gameId);
        updateCarritoCount();
    }

    function updateCarritoCount() {
        textCarritoNode.innerText = carritoCount;
        if (carritoCount == 0) {
            textCarritoNode.classList.add("hidden");
            return;
        }
        textCarritoNode.classList.remove("hidden");

    }

    function changeIconToAdded(gameId) {
        const cardButton = document.getElementById(gameId)

        //intercambio el evento del click
        cardButton.removeEventListener("click", addToCart)
        cardButton.addEventListener("click", removeFromCart)

        let img = cardButton.children[0]
        img.src = "./images/iconos/carritoCardSeleccionado.png";
        console.log(img);

    }

    function changeIconBack(gameId) {
        const cardButton = document.getElementById(gameId)

        //intercambio el evento del click
        cardButton.removeEventListener("click", removeFromCart)
        cardButton.addEventListener("click", addToCart)

        let img = cardButton.children[0]
        img.src = "./images/iconos/carritoCard.png";
        console.log(img);

    }
}
