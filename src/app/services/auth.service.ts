import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../models/authResponse.model';
import { catchError, tap } from 'rxjs/operators';
import {throwError, Subject, BehaviorSubject} from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppReducer from '../store/app.reducer';
import * as AuthActions from '../components/auth/store/auth.action';
@Injectable({providedIn: 'root'})
export class AuthService {

    logoutInterval : any;
    constructor(private http: HttpClient, private router : Router, private store : Store<AppReducer.AppState>) {

    }

    signUp(email: string, password: string){
        return this.http
        .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc77NQIf1AYtGekiGnvZc9FnwQUVXC35k',{
            email: email,
            password: password,
            returnSecureToken: true
        }).
        pipe(catchError((errorResponse) => {
            return this.handleError(errorResponse);
        }), tap((data) => {
            this.handleUser(data.email, data.localId, data.idToken, +data.expiresIn);
        }));
    
    }


    login(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc77NQIf1AYtGekiGnvZc9FnwQUVXC35k', {
            email: email,
            password: password,
            returnSecureToken: true
        }).
        pipe(catchError((errorResponse) => {
           return this.handleError(errorResponse);
        }), tap((data) => {
            this.handleUser(data.email, data.localId, data.idToken, +data.expiresIn);
        }))
    }

    autoLogin(){
        let userInfo : {
            email: string,
            id: string,
            _token: string,
            expDateToken: string
        } = JSON.parse(localStorage.getItem('userData'));


        if(!userInfo){
            return;
        }

        let user = new User(userInfo.email, userInfo.id, userInfo._token, new Date(userInfo.expDateToken))
        
        if(user.token){
            //this.userData.next(user);
            
            let timeRemaining =  new Date(userInfo.expDateToken).getTime() -new Date().getTime();
            this.autoLogout(timeRemaining);
        }
    }

    logout(){
        // this.userData.next(null);
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        clearInterval(this.logoutInterval);
        this.logoutInterval = null;
    }

    autoLogout(expirationToken: number) {
        this.logoutInterval = setTimeout(() => {
            this.logout();
        },expirationToken);

    }

    private handleUser(email: string, localId : string, idToken: string, expiresLn : number) {
        let expDate = new Date(new Date().getTime() +  (expiresLn * 1000));

        let user = new User(email, localId, idToken, expDate);        
        let remainingTime = expiresLn * 1000;

        //this.userData.next(user);
        //console.log(remainingTime);
        this.store.dispatch(new AuthActions.Login(
            {email : email, localId: localId, token: idToken, expDate: new Date(expDate)}));
        this.autoLogout(remainingTime);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse : HttpErrorResponse) {
        let errorMessage = "Unknow Error";
            if(!errorResponse.error || !errorResponse.error.error){
                return throwError(errorMessage);
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

            return throwError(errorMessage);
    }

}