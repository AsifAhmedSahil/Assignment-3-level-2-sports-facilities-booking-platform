import { TBooking } from "./bookings.interface"
import { Booking } from "./bookings.model"

const createBooking = async(payload:TBooking) =>{
    const result = await Booking.create(payload)
    return result

}
const getAllBooking = async() =>{
    const result = await Booking.find().populate("facility").populate("user")
    return result

}

export const bookingServices = {
    createBooking,
    getAllBooking
}