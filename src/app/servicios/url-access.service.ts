import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FbAuthService } from './fb-auth.service';

@Injectable({
    providedIn: 'root'
})
export class UrlAccessService {
    constructor(private router: Router,private fbauthservice: FbAuthService) { }
    canActivate(state: RouterStateSnapshot): boolean {
        return this.checkRoute(state.url);
        // return true;
    }
    private checkRoute(path){
        // alert(this.router.url)
        if (this.router.url === '/authuser') {
        // if (path === '/authuser') {
            return true;
        } else if(this.fbauthservice.getUserCredential()){
            return true;
        }
        this.router.navigate(['/authuser'])
        return false;
    }
}
