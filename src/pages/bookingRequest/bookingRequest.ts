
export class UserDetails {
    email: string
    name: string
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
    guests: Number
    checkIn: string //or Date
    checkOut: string //or Date
    stars: Array<Number>
    wifi: boolean
    pool: boolean
    total_cost? : Number
    user_details: UserDetails
}