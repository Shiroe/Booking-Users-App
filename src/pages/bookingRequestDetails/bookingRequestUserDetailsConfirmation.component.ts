import { Component, OnInit, ViewChild } from '@angular/core'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { NavController, NavParams, Content } from 'ionic-angular';

import { BookingComponent } from '../booking/booking.component';
import { SpinnerComponent } from '../../app/shared/spinner/spinner.component';
import { BookingRequest, PaymentDetails, UserDetails } from '../bookingRequest/bookingRequest';
import { ServerService } from '../../app/shared/server/server.service';
import { CustomFormValidators } from '../../app/shared/CustomValidators/CustomValidators';

@Component({
    selector: 'bookingRequest-confirm',
    templateUrl: './bookingRequestUserDetailsConfirmation.component.html',
    providers: [SpinnerComponent]
})
export class bookingRequestUserDetailsConfirmationComponent implements OnInit{

    bookingRequest: BookingRequest;
    card_data = { number: null, ccv: null, expiration: ''};
    show: boolean = false;
    showText: string = 'Please wait...';
    private details : FormGroup;
    @ViewChild(Content)
    content: Content;

    constructor(
            private _navCtrl: NavController, 
            private _navParams: NavParams,
            private _serverService: ServerService,
            private formBuilder: FormBuilder ){
                this.details = this.formBuilder.group({
                    email       : ['', Validators.compose([Validators.required, CustomFormValidators.invalidEmail])],
                    name        : ['', Validators.compose([Validators.required, CustomFormValidators.mustContainSpace])],
                    phone       : ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                    card_number : ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(19), CustomFormValidators.invalidCardNumber])],
                    card_exp    : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5), CustomFormValidators.invalidCardExpiration])],
                    card_ccv    : ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])]
                });
    }

    ngOnInit(){
        this.bookingRequest = this._navParams.get('bookingRequest');
        this.bookingRequest.user_details = new UserDetails;
        this.bookingRequest.user_details.card_data = new PaymentDetails;
        console.log('checking:', this.bookingRequest.check_in_date);
        
    }

    next(){
        console.log('Form value:', this.details);
        console.log('Form errors:', this.details.errors);
        console.log('Form Object:', this.details.controls);
        this.show = true;
        // setTimeout( () => { this.show = false }, 7000);
        this.bookingRequest.user_details.email = this.details.value.email;
        this.bookingRequest.user_details.first_name = this.details.value.name;
        this.bookingRequest.user_details.telephone = this.details.value.phone;
        this.bookingRequest.user_details.card_data.name = this.details.value.name;
        this.bookingRequest.user_details.card_data.ccv = this.details.value.card_ccv;
        this.bookingRequest.user_details.card_data.number = this.details.value.card_number;
        this.bookingRequest.user_details.card_data.month = this.details.value.card_exp.substr(0,2);
        this.bookingRequest.user_details.card_data.year = '20' + this.details.value.card_exp.substr(3,2);
        let cin = this.bookingRequest.check_in_date.split('/');
        let cout = this.bookingRequest.check_out_date.split('/');
        this.bookingRequest.check_in_date = cin.reverse().join('').toString();
        this.bookingRequest.check_out_date = cout.reverse().join('').toString();

        console.log('final request', this.bookingRequest);
        this._serverService.proccessBooking(this.bookingRequest, true)
            .then( resp => {
                console.log('RESPONSE', resp);
                if(!resp){
                    this.showText = 'Oops, something went wrong!'
                    setTimeout( ()=> {
                        this.show = false;
                        this.showText = 'Please wait...';
                    }, 2000);
                }else{
                    this.saveNredirect(this.bookingRequest.user_details.email, resp.ref);
                }                
            }, error => {
                this.showText = 'Oops, something went wrong!'
                setTimeout( ()=> {
                    this.show = false;
                    this.showText = 'Please wait...';
                }, 2000);
                // TOAST!!
                console.log('error!:', error);                
            });
    }

    saveNredirect(email, ref){
        this._serverService.addNewBooking(email, ref)
            .subscribe( resp => {
                resp.email = email;
                resp.ref = ref;
                this.showText = 'Great, Your booking was submitted!'
                setTimeout( ()=> {
                    this.show = false;
                    this._navCtrl.push(BookingComponent, { booking: resp, isNew: true });
                }, 2000);
            }, error => {
                // TOAST!!
                this.showText = 'Oops, something went wrong!'
                setTimeout( ()=> {
                    this.show = false;
                    this.showText = 'Please wait...';
                }, 2000);
                console.log('error!:', error);  
            });
    }

    back(){
        this._navCtrl.pop();
    }

}

