import { Recipe } from '../models/Recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientService } from '../services/ingredients.service';
import { Ingredient } from '../models/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class recipeServices {

    recetaDetallosa = new EventEmitter<Recipe>();

    recetaAdded = new Subject<Recipe[]>();

    recipes : Recipe[
    ] = [];


    constructor(private ingredientService : IngredientService){
        
    }

    setRecipes(recipesOverWrite : Recipe[]){
        this.recipes = recipesOverWrite;
        this.recetaAdded.next(this.recipes.slice());
    }

    addIngredientsToShopping(ingredientes : Ingredient []){
        this.ingredientService.addIngredients(ingredientes);
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
