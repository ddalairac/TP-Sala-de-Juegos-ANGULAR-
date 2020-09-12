import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
//  import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

// import { AccordionModule } from 'ngx-bootstrap';

import { MiHttpService } from './servicios/mi-http/mi-http.service'; 
import { PaisesService } from './servicios/paises.service'; 
import { JugadoresService } from './servicios/jugadores.service'; 
import{ ArchivosJugadoresService} from './servicios/archivos-jugadores.service'; 
import { JuegoServiceService } from './servicios/juego-service.service';

import { PrincipalComponent } from './componentes/secciones/principal/principal.component';
import { JuegosComponent } from './componentes/secciones/juegos/juegos.component';
import { RegistroComponent } from './componentes/secciones/registro/registro.component';
import { QuienSoyComponent } from './componentes/secciones/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/secciones/error/error.component';
import { ListadoComponent } from './componentes/secciones/listado/listado.component';
import { ListadoDePaisesComponent } from './componentes/secciones/listado-de-paises/listado-de-paises.component';
import { JugadoresListadoComponent } from './componentes/secciones/jugadores-listado/jugadores-listado.component';
import { LoginComponent } from './componentes/secciones/login/login.component';
import { MapaDeGoogleComponent } from './componentes/secciones/mapa-de-google/mapa-de-google.component'
import { MenuCardComponent } from './componentes/secciones/menu-card/menu-card.component';

import { AnagramaComponent } from './componentes/juegos/anagrama/anagrama.component';
import { AgilidadAritmeticaComponent } from './componentes/juegos/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from './componentes/juegos/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './componentes/juegos/agilidad-mas-listado/agilidad-mas-listado.component';
import { AdivinaElNumeroComponent } from './componentes/juegos/adivina-el-numero/adivina-el-numero.component';

import { MenuComponent } from './componentes/comp/menu/menu.component';
import { ListadoDeResultadosComponent } from './componentes/comp/listado-de-resultados/listado-de-resultados.component';
import { ListadosComponent } from './componentes/comp/listados/listados.component';
import { CabeceraComponent } from './componentes/comp/cabecera/cabecera.component';
import { InputJugadoresComponent } from './componentes/comp/input-jugadores/input-jugadores.component';

import { RuteandoModule } from './app-routing.module';

import { SexoPipe } from './pipes/sexo.pipe';
import { MaterialModule } from './vendors/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ListadoDeResultadosComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    AdivinaMasListadoComponent,
    AgilidadMasListadoComponent,
    ListadoComponent,
    ListadosComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramaComponent,
    ListadoDePaisesComponent,
    MapaDeGoogleComponent,
    JugadoresListadoComponent,
    InputJugadoresComponent,
    SexoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ JuegoServiceService, MiHttpService,PaisesService,ArchivosJugadoresService,JugadoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
