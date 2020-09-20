import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdivinaElNumeroComponent } from './componentes/juegos/adivina-el-numero/adivina-el-numero.component';
import { AdivinaMasListadoComponent } from './componentes/juegos/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadAritmeticaComponent } from './componentes/juegos/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgilidadMasListadoComponent } from './componentes/juegos/agilidad-mas-listado/agilidad-mas-listado.component';
import { AnagramaComponent } from './componentes/juegos/anagrama/anagrama.component';
import { PptComponent } from './componentes/juegos/ppt/ppt.component';
import { SnakeComponent } from './componentes/juegos/snake/snake.component';
import { TatetiComponent } from './componentes/juegos/tateti/tateti.component';
import { ErrorComponent } from './componentes/secciones/error/error.component';
import { JuegosComponent } from './componentes/secciones/juegos/juegos.component';
import { MenuCardComponent } from './componentes/secciones/juegos/menu-card/menu-card.component';
import { JugadoresListadoComponent } from './componentes/secciones/jugadores-listado/jugadores-listado.component';
import { ListadoDePaisesComponent } from './componentes/secciones/listado-de-paises/listado-de-paises.component';
import { ListadoComponent } from './componentes/secciones/listado/listado.component';
import { LoginComponent } from './componentes/secciones/login/login.component';
import { MapaDeGoogleComponent } from './componentes/secciones/mapa-de-google/mapa-de-google.component';
import { PrincipalComponent } from './componentes/secciones/principal/principal.component';
import { QuienSoyComponent } from './componentes/secciones/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/secciones/registro/registro.component';
import { UrlAccessService } from './servicios/url-access.service';

// declaro donde quiero que se dirija
const MiRuteo = [
    { path: 'login',        component: LoginComponent },
    { path: 'registro',     component: RegistroComponent },
    { path: 'quiensoy',     component: QuienSoyComponent },
    { path: 'principal',    component: PrincipalComponent,          canActivate: [UrlAccessService] },
    { path: 'jugadores',    component: JugadoresListadoComponent,   canActivate: [UrlAccessService] },
    { path: 'mapa',         component: MapaDeGoogleComponent,       canActivate: [UrlAccessService] },
    { path: 'listado',      component: ListadoComponent,            canActivate: [UrlAccessService] },
    { path: 'paises',       component: ListadoDePaisesComponent,    canActivate: [UrlAccessService]  },
    { path: 'juegos',       component: JuegosComponent,             canActivate: [UrlAccessService], children: [
            { path: '',                     component: MenuCardComponent },
            { path: 'adivina',              component: AdivinaElNumeroComponent },
            { path: 'adivinaMasListado',    component: AdivinaMasListadoComponent },
            { path: 'agilidad',             component: AgilidadAritmeticaComponent },
            { path: 'agilidadaMasListado',  component: AgilidadMasListadoComponent },
            { path: 'snake',                component: SnakeComponent },
            { path: 'ppt',                  component: PptComponent },
            { path: 'anagrama',             component: AnagramaComponent },
            { path: 'tateti',               component: TatetiComponent },
        ]
    },
    { path: 'error',        component: ErrorComponent },
    { path: '',             component: PrincipalComponent,          canActivate: [UrlAccessService] },
    { path: '**',           component: ErrorComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(MiRuteo)
    ],
    exports: [
        RouterModule
    ]
})
export class RuteandoModule { }
