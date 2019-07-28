import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { recipeServices } from './recipe.service';
import { Recipe } from '../models/Recipe.model';
import {map, tap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp  from '../store/app.reducer';
import * as recipeActions from '../components/recipe-book/store/recipe-actions';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService : recipeServices, private store : Store<fromApp.AppState>) {

    }


 


}