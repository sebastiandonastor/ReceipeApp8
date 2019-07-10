import { Recipe } from '../models/Recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { IngredientService } from '../services/ingredients.service';
import { Ingredient } from '../models/Ingredient.model';

@Injectable()
export class recipeServices {

    recetaDetallosa = new EventEmitter<Recipe>();

    recipes : Recipe[
    ] = [  new Recipe('Capuchinno con amor', 
    'El mejor capuchcino que probaras en tu vida', 
    'http://pequenosgrandesaciertos.ufesa.es/wp-content/uploads/2016/10/como-hacer-cafe-capuchino.jpg'
    ,'Sebastian',[new Ingredient('Leche',1)]),new Recipe('Chocolate hervido', 
    'El mejor chocolate que probaras en tu vida', 
    'https://img.elcomercio.pe/files/ec_article_multimedia_gallery/uploads/2018/06/20/5b2accb11085b.jpeg'
    ,'Sebastian',[new Ingredient('Chocolate',3),new Ingredient('Crema de mani',3)])];

    constructor(private ingredientService : IngredientService){
        
    }

    addIngredientsToShopping(ingredientes : Ingredient []){
        this.ingredientService.addIngredients(ingredientes);
    }
    getRecetas(){
        return this.recipes.slice();
    }

    getReceta(id : number) : Recipe{
        return this.recipes[id];
    }

    verDetalles(receta : Recipe){
        this.recetaDetallosa.emit(receta);
    }
}