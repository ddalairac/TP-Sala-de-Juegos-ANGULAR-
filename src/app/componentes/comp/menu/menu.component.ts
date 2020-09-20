import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../servicios/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    public isLogged$: Subject<boolean> = this.authService.isLogged$;
    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.isLogged$ = this.authService.isLogged$;
    }
    goToSection(url) {
        this.router.navigateByUrl(url);
    }
    singOut(){
        this.authService.singOut();
    }
}
