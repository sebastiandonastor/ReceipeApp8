import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../store/recipe-actions';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from 'src/app/models/Recipe.model';
import { Store } from '@ngrx/store';
@Injectable()
export class RecipeEffects {

    constructor(private actions$: Actions, private http: HttpClient, private store : Store<fromApp.AppState>){

    }

    @Effect()
    fecthRecipes = this.actions$.pipe(ofType(RecipeActions.FETCH_ALLRECIPES), switchMap((dataNothing) => {
        return this.http.get<Recipe[]>('https://recipedelicius.firebaseio.com/recipes.json')
    }), map((data) => {
        return data.map((element) => {
            if(!element.ingredients){
                element.ingredients = [];
            }
            return element;
        })
    }),map((data) => {
        return new RecipeActions.SetRecipe(data);
    }));


    @Effect({dispatch :false})
    saveRecipe = this.actions$.pipe(ofType(RecipeActions.SAVE_RECIPE), 
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actions, recipeState]) => {
        return this.http.put('https://recipedelicius.firebaseio.com/recipes.json', recipeState.recipes);
    })
    )

}

