import { NgModule } from '@angular/core';
import { IngredientService } from './services/ingredients.service';
import { recipeServices } from './services/recipe.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
        IngredientService, recipeServices, {
        useClass: AuthInterceptorService,
        provide: HTTP_INTERCEPTORS,
        multi: true
      }]
})
export class CoreModule {

}