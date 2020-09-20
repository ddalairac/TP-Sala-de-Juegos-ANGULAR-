import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private fireAuth: AngularFireAuth,
        public afs: AngularFirestore,
        private router: Router,
        private loader: LoaderService
    ) { }

    private user: string
    private UserCredential: firebase.auth.UserCredential

    isLogged$ = new Subject<boolean>();
    isIn() {
        this.isLogged$.next(true);
    }
    isOut() {
        this.isLogged$.next(false);
    }

    public async register(usuario, clave,rememberMe) {
        this.loader.show();
        return new Promise((resolve, reject) => {
            this.fireAuth.createUserWithEmailAndPassword(usuario, clave)
                .then(res => {
                    console.log("registrar: ", { user: usuario, pass: clave })
                    this.persistLoginData(res, usuario, clave, rememberMe);
                    this.isLogged$.next(true);
                    this.loader.hide();
                    resolve(res)
                }).catch((error: iAuthError) => {
                    console.log("Error Registro:", error)
                    this.loader.hide();
                    reject(error)
                })
        })
    }

    public async singIn(usuario, clave, rememberMe) {
        this.loader.show();
        return new Promise((resolve, reject) => {
            this.fireAuth.signInWithEmailAndPassword(usuario, clave).then(
                res => {
                    console.log("Login:", res)
                    this.persistLoginData(res, usuario, clave, rememberMe);
                    this.isLogged$.next(true);
                    this.loader.hide();
                    resolve(res)
                }).catch(
                    (error: iAuthError) => {
                        console.log("Error Login:", error)
                        this.loader.hide();
                        reject(error)
                    }
                )
        });
    }

    public async singOut() {
        this.loader.show();
        await this.fireAuth.signOut();
        this.user = ''
        this.UserCredential = null
        this.loader.hide();
        this.isLogged$.next(false);
        this.router.navigateByUrl('/authuser');
    }


    public getUserName() {
        return this.user;
    }

    public getUserCredential() {
        return this.UserCredential;
    }

    public persistLoginData(res, usuario, clave, rememberMe) {
        this.user = usuario;
        this.UserCredential = res
        if (rememberMe) {
            window.localStorage.setItem("user", JSON.stringify(usuario));
            window.localStorage.setItem("pass", JSON.stringify(clave));
        } else {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("pass");
        }
    }

    public validarDatos(usuario: string, clave: string): eAuthEstado {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (usuario == '') {
            return eAuthEstado.userNull
        }
        if (!re.test(usuario)) {
            return eAuthEstado.userInvalid
        }
        if (clave == '') {
            return eAuthEstado.passNull
        }
        if (clave.length < 6) {
            return eAuthEstado.passInvalid
        }
        return eAuthEstado.valid
    }
}

export interface iAuthError {
    code: string,
    message: string
}
export enum eAuthEstado {
    valid = "Todo OK",
    userNull = "El email es obligatorio",
    passNull = "La clave es obligatoria",
    userInvalid = "El email es invalido",
    passInvalid = "La clave debe tener mas de 6 caracteres"
}