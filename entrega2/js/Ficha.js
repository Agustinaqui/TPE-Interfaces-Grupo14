
        class Ficha {
            constructor(player,x, y, radio, fichero, id) {
                this.player = player
                this.initialX = x;
                this.id = id;
                this.x = x;
                this.initialY = y;
                this.y = y;
                this.radio = radio;
                this.initialRadio = radio;
                this.fichero = fichero;
                this.isDragging = false;
                this.colocada = false;
        
                const backgroundColors = {
                    "avatar.png": "#777777",
                    "hombre1.png": "rgb(241, 207, 51)", // Corregido aquí
                    "hombre2.png": "#1c1a47",
                    "hombre.png": "rgb(87, 6, 6)"
                };
        
                // Determinar la ruta de la imagen y su color de fondo correspondiente
                const imagenNombre = this.fichero.fichaImg.split("/").pop();
                this.backgroundColor = backgroundColors[imagenNombre] || "#FFFFFF"; // Color por defecto si no se encuentra
                this.img = new Image();
                this.img.src = `../images/superheroes/${imagenNombre}`;
            }
        
            // El resto de tu código...
            
            draw(ctx) {
                // Asegúrate de que la imagen esté completamente cargada antes de dibujar
                this.img.onload = () => {
                    ctx.save();
        
                    // Crear el recorte circular
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.clip();
        
                    // Dibuja el fondo de color
                    ctx.fillStyle = this.backgroundColor;
                    ctx.fillRect(this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        
                    // Dibuja la imagen dentro del círculo
                    ctx.drawImage(this.img, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        
                    ctx.restore();
        
                    // Dibuja el borde del círculo
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
                    ctx.lineWidth = 1;
                    ctx.lineCap = "round";
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.closePath();
                };
        
                // Verifica si la imagen ya está completamente cargada
                if (this.img.complete) {
                    this.img.onload();
                }
            }
        
            // Verificar si un punto (x, y) está dentro de la ficha
            contienePunto(x, y) {
                const dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
                return dist <= this.radio;
            }
        

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
    



    // Verificar si un punto (x, y) está dentro de la ficha
    contienePunto(x, y) {
        const dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return dist <= this.radio;
    }
}
