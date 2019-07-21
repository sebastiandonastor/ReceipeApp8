import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NegateAuthGuard implements CanActivate {
   
    constructor(private auth : AuthService, private router : Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree>   {
        return this.auth.userData.pipe(map((data) => {
            let isAuth = !data;

            if(isAuth){
                return isAuth;
            }

            return this.router.createUrlTree(['/recetas']);
        }));
    }
    

}