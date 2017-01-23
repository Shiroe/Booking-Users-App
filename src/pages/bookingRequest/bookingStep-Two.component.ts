import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { BookingStepThree } from './bookingStep-Three.component'
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';

@Component({
    selector: 'bookingStep-Two',
    templateUrl: './bookingStep-Two.component.html'
})
export class BookingStepTwo implements OnInit{

    bookingRequest = new BookingRequest();

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService){

    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = this._navParams.get('bookingRequest');
        console.log('bookingrequest: ', this.bookingRequest);
        
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepTwo(booking))
                this._navCtrl.push(BookingStepThree, { bookingRequest: this.bookingRequest });

        return false;
    }
}