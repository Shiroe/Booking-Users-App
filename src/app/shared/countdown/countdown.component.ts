import {Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'ab-countdown',
    templateUrl: './countdown.component.html' 
})
export class CountdownComponent implements OnInit, OnDestroy {

  private future:Date;
  private futureString:string;
  private diff:any;
  private interv:any = {};
  @Input() expiration;
  @Input() evaluate;
  @Output() onExpire: EventEmitter<any> = new EventEmitter();;

  message = {};

    constructor(private _navCtrl: NavController) {
        this.onExpire = new EventEmitter();
    }

  dhms(t){
     var days, hours, minutes, seconds;
    //  this.diff -= 1000;
     console.log('diff!', this.diff);     
     days = Math.floor(t / 86400);
     t -= days * 86400;
     hours = Math.floor(t / 3600) % 24;
     t -= hours * 3600;
     minutes = Math.floor(t / 60) % 60;
     t -= minutes * 60;
     seconds = t % 60;
     this.expiration -= 1;
     if(this.expiration < 1){
        // this.onExpire = new EventEmitter();
        this.onExpire.emit({ expired: true });
        this.evaluate = false;
     }
    //  this.expiration -= 60;

     return {
             days: days,
             hours: hours,
             minutes: minutes,
             seconds: seconds
     };                              
  }

  ngOnInit() {

    console.log('exp:', this.expiration,'date', moment(this.expiration), ' str:', this.futureString);
    this.futureString = this.expiration; //elm.nativeElement.getAttribute('expiration'); 
    this.future = new Date(this.futureString);
    // console.log('future:', this.future);
    // this.expiration = 0;
    // this.evaluate = true;
    if(this.expiration >= 0){
      this.interv = Observable.interval(1000).map((x) => {
          this.diff = this.expiration; //Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        }).subscribe((x) => { 
          if(this.diff < 0 || !this.evaluate){
            console.log('EXPIRED');
            this.diff = 0;
            //this._navCtrl.pop();
          }
          this.message = this.dhms(this.diff);
          console.log('Does evaluate', this.evaluate, this.diff, this.message);
        });
    }else{
      if(this.interv.unsubscribe){
        this.interv.unsubscribe();
      }
    }

  }

  ngOnDestroy(){
     if(this.interv.unsubscribe){
        this.interv.unsubscribe();
      }
  }
}