import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/dataStorage.service';
import { AuthService } from 'src/app/services/auth.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.action';
@Component({
    selector: 'header-app',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isAuthenticated : boolean = false;

    constructor(private dataStorage : DataStorageService, private store : Store<fromApp.AppState>){

    }

    ngOnInit(){
        this.store.select('authReducer').pipe(map((data) => {
            return data.user;
        })).subscribe((user) => {
            this.isAuthenticated = !!user;
        })
    }

    onStoreData(){
        this.dataStorage.storeData();
    }

    onGetData(){
        this.dataStorage.getRecipes().subscribe();
    }

    logout(){
        this.store.dispatch(new AuthActions.Logout());
    }



}

