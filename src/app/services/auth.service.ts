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
    constructor(private store : Store<AppReducer.AppState>) {

    }


    autoLogout(expirationToken: number) {
        this.logoutInterval = setTimeout(() => {

        this.store.dispatch(new AuthActions.Logout());

        },expirationToken);
    }


    clearLogout(){
        
        if(this.logoutInterval){
            clearInterval(this.logoutInterval);
            this.logoutInterval = null;
        }

     
    }





}