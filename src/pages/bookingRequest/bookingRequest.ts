
export class UserDetails {
    email: string
    first_name: string
    telephone: number
    card_data: PaymentDetails
}

export class PaymentDetails {
    number: string
    //card_type: string
    year: string
    month: string
    ccv: number
    name: string
}

export class BookingRequest {
    price?: number
    nights?: number
    single_room?: number
    double_room?: number
    triple_room?: number
    pool?: boolean
    wifi?: boolean
    stars?: Array<Boolean>
    checkin?: string //or Date
    checkout?: string //or Date
    check_in_date?: string //or Date
    check_out_date?: string //or Date
    guests?: number
    distance?: number
    center_lat?: number
    center_lng?: number
    location?: string
    country?: string
    total_cost? : number
    user_details?: UserDetails
}