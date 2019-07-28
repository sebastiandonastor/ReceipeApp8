import {Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

const handleError = (errorResponse) => {
    let errorMessage = "Unknow Error";
    if(!errorResponse.error || !errorResponse.error.error){
        return of(new AuthActions.LoginFail(errorMessage));

    }

    switch(errorResponse.error.error.message){
        case "EMAIL_EXISTS":
            errorMessage = "Email Already exist" 
        break;

        case "EMAIL_NOT_FOUND":
            errorMessage ="Email not Found";
            break;

        case "INVALID_PASSWORD":
            errorMessage="Incorrect Password";
            break;

    }

    return of(new AuthActions.LoginFail(errorMessage));
}

const handlerAUth = (data : AuthResponse) => {
    let expDate = new Date(new Date().getTime() +  (+data.expiresIn * 1000));

    const user = new User(data.email, data.localId, data.idToken, expDate);
    localStorage.setItem('userData', JSON.stringify(user));
   
    return new AuthActions.Login({email : data.email,
        localId: data.localId, token: data.idToken, expDate: new Date(expDate), redirect: true});
}
@Injectable()
export class AuthEffect {

    constructor(private action$ : Actions, private http : HttpClient, private router : Router, 
        private authService : AuthService) {

    }

    @Effect()
    login = this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((data : AuthActions.LoginStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc77NQIf1AYtGekiGnvZc9FnwQUVXC35k', {
                email: data.payload.email,
                password: data.payload.password,
                returnSecureToken: true
            }).pipe(tap((data) => {
                this.authService.autoLogout(+data.expiresIn * 1000);
            }),map((data => {
                return handlerAUth(data);
            })),
            catchError((errorResponse) => {
                return handleError(errorResponse);
            }))})
    )

    @Effect()
    signUp = this.action$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((data : AuthActions.SignUpStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc77NQIf1AYtGekiGnvZc9FnwQUVXC35k', {
            email: data.payload.email,
            password: data.payload.password,
            returnSecureToken: true
        }).pipe(tap((data) => {
            this.authService.autoLogout(+data.expiresIn * 1000);
        }),map((data => {
            return handlerAUth(data);
        })),
        catchError((errorResponse) => {
            return handleError(errorResponse);
        }))

        })
    )

    @Effect({dispatch : false})
    logout = this.action$.pipe(ofType(AuthActions.LOGOUT) ,tap(() => {
        localStorage.removeItem('userData');
        this.authService.clearLogout();
        this.router.navigate(['/auth']);
    }));   

    @Effect()
    auto_login = this.action$.pipe(ofType(AuthActions.AUTO_LOGIN),
    map(() => {
        let userInfo : {
            email: string,
            id: string,
            _token: string,
            expDateToken: string
        } = JSON.parse(localStorage.getItem('userData'));


        if(!userInfo){
            return {type : 'DUMMY TYPE'};
        }

        let user = new User(userInfo.email, userInfo.id, userInfo._token, new Date(userInfo.expDateToken));
        
        if(user.token){
            let remainingTime : number = new Date(userInfo.expDateToken).getTime() - new Date().getTime();
            console.log(remainingTime);
            this.authService.autoLogout(remainingTime);
            return new AuthActions.Login
            ({email: user.email, token: user.token, localId : user.id, expDate: new Date(userInfo.expDateToken), redirect: false});
        }

        return {type : 'DUMMY TYPE'};
    }));


    @Effect({dispatch: false})
    loginSuccess = this.action$
    .pipe(ofType(AuthActions.LOGIN), 
    tap((authSuccess : AuthActions.Login) => {
        if(authSuccess.payload.redirect){
            this.router.navigate(['/']); 
        }
    }))
    
    
}