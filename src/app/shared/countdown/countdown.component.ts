import {Component, OnInit, OnDestroy, Input, } from '@angular/core';
import { NavController } from 'ionic-angular';
// import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'ab-countdown',
    templateUrl: './countdown.component.html' 
})
export class CountdownComponent implements OnInit, OnDestroy {

  private future:Date;
  private futureString:string;
  private diff:any;
  private interv:any;
  @Input() expiration;
  @Input() evaluate;

  message = {};

    constructor(private _navCtrl: NavController) {
        
    }

  dhms(t){
     var days, hours, minutes, seconds;
     days = Math.floor(t / 86400);
     t -= days * 86400;
     hours = Math.floor(t / 3600) % 24;
     t -= hours * 3600;
     minutes = Math.floor(t / 60) % 60;
     t -= minutes * 60;
     seconds = t % 60;

     return {
             days: days,
             hours: hours,
             minutes: minutes,
             seconds: seconds
     };                              
  }

  ngOnInit() {

    console.log('exp:', this.expiration,'date', new Date(this.expiration), ' str:', this.futureString);
    this.futureString = this.expiration; //elm.nativeElement.getAttribute('expiration'); 
    this.future = new Date(this.futureString);
    console.log('future:', this.future);

    this.interv = Observable.interval(1000).map((x) => {
      this.diff = this.expiration; //Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => { 
      if(this.diff < 0 || !this.evaluate){
        console.log('EXPIRED');
        this.diff = 0;
        //this._navCtrl.pop();
      }
      this.message = this.dhms(this.diff);
    });
  }

  ngOnDestroy(){
    this.interv.unsubscribe();
  }
}