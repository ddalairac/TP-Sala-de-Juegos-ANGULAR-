import { Component, OnInit } from '@angular/core';
import { JugadoresService, eGame } from '../../../servicios/venian/jugadores.service';

@Component({
    selector: 'app-anagrama',
    templateUrl: './anagrama.component.html',
    styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {

    ngOnInit() {
    }

    palabrasParaAdivinar = [
        'palabra',
        'murcielago',
        'hipopotamo',
        'avena',
        'escorpion',
        'alegria',
        'luciernaga',
        'ventana',
        'heladera',
        'alergia',
        'subsuelo',
        'cascara',
        'estante'
    ];
    palabraSecreta: string = '';
    palabraSecretaMezclada: string = '';
    palabraIngresada: string = '';
    mensajeAlUsuario: boolean;
    gano: boolean;
    temporizador: any;
    tiempo: any = 3;
    score:number
    secondGame:boolean
    constructor(private jugadores: JugadoresService) { }



    nuevoJuego() {
        this.secondGame = true
        this.score = 100
        this.gano = false;
        this.palabraSecreta = this.palabrasParaAdivinar[Math.floor(Math.random() * this.palabrasParaAdivinar.length + 1)];

        let arrayDeCaracteresOrdenados = [...this.palabraSecreta];
        // console.log("CaracteresOrdenados: ",arrayDeCaracteresOrdenados)

        this.palabraSecretaMezclada = arrayDeCaracteresOrdenados
            .map((a) => ({ sort: Math.random(), value: a }))//Le agrego una key numerica aleatoria
            .sort((a, b) => a.sort - b.sort) //Las ordeno de menor a mayor
            .map((a) => a.value)//Hago una copia de los value al array nuevo
            .toString().replace(/[\,]/gm, " ");
    }

    verificar() {
        if (this.palabraIngresada.toLowerCase() == this.palabraSecreta.toLowerCase()) {
            this.gano = true;
            this.jugadores.setPlayerScore(eGame.anagrama, this.score)
        } else {
            this.mensajeAlUsuario = true;
            this.score = (this.score - 15 > 0) ? this.score - 15 : 0 
            // console.log("score",this.score)
            this.temporizador = setInterval(() => {//Comienza a correr el tiempo
                this.tiempo--;
                // console.log("tiempo: ", this.tiempo);
                if (this.tiempo == 0) {
                    clearInterval(this.temporizador);//Borro el contador
                    this.tiempo = 3;
                    this.mensajeAlUsuario = false;
                }
            }, 900);
        }
    }

}
