import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class NegateAuthGuard implements CanActivate {
   
    constructor(private auth : AuthService, private router : Router, private store : Store<fromApp.AppState>){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree>   {
        return this.store.select('authReducer').pipe(
            map((data) => {
                return data.user;
            }),
            map((data) => {
            let isAuth = !data;

            if(isAuth){
                return isAuth;
            }

            return this.router.createUrlTree(['/recetas']);
        }));
    }
    

}