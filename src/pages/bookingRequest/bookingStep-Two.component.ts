import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { BookingStepThree } from './bookingStep-Three.component'

@Component({
    selector: 'bookingStep-Two',
    templateUrl: './bookingStep-Two.component.html'
})
export class BookingStepTwo implements OnInit{

    bookingRequest;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams){

    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = this._navParams.get('bookingRequest');
        console.log('bookingrequest: ', this.bookingRequest);
        
    }

    next(){
        console.log('next step');
        
        this._navCtrl.push(BookingStepThree, { bookingRequest: this.bookingRequest });
    }
}