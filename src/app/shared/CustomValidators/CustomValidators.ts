import { FormControl } from '@angular/forms';

export class CustomFormValidators {

    static mustContainSpace( control: FormControl){
        if(control.value.indexOf(' ') < 0)
            return { mustContainSpace: true };
        
        return null;
    }

    static invalidEmail( control: FormControl){   
        if(control.value.match(emailRegex) == null)
            return { invalidEmail: true };
        
        return null;
    }

    static invalidCardNumber( control: FormControl){
        if(control.value.match(cardRegex) == null)
            return { invalidCardNumber: true };
        
        return null;
    }

    static invalidCardExpiration( control: FormControl){
        if(control.value.indexOf('/') < 0)
            return { invalidCardExpiration: true };
        
        return null;
    }
}


export const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const cardRegex = new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$' );