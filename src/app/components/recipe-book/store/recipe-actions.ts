import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/Recipe.model';

export const SET_RECIPE = '[Recipe] Set Recipes';

export const FETCH_ALLRECIPES = '[Recipe] Get Recipes'; 

export const ADD_RECIPE = '[Recipe] ADD Recipe';

export const UPDATE_RECIPE = '[Recipe] Update Recipe';

export const DELETE_RECIPE = '[Recipe] Delete Recipe'

export const SAVE_RECIPE = '[Recipe] Save Recipe';

export class SetRecipe implements Action {
    readonly type =  SET_RECIPE;

    constructor(public payload : Recipe[]) {
        
    }

}

export class FetchRecipes implements Action {
    readonly type = FETCH_ALLRECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload : Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public index : number, public newRecipe: Recipe) {

    }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    
    constructor(public index : number){
        
    }


}

export class SaveRecipe implements Action {
    readonly type = SAVE_RECIPE;
}



export type RecipeActions = 
SetRecipe | 
FetchRecipes
| AddRecipe
| UpdateRecipe
| DeleteRecipe;