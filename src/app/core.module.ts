import { NgModule } from '@angular/core';
import { recipeServices } from './services/recipe.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
       recipeServices, {
        useClass: AuthInterceptorService,
        provide: HTTP_INTERCEPTORS,
        multi: true
      }]
})
export class CoreModule {

}