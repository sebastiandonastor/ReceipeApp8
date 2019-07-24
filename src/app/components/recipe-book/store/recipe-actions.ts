import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/Recipe.model';

export const SET_RECIPE = '[Recipe] Set Recipes';

export class SetRecipe implements Action {
    type =  SET_RECIPE;

    constructor(public payload : Recipe[]) {
        
    }

}

export type RecipeActions = SetRecipe;