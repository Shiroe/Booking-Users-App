import { NgModule, ErrorHandler }                   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule }         from "@angular/forms";
import { HttpModule  }                           from '@angular/http';

import { MyApp } from './app.component';

import { HomePage }         from '../pages/home/home.component';
import { ServerService }    from './shared/server/server.service';
import { LiveChatService }  from './shared/livechat/livechat.service';

import { BookingsService }      from '../pages/bookings/bookings.service';
import { BookingsComponent }    from '../pages/bookings/bookings.component';
import { BookingRowComponent }  from '../pages/bookings/bookingrow.component';
import { BookingComponent }     from '../pages/booking/booking.component';

import { BookingStepOne }   from '../pages/bookingRequest/bookingStep-One.component';
import { BookingStepTwo }   from '../pages/bookingRequest/bookingStep-Two.component';
import { BookingStepThree } from '../pages/bookingRequest/bookingStep-Three.component';

import { bookingRequestUserDetailsComponent }             from '../pages/bookingRequestDetails/bookingRequestUserDetails.component';
import { bookingRequestUserDetailsConfirmationComponent } from '../pages/bookingRequestDetails/bookingRequestUserDetailsConfirmation.component';
import { BookingRequestService }                          from '../pages/bookingRequest/bookingRequest.service';
import { DateRangePickerService }                         from './shared/dateRangePicker/dateRangePicker.service';
import { BookingModalComponent }                          from '../pages/bookings/bookingModal.component';

import { AgmCoreModule, GoogleMapsAPIWrapper }    from 'angular2-google-maps/core';
import { DateRangePickerComponent }               from './shared/dateRangePicker/dateRangePicker.component'
import { LiveChatBubbleComponent }                from './shared/livechat/livechat.component';
import { HomeButtonComponent }                    from './shared/home-button/homebutton.component';
import { PopupToastService }                      from './shared/popupToast/popupToast.service';
import { GoogleMapsService }                      from './shared/googleMaps/google-maps.service';
import { CountdownComponent }                     from './shared/countdown/countdown.component';
import { sebmGoogleMapComponent }                 from './shared/googleMaps/sebmGoogleMap.component';

// import { GooglePlacesAutocompleteService }        from './shared/placesAutocomplete/googlePlacesAutocomplete.service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	  BookingsComponent,
    BookingRowComponent,
    BookingComponent,
    BookingStepOne,
    BookingStepTwo,
    BookingStepThree,
    bookingRequestUserDetailsComponent,
    bookingRequestUserDetailsConfirmationComponent,
    LiveChatBubbleComponent,
    HomeButtonComponent,
    DateRangePickerComponent,
    CountdownComponent,
    BookingModalComponent,
    sebmGoogleMapComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOXN-KFDrJDzuKU7hv2kROt5iT5hKjDzk',
      libraries: ["places"]
    }),
    FormsModule, 
    ReactiveFormsModule,
    HttpModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookingsComponent,
    BookingRowComponent,
    BookingComponent,
    BookingStepOne,
    BookingStepTwo,
    BookingStepThree,
    bookingRequestUserDetailsComponent,
    bookingRequestUserDetailsConfirmationComponent,
    LiveChatBubbleComponent,
    HomeButtonComponent,
    DateRangePickerComponent,
    CountdownComponent,
    BookingModalComponent,
    sebmGoogleMapComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
    PopupToastService, 
    BookingsService, 
    BookingRequestService, 
    ServerService, 
    LiveChatService, 
    GoogleMapsService,
    GoogleMapsAPIWrapper,
    DateRangePickerService
    // GooglePlacesAutocompleteService
  ]
})
export class AppModule {}
