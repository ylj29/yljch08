import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(route);
        if(!this.authService.LoggedIn()){
            alert('请先登录');
        }
        return this.authService.LoggedIn();
    }
    
}