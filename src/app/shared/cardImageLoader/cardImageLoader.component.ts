import { Component, Input } from '@angular/core';

@Component({
    selector: 'ab-card-icon',
    templateUrl: './cardImageLoader.component.html'
})
export class CardImageLoaderComponent {

    @Input() card;

    card_url = 'unk.png';

    constructor(){

    }

    getCardTypeImage(number){
		if(!number) return 'unk.png';
		// visa
	    var re = new RegExp("^4");
	    if (number.match(re) != null)
	        return "visa.png";

	    // Mastercard
	    re = new RegExp("^5[1-5]");
	    if (number.match(re) != null)
	        return "mastercard.png";

	    // AMEX
	    re = new RegExp("^3[47]");
	    if (number.match(re) != null)
	        return "american-express.png";

	    // Discover
	    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
	    if (number.match(re) != null)
	        return "discover.png";

	    // Diners
	    re = new RegExp("^36");
	    if (number.match(re) != null)
	        return "diners-club.png";

	    // Diners - Carte Blanche
	    re = new RegExp("^30[0-5]");
	    if (number.match(re) != null)
	        return "diners-club.png";

	    // JCB
	    re = new RegExp("^35(2[89]|[3-8][0-9])");
	    if (number.match(re) != null)
	        return "unk.png";

	    // Visa Electron
	    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
	    if (number.match(re) != null)
	        return "visa.png";

        return 'unk.png';
    };

}