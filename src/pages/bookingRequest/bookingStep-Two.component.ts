import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { BookingStepThree } from './bookingStep-Three.component'
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';
import { DateRangePickerComponent } from '../../app/shared/dateRangePicker/dateRangePicker.component'

@Component({
    selector: 'bookingStep-Two',
    templateUrl: './bookingStep-Two.component.html',
    providers: [DateRangePickerComponent]
})
export class BookingStepTwo implements OnInit{

    bookingRequest: BookingRequest;
    LatLng = {};
    roomSetup;
    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService, 
            private _dateRangePickerComponent: DateRangePickerComponent){
    }

    ngOnInit(){    
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.LatLng = this._navParams.get('LatLng');
        this.bookingRequest.checkin = '';
        this.bookingRequest.checkout = '';
    }

    setCheckout(ev){
        console.log('Checkout Changed!', ev );
    }

    roomSetupChanged(r){
        this.bookingRequest.double_room = parseInt(r.toString().substr(1,1));   
        this.bookingRequest.guests = parseInt(r.toString().substr(0,1));    
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);
        if(this._bookingRequestService.validateStepTwo(booking))
                this._navCtrl.push(BookingStepThree, { bookingRequest: this.bookingRequest, LatLng: this.LatLng });

        return false;
    }
}