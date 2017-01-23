import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, NavParams, Platform, Content } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { bookingRequestUserDetailsComponent } from '../bookingRequestDetails/bookingRequestUserDetails.component';
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';
import { GoogleMapsService } from '../../app/shared/googleMaps/google-maps.service';

@Component({
    selector: 'bookingStep-Three',
    templateUrl: './bookingStep-Three.component.html'
})
export class BookingStepThree implements OnInit{

    @ViewChild(Content)
    content:Content;

    bookingRequest; 

    constructor(
            public platform: Platform,
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService, 
            private _googleMapsService: GoogleMapsService){
        platform.ready().then(() => {
            if(platform.is('cordova'))
                    this._googleMapsService.loadMap(-34.9290,138.6010);
        });
    }

    distanceChanged(dist: number){
        console.log('distance changed!');

        if(this.platform.is('cordova'))
                this._googleMapsService.changeZoom(dist);

        return;
    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.bookingRequest.stars = [];
        this.bookingRequest.stars[0] = false;
        this.bookingRequest.stars[1] = false;
        this.bookingRequest.stars[2] = false;
        this.bookingRequest.stars[3] = false;
        this.bookingRequest.stars[4] = false;
        this.bookingRequest.pool = false;
        this.bookingRequest.wifi = false;
        this.bookingRequest.distance = 1;
        if(this.platform.is('cordova'))
                this.content.ionScrollEnd.subscribe(this._googleMapsService.mapRedraw());
    }

    // ngAfterViewInit() {
        
    // }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepThree(booking))
                this._navCtrl.push(bookingRequestUserDetailsComponent, { bookingRequest: this.bookingRequest });

        return false;
    }

}