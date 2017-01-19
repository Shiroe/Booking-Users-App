import { Injectable } from '@angular/core';
import { ServerService } from '../../app/shared/server/server.service';

@Injectable()
export class BookingsService{

	constructor(private _serverService: ServerService){

	}

	getBookings(){
		return this._serverService.getBookings();
	}

	addNewBooking( bookingRef: string,  userEmail: string){
		this._serverService.addNewBooking();

		//This should handle the booking ref and user mail 
		// as object to the ServerService .addNew()
	}
}
