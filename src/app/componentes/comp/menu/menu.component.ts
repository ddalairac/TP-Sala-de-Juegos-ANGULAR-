import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { FireBaseService } from '../../../servicios/firebase.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    constructor(private route: ActivatedRoute, private firebaseservice: FireBaseService, private router: Router) {}

    public isLogged$: Subject<boolean>;

    ngOnInit() {
        this.isLogged$ = this.firebaseservice.isLogged$;
    }
    goToSection(url) {
        this.router.navigateByUrl(url);
    }
    singOut(){
        this.firebaseservice.singOut();
    }
}
