import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { eGame, JugadoresService } from '../../../servicios/venian/jugadores.service';

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SnakeComponent implements OnInit {

    constructor(private jugadores:JugadoresService) { }
    score:number;
    isPaying:boolean;

    ngOnInit(): void {
    }

    onGameOver(score){
        // alert("score "+score)
        this.score = score * 10;
        this.isPaying = false;
        this.jugadores.setPlayerScore(eGame.snake,this.score)
    }
    onPlay(){
        this.isPaying = true;
    }

}
