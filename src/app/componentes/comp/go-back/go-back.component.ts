import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-go-back',
    templateUrl: './go-back.component.html',
    styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent implements OnInit {

    constructor(private _location: Location) { }
    @Input() title
    ngOnInit(): void {
    }

    onGoBack() {
        this._location.back();
    }
}
