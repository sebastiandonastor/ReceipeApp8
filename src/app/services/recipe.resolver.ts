import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/Recipe.model';
import { DataStorageService } from './dataStorage.service';
import { recipeServices } from './recipe.service';
import { Observable, of } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as recipeActions from '../components/recipe-book/store/recipe-actions';
import { Store } from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import { map, take, switchMap } from 'rxjs/operators';
@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
   
    constructor(private store : Store<fromApp.AppState>, private action$ : Actions) {
        
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('recipes').pipe(take(1), map((recipeState) => {
        return recipeState.recipes;
    }
    ), switchMap(recipes => {
        if(recipes.length == 0) {
            this.store.dispatch(new recipeActions.FetchRecipes());
            return this.action$.pipe(ofType(recipeActions.SET_RECIPE),take(1));
        } else {
            return of(recipes);
        }
        
    }));


        
    
    }

}