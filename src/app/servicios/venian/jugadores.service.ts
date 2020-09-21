import { Injectable } from '@angular/core';
import { PptComponent } from '../../componentes/juegos/ppt/ppt.component';
import { eCollections, FireBaseService } from '../firebase.service';
// import { ArchivosJugadoresService } from './archivos-jugadores.service'
@Injectable()
export class JugadoresService {

    constructor(
        private firebaseservice: FireBaseService
    ) {
    }
    list: any[]
    public getPlayers() {
        this.list = this.firebaseservice.readAll(eCollections.usersLog)
        // .subscribe(
        //     data => {
        //         this.list = data
        //     },
        //     error => {
        //         console.log("Error List comp: ", error)
        //     }
        // )
    }
    public setPlayerScore(game: eGame, score: number) {
        let user = this.firebaseservice.getUserId()
        this.firebaseservice.readOne(eCollections.scores,user).subscribe(
            data=>{
                console.log("readOne: ",data)
            },
            error=>{
                console.log("ERROR readOne: ",error)
            }
        )
        // this.firebaseservice.createFromUserId(eCollections.scores, user, new PlayerScore(user, null, 100, null, null, null, null));
    }



}
export class PlayerScore {
    constructor(
        user: string,
        snake: number | null,
        aritmetica: number | null,
        ppt: number | null,
        adivina_numero: number | null,
        tateti: number | null,
        anagrama: number | null) {
        this.user = user
        this.snake = snake;
        this.aritmetica = aritmetica;
        this.ppt = ppt;
        this.adivina_numero = adivina_numero;
        this.tateti = tateti;
        this.anagrama = anagrama;
    }
    user: string;
    snake: number | null;
    aritmetica: number | null;
    ppt: number | null;
    adivina_numero: number | null;
    tateti: number | null;
    anagrama: number | null;
}
export enum eGame {
    snake = "snake",
    aritmetica = "aritmetica",
    ppt = "ppt",
    adivina_numero = "adivina_numero",
    tateti = "tateti",
    anagrama = "anagrama"
}