
const imgCarritoNode = document.getElementById("imgCarrito");
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
