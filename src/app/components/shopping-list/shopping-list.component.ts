import {Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAppReducer from '../../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';

@Component({
    selector: 'shopping-list',
    templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit {
    ingredients : Observable<{ ingredients :Ingredient[]}>;


    constructor(private store: Store<fromAppReducer.AppState>){}
    ngOnInit(){

       this.ingredients = this.store.select('shoppingListReducer');

        // this.ingredients = this.ingredientService.getIngredients();
        // this.ingredientService.IngredienteAgregado.subscribe((list)=> {
        //     this.ingredients = list;
        // });
    }

    onEditIngredient(index : number) {
       this.store.dispatch(new ShoppingListActions.StartUpdate(index));
    }
    
    
   
}