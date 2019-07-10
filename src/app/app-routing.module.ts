import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import { RecipeComponent } from './components/recipe-book/recipe.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './components/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './components/recipe-book/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-book/recipe-edit/recipe-edit.component';

const routes : Routes = [
    {path: '', redirectTo: '/recetas', pathMatch: 'full'},
    {path: 'recetas', component: RecipeComponent, children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent}
        
    ]},
    {path: 'listado', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}