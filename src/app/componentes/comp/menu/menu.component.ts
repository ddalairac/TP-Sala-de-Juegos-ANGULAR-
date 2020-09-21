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
    public isLogged$: Subject<boolean> = this.firebase.isLogged$;
    constructor(private route: ActivatedRoute, private firebase: FireBaseService, private router: Router) { }

    ngOnInit() {
        this.isLogged$ = this.firebase.isLogged$;
    }
    goToSection(url) {
        this.router.navigateByUrl(url);
    }
    singOut(){
        this.firebase.singOut();
    }
}
