import {Component, Input, OnInit } from '@angular/core';

import { recipeServices } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/Recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as recipeActions from '../store/recipe-actions';
import * as shoppingLIstActions from '../../shopping-list/store/shopping-list.action';
@Component({
    selector: 'recipe-detail',
    templateUrl: './recipe-detail.component.html'
})

export class RecipeDetailComponent implements OnInit {
  
    detalle : Recipe;
    id : number;
    constructor(private recipeService : recipeServices, private route: ActivatedRoute, private router : Router,
        private store : Store<fromApp.AppState>
        ){

    }

      
    ngOnInit() {
        this.route.params.pipe(map((params) => {
            return +params.id;
        }), switchMap((data) => {
            this.id = data;
            return this.store.select('recipes');
        }), map((data) => {
            return data.recipes[this.id];
        })).subscribe(recipe => {
            this.detalle = recipe;
        })
    }


    IrAIngredientes(){
        this.store.dispatch(new shoppingLIstActions.AddIngredients(this.detalle.ingredients));
    }

    OnDeleteRecipe(){
        this.store.dispatch(new recipeActions.DeleteRecipe(this.id));
        this.router.navigate(['../']);
    }
    
}