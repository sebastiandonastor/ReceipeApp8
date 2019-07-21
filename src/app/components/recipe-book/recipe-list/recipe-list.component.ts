import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Recipe } from  '../../../models/Recipe.model';
import { recipeServices } from '../../../services/recipe.service';
import { DataStorageService } from 'src/app/services/dataStorage.service';
@Component({
    selector: 'recipe-list',
   templateUrl: './recipe-list.component.html'   
})

export class RecipeListComponent implements OnInit {
    recipes : Recipe[
    ] = [];


    constructor(private recipeService : recipeServices, private dataStorageService : DataStorageService){

    }


    ngOnInit() {
        this.dataStorageService.getRecipes().subscribe();

        this.recipeService.recetaAdded.subscribe((recetas : Recipe[]) => {
            this.recipes = recetas;
        });
    }

    
}