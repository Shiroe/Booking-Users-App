import { Injectable } from '@angular/core';
import { ServerService } from '../../app/shared/server/server.service';

@Injectable()
export class BookingsService{

	constructor(private serverService: ServerService){

	}

	getBookings(){
		return this.serverService.getBookings();
	}

	addNewBooking( bookingRef: string,  userEmail: string){

		//This should handle the booking ref and user mail 
		// as object to the ServerService .addNew()
	}
}
