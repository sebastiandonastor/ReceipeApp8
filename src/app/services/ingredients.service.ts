import {Ingredient} from '../models/Ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class IngredientService {
    ingredients : Ingredient[] = [new Ingredient('Manzanita',10),new Ingredient('Tomatitos',20)];
    IngredienteAgregado = new Subject<Ingredient[]>();
    IngredientIndex = new Subject<Number>();

    getIngredients(){
        return this.ingredients.slice();
    }


    getIngredient(index : number) {
        return this.ingredients[index];
    }
    addIngredient(ingredient : Ingredient ){
        this.ingredients.push(ingredient);
        this.IngredienteAgregado.next(this.getIngredients());
    }

    addIngredients(ingredients : Ingredient []){
        this.ingredients.push(...ingredients);
        this.IngredienteAgregado.next(this.getIngredients());
    }

    updateIngredien(index : number, newIngredient : Ingredient) {
        this.ingredients[index] = newIngredient;
        this.IngredienteAgregado.next(this.getIngredients());
    }

    deleteIngredient(index : number) {
        this.ingredients.splice(index, 1);
        this.IngredienteAgregado.next(this.getIngredients());
    }

}