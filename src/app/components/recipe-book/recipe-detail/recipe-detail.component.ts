import {Component, Input, OnInit } from '@angular/core';

import { recipeServices } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/Recipe.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'recipe-detail',
    templateUrl: './recipe-detail.component.html'
})

export class RecipeDetailComponent implements OnInit {
  
    detalle : Recipe;
    id : number;
    constructor(private recipeService : recipeServices, private route: ActivatedRoute, private router : Router){

    }

      
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params.id;
            this.detalle = this.recipeService.getReceta(params.id);
        })
    }


    IrAIngredientes(){
        this.recipeService.addIngredientsToShopping(this.detalle.ingredients);
    }

    OnDeleteRecipe(){
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../']);
    }
    
}