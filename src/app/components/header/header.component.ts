import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'header-app',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() onPaging = new EventEmitter<string>();

    SelectPage(page : string) {
        this.onPaging.emit(page);
    }
}

