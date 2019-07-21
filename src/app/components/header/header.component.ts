import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/dataStorage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'header-app',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isAuthenticated : boolean = false;

    constructor(private dataStorage : DataStorageService, private authService: AuthService){

    }

    ngOnInit(){
        this.authService.userData.subscribe((user) => {
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
        this.authService.logout();
    }



}

