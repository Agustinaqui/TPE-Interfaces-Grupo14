
// Clase Ficha

class Ficha {
    constructor(x, y, radio, fichero, id) {
        this.initialX = x;
        this.id = id;
        this.x = x;
        this.initialY = y;
        this.y = y;
        this.radio = radio;
        this.fichero = fichero;
        this.isDragging = false;
        this.colocada = false;
    }

    contienePunto(x, y) {
        const dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return dist <= this.radio;
    }
    // Dibujar la ficha
    draw(ctx) {
        var img = new Image();

        let imagen = this.fichero.fichaImg.split("/");
        imagen = `../images/superheroes/${imagen[imagen.length - 1]}`;

        imagen = "../images/superheroes/avatar.png";
        img.src = imagen; // Cambia esta ruta a la de tu imagen.

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.lineCap= "round";
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();

/* 
        img.onload = function () {
            console.log("anda? 2 ");

            let imagePattern = ctx.createPattern(img, "repeat");

            ctx.beginPath();                   // Inicia un nuevo camino
            ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);  // Dibuja un círculo en (75,75) con radio 50
            ctx.fillStyle = imagePattern;       // Rellena con el patrón de imagen
            ctx.fill();                         // Llena el círculo
            ctx.closePath();

        }; */



        /* const fichaNodo = document.createElement("img");
        
        document.getElementById("juego-div").appendChild(fichaNodo);
        
        
        fichaNodo.style.position = "absolute";
        fichaNodo.style.left = `${this.x}px`;
        fichaNodo.style.top = `${this.y}px`;
        fichaNodo.style.width = `${this.radio*2}px`;
        fichaNodo.style.height = `${this.radio*2}px`;
        fichaNodo.src = imagen;
        fichaNodo.id = `ficha-${this.player}-${this.id}`;

        fichaNodo.classList.add("ficha")
        fichaNodo.classList.add(`ficha-${this.player}`) */


        /*  ctx.beginPath();
         ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.closePath(); */
    }



    // Verificar si un punto (x, y) está dentro de la ficha
    contienePunto(x, y) {
        const dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return dist <= this.radio;
    }
}
