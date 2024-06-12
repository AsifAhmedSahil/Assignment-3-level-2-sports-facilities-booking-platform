import { Facilities } from "../facility/facilities.model";
import { TBooking } from "./bookings.interface"
import { Booking } from "./bookings.model"

const createBooking = async(payload:TBooking) =>{
    const {startTime,endTime,facility} = payload

    // convert time string to number
    const startTimeHours = parseInt(startTime.split(":")[0]);
    const endTimeHours  =parseInt(endTime.split(":")[0])

    // find facility data and get per hour cost
    const facilityData = await Facilities.findById(facility)
    const payPerHour = facilityData? facilityData.pricePerHour : 0

    const bookingHours = (endTimeHours-startTimeHours) 
    const payableAmount = bookingHours * payPerHour
    console.log("payableAmount",payableAmount)

    const isBooked = "confirmed"

    const updatePayloadWithPayableAmount = {...payload,payableAmount,isBooked}

    
    
    
    
    const result = (await Booking.create(updatePayloadWithPayableAmount)).populate("user")
    return result

}
const getAllBooking = async() =>{
    const result = await Booking.find().populate("facility").populate("user")
    return result

}

const deleteBookings = async(id:string) =>{
    const result = await Booking.findByIdAndUpdate(id,{isBooked:"canceled"},{new:true})
    return result
}


export const bookingServices = {
    createBooking,
    getAllBooking,
    deleteBookings
}