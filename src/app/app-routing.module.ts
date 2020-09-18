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
import { JugadoresListadoComponent } from './componentes/secciones/jugadores-listado/jugadores-listado.component';
import { ListadoDePaisesComponent } from './componentes/secciones/listado-de-paises/listado-de-paises.component';
import { ListadoComponent } from './componentes/secciones/listado/listado.component';
import { LoginComponent } from './componentes/secciones/login/login.component';
import { MapaDeGoogleComponent } from './componentes/secciones/mapa-de-google/mapa-de-google.component';
import { MenuCardComponent } from './componentes/secciones/menu-card/menu-card.component';
import { PrincipalComponent } from './componentes/secciones/principal/principal.component';
import { QuienSoyComponent } from './componentes/secciones/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/secciones/registro/registro.component';

// declaro donde quiero que se dirija
const MiRuteo = [
    { path: 'Login', component: LoginComponent },
    { path: 'Registro', component: RegistroComponent },
    { path: 'QuienSoy', component: QuienSoyComponent },
    { path: 'Jugadores', component: JugadoresListadoComponent },
    { path: 'Mapa', component: MapaDeGoogleComponent },
    { path: 'Principal', component: PrincipalComponent },
    { path: 'Listado', component: ListadoComponent },
    { path: 'Paises', component: ListadoDePaisesComponent },
    { path: 'Juegos', component: JuegosComponent, children: [
            { path: '', component: MenuCardComponent },
            { path: 'Adivina', component: AdivinaElNumeroComponent },
            { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
            { path: 'Agilidad', component: AgilidadAritmeticaComponent },
            { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
            { path: 'Snake', component: SnakeComponent },
            { path: 'PPT', component: PptComponent },
            { path: 'Anagrama', component: AnagramaComponent },
            { path: 'Tateti', component: TatetiComponent },
        ]
    },
    { path: 'error', component: ErrorComponent },
    { path: '', component: PrincipalComponent },
    { path: '**', component: ErrorComponent }
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
