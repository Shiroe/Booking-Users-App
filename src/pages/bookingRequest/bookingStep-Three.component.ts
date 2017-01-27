import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { NavController, NavParams, Platform, Content } from 'ionic-angular';
// import { LiveChatService } from '../../app/shared/livechat/livechat.service';
import { bookingRequestUserDetailsComponent } from '../bookingRequestDetails/bookingRequestUserDetails.component';
import { BookingRequest } from './bookingRequest';
import { BookingRequestService } from './bookingRequest.service';
import { GoogleMapsService } from '../../app/shared/googleMaps/google-maps.service';
import { GoogleMapsAPIWrapper, SebmGoogleMap } from 'angular2-google-maps/core';

@Component({
    selector: 'bookingStep-Three',
    templateUrl: './bookingStep-Three.component.html'
})
export class BookingStepThree implements OnInit, AfterViewInit{

    @ViewChild(Content)
    content:Content;

    @ViewChild('map') map;

    mapStyles =  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
] ;  

    bookingRequest;
    LatLng; 
    zoom: number = 16;

    constructor(
            public platform: Platform,
            private _navCtrl: NavController, 
            private _navParams: NavParams, 
            private _bookingRequestService: BookingRequestService, 
            private _googleMapsService: GoogleMapsService, 
            private _sebmGoogleMap: GoogleMapsAPIWrapper){
        platform.ready().then(() => {
            if(platform.is('cordova'))
                    this._googleMapsService.loadMap(this.LatLng.lat, this.LatLng.lng);
        });
    }

    distanceChanged(dist: number){
        console.log('distance changed!');

        this.zoom = 16 - (dist/1000);

        if(this.platform.is('cordova'))
                this._googleMapsService.changeZoom(dist);

        return;
    }

    ngOnInit(){
        this.LatLng = this._navParams.get('LatLng');
        // this._sebmGoogleMap.latitude = this.LatLng.lat;
        // this._sebmGoogleMap.longitude = this.LatLng.lng;
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

    ngAfterViewInit() {
        //this._sebmGoogleMap.styles//.createCircle({map: this.map, center: this.LatLng, radius: 5, fillColor: 'f33617', fillOpacity: 0.8}); //.createCircle({center: this.LatLng, radius: this.bookingRequest.distance, fillColor: '#f33617', fillOpacity: 0.5, map:  this.map});
        // this._sebmGoogleMap.setMapOptions(maps)
        //this._
    }

    next(booking: BookingRequest){
        console.log('next step', this.bookingRequest);

        if(this._bookingRequestService.validateStepThree(booking))
                this._navCtrl.push(bookingRequestUserDetailsComponent, { bookingRequest: this.bookingRequest });

        return false;
    }

}