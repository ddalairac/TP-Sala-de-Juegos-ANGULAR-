import { Component, OnInit } from '@angular/core';
import { JugadoresService, eGame } from '../../../servicios/venian/jugadores.service';
import { ScoreSheet } from './scoresheet/scoresheet';
import { Square } from './square/square';
import { TatetiService } from './tateti.service';

// Ejemplo tomado de material (ahi se le dice Tile (baldosa) a la interface)

//Falta ver si empatamos, q no quede con un loop infinito

export interface CuadradoGrilla {
    color: string;
    columnas: number;
    filas: number;
    texto: string;
}

@Component({
    selector: 'app-tateti',
    templateUrl: './tateti.component.html',
    styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {
    score: number
    squares: Square[];
    playerTurn: boolean;
    winner: string;
    isDraw: boolean;
    playerXwins: number;
    playerOwins: number;
    disable = false;
    possibleWins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    isPlaying:boolean

    constructor( private jugadores: JugadoresService) { }

    ngOnInit() {
    }

    newGame() {
        //* Resetting Game
        this.playerXwins = 0;
        this.playerOwins = 0;
        this.squares = Array(9).fill(null);
        this.playerTurn = true;
        this.winner = null;
        this.isDraw = false;
        this.disable = false;
        this.isPlaying = true
    }

    get playerMarker() {
        return this.playerTurn ? "X" : "O";
    }

    makeMove(index: number) {
        if (this.squares[index] == null) {
            if (!this.winner) {
                this.disable = true
                if (this.squares[index] === null) {
                    this.squares.splice(index, 1, { player: this.playerMarker, win: false });
                    this.playerTurn = !this.playerTurn;
                }
                this.winner = this.isWinner();
                this.isDraw = this.checkTie();

                if (!this.playerTurn && this.squares.some(scuare => scuare == null)) {
                    setTimeout(() => {
                        this.PCRandomMove();
                    }, 500);
                }
                this.setScore()
            } else {
                this.disable = false
            }
        }
    }

    setScore() {
        if (this.isDraw) {
            this.score = 50;
        } else if (this.winner) {
            if (this.winner === "X") {
                this.score = 100;
            } 
            if(this.winner === "O") {
                this.score = 0;
            }
        }
        // console.log(this.isDraw , this.winner)
        if (this.isDraw || this.winner) {
            this.isPlaying = false;
            this.jugadores.setPlayerScore(eGame.tateti, this.score)
        }
    }
    valueAtSquare(square: Square): string {
        //* Returns playerMarker at specified square
        return square && square.player;
    }

    isWinner(): string {
        //* Iterates through all possible win combinations
        for (let i = 0; i < this.possibleWins.length; i++) {
            //* Selecting the three index combination
            const [a, b, c] = this.possibleWins[i];
            if (
                //* Checking if all three squares have same playerMarker
                this.squares[a] &&
                this.squares[a].player === this.valueAtSquare(this.squares[b]) &&
                this.squares[a].player === this.valueAtSquare(this.squares[c])
            ) {
                //* Player has Won
                this.disable = true;
                this.squares[a] = { ...this.squares[a], win: true };
                this.squares[b] = { ...this.squares[b], win: true };
                this.squares[c] = { ...this.squares[c], win: true };
                return this.squares[a].player;
            }
        }
        //* No Player has Won
        return null;
    }

    checkTie() {
        if (
            this.winner === null &&
            //* Checks whether all squares are filled
            this.squares.every((square) => {
                return (
                    this.valueAtSquare(square) === "X" ||
                    this.valueAtSquare(square) === "O"
                );
            })
        ) {
            return true;
        }
    }


    private PCRandomMove(): void {
        // console.log("----onPCRandomMove----")
        this.makeMove(this.getRandomIndex())
        this.disable = false
    }
    private getRandomIndex(): number {
        let index = Math.floor(Math.random() * this.squares.length)
        if (this.squares[index] != null) {
            index = this.getRandomIndex()
        }
        return index
    }
}
