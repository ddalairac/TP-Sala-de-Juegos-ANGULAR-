import { Component, OnInit } from '@angular/core';
import { eGame, JugadoresService } from '../../../servicios/venian/jugadores.service';

@Component({
    selector: 'app-memotest',
    templateUrl: './memotest.component.html',
    styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

    // cardsLetters: Array<string> = ['A', 'A', 'B', 'B']
    cardsLetters: Array<string> = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    cardsObjValues: Array<MemotestItem> = [];
    cardFlipCounter: number = 0;
    firstChoice: MemotestItem;
    gameOver: boolean;
    score: number;
    dirty: boolean

    constructor(private jugadores: JugadoresService) { }

    ngOnInit() {
        this.onNewGame()

    }

    public onNewGame() {
        this.dirty = true
        this.gameOver = false
        this.score = this.cardsLetters.length * 15;
        let mixCardsLetters = this.mixValues(this.cardsLetters);
        for (const char of mixCardsLetters) {
            this.cardsObjValues.push(new MemotestItem(char))
        }
    }
    private mixValues(cardsLetters: Array<string>) {
        let mixcardsLetters = [...this.cardsLetters]
        for (let i = mixcardsLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mixcardsLetters[i], mixcardsLetters[j]] = [mixcardsLetters[j], mixcardsLetters[i]];
        }
        return mixcardsLetters;
    }
    public onClick(item: MemotestItem) {
        this.flipCard(item)
    }
    private flipCard(item: MemotestItem) {
        this.cardFlipCounter++

        if (this.cardFlipCounter == 1 || this.cardFlipCounter == 2) {
            item.flip = true;
            // console.log("flip",this.cardFlipCounter)
        }
        if (this.cardFlipCounter == 1) {
            this.firstChoice = item
        }
        if (this.cardFlipCounter == 2) {
            if (this.firstChoice.letter == item.letter) {
                this.firstChoice.isCorrect = true
                item.isCorrect = true
            }
            setTimeout(() => {
                this.flipWrongChoices();
                this.cardFlipCounter = 0
                this.gameOver = this.checkGameOver();
                if(this.gameOver){
                    this.jugadores.setPlayerScore(eGame.memotest, this.score)
                    // alert("Ganaste "+this.score)
                }
            }, 1000);
        }
    }
    private checkGameOver(): boolean {
        let gameOver = true
        for (let index = 0; index < this.cardsObjValues.length; index++) {
            const item = this.cardsObjValues[index];
            if (!item.isCorrect) {
                gameOver = false;
            }
        }
        return gameOver
    }
    private flipWrongChoices() {
        this.cardsObjValues.forEach(item => {
            if (!item.isCorrect) {
                item.flip = false;
            }
        });
        this.score = (this.score - 10 > 0) ? this.score - 10 : 0
    }

}

export class MemotestItem {
    constructor(letter: string) {
        this.letter = letter
    }
    letter: string;
    flip: boolean;
    isCorrect: boolean = false
}