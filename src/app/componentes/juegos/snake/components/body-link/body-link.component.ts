import { Component, OnInit, Input } from "@angular/core";
import { SnakeModel } from '../../model/skake.class';
import { GameService } from '../../services/game.service';

@Component({
  selector: "app-body-link",
  templateUrl: "./body-link.component.html",
  styleUrls: ["./body-link.component.scss"]
})
export class BodyLinkComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit() {}
  @Input() link: SnakeModel;
  @Input() module: number;
  @Input() index: number;
}
