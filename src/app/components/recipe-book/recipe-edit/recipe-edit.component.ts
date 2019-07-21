import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { recipeServices } from 'src/app/services/recipe.service';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/Recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recetasForm: FormGroup;
  constructor(private route : ActivatedRoute, private recipeService : recipeServices, private currentRoute : Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }

  private initForm(){
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let autorReceta = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getReceta(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      autorReceta = recipe.author;
      if(recipe.ingredients.length > 0){
        for(let ingredient of recipe.ingredients){
           recipeIngredients.push( new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
          }));
        }
      }
    }

    this.recetasForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'author': new FormControl(autorReceta,Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });

  }

  getIngredientsControls(){
    return (<FormArray>this.recetasForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recetasForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl(0, [Validators.required, Validators.min(1)])
    }));
  }


  onDeleteIngredient(indexIngredient : number) {
    if(this.editMode){
      this.recipeService.deleteIngredient(this.id, indexIngredient);
      this.initForm();
    } else {
      (<FormArray>this.recetasForm.get('ingredients')).removeAt(indexIngredient);
    }
  
  }

  onSubmit(){
    
    if(this.editMode){
    this.recipeService.updateRecipe(this.id, this.recetasForm.value); 
    } else {
      this.recipeService.addRecipe(this.recetasForm.value);
    }

    this.currentRoute.navigate(['../'], {relativeTo: this.route});
  }

  cancel() {
    this.currentRoute.navigate(['../'], {relativeTo: this.route});
  }

}
