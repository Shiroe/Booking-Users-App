import { Component, OnInit } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular';

import { bookingRequestUserDetailsConfirmationComponent } from './bookingRequestUserDetailsConfirmation.component';
import { BookingRequest } from '../bookingRequest/bookingRequest';

@Component({
    selector: 'bookingRequest-details',
    templateUrl: './bookingRequestUserDetails.component.html'
})
export class bookingRequestUserDetailsComponent implements OnInit{

    bookingRequest: BookingRequest;

    star: number;
    guests;
    rooms;
    stars;
    total: number;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams){
    }

    ngOnInit(){
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.star = this.bookingRequest.stars.indexOf(true);
        this.star++;
        this.stars = [];
        for(let _i: number = 0; _i < this.star; _i++ )
                this.stars.push(true);

        this.guests = this.bookingRequest.guests;
        this.rooms = this.bookingRequest.double_room;
        let days = this.bookingRequest.nights;
        this.total = this.bookingRequest.price *  days * parseInt(this.rooms);
        this.bookingRequest.double_room = this.rooms;
        this.bookingRequest.total_cost = this.total;        
        console.log('Booking', this.bookingRequest);        
    }

    next(){
        this._navCtrl.push(bookingRequestUserDetailsConfirmationComponent, { bookingRequest: this.bookingRequest });
    }

    back(){
        this._navCtrl.pop();
    }

}