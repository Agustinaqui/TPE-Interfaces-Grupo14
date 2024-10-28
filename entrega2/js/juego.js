
const canvas = document.getElementById("canvas-juego");
const contPlayer1 = document.getElementById("container-player1");
const contPlayer2 = document.getElementById("container-player2");
const ctx = canvas.getContext("2d");

let x = 4;
let player1_selected = false;
let player2_selected = false;
const Xenlinea = document.getElementById("X-en-linea");
Xenlinea.innerText = x;

// 
let mouseDown = false;
let inDropArea = false;
let fichaActiva = null;
let fichaActivaNodo = null;
let offSetX;
let offSetY;

const menu_inicial_node = document.getElementById("menu-inicial");

const btn_jugar = document.getElementById("btn-jugar");

const btn_mas = document.getElementById("X_en_linea_+");
const btn_menos = document.getElementById("X_en_linea_-");

const player_1_ficha_node = document.getElementById("player-1-ficha");
const player_2_ficha_node = document.getElementById("player-2-ficha");

const juegoDivNodoContainer = document.getElementById("juego-div").getBoundingClientRect();


const fichas_seleccionables = document.querySelectorAll(".ficha-seleccionable");

/* prepara las fichas seleccionables en el menu de seleccion */
for (let i = 0; i < fichas_seleccionables.length; i++) {
    const ficha = fichas_seleccionables[i];

    const player_objetivo_id = ficha.parentElement.id.split("-")[2];
    const ficha_activa = document.getElementById(`player-${player_objetivo_id}-ficha`);

    ficha.addEventListener("click", (e) => {

        const ficha_seleccionada = e.target;
        if (ficha_seleccionada.classList.contains("ficha-selected")) {
            return;
        }

        if (player_objetivo_id == 1) {
            if (!player1_selected) {
                player1_selected = true;
            }
        } else if (player_objetivo_id == 2) {
            if (!player2_selected) {
                player2_selected = true;
            }
        }

        //deseleccionar la que estaba selected para que ahora pueda ser seleccionada nuevamente
        for (let i = 0; i < fichas_seleccionables.length; i++) {
            if (fichas_seleccionables[i].src == ficha_activa.src) {
                fichas_seleccionables[i].classList.remove("ficha-selected")
            }
        }

        //seleccionar la que acaba de ser seleccionada para que no pueda serlo de nuevo
        for (let i = 0; i < fichas_seleccionables.length; i++) {
            if (fichas_seleccionables[i].src == ficha_seleccionada.src) {
                fichas_seleccionables[i].classList.add("ficha-selected")
            }
        }

        ficha_activa.src = ficha_seleccionada.src;


    })

}


btn_mas.addEventListener("click", () => {
    if (x < 10) {
        x++;
        Xenlinea.innerText = x;
    }
})

btn_menos.addEventListener("click", () => {
    if (x > 4) {
        x--;
        Xenlinea.innerText = x;
    }
})

btn_jugar.addEventListener("click", () => {

    if (!player1_selected || !player2_selected) {
        return;
    }

    menu_inicial_node.classList.add("hidden");
    const name1 = document.getElementById("player-1-name").value;
    const name2 = document.getElementById("player-2-name").value;
    const img1 = player_1_ficha_node.src;
    const img2 = player_2_ficha_node.src;
    const game = new Juego(x, name1, name2, img1, img2);
    game.jugar();
})

function comenzar() {
    document.getElementById("pantalla-inicial").classList.add("hidden");
    document.getElementById("menu-inicial").classList.remove("hidden");
}

class Juego {

    constructor(x, jug1, jug2, ficha1 = "", ficha2 = "") {
        this.x = x;
        this.tablero = new Tablero(x, canvas, ctx);
        /* calcula cuantas fichas le corresponde a cada fichero */
        let fichasCount = Math.ceil(this.tablero.getFichasCount() / 2);

        this.fichero1 = new Fichero(1, x, jug1, ficha1, fichasCount, true, 25, 250, 175, 225, ctx);
        this.fichero2 = new Fichero(2, x, jug2, ficha2, fichasCount, false, 700, 250, 175, 225, ctx);
    }


    jugar() {

        document.getElementById("canvas-juego").classList.remove("hidden");
        //document.getElementById("container-player1").classList.remove("hidden");
        //document.getElementById("container-player2").classList.remove("hidden");

        this.tablero.draw();
        this.fichero1.draw();
        this.fichero2.draw();

        const fichasPlayer1 = document.querySelectorAll(".ficha-1");
        const fichasPlayer2 = document.querySelectorAll(".ficha-2");

        for (let i = 0; i < fichasPlayer1.length; i++) {
            const fichaNodo1 = fichasPlayer1[i];
            const fichaNodo2 = fichasPlayer2[i];

            fichaNodo1.addEventListener("mousedown", (e) => {
                /* acabo de clickear una ficha, debe ahora moverse */
                const index = e.target.id.split("-")[2];

                fichaActiva = this.fichero1.fichas[index];
                fichaActivaNodo = fichasPlayer1[index];

                mouseDown = true;
                offSetX = fichaActivaNodo.offsetWidth / 2; // Desplazamiento desde el centro
                offSetY = fichaActivaNodo.offsetHeight / 2;

                //ficha.isDragging = true;

                fichaActiva.x = e.clientX - fichaNodo1.offsetLeft
                fichaActiva.y = e.clientY - fichaNodo1.offsetTop
            })

            fichaNodo2.addEventListener("mousedown", (e) => {
                /* acabo de clickear una ficha, debe ahora moverse */
                const index = e.target.id.split("-")[2];

                fichaActiva = this.fichero2.fichas[index];
                fichaActivaNodo = fichasPlayer2[index];

                mouseDown = true;
                offSetX = fichaActivaNodo.offsetWidth / 2; // Desplazamiento desde el centro
                offSetY = fichaActivaNodo.offsetHeight / 2;

                fichaActiva.x = e.clientX - fichaNodo1.offsetLeft
                fichaActiva.y = e.clientY - fichaNodo1.offsetTop
            })
            document.addEventListener('mousemove', (e) => {

                if (!mouseDown || !fichaActiva) {
                    return;
                }




                const x = e.clientX - juegoDivNodoContainer.left - offSetX;
                const y = e.clientY - juegoDivNodoContainer.top - offSetY;

                fichaActivaNodo.style.left = `${x}px`;
                fichaActivaNodo.style.top = `${y}px`;

            });

            document.addEventListener('mouseup', (e) => {

                if (!fichaActivaNodo) {
                    return
                }
                mouseDown = false;

                if (inDropArea) {

                    return
                }

                fichaActivaNodo.style.left = `${fichaActiva.initialX}px`
                fichaActivaNodo.style.top = `${fichaActiva.initialY}px`

                fichaActiva = null;
                fichaActivaNodo = null;

            });

            /* ficha1.addEventListener("mouseup", (e)=> {
                console.log(e.target);
                
            })
            ficha2.addEventListener("click", (e)=> {
                console.log(e.target);
                
            }) */
        }

    }

}
