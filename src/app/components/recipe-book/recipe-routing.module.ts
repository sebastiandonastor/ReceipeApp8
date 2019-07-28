import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from 'src/app/services/recipe.resolver';

const routes : Routes = [
    
    {path: '', canActivate: [AuthGuard], component: RecipeComponent , children: [
        {path: '', component: RecipeStartComponent, resolve : [RecipeResolverService]},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent , resolve : [RecipeResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve : [RecipeResolverService]}
        
    ]},
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {

}