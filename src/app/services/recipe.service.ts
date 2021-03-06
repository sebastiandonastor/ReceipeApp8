import { Recipe } from '../models/Recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appReducer from '../store/app.reducer';
import * as ShoppingListActions from '../components/shopping-list/store/shopping-list.action';
@Injectable()
export class recipeServices {

    recetaDetallosa = new EventEmitter<Recipe>();

    recetaAdded = new Subject<Recipe[]>();

    recipes : Recipe[
    ] = [];


    constructor(private store: Store<appReducer.AppState>){
        
    }

    setRecipes(recipesOverWrite : Recipe[]){
        this.recipes = recipesOverWrite;
        this.recetaAdded.next(this.recipes.slice());
    }

    addIngredientsToShopping(ingredientes : Ingredient []){
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredientes));
    }
    getRecetas(){
        return this.recipes.slice();
    }

    getReceta(id : number) : Recipe{
        return this.recipes[id];
    }

    verDetalles(receta : Recipe){
        this.recetaDetallosa.emit(receta);
    }

    addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recetaAdded.next(this.recipes);
    }

    updateRecipe(index : number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recetaAdded.next(this.recipes);
    }

    deleteRecipe(index : number) {
        this.recipes.splice(index,1);
        this.recetaAdded.next(this.recipes);
    }

    deleteIngredient(index : number, indexIngredient : number){
        this.recipes[index].ingredients.splice(indexIngredient, 1);
    }
}
