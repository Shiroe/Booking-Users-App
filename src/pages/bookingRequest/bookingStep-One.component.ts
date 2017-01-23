import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { BookingStepTwo } from './bookingStep-Two.component';
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';

@Component({
    selector: 'bookingStep-One',
    templateUrl: './bookingStep-One.component.html'
})
export class BookingStepOne implements OnInit{

    bookingRequest;

    constructor(
            private _navCtrl: NavController, 
            private _bookingRequestService: BookingRequestService){

    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = new BookingRequest();
        console.log('booking: ', this.bookingRequest);
        
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepOne(booking))
                this._navCtrl.push(BookingStepTwo, { bookingRequest: this.bookingRequest });

        return false;
    }
}