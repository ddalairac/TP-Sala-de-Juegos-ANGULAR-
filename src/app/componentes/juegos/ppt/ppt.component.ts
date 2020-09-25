import { Component, OnInit } from '@angular/core';
import { JugadoresService, eGame } from '../../../servicios/venian/jugadores.service';

@Component({
    selector: 'app-ppt',
    templateUrl: './ppt.component.html',
    styleUrls: ['./ppt.component.scss']
})
export class PptComponent implements OnInit {

    constructor(private jugadores: JugadoresService) { }

    ngOnInit(): void {
    }

    puntajeUsuario = 0;
    puntajePC = 0;
    eleccionUsuario: string; //which weapon user selected
    eleccionPC: string; //which weapon computer selected
    resultadoFinal: string; //whether user weapon beats or perdios to computer
    estadoPartida: string; //whether it's a win or perdio
    opciones = [ePpt.Piedra, ePpt.Papel, ePpt.Tijera];
    gameOver: boolean
    score: number

    userPick(eleccionUsuario: ePpt): void {
        this.eleccionUsuario = eleccionUsuario;
        // console.log(this.eleccionUsuario);
        setTimeout(() => {
            const indiceRandom = Math.floor(Math.random() * 3);
            this.eleccionPC = this.opciones[indiceRandom];
            // console.log(this.eleccionPC);
            this.checkResult();
        }, 1000);
    }

    clearField() {
        setTimeout(() => {
            this.gameOver = true
            this.jugadores.setPlayerScore(eGame.ppt , this.score)
        }, 1500);
    }
    newGame() {
        this.estadoPartida = '';
        this.eleccionUsuario = '';
        this.eleccionPC = '';
        this.gameOver = false
    }

    gano(usuario, pc) {
        this.puntajeUsuario++;
        this.eleccionUsuario = usuario;
        this.eleccionPC = pc;
        this.resultadoFinal = 'Vencio con';
        this.estadoPartida = 'Ganaste!';
          this.clearField();
        this.score = 100
    }


    perdio(usuario, pc) {
        this.puntajePC++;
        this.eleccionUsuario = usuario;
        this.eleccionPC = pc;
        this.resultadoFinal = 'Perdio con';
        this.estadoPartida = 'Perdiste!';
        this.clearField();
        this.score = 0
    }

    empato(usuario, pc) {
        this.eleccionUsuario = usuario;
        this.eleccionPC = pc;
        this.resultadoFinal = 'y';
        this.estadoPartida = 'Empataste!';
        this.clearField();
        this.score = 50
    }

    checkResult() {
        // const userChoice = this.eleccionUsuario;
        // const compChoice = this.eleccionPC;
        switch (this.eleccionUsuario + this.eleccionPC) {
            case 'PiedraTijera':
            case 'PapelPiedra':
            case 'TijeraPapel':
                this.gano(this.eleccionUsuario, this.eleccionPC);
                break;
            case 'PiedraPapel':
            case 'TijeraPiedra':
            case 'PapelTijera':
                this.perdio(this.eleccionUsuario, this.eleccionPC);
                break;
            default:
                this.empato(this.eleccionUsuario, this.eleccionPC);
                break;
        }
    }
}
export enum ePpt{
    Piedra='Piedra',
    Tijera='Tijera',
    Papel='Papel',
}