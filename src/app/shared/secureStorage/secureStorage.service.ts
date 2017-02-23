import { Injectable } from '@angular/core';
import { SecureStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
// import { Platform } from 'ionic-angular';

@Injectable()
export class SecureStorageService {


    private bookings;
    private isMobile: boolean = false;
    private storage: Storage;

    constructor( 
        private _storage: Storage,
        private _secureStorage: SecureStorage,
    ){
        this.storage = this._storage;
        this.getBookings().then( b => { this.bookings = b; });
    }

    init(){
        this._secureStorage.create('travelusive').then(
            () => {
                console.log('Storage ready!');
                this._secureStorage.get('bookings')
                .then(
                    data => {
                        console.log('data retrieved!', data);
                        this.bookings = data;
                    },
                    error => {
                        console.log('no data stored!:', error );
                        this.saveBookings([{ destination: 'Paros, Greece', total_cost: 322, date: '20-02-2017', status: 'Pending', refNumber: '123dASD34', bookingEmail: 'some@example.com'}]);
                        //this.bookings = false;
                    }    
                );
            },
            error => {
                console.log('Init error:', error);
            }
        );
    }

    saveBookings(bookings){
        this.bookings = bookings;
        this.storage.set('bookings', bookings);
    }

    getBookings(){

        return this.storage.get('bookings'); /**/
    }

    removeBooking(booking){

        if(this.bookings){        
            this.bookings.splice(this.bookings.indexOf(booking), 1);
            this.saveBookings(this.bookings);
            return this.bookings; //Promise.resolve(this.bookings);
        }else{
            this.getBookings().then( b => { this.bookings = b } );
            this.bookings.splice(this.bookings.indexOf(booking), 1);
            this.saveBookings(this.bookings);
            return this.bookings; //Promise.resolve(this.bookings);
        }
    }


}