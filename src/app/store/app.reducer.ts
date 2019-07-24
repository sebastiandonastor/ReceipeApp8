import * as ShoppingListReducer from '../components/shopping-list/store/shopping-list.reducer';
import * as AuthReducer from '../components/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipes from '../components/recipe-book/store/recipe-reducer';
export interface AppState {
    shoppingListReducer : ShoppingListReducer.SlState,
    authReducer : AuthReducer.State,
    recipes : fromRecipes.State
}

export const mapper : ActionReducerMap<AppState> = {
    shoppingListReducer: ShoppingListReducer.ShoppingListReducer,
    authReducer: AuthReducer.AuthReducer,
    recipes: fromRecipes.recipeReducer
}