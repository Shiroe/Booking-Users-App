import { Component, OnInit } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'bookingRequest-confirm',
    templateUrl: './bookingRequestUserDetailsConfirmation.component.html'
})
export class bookingRequestUserDetailsConfirmationComponent implements OnInit{

    bookingRequest;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams){
    }

    ngOnInit(){
        this.bookingRequest = this._navParams.get('bookingRequest');
    }

    next(){
        console.log('final request', this.bookingRequest);
        // this._navCtrl.push(, { bookingRequest: this.bookingRequest });
    }

    back(){
        this._navCtrl.pop();
    }

}