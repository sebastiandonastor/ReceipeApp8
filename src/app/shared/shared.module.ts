import { NgModule } from '@angular/core';
import { DropDownToggleDirective } from '../directives/dropdown-toggle.directive';
import { AuthComponent } from '../components/auth/auth.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ 
        DropDownToggleDirective,
        SpinnerComponent,
        ModalComponent
    ],
    imports: [CommonModule],
    exports: [
        DropDownToggleDirective,
        SpinnerComponent,
        ModalComponent,
        CommonModule
    ]
    
})
export class SharedModule {

}