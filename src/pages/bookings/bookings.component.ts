import { Component, OnInit } from '@angular/core';

import { ModalController,NavController } from 'ionic-angular';

import { BookingComponent } from '../booking/booking.component';
import { BookingsService } from './bookings.service';
import { BookingModalComponent} from './bookingModal.component';

@Component({
	selector: 'bookings-view',
	templateUrl: 'bookings.component.html'
})
export class BookingsComponent implements OnInit{

	bookings;

	constructor(
			public _navCtrl: NavController, 
			private _bookingsService: BookingsService, 
			private _modalCtrl: ModalController) {
	}

	ngOnInit(){
		console.log('bookings-view loaded');
		this.bookings = this._bookingsService.getBookings();
		// this._bookingsService.getBookings()
		// 					 .subscribe(bookings => this.bookings = bookings);
	}


	addNewBooking(){
		let bookingModal = this._modalCtrl.create(BookingModalComponent,{}, {showBackdrop: true, });
		bookingModal.onDidDismiss(data => {
			console.log(data);
		});
		bookingModal.present();
		// this._bookingsService.addNewBooking('test@test.com', 'ref9713cb').subscribe( booking => console.log('booking: ', booking));
	}

	viewBooking(){
		this._navCtrl.push(BookingComponent, { isNew: false});
	}
}
