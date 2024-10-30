
const canvas = document.getElementById("canvas-juego");
const contPlayer1 = document.getElementById("container-player1");
const contPlayer2 = document.getElementById("container-player2");
const ctx = canvas.getContext("2d");

let x = 4;
let player1_selected = false;
let player2_selected = false;
const Xenlinea = document.getElementById("X-en-linea");
Xenlinea.innerText = x;

let playerTurno = 1;
let mouseDown = false;
let fichaActiva = null;
let offSetX;
let offSetY;
let isInside = false;
let indiceDropArea = 0;

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
    if (x < 7) {
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

    const tableroImage = new Image();
    tableroImage.src = '../images/iconos/CasilleroImg.png';

    tableroImage.onload = () => {
        const game = new Juego(x, tableroImage, name1, name2, img1, img2);

        game.jugar();
        game.redibujarCanvas()
    }

})

function comenzar() {
    document.getElementById("pantalla-inicial").classList.add("hidden");
    document.getElementById("menu-inicial").classList.remove("hidden");
}

class Juego {

    constructor(x, tableroImage, jug1, jug2, ficha1, ficha2) {
        this.x = x;

        this.tablero = new Tablero(x, tableroImage, canvas, ctx);

        /* calcula cuantas fichas le corresponde a cada fichero */
        let fichasCount = Math.ceil(this.tablero.getFichasCount() / 2);

        this.fichero1 = new Fichero(1, x, jug1, ficha1, fichasCount, true, 25, 250, ctx);
        this.fichero2 = new Fichero(2, x, jug2, ficha2, fichasCount, false, 700, 250, ctx);
    }


    jugar() {

        const canvas = document.getElementById("canvas-juego");
        canvas.classList.remove("hidden");
        //document.getElementById("container-player1").classList.remove("hidden");
        //document.getElementById("container-player2").classList.remove("hidden");


        canvas.addEventListener("mousedown", (e) => {

            const { offsetX: mouseX, offsetY: mouseY } = e;

            // Buscar si se hizo clic en alguna ficha del jugador 1 o 2
            const fichasAll = [...this.fichero1.fichas, ...this.fichero2.fichas];

            let i = fichasAll.length - 1;

            while (i >= 0 && !fichaActiva) {
                const ficha = fichasAll[i];
                if (ficha.contienePunto(mouseX, mouseY)) {
                    if (ficha.colocada) {
                        return;
                    }
                    if (playerTurno == ficha.player) {

                        fichaActiva = ficha;
                        offSetX = mouseX - ficha.x; // Diferencia X entre el clic y el centro de la ficha
                        offSetY = mouseY - ficha.y; // Diferencia Y entre el clic y el centro de la ficha
                        ficha.isDragging = true;    // Marcar que la ficha está siendo arrastrada
                    }
                }
                i--;
            }

            if (fichaActiva) {
                this.tablero.casillasDrop.forEach(dropArea => {
                    dropArea.visible = true;
                })
                // Mover la ficha
                fichaActiva.x = mouseX;
                fichaActiva.y = mouseY;

            }
            this.redibujarCanvas()

        })

        // Evento mousemove (mover el mouse)
        canvas.addEventListener('mousemove', (e) => {
            if (fichaActiva) { // Si hay una ficha arrastrada
                const { offsetX: mouseX, offsetY: mouseY } = e;
                // Mover la ficha
                fichaActiva.x = mouseX;
                fichaActiva.y = mouseY;


                //const dropArea = this.tablero.getDropAreaInPoint(mouseX, mouseY)
                isInside = false;
                indiceDropArea = 0;

                while (indiceDropArea < this.tablero.casillasDrop.length && !isInside) {
                    const dropArea = this.tablero.casillasDrop[indiceDropArea];

                    isInside = dropArea.isPointInsideSquare(mouseX, mouseY);

                    if (!isInside) {
                        indiceDropArea++;
                    }
                }

                const dropArea = this.tablero.casillasDrop[indiceDropArea];

                if (isInside) {
                    fichaActiva.x = dropArea.posx + (dropArea.width / 2) /* + dropArea.gap */;
                    fichaActiva.y = dropArea.posy + (dropArea.width / 2) /* + dropArea.gap */;
                    fichaActiva.radio = dropArea.width / 2;
                } else {
                    fichaActiva.radio = fichaActiva.initialRadio;

                }

                this.redibujarCanvas(); // Redibujar el tablero con las nuevas posiciones

            }

        });

        canvas.addEventListener('mouseup', () => {

            if (fichaActiva) {

                fichaActiva.x = fichaActiva.initialX
                fichaActiva.y = fichaActiva.initialY
                fichaActiva.radio = fichaActiva.initialRadio;

                if (isInside) {
                    /* buscar la fila  */
                    const casilla = this.tablero.getLowerCasillaByIndex(indiceDropArea);

                    if (casilla) {
                        const dropArea = this.tablero.casillasDrop[indiceDropArea];

                        fichaActiva.x = casilla.posx + (casilla.cellSize / 2)
                        fichaActiva.y = casilla.posy + (casilla.cellSize / 2)
                        fichaActiva.radio = dropArea.width / 2;

                        fichaActiva.colocada = true;
                        casilla.ficha = fichaActiva;

                        //console.log(this.checkWin());

                        playerTurno = playerTurno == 1 ? 2 : 1;
                    }
                }

                this.tablero.casillasDrop.forEach(dropArea => {
                    dropArea.visible = false;
                })
                fichaActiva.isDragging = false;
                fichaActiva = null;
            }

            this.redibujarCanvas();
        });


        /* ficha1.addEventListener("mouseup", (e)=> {
            console.log(e.target);
            
        })
        ficha2.addEventListener("click", (e)=> {
            console.log(e.target);
            
        }) */


    }

    checkWin(row, col) {
        return this.checkDirection(row, col, 1, 0) || // Horizontal
           this.checkDirection(row, col, 0, 1) || // Vertical
           this.checkDirection(row, col, 1, 1) || // Diagonal ↘
           this.checkDirection(row, col, 1, -1) || // Diagonal ↙
           this.checkDirection(row, col, -1, 1) ||
           this.checkDirection(row, col, -1, -1);
    }

    checkDirection(row, col, rowIncrement, colIncrement) {
        let count = 1; // Cuenta la ficha inicial

        for (let i = 1; i < x; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;
            if (newRow < 0 || newRow >= this.tablero.MAXFILAS || newCol < 0 || newCol >= this.tablero.MAXCOLS || this.tablero.casillas[newRow][newCol].ficha || isNaN(this.tablero.casillas[newRow][newCol].ficha.player)  ) break;
            
            if(this.tablero.casillas[newRow][newCol].ficha && this.tablero.casillas[newRow][newCol].ficha.player == playerTurno){
                count++;
            }
        }
        for (let i = 1; i < x; i++) {
            const newRow = row - i * rowIncrement;
            const newCol = col - i * colIncrement;
            if (newRow < 0 || newRow >= this.tablero.MAXFILAS || newCol < 0 || newCol >= this.tablero.MAXCOLS || this.tablero.casillas[newRow][newCol].ficha || isNaN(this.tablero.casillas[newRow][newCol].ficha.player)  ) break;
            
            if(this.tablero.casillas[newRow][newCol].ficha && this.tablero.casillas[newRow][newCol].ficha.player == playerTurno){
                count++;
            }
        }
        return count >= x;
    }
    redibujarCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.tablero.drawDropAreas();

        this.fichero1.draw();
        this.fichero2.draw();

        [...this.fichero1.fichas, ...this.fichero2.fichas].forEach(ficha => {
            if (ficha.colocada) {
                ficha.draw(ctx)
            }
        });

        this.tablero.draw();

        [...this.fichero1.fichas, ...this.fichero2.fichas].forEach(ficha => {
            if (!ficha.colocada) {
                ficha.draw(ctx)
            }
        });

    }
}
