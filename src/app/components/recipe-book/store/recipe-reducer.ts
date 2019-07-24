import { Recipe } from 'src/app/models/Recipe.model';
import * as RecipeActions from './recipe-actions';

export interface State { 
    recipes: Recipe[]
}

const intialState : State = {
    recipes : []
}

export function recipeReducer(state : State = intialState, action : RecipeActions.RecipeActions) {
    switch(action.type) {

        case RecipeActions.SET_RECIPE:
        return {...state, recipes : action.payload};
        break;

        default:
        return state;

    }
}