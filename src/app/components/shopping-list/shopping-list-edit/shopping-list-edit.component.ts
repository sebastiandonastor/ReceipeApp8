import {Component, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../../models/Ingredient.model'
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingListReducer from '../store/shopping-list.reducer';

@Component({
    selector: 'shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html'
})

export class ShoppingListEditComponent implements OnInit {
  
    @ViewChild('form', {static :false}) ingredientForm : NgForm;

    editMode : boolean = false;
    editedItem : Ingredient;
    constructor(private store: Store<fromShoppingListReducer.AppState>){

    }
 
    AgregarIngrediente(form: NgForm){
        const ingredient = new Ingredient(form.value.name, form.value.amount);
        if(this.editMode){
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
        }
        
        this.clear();
        
    }

    ngOnInit(): void {
        this.store.select('shoppingListReducer').subscribe((data) => {
            if(data.indexIngredient > -1){
                this.editMode = true;
                this.editedItem = data.editIngredient;
                this.ingredientForm.setValue({'name' : this.editedItem.name, 'amount': this.editedItem.amount});
            } else {
                this.editMode = false;
            }
           
        });

   
    }

    clear(){
        this.editMode = false;
        this.ingredientForm.reset();
        this.store.dispatch(new ShoppingListActions.StopUpdate());
    }

    onRemoveItem(index : number){
        this.store.dispatch(new ShoppingListActions.RemoveIngredient());
        this.clear();

    }

 

}