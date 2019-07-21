import {Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { IngredientService } from 'src/app/services/ingredients.service';


@Component({
    selector: 'shopping-list',
    templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit {
    ingredients : Ingredient[] = [];


    constructor(private ingredientService : IngredientService){}
    ngOnInit(){

        this.ingredients = this.ingredientService.getIngredients();
        this.ingredientService.IngredienteAgregado.subscribe((list)=> {
            this.ingredients = list;
        });
    }

    onEditIngredient(index : number) {
        this.ingredientService.IngredientIndex.next(index);
    }
    
    
   
}