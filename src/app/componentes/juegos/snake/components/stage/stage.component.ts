import { Component, OnInit } from "@angular/core";
import { AppleModel } from '../../model/apple.class';
import { SnakeModel } from '../../model/skake.class';
import { GameService } from '../../services/game.service';

@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit() {
    this.game.createStage();
    this.game.starGame();
    this.snakeLinks = this.game.snakeLinks;
    this.apples = this.game.apples;
    this.stageSlots = this.game.stageSlots;
    this.stageWidth = this.game.stageWidth;
    this.module = this.game.module;
  }

  stageSlots: Array<number[]>;
  snakeLinks: SnakeModel[];
  apples: AppleModel[];
  stageWidth: number;
  module: number;

  onKeydown(KeyboardEvent: KeyboardEvent): void {
    this.game.newUserEvent(KeyboardEvent);
  }
}
