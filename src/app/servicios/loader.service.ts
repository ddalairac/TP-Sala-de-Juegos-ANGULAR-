import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  constructor() {}

  isLoading$ = new Subject<boolean>();
  show() {
    this.isLoading$.next(true);
  }
  hide() {
    this.isLoading$.next(false);
  }
}
