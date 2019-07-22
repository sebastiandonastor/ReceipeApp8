import {Action} from '@ngrx/store';
import { Ingredient } from 'src/app/models/Ingredient.model';


export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_UPDATE = '[Shopping List] Start_Update Ingredient';
export const STOP_UPDATE = '[Shopping List] Stop_Update Ingredient';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
   
    constructor(public ingredient : Ingredient) {

    }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public ingredients : Ingredient []){

    }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public newIngredient : Ingredient){}
}

export class RemoveIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

}

export class StartUpdate implements Action {
    readonly type = START_UPDATE;
    constructor(public index : number) {

    }
}

export class StopUpdate implements Action {
    readonly type = STOP_UPDATE;
}


export type SlAction = 
AddIngredient | 
AddIngredients |
UpdateIngredient |
RemoveIngredient |
StartUpdate |
StopUpdate;