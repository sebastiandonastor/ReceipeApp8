import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take,exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    

    
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return this.authService.userData.pipe(take(1),
        exhaustMap((data) => {
          
            if(!data){
                return next.handle(req);
            }

            let copy = req.clone({params : new HttpParams().set('auth', data.token)});
           return next.handle(copy);
        })
        );
      
   }

    constructor(private authService: AuthService) {

    }


}