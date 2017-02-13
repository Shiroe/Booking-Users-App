import { Injectable } from '@angular/core';
import { ServerService } from '../../app/shared/server/server.service';

@Injectable()
export class BookingsService{

	constructor(private _serverService: ServerService){

	}

	getBookings(){
		return this._serverService.getBookings();
	}

	addNewBooking( userEmail: string, bookingRef: string){
		return this._serverService.addNewBooking(userEmail, bookingRef);

		//This should handle the booking ref and user mail 
		// as object to the ServerService .addNew()
	}

	findHotels(booking, LatLng, dist){
		return this._serverService.findHotels(booking, LatLng, dist);
	}
}
