class Temporizador{
    constructor(posx, posy, width, height, ctx,juego){
        this.tiempo = 179;
        this.width = width;
        this.height = height;
        this.posx = posx;
        this.posy = posy;
        this.ctx = ctx;
        this.juego=juego
        this.timerUp= false;
    }

    restart(){
        this.tiempo = 179
    }
    stop(){
        this.visible = false;
        clearInterval(this.timerInterval);
        clearInterval(this.drawInterval);
        this.restart();
    }

    iniciarContador() {
        this.visible = true;
        
        this.timerInterval = setInterval(() => {
            this.tiempo--;

            if(!this.timerUp && this.tiempo == 0){

                this.timerUp = true;
                this.juego.endGameTimeUp()
            }
            if(this.timerUp){
                clearInterval(this.timerInterval)
            }
        }, 1000);

        this.drawInterval = setInterval(()=>{
            this.draw();
        },1)
    }
    


    draw(){
        if(!this.visible){
            return
        }
        this.ctx.clearRect(this.posx,this.posy-this.height,this.width,this.height);
        // Configura el estilo del texto
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Inter, sans serif";
    
        const minutos = Math.floor(this.tiempo/60);
        const segundos = Math.floor(this.tiempo %60);
        const mText = minutos >9 ? `${minutos}` : `0${minutos}`
        const sText = segundos >9 ? `${segundos}` : `0${segundos}`

        // Dibuja el contador en el canvas
        this.ctx.fillText(`${mText}:${sText}`, this.posx, this.posy);
    }
}