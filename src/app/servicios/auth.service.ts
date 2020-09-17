import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fireAuth: AngularFireAuth, private router: Router) { }

    public async singIn(usuario, pass) {
        return this.fireAuth.signInWithEmailAndPassword(usuario, pass)
    }

    public async singOut() {
        await this.fireAuth.signOut();
        this.router.navigateByUrl('');
    }
    public async register(usuario, pass) {
        console.log("registrar: ",{user:usuario,pass:pass})
        return this.fireAuth.createUserWithEmailAndPassword(usuario, pass);
    }
}

export interface iAuthError{
    code:string,
    message:string
}