import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-menu-card',
    templateUrl: './menu-card.component.html',
    styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router) { }


    ngOnInit() {
    }
    
    goToGame(url) {
        this.router.navigateByUrl(url);
    }
    // Juego(tipo: string) {
    //     switch (tipo) {
    //         case 'Adivina':
    //             this.router.navigate(['/Juegos/Adivina']);
    //             break;
    //         case 'Agilidad':
    //             this.router.navigate(['/Juegos/Agilidad']);
    //             break;
    //         case 'AdivinaMasListado':
    //             this.router.navigate(['/Juegos/AdivinaMasListado']);
    //             break;
    //         case 'AgilidadaMasListado':
    //             this.router.navigate(['/Juegos/AgilidadaMasListado']);
    //             break;
    //         case 'Snake':
    //             this.router.navigate(['/Juegos/Snake']);
    //             break;
    //         case 'PPT':
    //             this.router.navigate(['/Juegos/PPT']);
    //             break;
    //         case 'Anagrama':
    //             this.router.navigate(['/Juegos/Anagrama']);
    //             break;
    //         case 'Tateti':
    //             this.router.navigate(['/Juegos/Tateti']);
    //             break;
    //     }
    // }
}
