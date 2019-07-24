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


    storeData(){
        const recipe = this.recipeService.getRecetas();
        this.http.put('https://recipedelicius.firebaseio.com/recipes.json', recipe).subscribe((data) => {
            console.log(data);
        });
    }

    getRecipes(){
        return this.http.get<Recipe[]>('https://recipedelicius.firebaseio.com/recipes.json')
        .pipe(
            map((data) => {
            return data.map((element) => {
                if(!element.ingredients){
                    element.ingredients = [];
                }
                return element;
            })
        }), tap((data : Recipe[]) => {
            this.store.dispatch(new recipeActions.SetRecipe(data));
        }));
    }
}