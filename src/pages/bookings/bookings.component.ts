import { Component, OnInit } from '@angular/core';

import { ModalController,NavController } from 'ionic-angular';
import { reorderArray } from 'ionic-angular';

import { BookingComponent } from '../booking/booking.component';
import { SpinnerComponent } from '../../app/shared/spinner/spinner.component';
import { BookingsService } from './bookings.service';
import { BookingModalComponent} from './bookingModal.component';

import { SecureStorageService } from '../../app/shared/secureStorage/secureStorage.service';

@Component({
	selector: 'bookings-view',
	templateUrl: 'bookings.component.html',
	providers: [SecureStorageService, SpinnerComponent]
})
export class BookingsComponent implements OnInit{

	bookings = [{}];
    show: boolean = false;
    showText: string = ' ';

	constructor(
			public _navCtrl: NavController, 
			private _bookingsService: BookingsService, 
			private _modalCtrl: ModalController,
			private _secureStorage: SecureStorageService) {
	}

	ngOnInit(){
		// this.bookings = this._bookingsService.getBookings();

		this._secureStorage.getBookings().then( b => {
			 this.bookings = b; 
			//  if(this.bookings && this.bookings.length < 1){ this.bookings = []; }
		});
		console.log('bookings-view loaded', this.bookings);
	}

	reorderItems(ev){
		this.bookings = reorderArray(this.bookings, ev);
		this._bookingsService.save(this.bookings);
	}

	remove(b){
		this._bookingsService.remove(b);
		this._secureStorage.getBookings().then( b => { this.bookings = b; });
	}

	addNewBooking(){
		let bookingModal = this._modalCtrl.create(BookingModalComponent,{}, {showBackdrop: true, });
		bookingModal.onDidDismiss(data => {
			console.log('Booking Dismissed!',data);
			if (data){
				let b = { destination: data.city + ',' + data.country.toUpperCase(), total_cost: data.price, date: data.checkin, status: data.status, refNumber: data.ref, bookingEmail: data.email};
				if(this.bookings && this.bookings.length > 0){
					this.bookings.push(b);
				}else{
					this.bookings = [b];
				}
				this._bookingsService.save(this.bookings);
			}
		});
		bookingModal.present();
	}

	viewBooking(b){
		this.show = true;
		this._bookingsService.addNewBooking(b.bookingEmail, b.refNumber)
			.then( booking => {
				this.responseHandler(booking, b);
		}, error => {
			console.log('error:', error);
			this.showText = 'Could not establish connection with the server.  Please try again';
			setTimeout( () => {
				this.show = false;
				this.showText = ' ';
			}, 4000);
		});
	}

    responseHandler(resp, b){
         console.log('response:', resp);
		 resp.email = b.bookingEmail;
		 resp.ref = b.refNumber;
		 this.show = false;
         this._navCtrl.push( BookingComponent, {booking: resp, isNew: false});
    }
}
