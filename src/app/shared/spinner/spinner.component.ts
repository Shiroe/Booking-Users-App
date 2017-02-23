import { Component, Input } from '@angular/core';

@Component({
    selector: 'ab-spinner',
    templateUrl: './spinner.component.html'
})
export class SpinnerComponent {

    @Input() isVisible: boolean = false;

    @Input() text: string = 'Please wait...'

    constructor(){

    }

}