import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BookingsComponent } from '../bookings/bookings.component';
import { BookingRequestComponent } from '../bookingRequest/bookingRequest.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  request(){
	  console.log('request pressed');
    this.navCtrl.push(BookingRequestComponent, {});
  }

  bookings(){
	  console.log('bookings pressed');
	  this.navCtrl.push(BookingsComponent, {});
  }

}
