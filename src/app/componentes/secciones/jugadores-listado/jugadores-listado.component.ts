import { Component, OnInit } from '@angular/core';
import { eCollections } from '../../../clases/firebase.model';
import { FbStorageService } from '../../../servicios/fb-storage.service';
import { eGame, JugadoresService, PlayerScore } from '../../../servicios/venian/jugadores.service';
@Component({
    selector: 'app-jugadores-listado',
    templateUrl: './jugadores-listado.component.html',
    styleUrls: ['./jugadores-listado.component.scss']
})
export class JugadoresListadoComponent implements OnInit {

    listado: any
    miJugadoresServicio: JugadoresService

    constructor(
        private fbsorageservice: FbStorageService,
        private serviceJugadores: JugadoresService
    ) { }
    dataSource: PlayerScore[] = []

    displayedColumns: string[] = ["user", "snake", "aritmetica", "ppt", "adivina_numero", "tateti", "anagrama", "memotest"];

    public getPlayers() {
        this.fbsorageservice.readAll(eCollections.scores).then(
            (data) => {
                this.dataSource = data
                // console.log("Jugadores:", this.dataSource)
            }
        )
    }
    ngOnInit() {
        this.getPlayers();
        // this.serviceJugadores.setPlayerScore(eGame.ppt,100)

    }


















    // TraerTodos() {
    //     //alert("totos");
    //     this.miJugadoresServicio.traertodos('jugadores/', 'todos').then(data => {
    //         //// console.info("jugadores listado",(data));
    //         this.listado = data;

    //     })
    // }
    // TraerGanadores() {
    //     this.miJugadoresServicio.traertodos('jugadores/', 'ganadores').then(data => {
    //         //// console.info("jugadores listado",(data));
    //         this.listado = data;

    //     })
    // }
    // TraerPerdedores() {
    //     this.miJugadoresServicio.traertodos('jugadores/', 'perdedores').then(data => {
    //         //// console.info("jugadores listado",(data));
    //         this.listado = data;

    //     })
    // }

}
