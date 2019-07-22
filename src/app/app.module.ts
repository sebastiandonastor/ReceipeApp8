import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import * as appReducer from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import { AuthEffect } from './components/auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer.mapper),
    EffectsModule.forRoot([AuthEffect]),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  }),
  SharedModule,
  CoreModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
