import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { BookingsService } from './bookings.service';
import { BookingComponent } from '../booking/booking.component';
import { SpinnerComponent } from '../../app/shared/spinner/spinner.component';
import { PopupToastService } from '../../app/shared/popupToast/popupToast.service';

@Component({
    selector: 'add-booking',
    template: `
        <ion-header>
            <ion-navbar>
                <ion-buttons start>
                    <button ion-button (click)="dismiss()">
                        <span class="button-inner">Close</span>
                    </button>
                </ion-buttons>
                <ion-title class="title" text-center>
                    <div class="toolbar-title">Add Booking</div>
                </ion-title>
            </ion-navbar>
        </ion-header>
        <ab-spinner [isVisible]="show" [text]="showText"></ab-spinner>
        <ion-content padding style="background-color: #fff;">
            <div text-center style="margin-top: 15vh; margin-bottom: 50px;">
                <h3 style="font-size: 26px; line-height: 30px; color: #f33617; margin-bottom: 0px; font-weight: bold;">YOUR EMAIL</h3>
                <ion-input style="border-bottom: 2px solid #f33617; margin-bottom: 30px;" type="email" [(ngModel)]="email"></ion-input>
            </div>
            <div text-center style="margin-top: 30px; margin-bottom: 30px;">
                <h3 style="font-size: 26px; line-height: 30px; color: #f33617; margin-bottom: 0px; font-weight: bold;">YOUR REFERENCE #</h3>
                <ion-input style="border-bottom: 2px solid #f33617; margin-bottom: 30px;" type="email" [(ngModel)]="reference"></ion-input>
            </div>
            <div class="bottomSectionBtn" text-center>
                <button style="font-weight: bold;" ion-button class="button-block" large color="default"  (click)="add(email, reference)">SHOW MY BOOKING</button>
            </div>
        </ion-content>
    `,
    providers: [SpinnerComponent, PopupToastService]
})
export class BookingModalComponent implements OnInit, OnDestroy{

    email: string = 'test@test.com';
    reference: string = 'ref9713cb';
    newBooking;
    show = false;
    showText = ' ';

    constructor(
        private _navParams: NavParams, 
        private _navCtrl:   NavController,
        private _bookingsService: BookingsService, 
        private _viewCtrl: ViewController,
        private _popupToastService: PopupToastService) {
        //    console.log('UserId', _navParams.get('userId'));
    }

    add(email: string, ref: string){
        if(email != '' && ref != ''){
            this.show = true;
            this.newBooking = this._bookingsService.addNewBooking(email, ref)
                .then( booking => {
                    this.responseHandler(booking);
                }, error => {
                    console.log('error:', error);
                    this.showText = 'Could not establish connection with the server.  Please try again';
                    setTimeout( () => {
                        this.show = false;
                        this.showText = ' ';
                    }, 5000);
                });
        }else{
            this._popupToastService.alert('You must provide both fields.', 'top', 2500);
        }
    }

    responseHandler(resp){
         resp.email = this.email;
         resp.ref = this.reference;
         console.log('response:', resp);
         this._navCtrl.push( BookingComponent, {booking: resp});
         this.dismiss(resp);
    }

    ngOnInit(){
        console.log('modal loaded!');        
    }

    dismiss(data?){
        this._viewCtrl.dismiss(data);
    }

    ngOnDestroy(){
        // if(this.newBooking)
        //         this.newBooking.unsubscribe();
    }

}