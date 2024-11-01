class BotonCircular {
    constructor(posx,posy,radio,image,onClick) {
        this.posx = posx;
        this.posy = posy;
        this.radio = radio;
        this.onClick = onClick;

        this.img = image;
        console.log(this.img.src);
        
    }

    draw(){
        const bkgColor = "#FFFFFF"; // Color por defecto si no se encuentra

        this.img.onload = () => {
            ctx.save();

            // Crear el recorte circular
            ctx.beginPath();
            ctx.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.clip();

            // Dibuja el fondo de color
            ctx.fillStyle = bkgColor;
            ctx.fillRect(this.posx - this.radio, this.posy - this.radio, this.radio * 2, this.radio * 2);

            // Dibuja la imagen dentro del círculo
            ctx.drawImage(this.img, this.posx - this.radio, this.posy - this.radio, this.radio * 2, this.radio * 2);

            ctx.restore();

            // Dibuja el borde del círculo
            ctx.beginPath();
            ctx.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2, false);
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

    // Verificar si un punto (x, y) está dentro del boton
    isClicked(x, y) {
        const dist = Math.sqrt((x - this.posx) ** 2 + (y - this.posy) ** 2);
        return dist <= this.radio;
    }
    
}