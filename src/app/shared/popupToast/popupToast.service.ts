import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class PopupToastService {

    constructor(private _toastController: ToastController){

    }

    notAvailable(pos: string){
        this._presentToast('This feature is not yet available', pos);
    }

    alert(text: string, pos: string){
        this._presentToast(text, pos);
    }

    private _presentToast(text: string, pos: string) {
        let toast = this._toastController.create({
            message: text,
            duration: 3000,
            position: pos
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }
}