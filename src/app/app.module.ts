import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookingsService } from '../pages/bookings/bookings.service';
import { BookingsComponent } from '../pages/bookings/bookings.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	BookingsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	BookingsComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BookingsService]
})
export class AppModule {}
