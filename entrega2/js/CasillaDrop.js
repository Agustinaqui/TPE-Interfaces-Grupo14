class CasillaDrop {
    constructor(posx, posy,gap, width, height, ctx) {
        this.posx = posx;
        this.posy = posy;
        this.gap = gap;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.fillColor = 'rgba(152, 231, 143, 0.75)';
        this.visible = false;
    }

    draw() {
        if (this.visible) {

            this.ctx.fillStyle = this.fillColor;
            ctx.fillRect(this.posx, this.posy, this.width, this.height)
        }
    }

    isPointInsideSquare(px, py) {
        
        return (
            px >= this.posx &&               // El punto está a la derecha del borde izquierdo del cuadrado
            px <= this.posx + this.width &&   // El punto está a la izquierda del borde derecho del cuadrado
            py >= this.posy &&                // El punto está debajo del borde superior del cuadrado
            py <= this.posy + this.width      // El punto está arriba del borde inferior del cuadrado
        );
    }
}