class GameOverScreen {
    constructor(ctx, winner, botonMenu, botonRestart, text) {
        this.ctx = ctx
        this.winner = winner;
        this.botonMenu = botonMenu;
        this.botonRestart = botonRestart;
        this.text = text;
    }

    draw() {

        /* Configuramos el font y style */
        this.ctx.fillStyle = "#751500"; // Color del texto
        const fontMayor = "bold 55px Arial"
        const fontMenor = "bold 30px Arial"

        if (this.winner) {
            console.log(this.text.split("-"));
            
            [texto, ganador] = this.text.split("-")
            console.log(texto, ganador);
            
            /* Hay ganador por lo tanto hay que dibujar con doble linea */
            this.ctx.font = fontMayor;

        } else {
            /* No hay ganador así que solo hay una linea de texto */

        }

        /* Dibujamos el rectangulo del nombre */
        const rectX = this.posx; // Posición X del rectángulo
        const rectY = this.posy - 100; // Posición Y del rectángulo
        const rectWidth = this.width; // Ancho del rectángulo
        const rectHeight = 60; // Alto del rectángulo
        this.ctx.fillStyle = this.fillColor;
        this.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 20);
        this.ctx.fill();


        const title = this.text; // Texto del título
        const textWidth = this.ctx.measureText(title).width;


        const textX = rectX + (rectWidth / 2) - (textWidth / 2); // Centra horizontalmente
        const textY = rectY + (rectHeight / 2) + 10;

        this.ctx.fillText(title, textX, textY);

    }


}