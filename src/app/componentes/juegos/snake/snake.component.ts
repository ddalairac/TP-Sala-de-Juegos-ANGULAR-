import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SnakeComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
