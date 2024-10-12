
//animacion de carga
let carritoCount = 0;

inicializarCarrouseles()

async function inicializarCarrouseles() {

    const carrouselRecomendadosNode = document.getElementById("carrouseles-recomendados");
    const data = await (await fetch("./carrouseles.json")).json();
    const carrouselesData = data.carrouselesRecomendados;

    let juegosCount = 0;
    let carrouselesCount = 0;

    carrouselesData.forEach(carr => {

        const carrDiv = document.createElement("div");
        carrDiv.classList.add(`carrousel-container`);

        const titulo = document.createElement("h2");
        titulo.innerText = carr.nombre;
        carrDiv.appendChild(titulo);

        const flechaL = document.createElement("div");
        const flechaR = document.createElement("div");

        flechaL.classList.add("flecha-l");
        flechaL.classList.add("hidden");
        flechaL.id = `flechaL-${carrouselesCount}`
        flechaR.classList.add("flecha-r");
        flechaR.id = `flechaR-${carrouselesCount}`

        flechaL.innerHTML = "<p>&lt;</p>";
        flechaR.innerHTML = "<p>&gt;</p>";

        const carrJuegos = document.createElement("div");

        carrDiv.appendChild(flechaL)
        carrDiv.appendChild(flechaR)

        carrJuegos.id = `carrousel-recomendado-${carrouselesCount++}`;
        carrJuegos.classList.add("carrousel");

        carr.juegos.forEach(juego => {

            let cardType = "card-free";
            if (juego.precio > 0) {
                cardType = juego.jugable ? "card-owned" : "card-venta";
            }

            let btnVentaClass = " ";
            if (juego.precio > 0 && !juego.jugable) {
                btnVentaClass = "btn-venta";
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
                                <div class="cardBotonPlay ${btnVentaClass}" id="gamecard-${juegosCount++}">
    
                                    <img src="./images/iconos/${playBotonIcon}" alt="">
                                </div>
    
                            </div>
    
    
                        </div>`;

            carrJuegos.innerHTML += card;

        });

        carrDiv.appendChild(carrJuegos);

        carrouselRecomendadosNode.appendChild(carrDiv);


    });

    inicializarCarritoFuncionalidad();


    const tracks = document.getElementsByClassName('carrousel');
    const flechasL = document.getElementsByClassName('flecha-l');
    const flechasR = document.getElementsByClassName('flecha-r');

    let currentIndex = [0, 0, 0]

    const cardWidth = 214.4;
    const moveBy = 3; // Avanzar o retroceder 3 cards

    let startX = [0, 0, 0];
    let scrollLeft = [0, 0, 0];


    for (let i = 0; i < tracks.length; i++) {
        tracks[i].addEventListener('mousedown', (e) => {
            startX[i] = e.pageX - tracks[i].offsetLeft;
            scrollLeft[i] = tracks[i].scrollLeft;
            tracks[i].classList.add('dragging');
        });

        tracks[i].addEventListener('mouseleave', () => {
            tracks[i].classList.remove('dragging');
        });

        document.addEventListener('mouseup', () => {
            tracks[i].classList.remove('dragging');
        });

        tracks[i].addEventListener('mousemove', (e) => {
            if (!tracks[i].classList.contains('dragging')) return;

            if (tracks[i].scrollLeft == 0) {
                flechasL[i].classList.add("hidden")
            }

            const x = e.pageX - tracks[i].offsetLeft;
            const walk = x - startX[i];
            tracks[i].scrollLeft = scrollLeft[i] - walk;

        });

        flechasL[i].addEventListener('click', (e) => {

            const j = e.target.id.split("-")[1];

            //const nextIndex = currentIndex[j] + moveBy

            //currentIndex[j] = nextIndex <= 0 ? nextIndex : currentIndex[j];

            /* if (currentIndex[j] == 0) {
                flechasL[j].classList.add("hidden")
            } */

            if (tracks[i].scrollLeft == 0) {
                flechasL[j].classList.add("hidden")
            }

            flechasR[j].classList.remove("hidden");

            const walk = cardWidth * moveBy

            moveCarousel(tracks[j], -walk);

        });

        flechasR[i].addEventListener('click', (e) => {

            const j = e.target.id.split("-")[1];
            if (tracks[j].scrollLeft <= 0) {
                flechasL[j].classList.remove("hidden")
            }

            // const nextIndex = currentIndex[j] - moveBy;
            const walk = cardWidth * moveBy

            /* if (-currentIndex[j] < tracks[j].children.length) {
                currentIndex[j] = nextIndex;
            } */

            moveCarousel(tracks[j], walk);
        });

        /* 
                // Compatibilidad con dispositivos móviles (touch)
                tracks[i].addEventListener('touchstart', (e) => {
                    startX[i] = e.touches[0].pageX - tracks[i].offsetLeft;
                    scrollLeft[i] = tracks[i].scrollLeft;
                });
        
                tracks[i].addEventListener('touchmove', (e) => {
                    const x = e.touches[0].pageX - tracks[i].offsetLeft;
                    const walk = (x - startX[i]);
                    tracks[i].scrollLeft = scrollLeft[i] - walk;
                }); */
    }


    // Función para mover el carrusel
    function moveCarousel(track, walk) {


        // Si esta al principio o al final no deja mover.
        let canScroll = true;

        if (walk < 0 && track.scrollLeft == 0 || walk > 0 && Math.floor(track.scrollLeft) == (track.scrollWidth - track.clientWidth)) {
            canScroll = false;
        }

        if (!canScroll) {
            return
        }

        let walkAmount = walk;

        console.log(track.scrollWidth - track.clientWidth);

        if (walk > 0 && walk > track.scrollWidth - track.clientWidth - track.scrollLeft) {

            walkAmount = track.scrollWidth - track.clientWidth - track.scrollLeft;
        } /* else if (walk < 0 && track.scrollLeft + walk < 0) {
            walkAmount = walk + track.scrollLeft;
            console.log(walkAmount);
        } */

        //track.style.transform = `translateX(${-walkAmount}px)`;

        tracks[track.id.split("-")[2]].scrollBy({ left: walkAmount, behavior: "smooth" })

        //if(track.scrollLeft < (track.scrollWidth - track.clientWidth))

        //const trackWidth = track.getBoundingClientRect().width;
        //const containerWidth = track.parentElement.getBoundingClientRect().width;

        //const x = e.pageX - tracks[i].offsetLeft;
        //const walk = x - startX[i];

        //tracks[i].scrollLeft = scrollLeft[i] - walk;

        // Calcula el movimiento deseado
        // let moveAmount = -((cardWidth) * index);

        /* moveAmount = moveAmount < -(containerWidth - trackWidth) ? moveAmount : -(containerWidth - trackWidth);
        if (moveAmount == -(containerWidth - trackWidth)) {
            document.getElementById(`flechaR-${track.id.split("-")[2]}`).classList.add("hidden")
        } */
        // Si el movimiento se pasa del límite, ajusta para que no haya espacio vacío

        //track.offsetLeft = -moveAmount
    }

}


function inicializarCarritoFuncionalidad() {

    updateCarritoCount();

    const botonesNodes = document.getElementsByClassName("cardBotonPlay");
    for (let i = 0; i < botonesNodes.length; i++) {
        const btnVenta = botonesNodes[i];
        if (btnVenta.classList.contains("btn-venta")) {
            btnVenta.addEventListener("click", addToCart)
        }
    }

}

// Al apretar el boton del carrito en una card, añaden al carrito el juego 
function addToCart(event) {
    if (carritoCount == 0) {
        // cambiar el icono del carrito al que tiene el cartelito
    }

    carritoCount++;

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

    // cambiar el icono de la card por carrito seleccionado
    let gameId = event.target.offsetParent.children[1].id;
    changeIconBack(gameId);
    updateCarritoCount();
}

function updateCarritoCount() {
    const textCarritoNode = document.getElementById("carrito-text");

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

}

function changeIconBack(gameId) {
    const cardButton = document.getElementById(gameId)

    //intercambio el evento del click
    cardButton.removeEventListener("click", removeFromCart)
    cardButton.addEventListener("click", addToCart)

    let img = cardButton.children[0]
    img.src = "./images/iconos/carritoCard.png";

}
