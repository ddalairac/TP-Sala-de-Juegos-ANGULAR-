import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { eCollections } from '../clases/firebase.model';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class FbStorageService {

    constructor(
        private loader: LoaderService,
        private firestore: AngularFirestore) { }

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
    public async readAll(collection: eCollections): Promise<any> {
        this.loader.show();
        let list = [];
        return new Promise((resolve,reject)=>{
            this.firestore.collection(collection).get().subscribe(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        list.push(doc.data());
                    })
                    console.log("Listado:", list);
                    this.loader.hide();
                    resolve( list)
                },
                error => {
                    console.log("Error Listado:", error, list);
                    this.loader.hide();
                    reject( error);
                }
            )
        })
       
        // pipe(
        //     tap((data) => {
        //         console.log("readAll: ", data);
        //         this.loader.hide();
        //     }),
        //     catchError(this.handleError)
        // );

    }
    // public readOne(collection: eCollections, id: string): Observable<Action<DocumentSnapshot<unknown>>> {
    public readOne(collection: eCollections, id: string) {
        this.loader.show();
        return this.firestore.collection(collection).doc(id).get().toPromise()
            // .pipe(
            //     tap((data) => {
            //         console.log("readOne: ", data);
            //         this.loader.hide();
            //     }),
            //     catchError(this.handleError)
            // )
            .then((doc)=> {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    return doc.data();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                this.loader.hide();
            }).catch((error)=> {
                console.log("Error getting document:", error);
                this.loader.hide();
            });
    }
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
