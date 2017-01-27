declare const google: any;
import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import { NavController, Content } from 'ionic-angular';

import { MapsAPILoader } from 'angular2-google-maps/core';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { BookingStepTwo } from './bookingStep-Two.component';
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';

@Component({
    selector: 'bookingStep-One',
    templateUrl: './bookingStep-One.component.html'
})
export class BookingStepOne implements OnInit, AfterViewInit{

    bookingRequest;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

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
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = new BookingRequest();
        console.log('booking: ', this.bookingRequest);
        //create search FormControl
        this.searchControl = new FormControl();
        

        //set current position
        this.setCurrentPosition();        
    }

    countryChanged(country){
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            console.log('booking', this.bookingRequest.country);
            
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['geocode'],
                componentRestrictions: { country: this.bookingRequest.country ? this.bookingRequest.country.toString() : '' }
            });

            // this.bookingRequest.country

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
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 12;
                });
            });
        });
    }

    scrollTop(){
        console.log('autocomplete focused!');
        this.content.scrollToBottom();
    }

    ngAfterViewInit() {
        this.countryChanged(this.bookingRequest.country);
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
        });
        }
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepOne(booking))
                this._navCtrl.push(BookingStepTwo, { bookingRequest: this.bookingRequest, LatLng: {lat: this.latitude, lng: this.longitude } });

        return false;
    }
}