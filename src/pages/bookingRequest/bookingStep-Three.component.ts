import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, NavParams, Platform, Content } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { bookingRequestUserDetailsComponent } from '../bookingRequestDetails/bookingRequestUserDetails.component';

@Component({
    selector: 'bookingStep-Three',
    templateUrl: './bookingStep-Three.component.html'
})
export class BookingStepThree implements OnInit{

    @ViewChild(Content)
    content:Content;

    bookingRequest;
    map: GoogleMap;

    constructor(
            public platform: Platform,
            private _navCtrl: NavController, 
            private _navParams: NavParams){
        platform.ready().then(() => {
            if(platform.is('cordova'))
                    this.loadMap();
        });
    }

    loadMap(){
 
        let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': false,
            'myLocationButton': false,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': false,
            'tilt': false,
            'rotate': false,
            'zoom': false
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }

    mapRedraw(){
        setTimeout( () => {this.map.refreshLayout()}, 100);
        // this.map.refreshLayout();
    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.bookingRequest.stars = [];
        if(this.platform.is('cordova'))
                this.content.ionScrollEnd.subscribe(this.mapRedraw());
    }

    // ngAfterViewInit() {
        
    // }

    next(){
        console.log('next step', this.bookingRequest); 
        this._navCtrl.push(bookingRequestUserDetailsComponent, { bookingRequest: this.bookingRequest});
    }
}