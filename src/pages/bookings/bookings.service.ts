import { Injectable } from '@angular/core';
import { ServerService } from '../../app/shared/server/server.service';
import { SecureStorageService } from '../../app/shared/secureStorage/secureStorage.service';

@Injectable()
export class BookingsService{

	constructor(
		private _serverService: ServerService,
		private _secureStorage: SecureStorageService
	){

	}

	remove(b){
		this._secureStorage.removeBooking(b);
	}

	save(b){
		this._secureStorage.saveBookings(b);
	}

	getBookings(){
		this._secureStorage.getBookings().then( b => { return b; }); //this._serverService.getBookings();
	}

	addNewBooking( userEmail: string, bookingRef: string){
		return this._serverService.addNewBooking(userEmail, bookingRef).toPromise();

		//This should handle the booking ref and user mail 
		// as object to the ServerService .addNew()
	}

	cancel(b){
		console.log('bService');
		return this._serverService.cancelBooking(b); //.then( b => { return b; });
	}

	recharge(b){
		console.log('bService');		
		return this._serverService.retryPayment(b); //then( b => { return b; });
	}

	findHotels(booking, LatLng, dist){
		return this._serverService.findHotels(booking, LatLng, dist).toPromise();
	}
}
