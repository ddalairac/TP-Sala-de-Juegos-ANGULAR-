import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// import { AgmCoreModule } from '@agm/core';

import { AuthUserComponent } from './componentes/secciones/auth-user/auth-user.component';
import { RegistroComponent } from './componentes/secciones/auth-user/registro/registro.component';
import { LoginComponent } from './componentes/secciones/auth-user/login/login.component';
import { PrincipalComponent } from './componentes/secciones/principal/principal.component';
import { QuienSoyComponent } from './componentes/secciones/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/secciones/error/error.component';
import { ListadoComponent } from './componentes/secciones/listado/listado.component';
import { ListadoDePaisesComponent } from './componentes/secciones/listado-de-paises/listado-de-paises.component';
import { JugadoresListadoComponent } from './componentes/secciones/jugadores-listado/jugadores-listado.component';
import { MapaDeGoogleComponent } from './componentes/secciones/mapa-de-google/mapa-de-google.component'
import { JuegosComponent } from './componentes/secciones/juegos/juegos.component';
import { MenuCardComponent } from './componentes/secciones/juegos/menu-card/menu-card.component';

import { AnagramaComponent } from './componentes/juegos/anagrama/anagrama.component';
import { AgilidadAritmeticaComponent } from './componentes/juegos/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from './componentes/juegos/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './componentes/juegos/agilidad-mas-listado/agilidad-mas-listado.component';
import { AdivinaElNumeroComponent } from './componentes/juegos/adivina-el-numero/adivina-el-numero.component';
import { AppleComponent } from './componentes/juegos/snake/components/apple/apple.component';
import { BodyLinkComponent } from './componentes/juegos/snake/components/body-link/body-link.component';
import { StageSlotComponent } from './componentes/juegos/snake/components/stage-slot/stage-slot.component';
import { StageComponent } from './componentes/juegos/snake/components/stage/stage.component';
import { SnakeComponent } from './componentes/juegos/snake/snake.component';
import { PptComponent } from './componentes/juegos/ppt/ppt.component';
import { TatetiComponent } from './componentes/juegos/tateti/tateti.component';
import { SquareComponent } from './componentes/juegos/tateti/square/square.component';
import { ScoresheetComponent } from './componentes/juegos/tateti/scoresheet/scoresheet.component';
import { MemotestComponent } from './componentes/juegos/memotest/memotest.component';

import { MenuComponent } from './componentes/comp/menu/menu.component';
import { GoBackComponent } from './componentes/comp/go-back/go-back.component';
import { LoaderComponent } from './componentes/comp/loader/loader.component';
import { CabeceraComponent } from './componentes/comp/cabecera/cabecera.component';
import { ListadosComponent } from './componentes/comp/listados/listados.component';
import { ListadoDeResultadosComponent } from './componentes/comp/listados/listado-de-resultados/listado-de-resultados.component';
import { InputJugadoresComponent } from './componentes/comp/input-jugadores/input-jugadores.component';

import { RuteandoModule } from './app-routing.module';

import { SexoPipe } from './pipes/sexo.pipe';
import { MaterialModule } from './vendors/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { JugadoresService } from './servicios/venian/jugadores.service';

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
        SexoPipe,
        SnakeComponent,
        BodyLinkComponent,
        StageComponent,
        StageSlotComponent,
        AppleComponent,
        PptComponent,
        TatetiComponent,
        SquareComponent,
        ScoresheetComponent,
        GoBackComponent,
        LoaderComponent,
        AuthUserComponent,
        MemotestComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RuteandoModule,
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
        // }),
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule // storage
    ],
    providers: [ JugadoresService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
