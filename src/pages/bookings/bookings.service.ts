import { Injectable } from '@angular/core';

// import { ServerService } from './app/shared/server/server.service';


@Injectable()
export class BookingsService {

	getBookings(){
		//should return promise from server service instead
		return [{ id: 'Paros, Greece', price: 22, date: '20170212'},
		 		{ id: 'Mykonos, Greece', price: 52, date: '20170312'},
				{ id: 'Zakynthos, Greece', price: 122, date: '16052017'}
			];
	}
}
