import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers  } 	  from '@angular/http';
import 'rxjs/add/operator/map';

// import { Booking } 	  		 from '../../../pages/bookings/bookings'
import { PopupToastService } from '../popupToast/popupToast.service';

@Injectable()
export class ServerService {

	//TO DELETE THIS AND TOAST
	private api: string = '/api';
	constructor( 
		private _popupToastService: PopupToastService, 
		private _http: Http){

    }
	bookings = [];

	getBookings(){
		this.bookings = [{ destination: 'Paros, Greece', total_cost: 22, date: '04-02-2017', status: 'Pending', refNumber: '123dASD34', bookingEmail: 'some@example.com'},
		 		{ destination: 'Mykonos, Greece', total_cost: 52, date: '03-01-2017', status: 'Expired', refNumber: '1234DASD2', bookingEmail: 'some@example.com'},
				{ destination: 'Zakynthos, Greece', total_cost: 122, date: '03-03-2017', status: 'Accepted', refNumber: '4dsa34D34', bookingEmail: 'some@example.com'}
			];
		//should return promise from server service instead
		return this.bookings;
	}

	addNewBooking(email: string, reference: string){
		// this._popupToastService.notAvailable('bottom');
		// TODO this should add new booking
		// to the bookings list.
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		headers.append('Access-Control-Allow-Origin:', '*');
		headers.append('crossDomain', 'true'); 
		let params = new URLSearchParams();
		params.set('action', 'manageBooking');
		params.set('crossDomain', 'true');
		params.set('reference', reference);
		params.set('email', email);

		return this._http.post(this.api, params, headers ).map( res => res.json());
	}

	findHotels(booking, LatLng, dist){
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		headers.append('Access-Control-Allow-Origin:', '*');
		headers.append('crossDomain', 'true'); 
		let params = new URLSearchParams();
		params.set('crossDomain', 'true');
		params.set('action', 'findHotels');
		params.set('center_lat', LatLng.lat);
		params.set('center_lng', LatLng.lng);
		params.set('range', dist);
		params.set('wifi', booking.wifi);
		params.set('pool', booking.pool);
		params.set('stars', booking.stars.indexOf(true) + 1);
		// params.set('data.action', 'findHotels');

		return this._http.post(this.api, params, headers ).map( res => res.json());
	}
}
