import { Injectable } from '@angular/core';
// import { ServerService } from '../../app/shared/server/server.service';
import { PopupToastService } from '../../app/shared/popupToast/popupToast.service';
import { BookingRequest } from './bookingRequest';

@Injectable()
export class BookingRequestService{

	constructor(
        private _popupToastService: PopupToastService){

	}


    validateStepOne(booking: BookingRequest){
        if(booking.price > 0 && (booking.country != null && booking.country != '') && (booking.location != null && booking.location != ''))
                return true;

        this._popupToastService.alert('You have not filled all the required fields', 'top');
        return false;
    }

    validateStepTwo(booking: BookingRequest){
        if(booking.guests != null && booking.guests > 0 && booking.checkin != null && booking.checkin != '' && booking.checkout != null && booking.checkout != '')
                return true;

        this._popupToastService.alert('You have not filled all the required fields', 'top');
        return false;
    }

    validateStepThree(booking: BookingRequest, hotesFound){
        // let stars = false;
        // for(let i=0; i< booking.stars; i++)
        //         if(booking.stars[i]){ stars = true; return; }

        if(hotesFound > 0 && booking.distance > 0 && booking.wifi != null && booking.pool != null && (booking.stars.lastIndexOf(true) != -1))
                return true;

        if(hotesFound == 0){
            this._popupToastService.alert('There were no hotels found! Try changing some of your requirements for better chances','middle', 4500);
            return false;
        }

        this._popupToastService.alert('You have not filled all the required fields', 'top');
        return false;
    }
}