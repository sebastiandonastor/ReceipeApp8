import {Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
@Injectable()
export class AuthEffect {

    constructor(private action$ : Actions, private http : HttpClient, private router : Router) {

    }

    @Effect()
    login = this.action$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((data : AuthActions.LoginStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc77NQIf1AYtGekiGnvZc9FnwQUVXC35k', {
                email: data.payload.email,
                password: data.payload.password,
                returnSecureToken: true
            }).pipe(map((data => {
                return new AuthActions.Login({email : data.email,
                    localId: data.localId, token: data.idToken, expDate: new Date(data.expiresIn)});
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
        }).pipe(map((data => {
            return new AuthActions.Login({email : data.email,
                localId: data.localId, token: data.idToken, expDate: new Date(data.expiresIn)});
        })),
        catchError((errorResponse) => {
            return handleError(errorResponse);
        }))


        })
    )


    @Effect({dispatch: false})
    loginSuccess = this.action$
    .pipe(ofType(AuthActions.LOGIN), 
    tap(() => {
        this.router.navigate(['/']);    
    }))
    
    
}