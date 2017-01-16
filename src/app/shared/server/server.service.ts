import { Injectable } from '@angular/core';


@Injectable()
export class ServerService {

	getBookings(){
		//should return promise from server service instead
		return [{ id: 'Paros, Greece', price: 22, date: '20170212', status: 'Pending'},
		 		{ id: 'Mykonos, Greece', price: 52, date: '20170312', status: 'Expired'},
				{ id: 'Zakynthos, Greece', price: 122, date: '16052017', status: 'Accepted'}
			];
	}

	addNewBooking(/* bookingRef: string, userMail: string */){
		// TODO this should add new booking
		// to the bookings list.
	}
}
