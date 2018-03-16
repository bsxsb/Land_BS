import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Directive({
    selector: '[appMenuToggle]'
})
export class MenuToggleDirective implements OnInit, OnDestroy {
    @Input() show: boolean;
    @Output() showChange = new EventEmitter<boolean>();

    constructor(private el:ElementRef) {
    }

    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if ( event.button !==2 && !this.el.nativeElement.contains(event.target)) {
            this.show = false;
            this.showChange.emit(this.show);
        } else if( event.button !==2 && this.el.nativeElement.contains(event.target)){
            this.show = !this.show;
            this.showChange.emit(this.show);
        }
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {

    }
}
