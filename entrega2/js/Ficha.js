// Clase Ficha
class Ficha {
    constructor(x, y, radio, color, jugador) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.jugador = jugador;
        this.isDragging = false;
    }

    // Dibujar la ficha
    dibujar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Verificar si un punto (x, y) está dentro de la ficha
    contienePunto(x, y) {
        const dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return dist <= this.radio;
    }
}
