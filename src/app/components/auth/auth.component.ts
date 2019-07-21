import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    authForm : FormGroup;
    errors : string = null;

    constructor(private authService: AuthService, private router: Router){

    }

    ngOnInit(){
    
    

    this.authForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.minLength(6),Validators.required])
    });

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
        this.isLoading = true;
        let authObservable : Observable<AuthResponse>;


        if(this.isLoginMode){
            authObservable = this.authService.login(email,password);
        } else {
            authObservable = this.authService.signUp(email,password);
        }

        authObservable.subscribe((response) => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recetas']);
        }, error => { this.errors = error; this.isLoading = false; });


        this.authForm.reset();
    }

    clearErrors(){
        this.errors = null;
    }
}