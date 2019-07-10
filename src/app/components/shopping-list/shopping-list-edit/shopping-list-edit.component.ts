import {Component} from '@angular/core';
import { Ingredient } from '../../../models/Ingredient.model'
import { IngredientService } from '../../../services/ingredients.service';

@Component({
    selector: 'shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html'
})

export class ShoppingListEditComponent {
   
    constructor(private ingredientService: IngredientService){

    }

    AgregarIngrediente(nombre : HTMLInputElement, cantidad : HTMLInputElement){
        this.ingredientService.addIngredient(new Ingredient(nombre.value, parseInt(cantidad.value)));
        nombre.value = null;
        cantidad.value = null;
    }
}