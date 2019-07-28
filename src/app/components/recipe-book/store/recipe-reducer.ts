import { Recipe } from 'src/app/models/Recipe.model';
import * as RecipeActions from './recipe-actions';
import { act } from '@ngrx/effects';

export interface State { 
    recipes: Recipe[]
}

const intialState : State = {
    recipes : []
}

export function recipeReducer(state = intialState, actions : RecipeActions.RecipeActions) {
    switch(actions.type) {

        case RecipeActions.SET_RECIPE :
        return {...state, recipes : actions.payload};
        break;
        
        case RecipeActions.ADD_RECIPE:
        const recipeList = {...state}.recipes;
        recipeList.push(actions.payload);

        return {...state, recipes : recipeList};

        break;

        case RecipeActions.UPDATE_RECIPE:
        const recipeUpdated = {...state.recipes[actions.index], ...actions.newRecipe}
        const recipeUpdatedList = [...state.recipes];

        recipeUpdatedList[actions.index] = recipeUpdated;
        const newState = {...state, recipes : recipeUpdatedList};
        console.log(newState);
        return newState;

        break;

        case RecipeActions.DELETE_RECIPE:
        return {...state, recipes: state.recipes.filter((recipe,index) => {
            return index !== actions.index;
        })}
        break;
        default:
        return state;
        break;

    }
}