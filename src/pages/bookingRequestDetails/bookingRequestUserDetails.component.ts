import { Component, OnInit } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular';

import { bookingRequestUserDetailsConfirmationComponent } from './bookingRequestUserDetailsConfirmation.component';

@Component({
    selector: 'bookingRequest-details',
    templateUrl: './bookingRequestUserDetails.component.html'
})
export class bookingRequestUserDetailsComponent implements OnInit{

    bookingRequest;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams){

    }

    ngOnInit(){
        this.bookingRequest = this._navParams.get('bookingRequest');
    }

    next(){
        this._navCtrl.push(bookingRequestUserDetailsConfirmationComponent, { bookingRequest: this.bookingRequest });
    }

    back(){
        this._navCtrl.pop();
    }

}