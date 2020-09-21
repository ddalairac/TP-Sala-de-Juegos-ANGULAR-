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
    
    public async getPlayers():Promise<any> {
        return this.fbstorageservice.readAll(eCollections.usersLog)
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
        let user = this.fbauthgeservice.getUserId()
        this.fbstorageservice.readOne(eCollections.scores,user)
        // .subscribe(
        //     data=>{
        //         console.log("readOne: ",data)
        //     },
        //     error=>{
        //         console.log("ERROR readOne: ",error)
        //     }
        // )
        this.fbstorageservice.createFromUserId(eCollections.scores, user, new PlayerScore(user, null, 100, null, null, null, null));
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