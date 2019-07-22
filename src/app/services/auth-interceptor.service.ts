import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take,exhaustMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    

    
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return this.store.select('authReducer').pipe(take(1),
        map((data) => {
            return data.user;
        }),
        exhaustMap((data) => {
          
            if(!data){
                return next.handle(req);
            }

            let copy = req.clone({params : new HttpParams().set('auth', data.token)});
           return next.handle(copy);
        })
        );
      
   }

    constructor(private store : Store<fromApp.AppState>) {

    }


}