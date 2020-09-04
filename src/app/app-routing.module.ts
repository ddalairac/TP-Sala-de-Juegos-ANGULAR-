import { NgModule } from '@angular/core';
import { JugadoresListadoComponent } from './componentes/jugadores-listado/jugadores-listado.component';
import { LoginComponent } from './componentes/login/login.component';
import { MapaDeGoogleComponent } from './componentes/mapa-de-google/mapa-de-google.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { ListadoDePaisesComponent } from './componentes/listado-de-paises/listado-de-paises.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { AdivinaMasListadoComponent } from './componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RouterModule } from '@angular/router';

// declaro donde quiero que se dirija
const MiRuteo = [
    { path: 'Jugadores', component: JugadoresListadoComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Mapa', component: MapaDeGoogleComponent },
    { path: 'QuienSoy', component: QuienSoyComponent },
    { path: 'Registro', component: RegistroComponent },
    { path: 'Principal', component: PrincipalComponent },
    { path: 'Listado', component: ListadoComponent },
    { path: 'Paises', component: ListadoDePaisesComponent },
    { path: 'Juegos', component: JuegosComponent, children: [
            { path: '', component: MenuCardComponent },
            { path: 'Adivina', component: AdivinaElNumeroComponent },
            { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
            { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
            { path: 'Agilidad', component: AgilidadAritmeticaComponent }
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
