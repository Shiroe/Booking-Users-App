import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LiveChatService } from '../../app/shared/livechat/livechat.service';


@Component({
    selector: 'bookingStep-One',
    templateUrl: './bookingRequest.component.html'
})
export class BookingRequestComponent implements OnInit{

    bookingRequest;

    constructor(
            private _navCtrl: NavController, 
            private _liveChatService: LiveChatService){

    }

    ngOnInit(){
        console.log('BookingsRequestWizard started');        
        this.bookingRequest = {};
    }

    openModal(){
		console.log('live chat bubble pressed');
		this._liveChatService.openLiveChat();
	}

    next(){
        console.log('next step');
        
        // this._navCtrl.push(nextStepComponent, {bookingRequest: this.bookingRequest});
    }
}