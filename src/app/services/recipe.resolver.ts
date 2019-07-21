import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/Recipe.model';
import { DataStorageService } from './dataStorage.service';
import { recipeServices } from './recipe.service';
import { Observable } from 'rxjs';

@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
   
    constructor(private dataStorageService : DataStorageService, private recipeService : recipeServices) {
        
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Recipe[]  | Observable<Recipe[]>{

        const recipes = this.recipeService.getRecetas();
        if(recipes.length == 0) {
            return this.dataStorageService.getRecipes();
        } else {
            return recipes;
        }

    }

}