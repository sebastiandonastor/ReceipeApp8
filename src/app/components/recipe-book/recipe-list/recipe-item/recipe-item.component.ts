import {Component, Input} from '@angular/core';
import { Recipe } from 'src/app/models/Recipe.model';
import { recipeServices } from 'src/app/services/recipe.service';


@Component({
    selector: 'recipe-item',
    templateUrl: './recipe-item.component.html'
})

export class RecipeItemComponent {
    @Input() recipe : Recipe;


    constructor() {
   
    }


}