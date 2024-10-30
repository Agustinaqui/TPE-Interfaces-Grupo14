
class Casilla {

    constructor(x,y,ctx,imagen,ficha,cellSize) {
        this.posx = x;
        this.posy = y;
        this.ctx = ctx
        this.imagen = imagen;
        this.ficha = ficha;
        this.cellSize = cellSize;
    }

    draw() {
        // Dibujar la imagen del casillero
        ctx.drawImage(this.imagen, this.posx, this.posy, this.cellSize, this.cellSize);
        
    }
}