import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BookingsService } from './bookings.service';

@Component({
	selector: 'bookings-view',
	templateUrl: 'bookings.component.html'
})
export class BookingsComponent implements OnInit{

	bookings;

	constructor(
			public _navCtrl: NavController, 
			private _bookingsService: BookingsService) {
	}

	ngOnInit(){
		console.log('bookings-view loaded');
		this.bookings = this._bookingsService.getBookings();
		// this._bookingsService.getBookings()
		// 					 .subscribe(bookings => this.bookings = bookings);
	}

	addNewBooking(){
		this._bookingsService.addNewBooking('a12312xdfas', 'asda@sa.cs');
	}
}
