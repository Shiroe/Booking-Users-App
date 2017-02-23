import { Component, OnInit } from '@angular/core';
// import { CountdownComponent } from '../../app/shared/countdown/countdown.component';

import { NavController, NavParams } from 'ionic-angular';
import { BookingsService } 			from '../bookings/bookings.service';
import { SecureStorageService } 	from '../../app/shared/secureStorage/secureStorage.service';
import { PopupToastService }		from '../../app/shared/popupToast/popupToast.service';
import { SpinnerComponent } from '../../app/shared/spinner/spinner.component';

@Component({
	selector: 'booking-view',
	templateUrl: 'booking.component.html',
	providers: [SecureStorageService, SpinnerComponent]
})
export class BookingComponent implements OnInit{

	booking = { expiration: '', status: '', email: '', ref: '', stars: '', double_rooms: '', city: '', country: '', price: '', checkin: ''};
	isConfirm: boolean = true;
	evaluate: boolean = true;
	star;
	stars: any = [];
    show: boolean = false;
    showText: string = ' ';

	constructor(
			private _navCtrl: NavController, 
			private _navParams: NavParams,
			private _bookingsService: BookingsService,
			private _secureStorage: SecureStorageService,
			private _popupToastService: PopupToastService) {
	}

	ngOnInit(){
		this.isConfirm = this._navParams.get('isNew');
		this.booking = this._navParams.get('booking') ? this._navParams.get('booking') : {};
		this.star = parseInt(this.booking.stars);
		this.star++;

        for(let _i: number = 0; _i < this.star; _i++ )
                this.stars.push(true);
		if (this.isConfirm){
			let b = { 
				destination: this.booking.city + ',' + (this.booking.country ? this.booking.country : ''),
				total_cost: this.booking.price,
				date: this.booking.checkin, 
				status: this.booking.status,
				refNumber: this.booking.ref,
				bookingEmail: this.booking.email
			};

			let bookings;// = [{}];
			this._secureStorage.getBookings().then( bs => {
				console.log('storage response:', b);				
				bookings = bs; 

				if(bookings && bookings.length > 0){
					bookings.push(b);
					console.log('There are bookings', bookings);				
				}else{
					bookings = [b];
					console.log('There are no bookings', bookings);
				}
				
				this._bookingsService.save(bookings);
			});
			
		}

		// this.booking.expiration = '02-20-2017 15:55';

		if(this.booking.status == null || parseInt(this.booking.status) != 0){
			this.evaluate = false;
		}else{
			this.evaluate = true;
		}
		console.log('booking-view loaded');
	}

	cancel(b){
		this.show = true;
		this._bookingsService.cancel(b)
			.then( r => {
				console.log('cancel response:', r);
				if (r != 'cancelled'){
					this.show = false;
					this._popupToastService.alert('Could not cancel your booking. Please try again later', 'top', 2500);
				}else{
					this.show = false;
					this._popupToastService.alert('Your booking was cancelled!', 'top', 2500);
				}				
			}, error => {
				this.show = false;
				this._popupToastService.alert('Could not connect with the server. Please try again later', 'top', 2500);
			});
	}

	recharge(b){
		this.show = true;
		this._bookingsService.recharge(b)
			.then( r => {
				console.log('recharge response:', r);
				if (r.status != 'success'){
					this.show = false;
					this._popupToastService.alert('Could not recharge your booking.  check your card and try again later', 'top', 2500);	
				}else{
					this.show = false;
					this._popupToastService.alert('Your booking was recharged successfully!', 'top', 2500);
				}			
			}, error => {
				this.show = false;
				this._popupToastService.alert('Could not connect with the server. Please try again later', 'top', 2500);
			});
	}

	onExpiration(ev){
		console.log('EV:', ev)
		//PUT TIMEOUT AND TOAST TO INFORM
		this._popupToastService.alert('Your booking request has just expired', 'middle', 3000);
		if(ev.expired)
			setTimeout( () => { this._navCtrl.pop(); }, 3500);
	}

	back(){
		this._navCtrl.pop();
	}

}