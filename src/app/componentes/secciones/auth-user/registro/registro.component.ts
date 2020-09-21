
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService, eAuthEstado, iAuthError } from '../../../../servicios/firebase.service';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

    constructor(private firebase: FireBaseService, private router: Router) { }
    usuario: string;
    clave: string;
    invalidUsuario: boolean
    invalidClave: boolean
    errorMensaje: string
    rememberMe: boolean

    ngOnInit() {
        this.usuario = ""
        this.clave = ""
    }
    onRegistrar() {
        this.errorMensaje = ""
        this.invalidUsuario = false
        this.invalidClave = false
        let isvalid: eAuthEstado = this.firebase.validarDatos(this.usuario, this.clave)

        if (isvalid == eAuthEstado.valid) {
            this.firebase.register(this.usuario, this.clave, this.rememberMe)
                .then(res => {
                    this.router.navigateByUrl('principal');
                }).catch((error: iAuthError) => {
                    console.log("Error Registro:", error)
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


