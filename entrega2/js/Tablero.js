class Tablero {

    constructor(x){
        this.x = x;
        this.MAXCOLS = x+3;
        this.MAXFILAS = x+2;
        this.casillas = [];
        
        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            let filaCasillas = [];

            for (let col = 0; col < this.MAXCOLS; col++) {
                const casilla = new Casilla(null);
                filaCasillas.push(casilla);
            }
            this.casillas.push(filaCasillas)       
        }
    }
    draw(){
    }
}