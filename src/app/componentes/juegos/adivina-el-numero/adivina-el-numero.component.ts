
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAdivina } from '../../../clases/juego-adivina'
import { eGame, JugadoresService } from '../../../servicios/venian/jugadores.service';

@Component({
    selector: 'app-adivina-el-numero',
    templateUrl: './adivina-el-numero.component.html',
    styleUrls: ['./adivina-el-numero.component.scss']
})
export class AdivinaElNumeroComponent implements OnInit {
    @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

    nuevoJuego: JuegoAdivina;
    Mensajes: string;
    contador: number;
    ocultarVerificar: boolean;
    mensajeClass: string;
    score: number;

    constructor(private jugadores: JugadoresService) {
        this.nuevoJuego = new JuegoAdivina();
        console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
        this.ocultarVerificar = false;
    }
    generarnumero() {
        this.nuevoJuego.generarnumero();
        this.contador = 0;
        this.score = 100;
    }
    verificar() {
        this.contador++;
        this.ocultarVerificar = true;
        console.info("numero Secreto:", this.nuevoJuego.gano);
        if (this.nuevoJuego.verificar()) {

            this.enviarJuego.emit(this.nuevoJuego);
            this.MostrarMensaje("Sos un Genio!!!", true);
            this.nuevoJuego.numeroSecreto = 0;

            this.jugadores.setPlayerScore(eGame.adivina_numero, this.score)

        } else {
            this.score = (this.score - this.contador * 10 > 0) ? this.score - this.contador * 10 : 0;
            
            let mensaje: string;
            switch (this.contador) {
                case 1:
                    mensaje = "No, intento fallido, animo";
                    break;
                case 2:
                    mensaje = "No,Te estaras Acercando???";
                    break;
                case 3:
                    mensaje = "No es, Yo crei que la tercera era la vencida.";
                    break;
                case 4:
                    mensaje = "No era el  " + this.nuevoJuego.numeroIngresado;
                    break;
                case 5:
                    mensaje = " intentos y nada.";
                    break;
                case 6:
                    mensaje = "Afortunado en el amor";
                    break;

                default:
                    mensaje = "Ya le erraste " + this.contador + " veces";
                    break;
            }
            this.MostrarMensaje("#" + this.contador + " " + mensaje + " ayuda :" + this.nuevoJuego.retornarAyuda());


        }
        console.info("numero Secreto:", this.nuevoJuego.gano);
    }

    MostrarMensaje(mensaje: string, ganador: boolean = false) {
        this.Mensajes = mensaje;
        console.log("contador:", this.contador)
        if (ganador) {
            this.mensajeClass = 'bg-success';
        } else {
            this.mensajeClass = 'bg-danger';
        }
        var modelo = this;
        setTimeout(function () {
            this.mensajeClass = '';
            modelo.ocultarVerificar = false;
        }, 2000);
    }

    ngOnInit() {
    }

}
