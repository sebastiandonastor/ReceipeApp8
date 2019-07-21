import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'alert-app',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    @Input() message : string;

    @Output() close = new EventEmitter<void>();


    onClosed(){
        this.close.emit();
    }
}