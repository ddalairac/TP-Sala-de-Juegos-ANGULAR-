import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { LoaderService } from '../../../servicios/loader.service';

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
  // public isLoading: boolean = false;
  public isLoading$: Subject<boolean> = this.loaderService.isLoading$;
  constructor(public loaderService: LoaderService) {}

  ngOnInit() {
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
