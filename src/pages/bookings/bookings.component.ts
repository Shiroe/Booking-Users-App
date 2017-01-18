import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import { BookingsService } from './bookings.service';
import { LiveChatService } from '../../app/shared/livechat/livechat.service';
// import { BookingRowComponent } from './bookingrow.component';

@Component({
	selector: 'bookings-view',
	templateUrl: 'bookings.component.html'
})
export class BookingsComponent implements OnInit{

	bookings;

	constructor(
			public _navCtrl: NavController, 
			private _bookingsService: BookingsService, 
			private _toastCtrl: ToastController, 
			private _liveChatService: LiveChatService) {
		console.log('view loaded');
	}

	ngOnInit(){
		this.bookings = this._bookingsService.getBookings();
		// this._bookingsService.getBookings()
		// 					 .subscribe(bookings => this.bookings = bookings);
	}

	openModal(){
		console.log('live chat bubble pressed');
		this._liveChatService.openLiveChat();
	}

	addNewBooking(){
		this.presentToast('This feature is not yet available', 'bottom');
		//this.bookingsService.addNewBooking('a12312xdfas', 'asda@sa.cs');
	}

	// START OF TEMP
	// TODO DELETE THIS WHEN HAVE FUNCTIONALITY OR MOVE IT TO A SEPARATE SERVICE/Component
	presentToast(text, pos) {
		let toast = this._toastCtrl.create({
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
