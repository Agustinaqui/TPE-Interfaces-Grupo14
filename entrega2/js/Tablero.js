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
        this.cellSize = 45;
        this.width = this.cellSize * this.MAXFILAS
        
        // Calculo cuanto corro el tablero dentro del canvas
        this.offSetX = (this.canvas.width - this.MAXCOLS * this.cellSize) / 2;
        this.offSetY = ( 500 - this.cellSize * (this.MAXFILAS-2) ) / 2 ;

        const dropAreaGap = 2.5;
        const dropAreaSize = this.cellSize - 5;
        let dropAreaX = this.offSetX+dropAreaGap;
        const dropAreaY = this.offSetY - dropAreaSize - dropAreaGap;

        for (let i = 0; i < this.MAXCOLS; i++) {
            
            const dropArea = new CasillaDrop(dropAreaX,dropAreaY,dropAreaGap,dropAreaSize,dropAreaSize,this.ctx);
            this.casillasDrop.push(dropArea);
            dropAreaX += dropAreaSize + dropAreaGap*2;
        }

        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            const filaCasillas = [];

            for (let col = 0; col < this.MAXCOLS; col++) {
                // Posición de cada casillero
                const x = (col * this.cellSize) + this.offSetX;
                const y = (fila * this.cellSize) + this.offSetY;

                const casilla = new Casilla(x, y, ctx, this.cellImage, null, this.cellSize);

                filaCasillas.push(casilla);
                
            }

            this.casillas.push(filaCasillas);
        };
    }
    countFichaAndCheck(){
        if(--this.fichasCount == 0){
            return true;
        }
        
        return false;
    }
    getFichasCount() {
        return this.fichasCount;
    }

    
    drawDropAreas(){
        this.casillasDrop.forEach(dropArea =>{ 
            dropArea.draw();
        })
    }
    //nuevo
    drawDropAreas() {
    this.casillasDrop.forEach(dropArea => {
        dropArea.draw(ctx); 

        // Dibuja la flecha en el área de drop
        const centerX = dropArea.posx + (dropArea.width / 2);
        const centerY = dropArea.posy + (dropArea.width / 2);
        this.dibujarFlecha(ctx, centerX, centerY); 
    });
}

    getLowerCasillaByIndex(col){
        let fila = this.MAXFILAS-1;
        while(fila >= 0 && this.casillas[fila][col].ficha){
            fila--;
        }

        if(fila < 0){
            return null;
        }

        return fila;

    }

    draw() {

        // Dibujar el tablero con la imagen de casillero
        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            for (let col = 0; col < this.MAXCOLS; col++) {
                this.casillas[fila][col].draw()
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

    dibujarFlecha(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI);
        
        // Dibuja la línea de la flecha
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20); // Cambia la longitud de la flecha según sea necesario
        ctx.strokeStyle = "white"; // Color de la línea
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dibuja la punta de la flecha
        ctx.beginPath();
        ctx.moveTo(-5, -15); // Ajusta la posición de la punta
        ctx.lineTo(0, -25);
        ctx.lineTo(5, -15);
        ctx.fillStyle = "white"; // Color de la punta
        ctx.fill();

        ctx.restore();
    }
}