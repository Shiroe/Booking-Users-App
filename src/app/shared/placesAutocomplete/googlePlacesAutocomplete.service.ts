declare const google: any;
import { Injectable } from '@angular/core';

import { MapsAPILoader } from 'angular2-google-maps/core';

import { PopupToastService } from '../popupToast/popupToast.service';


@Injectable()
export class GooglePlacesAutocompleteService{

    // @ViewChild("search")
    // public searchElementRef: ElementRef;
    constructor(
        private _popupToastService: PopupToastService, 
        private _mapsApiLoader: MapsAPILoader){

    }

    init(country: string){
                //load Places Autocomplete
        // this._mapsApiLoader.load().then(() => {
        //     console.log('booking', country);
            
        //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        //         types: ['geocode'],
        //         componentRestrictions: { country: country ? country.toString() : 'GR' }
        //     });

        //     autocomplete.addListener("place_changed", () => {
        //         this.ngZone.run(() => {
        //             //get the place result

        //             let place = autocomplete.getPlace();
                    
                    
        //             //verify result
        //             if (place.geometry === undefined || place.geometry === null) {
        //                 return;
        //             }
        //             console.log('place result: ', place.geometry.location.toJSON());
        //             // return place;
                    
        //             return {lat: place.geometry.location.lat, lng: place.geometry.location.lng };

        //             // //set latitude, longitude and zoom
        //             // this.latitude = place.geometry.location.lat();
        //             // this.longitude = place.geometry.location.lng();
        //             // this.zoom = 12;
        //         });
        //     });
        // });
    }


    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // this.latitude = position.coords.latitude;
                // this.longitude = position.coords.longitude;
            });
        }
    }


}