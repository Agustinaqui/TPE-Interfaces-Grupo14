
class Fichero {

    
}

class Tablero {

    constructor(x){
        this.X = x;
    }
}


class Juego {
    
    constructor(x, ficha1, ficha2) {
        this.tablero = new Tablero(x);
        this.fichero1 = new Fichero(ficha1,true);
        this.fichero2 = new Fichero(ficha2,false);
    }

    jugar(){
        
        
    }
}


let juego = new Juego(6);
juego.jugar();