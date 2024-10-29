class CasillaDrop {
    constructor(posx, posy, width, height, ctx) {
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.visible = false;
    }

    draw() {
        if (this.visible) {
            const fillColor = 'rgba(152, 231, 143, 0.75)'
            
            this.ctx.fillStyle = fillColor;
            ctx.fillRect(this.posx, this.posy, this.width, this.height)
            this.ctx.fill();
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