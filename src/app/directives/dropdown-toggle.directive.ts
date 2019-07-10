import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[dropdown-toggle]'
})

export class DropDownToggleDirective {

    @HostBinding('class.show') isOpen = false;

    constructor(private el : ElementRef) {
        
    }

    @HostListener('click',['$event.target']) toggleOpen(targetElement){
        this.toggler();
    }

    @HostListener('document:click',['$event.target']) clickedOutside(targetElement){
        var clickedOut = this.el.nativeElement.contains(targetElement);
        if(!clickedOut && this.isOpen){
            this.toggler();
            console.log("hee hee");
        }
    }

    toggler(){
        this.isOpen = !this.isOpen;
        this.el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show');
    }


}