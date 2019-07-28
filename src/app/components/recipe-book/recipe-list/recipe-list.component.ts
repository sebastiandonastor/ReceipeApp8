import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from  '../../../models/Recipe.model';
import { recipeServices } from '../../../services/recipe.service';
import { DataStorageService } from 'src/app/services/dataStorage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
    selector: 'recipe-list',
   templateUrl: './recipe-list.component.html'   
})

export class RecipeListComponent implements OnInit, OnDestroy {
    recipes : Recipe[
    ] = [];

    private subRecipe : Subscription;

    constructor(private store : Store<fromApp.AppState>){

    }


    ngOnInit() {
        this.subRecipe = this.store.select('recipes').pipe(map(data => data.recipes)).subscribe((data) => {
            console.log(data);
            this.recipes = data;
        });
     
    }

    ngOnDestroy(){
        this.subRecipe.unsubscribe();
    }
    

    
}