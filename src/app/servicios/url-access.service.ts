import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UrlAccessService {
    constructor(private router: Router,private authService: AuthService) { }
    canActivate(state: RouterStateSnapshot): boolean {
        // return this.checkRoute(state.url);
        return true;
    }
    private checkRoute(path){
        // alert(this.router.url)
        if (this.router.url === '/Login' || this.router.url === '/Registro') {
        // if (path === '/Login' || path === '/Registro') {
            return true;
        } else if(this.authService.getUserCredential()){
            return true;
        }
        this.router.navigate(['/Login'])
        return false;
    }
}
