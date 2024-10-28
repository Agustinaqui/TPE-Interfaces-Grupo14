
const canvas = document.getElementById("canvas-juego");
const ctx = canvas.getContext("2d");

let x = 4;
let player1_selected = false;
let player2_selected = false;
const Xenlinea = document.getElementById("X-en-linea");
Xenlinea.innerText = x;

// 
const menu_inicial_node = document.getElementById("menu-inicial");

const btn_jugar = document.getElementById("btn-jugar");

const btn_mas = document.getElementById("X_en_linea_+");
const btn_menos = document.getElementById("X_en_linea_-");

const player_1_ficha_node = document.getElementById("player-1-ficha");
const player_2_ficha_node = document.getElementById("player-2-ficha");

const fichas_seleccionables = document.querySelectorAll(".ficha-seleccionable");

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
    console.log("player 1 preparado :" + player1_selected);
    console.log("player 2 preparado :" + player2_selected);
    if (!player1_selected || !player2_selected) {
        return;
    }

    menu_inicial_node.classList.add("hidden");
    const name1 = document.getElementById("player-1-name").value;
    const name2 = document.getElementById("player-2-name").value;
    const game = new Juego(x, name1, name2);
    game.jugar();
})

function comenzar() {
    document.getElementById("pantalla-inicial").classList.add("hidden");
    document.getElementById("menu-inicial").classList.remove("hidden");
}

class Juego {

    constructor(x, jug1, jug2, ficha1 = "", ficha2 = "") {
        this.tablero = new Tablero(x, canvas, ctx);
        this.fichero1 = new Fichero(jug1, ficha1, true, ctx);
        this.fichero2 = new Fichero(jug2, ficha2, false, ctx);
    }

    jugar() {

        document.getElementById("canvas-juego").classList.remove("hidden");
        this.tablero.draw();
        this.fichero1.draw();

    }

}
