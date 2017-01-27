import { Component, OnInit } from '@angular/core'

import { NavController, NavParams } from 'ionic-angular';

import { bookingRequestUserDetailsConfirmationComponent } from './bookingRequestUserDetailsConfirmation.component';

@Component({
    selector: 'bookingRequest-details',
    templateUrl: './bookingRequestUserDetails.component.html'
})
export class bookingRequestUserDetailsComponent implements OnInit{

    bookingRequest;

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
        console.log('STAR', this.star);
        
        this.star++;
        console.log('STAR', this.star);
        this.stars = [];

        for(let _i: number = 0; _i < this.star; _i++ )
                this.stars.push(true);

        this.guests = this.bookingRequest.guests.toString().substr(0,1);
        this.rooms = this.bookingRequest.guests.toString().substr(1,1);
        let chIn = this.bookingRequest.checkin.split('-');
        let chOut = this.bookingRequest.checkout.split('-');
        let days = Number(chOut[2]) - Number(chIn[2]); 
        this.total = this.bookingRequest.price *  days;
        console.log('guests: ', this.guests, ' rooms: ', this.rooms);
        
    }

    next(){
        this._navCtrl.push(bookingRequestUserDetailsConfirmationComponent, { bookingRequest: this.bookingRequest });
    }

    back(){
        this._navCtrl.pop();
    }

}