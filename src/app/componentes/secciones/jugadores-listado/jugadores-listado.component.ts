import { Component, OnInit } from '@angular/core';
import { eCollections, FireBaseService } from '../../../servicios/firebase.service';
import { eGame, JugadoresService } from '../../../servicios/venian/jugadores.service';
@Component({
    selector: 'app-jugadores-listado',
    templateUrl: './jugadores-listado.component.html',
    styleUrls: ['./jugadores-listado.component.scss']
})
export class JugadoresListadoComponent implements OnInit {

    listado: any
    miJugadoresServicio: JugadoresService

    constructor(
        private firebaseservice:FireBaseService,
        private serviceJugadores: JugadoresService
        ) {
        // this.miJugadoresServicio = serviceJugadores;

    }
    list: any[]
    public getPlayers() {
        this.list = this.firebaseservice.readAll(eCollections.scores)
    }
    ngOnInit() {
        this.getPlayers();
        this.serviceJugadores.setPlayerScore(eGame.ppt,100)
        
    }

    // TraerTodos() {
    //     //alert("totos");
    //     this.miJugadoresServicio.traertodos('jugadores/', 'todos').then(data => {
    //         //console.info("jugadores listado",(data));
    //         this.listado = data;

    //     })
    // }
    // TraerGanadores() {
    //     this.miJugadoresServicio.traertodos('jugadores/', 'ganadores').then(data => {
    //         //console.info("jugadores listado",(data));
    //         this.listado = data;

    //     })
    // }
    // TraerPerdedores() {
    //     this.miJugadoresServicio.traertodos('jugadores/', 'perdedores').then(data => {
    //         //console.info("jugadores listado",(data));
    //         this.listado = data;

    //     })
    // }

}
