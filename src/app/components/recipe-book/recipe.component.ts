import {Component, OnInit } from '@angular/core';
import { Recipe } from  '../../models/Recipe.model';
import { recipeServices } from '../../services/recipe.service';


@Component({
    selector: 'recipe-main',
    templateUrl: './recipe.component.html',
    providers: [recipeServices]
})

export class RecipeComponent implements OnInit{
    
    detalle : Recipe;

    constructor(private recipeServices : recipeServices){
        
    }
    ngOnInit(): void {
        this.recipeServices.recetaDetallosa.subscribe((receta) => {
            this.detalle = receta;
        });
    }
}