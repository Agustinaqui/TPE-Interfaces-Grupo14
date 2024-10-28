
class Fichero {

    constructor(player, x, nombre, fichaImg, fichasCount, turno, posx, posy, width, height, ctx) {
        this.x = x;
        this.player = player;
        this.posx = posx;
        this.posy = posy;
        this.width = width;
        this.height = height;
        this.nombre = nombre;
        this.fichaImg = fichaImg;
        this.turno = turno;
        this.ctx = ctx;
        this.fichasCount = fichasCount;
        this.fichas = [];

        /* Inicializo las fichas */

        let fichaX = this.posx + this.width / 2 - 25

        //let fichaVerticalGap = (this.height /( this.fichasCount+1)) - 25
        let fichaVerticalGap = 8;
        switch (this.x) {
            case 4:
                fichaVerticalGap = 8;
                break;
            case 5:
                fichaVerticalGap = 6;
                break;
            case 6:
                fichaVerticalGap = 4.5;
                break;
            case 7:
                fichaVerticalGap = 3.6;
                break;
            case 8:
                fichaVerticalGap = 3;
                break;
            case 9:
                fichaVerticalGap = 2.5;
                break;
            default:
                fichaVerticalGap = 2.1;
                break;
        }


        //        fichaVerticalGap = fichaVerticalGap >= 2 ? fichaVerticalGap : 2;

        let fichaY = this.posy + this.height - 55
        for (let fichaIndex = 0; fichaIndex < this.fichasCount; fichaIndex++) {
            /* fichero width / 2 - ficha width /2 para encontrar la posicion x correcta */

            const ficha = new Ficha(player,fichaX, fichaY, 25, this,fichaIndex);
            ficha.draw();
            
            this.fichas.push(ficha);

            fichaY -= fichaVerticalGap;
        }

    }

    setTurno(turno) {
        this.turno = turno;
    }

    draw() {

        const width = 300;
        const height = 100;
        const radius = 20;
        const fillColor = 'rgba(255, 165, 0, 0.5)'; // Naranja con transparencia (rgba)


        // Rellenar el rectángulo con el color y transparencia
        this.ctx.fillStyle = fillColor;
        this.drawRoundedRect(this.posx, this.posy, this.width, this.height, 20);
        this.ctx.fill();



    }

    drawRoundedRect(x, y, width, height, radius) {

        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

}