import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BookingsComponent } from '../bookings/bookings.component';
import { BookingStepOne } from '../bookingRequest/bookingStep-One.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  request(){
	  console.log('request pressed');
    this.navCtrl.push(BookingStepOne, {});
  }

  bookings(){
	  console.log('bookings pressed');
	  this.navCtrl.push(BookingsComponent, {});
  }

}
