import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServerService } from './shared/server/server.service';
import { BookingsService } from '../pages/bookings/bookings.service';
import { BookingsComponent } from '../pages/bookings/bookings.component';
import { BookingRowComponent } from '../pages/bookings/bookingrow.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	  BookingsComponent,
    BookingRowComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookingsComponent,
    BookingRowComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BookingsService, ServerService]
})
export class AppModule {}
