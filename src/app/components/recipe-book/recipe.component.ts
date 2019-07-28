import {Component, OnInit } from '@angular/core';
import { Recipe } from  '../../models/Recipe.model';
import { recipeServices } from '../../services/recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as recipeActions from './store/recipe-actions';
@Component({
    selector: 'recipe-main',
    templateUrl: './recipe.component.html'
})

export class RecipeComponent implements OnInit{
    

    constructor(private store : Store<fromApp.AppState>){
        
    }
    
    ngOnInit(): void {
    }
}