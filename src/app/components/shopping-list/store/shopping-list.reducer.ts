import { Ingredient } from 'src/app/models/Ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

const initialState : SlState = {
    ingredients : 
    [new Ingredient('Manzanita',10),
    new Ingredient('Tomatitos',20)],
    editIngredient : null,
    indexIngredient : -1
}

export interface SlState {
    ingredients : Ingredient[],
    editIngredient: Ingredient,
    indexIngredient: number
}

export interface AppState {
    shoppingListReducer : SlState
}


export function ShoppingListReducer(state : SlState = initialState, actions : ShoppingListAction.SlAction) {

    switch(actions.type) {

        case ShoppingListAction.ADD_INGREDIENT:
        return {...state, ingredients : [...state.ingredients, actions.ingredient]}
        break;

        case ShoppingListAction.ADD_INGREDIENTS:
        return {...state, ingredients: [...state.ingredients, ...actions.ingredients]}
        break;

        case ShoppingListAction.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.indexIngredient];        

        const updatedIngredient = {
           ...ingredient,
           ...actions.newIngredient
        };

        const updatedList = state.ingredients.slice();
        updatedList[state.indexIngredient] = updatedIngredient;

        return {...state , ingredients : [...updatedList]};
        break;


        case ShoppingListAction.DELETE_INGREDIENT: 

        return {...state, ingredients: state.ingredients.filter((ing, index) => {
            return index !== state.indexIngredient;
        })}

        case ShoppingListAction.START_UPDATE :
        return {...state, editIngredient: {...state.ingredients[actions.index]}, indexIngredient: actions.index }
        break;

        case ShoppingListAction.STOP_UPDATE: 
        
        return {...state, editIngredient: null, indexIngredient: -1};

        default:
        return state;
        break;
    }

}