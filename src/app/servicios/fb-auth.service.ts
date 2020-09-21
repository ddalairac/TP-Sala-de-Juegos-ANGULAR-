import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { iAuthError, eAuthEstado } from '../clases/firebase.model';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class FbAuthService {

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router,
        private loader: LoaderService,
        // private firestore: AngularFirestore
    ) { }

    private user: string
    private UserCredential: firebase.auth.UserCredential

    isLogged$ = new Subject<boolean>();
    // isIn() {
    //     this.isLogged$.next(true);
    // }
    // isOut() {
    //     this.isLogged$.next(false);
    // }

    public async register(usuario, clave, rememberMe) {
        this.loader.show();
        return new Promise((resolve, reject) => {
            this.fireAuth.createUserWithEmailAndPassword(usuario, clave)
                .then(async res => {
                    console.log("registrar: ", { user: usuario, pass: clave })
                    await this.persistAuthInData(res, usuario, clave, rememberMe, "register");
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
                async res => {
                    console.log("Login:", res)
                    await this.persistAuthInData(res, usuario, clave, rememberMe, "login");
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
        await this.persistAuthOutData()
        await this.fireAuth.signOut();

        this.loader.hide();
        this.isLogged$.next(false);
        this.router.navigateByUrl('/authuser');
    }

    public getUserId(): string {
        return (this.user) ? this.user : "nullUser";
    }

    public getUserCredential() {
        return this.UserCredential;
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

    private async persistAuthOutData() {
        let usuario = this.user;
        // await this.create(eCollections.usersLog, { user: usuario, type: "logOut", timestamp: new Date() })
        // await this.createFromUserId(eCollections.usersLogIds, this.getUserId(), { user: usuario, type: "logOut", timestamp: new Date() })
        setTimeout(() => {
            this.user = null
            this.UserCredential = null
            return true
        }, 0);
    }

    private async persistAuthInData(res, usuario, clave, rememberMe, type) {

        this.user = usuario;
        this.UserCredential = res
        if (rememberMe) {
            window.localStorage.setItem("user", JSON.stringify(usuario));
            window.localStorage.setItem("pass", JSON.stringify(clave));
        } else {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("pass");
        }

        // await this.create(eCollections.usersLog, { user: usuario, type: type, timestamp: new Date() })
        // await this.createFromUserId(eCollections.usersLogIds, this.getUserId(), { user: usuario, type: type, timestamp: new Date() })

        return true
    }
}
