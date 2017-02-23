import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { NavController, NavParams, Content } from 'ionic-angular';

import { bookingRequestUserDetailsComponent } from '../bookingRequestDetails/bookingRequestUserDetails.component';
import { BookingRequest } from './bookingRequest';
import { BookingsService } from '../bookings/bookings.service';
import { BookingRequestService } from './bookingRequest.service';

@Component({
    selector: 'bookingStep-Three',
    templateUrl: './bookingStep-Three.component.html'
})
export class BookingStepThree implements OnInit, OnDestroy{

    @ViewChild(Content)
    content:Content;

    @ViewChild('map') map;

    bookingRequest;
    loading: boolean = true;
    LatLng; 
    zoom: number = 13;
    hotelsFound = 0;
    hotels;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService, 
            private _bookingsService: BookingsService
            ){
    }

    distanceChanged(dist: number){

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

        this.updateRequest();
        
        return;
    }

    updateRequest(){
        this.loading = true; 
        this.hotelsFound = 0;
        this.hotels = this._bookingsService.findHotels(this.bookingRequest, this.LatLng, this.bookingRequest.distance)
        .then( res => {
            this.hotelsFound = res.hotels_found;
            this.loading = false; 
        }, error => {
            console.log('error http', error);
            if( error.status == 503){
                console.log('reconnecting!');                
                setTimeout( () => {
                    this.loading = true;
                    this.updateRequest();
                }, 100); 
            }
        });   
    }

    ngOnInit(){
        this.LatLng = this._navParams.get('LatLng');   
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.bookingRequest.stars = [];
        this.bookingRequest.stars[0] = true;
        this.bookingRequest.stars[1] = true;
        this.bookingRequest.stars[2] = true;
        this.bookingRequest.stars[3] = true;
        this.bookingRequest.stars[4] = true;
        this.bookingRequest.pool = false;
        this.bookingRequest.wifi = false;
        this.bookingRequest.distance = 2000;
        this.updateRequest();
        
    }

    ngOnDestroy(){
        if(this.hotels.unsubscribe){
            this.hotels.unsubscribe();
        }
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepThree(booking, this.hotelsFound))
                this._navCtrl.push(bookingRequestUserDetailsComponent, { bookingRequest: this.bookingRequest });

        return false;
    }

}