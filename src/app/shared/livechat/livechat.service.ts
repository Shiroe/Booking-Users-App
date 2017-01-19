import { Injectable } from '@angular/core';

import { PopupToastService } from '../popupToast/popupToast.service'

@Injectable()
export class LiveChatService {

    private _liveChat = false;

    constructor(private _popupToastService: PopupToastService){

    }

    openLiveChat(){
        if(!this._liveChat)
            this._popupToastService.notAvailable('top');
    }
}