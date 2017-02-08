import { Component, Input, OnInit, OnDestroy } from '@angular/core';
// import { Content } from 'ionic-angular';

// import { SebmGoogleMapCircle } from 'angular2-google-maps/core';


@Component({
 selector: 'ab-map',
 styles: [`
   .sebm-google-map-container {
     height: 300px;
   }
`],
 template: `
   <sebm-google-map #map
        [latitude]="lat" 
        [longitude]="lng" 
        [draggable]="false" 
        [zoom]="zoom" 
        [mapDraggable]="false" 
        [streetViewControl]="false" 
        [disableDefaultUI]="true" 
        [disableDoubleClickZoom]="true"
        [scrollwheel]="false"
        [zoomControl]="false"
        [usePanning]="false"
        [styles]="mapDecorator"
        (zoomChange)="mapZoomChanged(this, $event)"
   >
      <sebm-google-map-circle 
            [(radius)]="radius"
            [fillColor]="'#FF0000'"
            [strokeColor]="'#FF0000'"
            [strokeOpacity]="0.8"
            [fillOpacity]="0.3"
            [latitude]="lat"
            [longitude]="lng"
            [editable]="false"
            [zIndex]="999"
            
      >
      </sebm-google-map-circle>
   </sebm-google-map>
 `,
 providers: []
})

export class sebmGoogleMapComponent implements OnInit, OnDestroy{
    @Input() lat;
    @Input() lng;
    @Input() zoom;
    @Input() radius;

    mapDecorator = mapStyles;

    random;

    constructor(   ){
      
    }

    mapZoomChanged(t, ev){
      console.log('thisM: ', t, ' ev:', ev);
      setTimeout( function(){ this._radius = parseInt(this.radius); }, 200);
    }

    ngOnInit(){

    }

    ngOnDestroy(){

    }

}


const mapStyles = [
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
