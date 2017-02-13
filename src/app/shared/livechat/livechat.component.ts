import { Component } from '@angular/core';

import { LiveChatService } from './livechat.service';

@Component({
    selector: 'livechat-bubble',
    templateUrl: './livechat-bubble.component.html'

})

export class LiveChatBubbleComponent{

    constructor(private _liveChatService: LiveChatService){

    }

    openModal(){
		console.log('live chat bubble pressed');
		this._liveChatService.openLiveChat();

        //TODO
	}

}