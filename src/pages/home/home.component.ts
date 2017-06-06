import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BookingsComponent } from '../bookings/bookings.component';
import { BookingStepOne } from '../bookingRequest/bookingStep-One.component';
import { SpinnerComponent } from '../../app/shared/spinner/spinner.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  providers: [SpinnerComponent]
})
export class HomePage {



  show: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  request(){
	  console.log('request pressed');
    // this.show = true;
    this.navCtrl.push(BookingStepOne, {});
  }

  bookings(){
	  console.log('bookings pressed');
	  this.navCtrl.push(BookingsComponent, {});
  }

}
