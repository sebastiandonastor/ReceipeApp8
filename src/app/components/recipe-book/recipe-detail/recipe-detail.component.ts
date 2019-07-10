import {Component, Input, OnInit } from '@angular/core';

import { recipeServices } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/Recipe.model';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'recipe-detail',
    templateUrl: './recipe-detail.component.html'
})

export class RecipeDetailComponent implements OnInit {
  
    detalle : Recipe;

    constructor(private recipeService : recipeServices, private route: ActivatedRoute){

    }

      
    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params.id);
            this.detalle = this.recipeService.getReceta(params.id);
            console.log(this.detalle);
        })
    }


    IrAIngredientes(){
        this.recipeService.addIngredientsToShopping(this.detalle.ingredients);
    }
    
}