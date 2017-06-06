import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } 	  from '@angular/http';
import 'rxjs/add/operator/map';

import { BookingRequest } from '../../../pages/bookingRequest/bookingRequest';

// import { Booking } 	  		 from '../../../pages/bookings/bookings'
import { PopupToastService } from '../popupToast/popupToast.service';

@Injectable()
export class ServerService {

	//TO DELETE THIS AND TOAST
	private api: string = 'https://mytravelusive.com/wp-admin/admin-ajax.php';
	// private api: string = '/api';
	private headers = new Headers();

	constructor(
		private _popupToastService: PopupToastService,
		private _http: Http){
		this.headers.append('Content-Type', 'application/json; charset=UTF-8');
		// this.headers.append('Access-Control-Allow-Origin:', '*');
		this.headers.append('crossDomain', 'true');
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
		let params = new URLSearchParams();
		params.set('action', 'manageBooking');
		params.set('crossDomain', 'true');
		params.set('reference', reference);
		params.set('email', email);

		return this._http.post(this.api, params, this.headers ).map( res => res.json());
	}

	findHotels(booking, LatLng, dist){
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

		return this._http.post(this.api, params, this.headers ).map( res => res.json());
	}

	proccessBooking(booking: BookingRequest, submit: boolean){
		let params = new URLSearchParams();

		let data = {
			'action'			: 'processBooking',
			'submit-request'	: submit,
			'first_name'		: booking.user_details.first_name,
			'last_name' 		: booking.user_details.first_name,
			'telephone' 		: booking.user_details.telephone,
			'email' 			: booking.user_details.email,
			'card_data'			: booking.user_details.card_data,
			'price'				: booking.total_cost,
			'nights'			: booking.nights,
			'roomNightPrice'	: booking.price,
			'single_room'		: 0, //booking.single_room,
			'double_room'		: booking.double_room,
			'triple_room'		: 0, //booking.triple_room,
			'pool'				: booking.pool,
			'stars'				: booking.stars.indexOf(true).toString(),
			'wifi'				: booking.wifi,
			'check_in_date'		: booking.checkin,
			'check_out_date'	: booking.checkout,
			'persons'			: booking.guests,
			'range'				: booking.distance,
			'center_lat'		: booking.center_lat,
			'center_lng'		: booking.center_lng,
			'address'			: booking.location,
			'breakfast'			: '0'
		};
		let options = new RequestOptions({
			headers: this.headers
		});

		return this._http.post(this.api + '?action=processBooking', data, options).map( res => res.json()).toPromise(); //.subscribe( r => console.log('CCC:', r ));
	}

	cancelBooking(booking){
		let params = new URLSearchParams();
		params.set('crossDomain', 'true');
		params.set('action', 'cancelBooking');
		params.set('id', booking.id);
		params.set('hash', booking.hash);

		return this._http.post(this.api, params, this.headers ).map( res => res.json()).toPromise(); //.subscribe( r => console.log('CCC:', r ));
	}

	retryPayment(booking){
		let params = new URLSearchParams();
		params.set('crossDomain', 'true');
		params.set('action', 'retryPaymentOnBooking');
		params.set('id', booking.id);
		params.set('hash', booking.hash);
		params.set('origin', 'mobileapp');

		return this._http.post(this.api, params, this.headers ).map( res => res.json()).toPromise(); //.subscribe( r => console.log('RRR:', r ));
	}
}
