import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { BookingsService } from './bookings.service';
// import { BookingRowComponent } from './bookingrow.component';

@Component({
	selector: 'bookings-view',
	templateUrl: 'bookings.html'
})
export class BookingsComponent {

	bookings;

	constructor(public navCtrl: NavController, private bookingsService: BookingsService, private toastCtrl: ToastController) {
		console.log('view loaded');
		this.bookings = bookingsService.getBookings();
	}

	openModal(){
		console.log('live chat bubble pressed');
		this.presentToast('This feature is not yet available', 'top');
	}

	addNewBooking(){
		this.presentToast('This feature is not yet available', 'bottom');
		//this.bookingsService.addNewBooking('a12312xdfas', 'asda@sa.cs');
	}


	// START OF TEMP
	// TODO DELETE THIS WHEN HAVE FUNCTIONALITY OR MOVE IT TO A SEPARATE SERVICE/Component
	presentToast(text, pos) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: pos
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
	//END OF TEMP
}
