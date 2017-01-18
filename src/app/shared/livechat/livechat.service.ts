import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

@Injectable()
export class LiveChatService {

    private _liveChat = false;

    constructor(private _toastController: ToastController){

    }

    openLiveChat(){
        if(!this._liveChat)
            this.presentToast('This feature is not yet available', 'top');
    }

   presentToast(text, pos) {
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