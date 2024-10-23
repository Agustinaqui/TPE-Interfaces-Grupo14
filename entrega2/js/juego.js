
const canvas = document.getElementById("canvas-juego");
const ctx = canvas.getContext("2d");

let x = 4;
const Xenlinea = document.getElementById("X-en-linea");
Xenlinea.innerText = x;

// 
const menu_inicial_node = document.getElementById("menu-inicial");
const btn_jugar = document.getElementById("btn-jugar");
const btn_mas = document.getElementById("X_en_linea_+");
const btn_menos = document.getElementById("X_en_linea_-");
const player_1_ficha_node = document.getElementById("player-1-ficha");
const player_2_ficha_node = document.getElementById("player-2-ficha");



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
    menu_inicial_node.classList.add("hidden");
    const name1 = document.getElementById("player-1-name").value;
    const name2 = document.getElementById("player-2-name").value;
    const game = new Juego(x, name1, name2);
    game.jugar();
})

class Juego {

    constructor(x, jug1, jug2, ficha1 = "", ficha2 = "") {
        this.tablero = new Tablero(x, canvas, ctx);
        this.fichero1 = new Fichero(jug1, ficha1, true, ctx);
        this.fichero2 = new Fichero(jug2, ficha2, false, ctx);
    }

    jugar() {

        this.tablero.draw();
        this.fichero1.draw();

    }

}
