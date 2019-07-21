import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NegateAuthGuard } from 'src/app/guards/negateAuth-guard.service';

@NgModule({
    declarations: [AuthComponent],
    imports: [ReactiveFormsModule, SharedModule, 
    RouterModule.forChild([
    {path: '' , canActivate: [NegateAuthGuard], component: AuthComponent}
    ]
)   ]
})
export class AuthModule {

}