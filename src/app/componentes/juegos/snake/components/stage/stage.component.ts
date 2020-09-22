import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { Subject } from 'rxjs';
import { AppleModel } from '../../model/apple.class';
import { SnakeModel } from '../../model/skake.class';
import { GameService } from '../../services/game.service';

@Component({
    selector: "app-stage",
    templateUrl: "./stage.component.html",
    styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit, OnDestroy {
    constructor(public game: GameService) { }

    @Output() score: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit() {
        this.game.createStage();
        this.game.starGame();
        this.snakeLinks = this.game.snakeLinks;
        this.apples = this.game.apples;
        this.stageSlots = this.game.stageSlots;
        this.stageWidth = this.game.stageWidth;
        this.module = this.game.module;
        this.gameOver$.subscribe(
            data => {
                if (data == true)
                    this.score.emit(this.game.snakeLinks.length)
            }
        )
    }

    public gameOver$: Subject<boolean> = this.game.gameOver$;
    stageSlots: Array<number[]>;
    snakeLinks: SnakeModel[];
    apples: AppleModel[];
    stageWidth: number;
    module: number;

    onGameOver() {
        this.score.emit(this.game.snakeLinks.length)
        // this.game.reset()
    }

    onKeydown(KeyboardEvent: KeyboardEvent): void {
        this.game.newUserEvent(KeyboardEvent);
    }
    ngOnDestroy() {
        // alert("reset game")
        this.game.reset()
    }
}
