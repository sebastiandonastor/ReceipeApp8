import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.action';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    authForm : FormGroup;
    errors : string = null;

    constructor(private store : Store<fromApp.AppState>){

    }

    ngOnInit(){
    
    

    this.authForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.minLength(6),Validators.required])
    });
    
    this.store.select('authReducer').subscribe((data) => {
        this.isLoading = data.loadingAuth;
        this.errors = data.errorsAuth;

    })

    }

    onCloseModal(){
        this.clearErrors();
    }
    
    onSwitch(){
        this.isLoginMode = !this.isLoginMode;
    }

    onLogin(){
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;


        if(this.isLoginMode){
            this.store.dispatch(new AuthActions.LoginStart({email, password}));
        } else {
            this.store.dispatch(new AuthActions.SignUpStart({email,password}));
        }

        this.authForm.reset();
    }

    clearErrors(){
        this.store.dispatch(new AuthActions.ClearErrors());
    }
}