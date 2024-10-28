
// Clase Ficha

class Ficha {
    constructor(player, x, y, radio, fichero, id) {
        this.initialX = x;
        this.id = id;
        this.player = player;
        this.x = x;
        this.initialY = y;
        this.y = y;
        this.radio = radio;
        this.fichero = fichero;
        this.isDragging = false;
    }

    // Dibujar la ficha
    draw(ctx) {
        const fichaNodo = document.createElement("img");
        
        document.getElementById("juego-div").appendChild(fichaNodo);
        let imagen = this.fichero.fichaImg.split("/");
        imagen = `../images/superheroes/${imagen[imagen.length -1]}` ;
        
        fichaNodo.style.position = "absolute";
        fichaNodo.style.left = `${this.x}px`;
        fichaNodo.style.top = `${this.y}px`;
        fichaNodo.style.width = `${this.radio*2}px`;
        fichaNodo.style.height = `${this.radio*2}px`;
        fichaNodo.src = imagen;
        fichaNodo.id = `ficha-${this.player}-${this.id}`;

        fichaNodo.classList.add("ficha")
        fichaNodo.classList.add(`ficha-${this.player}`)

        
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
