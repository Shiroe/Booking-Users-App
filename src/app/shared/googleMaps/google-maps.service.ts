import { Injectable } from '@angular/core';
// import { ServerService } from '../../app/shared/server/server.service';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { PopupToastService } from '../popupToast/popupToast.service';

@Injectable()
export class GoogleMapsService{

	constructor(
        private _popupToastService: PopupToastService){

	}

    map: GoogleMap;

    loadMap(lat: number, lng: number){
 
        let location = new GoogleMapsLatLng(lat, lng);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': false,
            'myLocationButton': false,
            'indoorPicker': true,
            'zoom': false
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

    changeZoom(dist: number){
        let _dist: number = dist/1000;

        dist = Math.floor(dist/1000);
        if(dist < _dist)
                dist++;

        console.log('distance changed!', _dist, ' : ', dist);
        this.map.setZoom(16 - dist);
        this.map.addCircle({ radius: dist*500, fillColor: '#f33617', strokeColor: '#222', zIndex: 99});
        this.mapRedraw();
    }

    mapRedraw(){
        setTimeout( () => {this.map.refreshLayout()}, 100);
        // this.map.refreshLayout();
    }



}