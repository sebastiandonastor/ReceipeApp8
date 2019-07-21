import {Component, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../../models/Ingredient.model'
import { IngredientService } from '../../../services/ingredients.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html'
})

export class ShoppingListEditComponent implements OnInit {
  
    @ViewChild('form', {static :false}) ingredientForm : NgForm;

    editMode : boolean = false;
    editedItem : Ingredient;
    indexItem: number;
    constructor(private ingredientService: IngredientService){

    }

    AgregarIngrediente(form: NgForm){
        const ingredient = new Ingredient(form.value.name, form.value.amount);
        if(this.editMode){
            this.ingredientService.updateIngredien(this.indexItem, ingredient);
        } else {
            this.ingredientService.addIngredient(ingredient);
        }
        
        this.clear();
        
    }

    ngOnInit(): void {
        this.ingredientService.IngredientIndex.subscribe((data : number) => {
        this.editMode = true;
        this.editedItem = this.ingredientService.getIngredient(data);
        this.indexItem = data;
        this.ingredientForm.setValue({'name' : this.editedItem.name, 'amount': this.editedItem.amount});
        });
    }

    clear(){
        this.editMode = false;
        this.ingredientForm.reset();
    }

    onRemoveItem(index : number){
        this.ingredientService.deleteIngredient(index);
        this.clear();
    }

 

}