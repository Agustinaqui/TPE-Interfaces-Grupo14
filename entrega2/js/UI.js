class UI {
    constructor(botonMenu, botonReiniciar, temporizador) {
        this.botonMenu = botonMenu
        this.botonReiniciar = botonReiniciar
        this.temporizador = temporizador
    }
    
    draw(){
        this.botonMenu.draw()
        this.botonReiniciar.draw()
        this.temporizador.draw()
    }

}