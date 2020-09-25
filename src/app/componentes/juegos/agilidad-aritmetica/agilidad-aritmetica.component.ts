import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { JuegoAgilidad } from '../../../clases/juego-agilidad';
import { eGame, JugadoresService } from '../../../servicios/venian/jugadores.service';
@Component({
    selector: 'app-agilidad-aritmetica',
    templateUrl: './agilidad-aritmetica.component.html',
    styleUrls: ['./agilidad-aritmetica.component.scss']
})
export class AgilidadAritmeticaComponent implements OnInit {
    nuevoJuego: JuegoAgilidad;
    ocultarVerificar: boolean;
    tiempo: number;
    temporizador: any;
    primerNumero: number;
    segundoNumero: number;
    operadorElegido: string;
    // operadores = ['+', '-', '/', '*'];
    operadores = ['+', '-','/', '*'];
    operacionRandomAritmeticaRealizada: number;
    score: number;
    gameOver = false

    ngOnInit() {
    }

    constructor(private jugadores: JugadoresService) {
        this.ocultarVerificar = true;
        this.tiempo = 5;
        this.nuevoJuego = new JuegoAgilidad();
        // console.info("Inicio agilidad");
    }

    onNuevoJuego() {
        this.gameOver = false
        this.score = 100
        this.inicializarOperadoresYOperandos(); //Genero 2 numeros y operando random
        this.realizarOperacionAritmeticaSecreta(); //hago la operacion aritmetica

        this.ocultarVerificar = false;
        this.temporizador = setInterval(() => {//Comienza a correr el tiempo
            this.tiempo--;
            // console.log("tiempo: ", this.tiempo);
            if (this.tiempo == 0) {//Si llega a 0 verifico
                this.verificar(); //Verifico si lo q estaba puesto por el user estaba ok
            }

        }, 900);
    }

    verificar() {
        this.reiniciarTemporizadorYOcultoBotones();
        this.gameOver = true
        if (this.nuevoJuego.numeroIngresado == this.operacionRandomAritmeticaRealizada) {
            this.nuevoJuego.gano = true;
            // alert('GANO');
            this.score = this.score - this.tiempo * 15;
            this.jugadores.setPlayerScore(eGame.aritmetica, this.score)
        } else {
            this.nuevoJuego.gano = false;
            this.score = 0;
            // alert('PERDIO');
        }
    }

    reiniciarTemporizadorYOcultoBotones() {
        clearInterval(this.temporizador);//Borro el contador
        this.ocultarVerificar = true; // oculto boton verificar
        this.tiempo = 5;
    }

    inicializarOperadoresYOperandos(): void {
        this.operadorElegido = this.operadores[Math.floor(Math.random() * 4)];
        this.primerNumero = Math.floor(Math.random() * 9 + 1);
        this.segundoNumero = Math.floor(Math.random() * 9 + 1);
    }

    realizarOperacionAritmeticaSecreta(): void {
        switch (this.operadorElegido) {
            case '+':
                this.operacionRandomAritmeticaRealizada = this.primerNumero + this.segundoNumero
                break;
            case '-':
                this.operacionRandomAritmeticaRealizada = this.primerNumero - this.segundoNumero
                break;
            case '/':
              this.operacionRandomAritmeticaRealizada = +(this.primerNumero / this.segundoNumero).toFixed(2)
              break;
            case '*':
                this.operacionRandomAritmeticaRealizada = this.primerNumero * this.segundoNumero;
                break;

            default:
                break;
        }

        // console.log(this.operacionRandomAritmeticaRealizada);
    }
}
