
export class UserDetails {
    email: string
    name: string
    phone: number
    payment: PaymentDetails
}

export class PaymentDetails {
    cardNumber: string
    card_type: string
    card_expiration: string
    cvv: Number
    card_name: string
}

export class BookingRequest {
    price: Number
    location: string
    country: string
    guests: Number
    checkin: string //or Date
    checkout: string //or Date
    distance: Number
    stars: Array<Boolean>
    wifi: boolean
    pool: boolean
    total_cost? : Number
    user_details: UserDetails
}