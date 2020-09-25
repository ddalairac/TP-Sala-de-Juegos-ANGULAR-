import { Injectable } from '@angular/core';
import { eCollections } from '../../clases/firebase.model';
// import { PptComponent } from '../../componentes/juegos/ppt/ppt.component';
import { FbAuthService } from '../fb-auth.service';
import { FbStorageService } from '../fb-storage.service';
// import { ArchivosJugadoresService } from './archivos-jugadores.service'
@Injectable()
export class JugadoresService {

    constructor(
        private fbauthgeservice: FbAuthService,
        private fbstorageservice: FbStorageService
    ) {
    }

    public async getPlayers(): Promise<any> {
        return this.fbstorageservice.readAll(eCollections.usersLog)
        // .subscribe(
        //     data => {
        //         this.list = data
        //     },
        //     error => {
        //         // console.log("Error List comp: ", error)
        //     }
        // )
    }
    public setPlayerScore(game: eGame, score: number) {
        let user = this.fbauthgeservice.getUserId()
        // console.log("setPlayerScore:",{ user: user, game: game, score: score })
        let UserScores: PlayerScore
        this.fbstorageservice.readOne(eCollections.scores, user).then(
            (data: PlayerScore) => {
                if (data) {
                    UserScores = data
                } else {
                    UserScores = new PlayerScore(user);
                }
                UserScores[game] = score
                // console.log("createFromUserId UserScores:", UserScores)
                this.fbstorageservice.createFromUserId(eCollections.scores, user, UserScores);
            })
    }



}
export class PlayerScore {
    constructor(
        user: string = '',
        snake: number = 0,
        aritmetica: number = 0,
        ppt: number = 0,
        adivina_numero: number = 0,
        tateti: number = 0,
        anagrama: number = 0) {
        this.user = user
        this.snake = snake;
        this.aritmetica = aritmetica;
        this.ppt = ppt;
        this.adivina_numero = adivina_numero;
        this.tateti = tateti;
        this.anagrama = anagrama;
    }
    user: string;
    snake: number;
    aritmetica: number;
    ppt: number;
    adivina_numero: number;
    tateti: number;
    anagrama: number;
}
export enum eGame {
    snake = "snake",
    aritmetica = "aritmetica",
    ppt = "ppt",
    adivina_numero = "adivina_numero",
    tateti = "tateti",
    anagrama = "anagrama"
}