import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
	selector: 'booking-view',
	templateUrl: 'booking.component.html'
})
export class BookingComponent implements OnInit{

	bookings;
	isConfirm: Boolean = true;

	constructor(
			public _navCtrl: NavController) {
	}

	ngOnInit(){
		console.log('booking-view loaded');
	}

}