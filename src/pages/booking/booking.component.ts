import { Component, OnInit } from '@angular/core';
// import { CountdownComponent } from '../../app/shared/countdown/countdown.component';

import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'booking-view',
	templateUrl: 'booking.component.html'
})
export class BookingComponent implements OnInit{

	booking = { expiration: '', status: '', email: '', ref: ''};
	isConfirm: boolean = true;
	evaluate: boolean;

	constructor(
			public _navCtrl: NavController, 
			public _navParams: NavParams) {
	}

	ngOnInit(){
		this.isConfirm = this._navParams.get('isNew');
		this.booking = this._navParams.get('booking') ? this._navParams.get('booking') : {};
		this.booking.email = this._navParams.get('email') ? this._navParams.get('email') : '';
		this.booking.ref = this._navParams.get('reference') ? this._navParams.get('reference') : '';
		this.booking.expiration = '02-03-2017 15:55';
		if(this.booking.status == null || parseInt(this.booking.status) != 0)
			this.evaluate = false;
		console.log('booking-view loaded');
	}

	back(){
		this._navCtrl.pop();
	}

}