import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BookingsComponent } from '../bookings/bookings.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  request(){
	  console.log('request pressed');
  }

  bookings(){
	  console.log('bookings pressed');
	  this.navCtrl.push(BookingsComponent, {});
  }

}
