import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { Booking } 	  from '../../../pages/bookings/bookings'
import { PopupToastService } from '../popupToast/popupToast.service';

@Injectable()
export class ServerService {

	//TO DELETE THIS AND TOAST
	constructor( 
		private _popupToastService: PopupToastService){

    }

	getBookings(){
		//should return promise from server service instead
		return [{ destination: 'Paros, Greece', total_cost: 22, date: '20170212', status: 'Pending', refNumber: '123dASD34', bookingEmail: 'some@example.com'},
		 		{ destination: 'Mykonos, Greece', total_cost: 52, date: '20170312', status: 'Expired', refNumber: '1234DASD2', bookingEmail: 'some@example.com'},
				{ destination: 'Zakynthos, Greece', total_cost: 122, date: '16052017', status: 'Accepted', refNumber: '4dsa34D34', bookingEmail: 'some@example.com'}
			];
	}

	addNewBooking(booking?: Booking){
		this._popupToastService.notAvailable('bottom');
		// TODO this should add new booking
		// to the bookings list.
	}
}
