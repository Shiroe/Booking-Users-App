import { Component, OnInit } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular';

import { BookingComponent } from '../booking/booking.component';

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
        this._navCtrl.push(BookingComponent, { bookingRequest: this.bookingRequest, isNew: true });
    }

    back(){
        this._navCtrl.pop();
    }

}