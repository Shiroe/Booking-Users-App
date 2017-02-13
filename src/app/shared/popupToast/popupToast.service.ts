import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class PopupToastService {

    constructor(private _toastController: ToastController){

    }

    notAvailable(pos: string, dur?: number){
        this._presentToast('This feature is not yet available', pos, dur);
    }

    alert(text: string, pos: string, dur?: number){
        this._presentToast(text, pos, dur);
    }

    private _presentToast(text: string, pos: string, dur?: number) {
        let duration = 3000;
        if(dur){
            duration = dur;
        }

        let toast = this._toastController.create({
            message: text,
            duration: duration,
            position: pos
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }
}