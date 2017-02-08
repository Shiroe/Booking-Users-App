import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, NavParams, Content } from 'ionic-angular';

import { bookingRequestUserDetailsComponent } from '../bookingRequestDetails/bookingRequestUserDetails.component';
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';

@Component({
    selector: 'bookingStep-Three',
    templateUrl: './bookingStep-Three.component.html'
})
export class BookingStepThree implements OnInit{

    @ViewChild(Content)
    content:Content;

    @ViewChild('map') map;

    bookingRequest;
    LatLng; 
    zoom: number = 13;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService, 
            ){

    }

    distanceChanged(dist: number){
        console.log('distance changed!');

        this.zoom = 13; // - (dist/1000);

        if(dist >= 5000){
            this.zoom = 11;
        }
        else if(dist >= 3000){
            this.zoom = 12;
        }
        else if(dist >= 1500){
            this.zoom = 13;
        }
        else if(dist >= 1000){
            this.zoom = 13;
        }else{
          this.zoom = 14;
        }

        return;
    }

    ngOnInit(){
        this.LatLng = this._navParams.get('LatLng');
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
        this.bookingRequest.distance = 2000;
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepThree(booking))
                this._navCtrl.push(bookingRequestUserDetailsComponent, { bookingRequest: this.bookingRequest });

        return false;
    }

}