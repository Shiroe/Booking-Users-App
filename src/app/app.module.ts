import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home.component';
import { ServerService } from './shared/server/server.service';
import { LiveChatService } from './shared/livechat/livechat.service';
import { BookingsService } from '../pages/bookings/bookings.service';
import { BookingsComponent } from '../pages/bookings/bookings.component';
import { BookingRowComponent } from '../pages/bookings/bookingrow.component';
import { BookingRequestComponent } from '../pages/bookingRequest/bookingRequest.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	  BookingsComponent,
    BookingRowComponent,
    BookingRequestComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookingsComponent,
    BookingRowComponent,
    BookingRequestComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BookingsService, ServerService, LiveChatService]
})
export class AppModule {}
