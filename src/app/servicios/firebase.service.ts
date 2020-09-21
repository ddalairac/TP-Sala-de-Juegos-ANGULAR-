import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentChangeAction, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class FireBaseService {

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router,
        private loader: LoaderService,
        private firestore: AngularFirestore
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
        await this.create(eCollections.usersLog, { user: usuario, type: "logOut", timestamp: new Date() })
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

        await this.create(eCollections.usersLog, { user: usuario, type: type, timestamp: new Date() })
        // await this.createFromUserId(eCollections.usersLogIds, this.getUserId(), { user: usuario, type: type, timestamp: new Date() })

        return true
    }

    //! |||||||| STORE |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    public async create(collection: eCollections, data: any): Promise<DocumentReference> {
        this.loader.show();
        let res = await this.firestore.collection(collection).add(Object.assign({}, data));
        this.loader.hide();
        return res;
    }
    public async createFromUserId(collection: eCollections, id: string, data: any): Promise<void> {
        this.loader.show();
        let res = await this.firestore.collection(collection).doc(id).set(Object.assign({}, data));
        this.loader.hide();
        return res;
    }
    public readAll(collection: eCollections): Observable<DocumentChangeAction<unknown>[]> {
        this.loader.show();
        return this.firestore.collection(collection).snapshotChanges().pipe(
            tap((data) => {
                console.log("readAll: ", data);
                this.loader.hide();
            }),
            catchError(this.handleError)
        );

    }
    // public async readAll(collection: eCollections): Promise<DocumentChangeAction<unknown>[]> {
    //     this.loader.show();
    //     let res = await this.firestore.collection(collection).snapshotChanges().toPromise();
    //     this.loader.hide();
    //     return res;
    // }
    // public async readOne(collection: eCollections, id: string): Observable<Action<DocumentSnapshot<unknown>>> {
    //     this.loader.show();
    //     let res =  await this.firestore.collection(collection).doc(id).snapshotChanges();
    //     this.loader.hide();
    //     return res;
    // }
    public async update(collection: eCollections, id: string, data: any): Promise<void> {
        this.loader.show();
        let res = await this.firestore.collection(collection).doc(id).set(Object.assign({}, data));
        this.loader.hide();
        return res;
    }
    public async delete(collection: eCollections, id: string): Promise<void> {
        this.loader.show();
        let res = await this.firestore.collection(collection).doc(id).delete();
        this.loader.hide();
        return res;
    }
    private handleError(error: HttpErrorResponse): Observable<any> {
        console.log("Error: ", error)
        // let dataError: { number: number; message: string; friendlyMessage: string; }

        // if (error.status == 0) {
        //   dataError.number = error.status;
        //   dataError.message = error.statusText;
        //   dataError.friendlyMessage = "Ups! Ocurrio un error recibiendo data";
        // } else {
        //   dataError.number = null;
        //   dataError.message = "No";
        //   dataError.friendlyMessage =
        //     "Ups! algo paso, no contacte al admin porque tampoco sabe";
        // }
        // alert("Error: " + dataError.friendlyMessage);
        // return throwError(dataError); // Envia al componente el objeto error modificado.
        return throwError(error); // Envia al componente el objeto error modificado.
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

export enum eCollections {
    scores = "scores",
    usersLog = "usersLog"
}