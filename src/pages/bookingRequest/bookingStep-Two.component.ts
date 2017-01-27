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

    bookingRequest = new BookingRequest();
    LatLng = {};
    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService, 
            private _dateRangePickerComponent: DateRangePickerComponent){
    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.LatLng = this._navParams.get('LatLng');
        console.log('bookingrequest: ', this.bookingRequest);
        this.bookingRequest.checkin = '';
        this.bookingRequest.checkout = '';
        this._dateRangePickerComponent.bookingObj = this.bookingRequest;
        this._dateRangePickerComponent.checkoutChanged.subscribe( ev => console.log('checkoutChanged', ev));
        
    }

    setCheckout(ev){
        console.log('Checkout Changed!', ev );
        
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepTwo(booking))
                this._navCtrl.push(BookingStepThree, { bookingRequest: this.bookingRequest, LatLng: this.LatLng });

        return false;
    }
}