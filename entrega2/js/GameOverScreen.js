class GameOverScreen {
    constructor(ctx, winner, botonMenu, botonRestart, text) {
        this.ctx = ctx;
        this.winner = winner;
        this.botonMenu = botonMenu;
        this.botonRestart = botonRestart;
        this.text = text;

        this.hidden=false;
        
    }

    draw() {

        if(this.hidden){
            return
        }
        /* Configuramos el font y style */
        this.ctx.fillStyle = "#751500"; // Color del texto
        const fontMayor = "bold 45px Arial"
        const fontMenor = "bold 20px Arial"

        let textW = 0;

        if (this.winner) {
            /* Hay ganador por lo tanto hay que dibujar con doble linea */

            let [texto, ganador] = this.text.split("-")

            this.ctx.font = fontMayor;

            textW = this.ctx.measureText(texto).width > this.ctx.measureText(ganador).width ? this.ctx.measureText(texto).width : this.ctx.measureText(ganador).width
            let textX1 = 450 - this.ctx.measureText(texto).width / 2;

            let textH1 = 45;

            this.ctx.font = fontMenor;
            let textH2 = 20;

            let textX2 = 450 - this.ctx.measureText(ganador).width / 2;

            let textH = textH1 + textH2 + 10;

            let textY1 = 250 - textH
            let textY2 = textY1 + textH1 + 10;

            this.dibujarFondo(textW, textH)

            this.ctx.fillStyle = "#000000"; // Color del texto

            this.ctx.font = fontMayor;

            this.ctx.fillText(texto, textX1, textY1);

            this.ctx.font = fontMenor;
            this.ctx.fillText(ganador, textX2, textY2);


        } else {
            /* No hay ganador así que solo hay una linea de texto */

            this.ctx.font = fontMayor;
            textW = this.ctx.measureText(this.text).width

            let textH = 45

            let textX = 450 - textW / 2;
            let textY = 250 - textH;

            this.dibujarFondo(textW, textH)

            this.ctx.fillStyle = "#000000"; // Color del texto

            this.ctx.fillText(this.text, textX, textY);

        }

    }

    dibujarFondo(textW, textH) {

        this.ctx.fillStyle = "rgb(0, 0 ,0, 0.75)";
        this.ctx.fillRect(0, 0, 900,500);

        /* Dibujamos el rectangulo del nombre */
        const maxW = 900
        let rectW = textW + 250; // Ancho del rectángulo
        rectW = rectW > 900 ? 900 : rectW
        let rectX = 450 - rectW / 2; // Posición X del rectángulo
        let rectH = textH + this.botonMenu.radio * 2 + 100 + 100

        const rectY = 250 - rectH / 2; // Posición Y del rectángulo
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(rectX, rectY, rectW, rectH);

        this.botonMenu.posx = 450 - this.botonMenu.radio - 15
        this.botonRestart.posx = 450 + this.botonMenu.radio + 15

        this.botonMenu.posy = rectY + rectH - this.botonMenu.radio - 50
        this.botonRestart.posy = rectY + rectH - this.botonRestart.radio - 50

        this.botonMenu.draw()
        this.botonRestart.draw()

    }

}