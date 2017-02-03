
export class Booking {
    refNumber: string
    bookingEmail: string
    status?: string
    destination?: string
    date?: string //could be date
    total_cost?: Number
}

export class Bookings {
    bookings: Array<Booking>
}