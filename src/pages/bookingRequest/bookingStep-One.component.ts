declare const google: any;
import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import { NavController, Content } from 'ionic-angular';

import { MapsAPILoader } from 'angular2-google-maps/core';
import { BookingStepTwo } from './bookingStep-Two.component';
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';

@Component({
    selector: 'bookingStep-One',
    templateUrl: './bookingStep-One.component.html'
})
export class BookingStepOne implements OnInit, AfterViewInit{

    bookingRequest: BookingRequest;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    public address: string;

    @ViewChild(Content)
    content: Content;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
            private _navCtrl: NavController, 
            private _bookingRequestService: BookingRequestService, 
            private mapsAPILoader: MapsAPILoader,
            private ngZone: NgZone
            ){
    }

    ngOnInit(){  
        this.bookingRequest = new BookingRequest();
        this.searchControl = new FormControl();                
    }

    countryChanged(country){
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            console.log('booking', this.bookingRequest.country);
            
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['geocode'],
                componentRestrictions: { country: this.bookingRequest.country ? this.bookingRequest.country.toString() : '' }
            });

            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place = autocomplete.getPlace();
                    
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    console.log('place result: ', place);

                    //set latitude, longitude and zoom
                    this.address = place.address_components[0].long_name + ', ' + this.bookingRequest.country;
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });

    }


    ngAfterViewInit() {
        this.countryChanged(this.bookingRequest.country);
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepOne(booking)){
            this.bookingRequest.center_lat = this.latitude;
            this.bookingRequest.center_lng = this.longitude;
            this.bookingRequest.location = this.address;
            this._navCtrl.push(BookingStepTwo, { bookingRequest: this.bookingRequest, LatLng: {lat: this.latitude, lng: this.longitude } });
        }

        return false;
    }
}