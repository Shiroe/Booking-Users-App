import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'home-button',
    templateUrl: './homebutton.component.html'

})

export class HomeButtonComponent{

    constructor(private _navController: NavController){

    }

    goHome(){
		console.log('home button pressed');
		this._navController.popToRoot();
	}

}