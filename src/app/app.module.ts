import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeComponent } from './components/recipe-book/recipe.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe-book/recipe-list/recipe-item/recipe-item.component';
import { IngredientService } from './services/ingredients.service';
import { DropDownToggleDirective } from './directives/dropdown-toggle.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './components/recipe-book/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    DropDownToggleDirective,
    RecipeStartComponent,
    RecipeEditComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
