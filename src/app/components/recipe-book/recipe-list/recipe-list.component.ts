import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Recipe } from  '../../../models/Recipe.model';
import { recipeServices } from '../../../services/recipe.service';
import { DataStorageService } from 'src/app/services/dataStorage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { map } from 'rxjs/operators';
@Component({
    selector: 'recipe-list',
   templateUrl: './recipe-list.component.html'   
})

export class RecipeListComponent implements OnInit {
    recipes : Recipe[
    ] = [];


    constructor(private store : Store<fromApp.AppState>, private dataStorageService : DataStorageService){

    }


    ngOnInit() {
        this.dataStorageService.getRecipes().subscribe();

        this.store.select('recipes').pipe(map(data => data.recipes)).subscribe((data) => {
            this.recipes = data;
            console.log(this.recipes);
        })
     
    }

    
}