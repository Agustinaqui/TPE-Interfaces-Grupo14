class Tablero {

    constructor(x, img, canvas, ctx) {
        this.x = x;
        this.canvas = canvas;
        this.MAXCOLS = x + 3;
        this.MAXFILAS = x + 2;
        this.fichasCount = this.MAXCOLS * this.MAXFILAS
        this.casillas = [];
        this.cellImage = img;
        this.ctx = ctx;
        this.casillasDrop = [];

        // Calcular el tamaño de los casilleros
        this.cellSize = 350 / this.MAXFILAS;
        
        // Calculo cuanto corro el tablero dentro del canvas
        this.offSetX = (this.canvas.width - this.MAXCOLS * this.cellSize) / 2;
        this.offSetY = 140;

        const dropAreaGap = 2.5;
        const dropAreaSize = this.cellSize - 5;
        let dropAreaX = this.offSetX+dropAreaGap;
        const dropAreaY = this.offSetY - dropAreaSize - dropAreaGap;

        for (let i = 0; i < this.MAXCOLS; i++) {
            
            const dropArea = new CasillaDrop(dropAreaX,dropAreaY,dropAreaSize,dropAreaSize,this.ctx);
            this.casillasDrop.push(dropArea);
            dropAreaX+=dropAreaSize + dropAreaGap*2;
            
        }
    }

    getFichasCount() {
        return this.fichasCount;
    }

    

    draw() {

        // Dibujar el tablero con la imagen de casillero
        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            for (let col = 0; col < this.MAXCOLS; col++) {
                // Posición de cada casillero
                const x = (col * this.cellSize) + this.offSetX;
                const y = (fila * this.cellSize) + this.offSetY;

                // Dibujar la imagen del casillero
                ctx.drawImage(this.cellImage, x, y, this.cellSize, this.cellSize);

            }
        };


        this.casillasDrop.forEach(dropArea =>{ 
            dropArea.draw();
        })
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