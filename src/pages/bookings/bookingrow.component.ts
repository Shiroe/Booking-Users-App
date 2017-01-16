import {Component} from '@angular/core';

// import { BookingsComponent } from './bookings.component';

@Component({
    selector: 'booking-row',
    template:  `
        <ion-card *ngFor="let b of bookings" padding>
			<ion-row>
				<div class="card-title" text-left>{{ b.id }}</div>
				<div class="card-subtitle" text-right><span class="{{b.status}}">{{ b.status }}</span></div>
			</ion-row>
			<ion-row>
				<div width-50 class="card-subtitle" text-left><ion-icon name="calendar"></ion-icon> {{ b.date | date }}</div>
				<div offset-25 class="card-subtitle" text-right>{{ b.price }}<ion-icon name="logo-euro"></ion-icon></div>
			</ion-row>
		</ion-card>
        `
})
export class BookingRowComponent{

    // console.log('booking row Component called!');
}