class Tablero {

    constructor(x, canvas, ctx) {
        this.x = x;
        this.canvas = canvas;
        this.MAXCOLS = x + 3;
        this.MAXFILAS = x + 2;
        this.casillas = [];
        this.ctx = ctx;

        // Calcular el tamaño de los casilleros
        this.cellSize = (400 - (this.MAXFILAS + 1)) / this.MAXFILAS;

        // Calculo cuanto corro el tablero dentro del canvas
        this.offSetX = (this.canvas.width - this.MAXCOLS * this.cellSize) / 2;
        this.offSetY = ((this.canvas.height - this.MAXFILAS * this.cellSize) / 6) * 5;
    }



    draw() {

        const cellImage = new Image();
        cellImage.src = '../images/iconos/CasilleroImg.png';

        cellImage.onload = () => {
            // Dibujar el tablero con la imagen de casillero
            for (let fila = 0; fila < this.MAXFILAS; fila++) {

                for (let col = 0; col < this.MAXCOLS; col++) {
                    // Posición de cada casillero
                    const x = (col * this.cellSize) + this.offSetX;
                    const y = (fila * this.cellSize) + this.offSetY;

                    // Dibujar la imagen del casillero
                    ctx.drawImage(cellImage, x, y, this.cellSize, this.cellSize);

                    //// Crear casillero transparente (si es necesario)
                    //ctx.globalCompositeOperation = 'destination-out';
                    //ctx.beginPath();
                    //ctx.arc(x + this.cellSize / 2, y + this.cellSize / 2, this.cellSize / 2.5, 0, Math.PI * 2);
                    //ctx.fill();
                    //ctx.globalCompositeOperation = 'source-over';
                }
            }
        };
        /*
        // Dibujar el tablero
        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            let filaCasillas = [];

            for (let col = 0; col < this.MAXCOLS; col++) {

                const casilla = new Casilla(null, this.ctx);
                filaCasillas.push(casilla);

                // Posición de cada casillero
                const x = (col * this.cellSize) + this.offSetX;
                const y = (fila * this.cellSize) + this.offSetY;

                // Dibujar el cuadrado del tablero
                //ctx.fillStyle = '#0044cc'; // Color del tablero
                //ctx.fillRect(x, y, this.cellSize, this.cellSize);

                
                //// Crear casillero transparente (círculo recortado)
                //ctx.globalCompositeOperation = 'destination-out'; // Recorta la figura del tablero
                //ctx.beginPath();
                //ctx.arc(x + this.cellSize / 2, y + this.cellSize / 2, this.cellSize / 2.5, 0, Math.PI * 2);
                //ctx.fill();

                //// Restaurar para dibujar de nuevo sobre el canvas normalmente
                //ctx.globalCompositeOperation = 'source-over';
            }
            this.casillas.push(filaCasillas);
        }
            */
    }
}