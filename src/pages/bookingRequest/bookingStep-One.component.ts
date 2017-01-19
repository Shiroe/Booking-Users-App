import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { BookingStepTwo } from './bookingStep-Two.component';

@Component({
    selector: 'bookingStep-One',
    templateUrl: './bookingStep-One.component.html'
})
export class BookingStepOne implements OnInit{

    bookingRequest;

    constructor(
            private _navCtrl: NavController){

    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = {};
    }

    next(){
        console.log('next step');
        
        this._navCtrl.push(BookingStepTwo, { bookingRequest: this.bookingRequest });
    }
}