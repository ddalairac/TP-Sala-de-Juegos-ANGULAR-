import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TimerObservable } from "rxjs/observable/TimerObservable";
import { AuthService, eAuthEstado, iAuthError } from '../../../../servicios/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }
    usuario: string;
    clave: string;
    invalidUsuario: boolean
    invalidClave: boolean
    errorMensaje: string
    rememberMe: boolean = true

    ngOnInit() {
        if (window.localStorage.getItem("user")) {
            this.usuario = JSON.parse(window.localStorage.getItem("user"));
            this.clave = JSON.parse(window.localStorage.getItem("pass"));
        }
    }

    onLogin() {
        this.errorMensaje = ""
        this.invalidUsuario = false
        this.invalidClave = false
        let isvalid: eAuthEstado = this.authService.validarDatos(this.usuario, this.clave)

        if (isvalid == eAuthEstado.valid) {
            this.authService.singIn(this.usuario, this.clave, this.rememberMe)
                .then(res => {
                    this.router.navigateByUrl('principal');
                }).catch((error: iAuthError) => {
                    console.log("Error Login:", error)
                    this.errorMensaje = error.message
                })

        } else {
            this.errorMensaje = isvalid;
            switch (isvalid) {
                case eAuthEstado.userNull:
                case eAuthEstado.userInvalid:
                    this.invalidUsuario = true;
                    break
                case eAuthEstado.passNull:
                case eAuthEstado.passInvalid:
                    this.invalidClave = true;
                    break
            }
        }
    }
}
