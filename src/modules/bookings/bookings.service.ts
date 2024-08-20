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
    // console.log("payableAmount",payableAmount)

    const isBooked = "confirmed"

    const updatePayloadWithPayableAmount = {...payload,payableAmount,isBooked}

    const result = (await Booking.create(updatePayloadWithPayableAmount)).populate("user")
    return result

}
const getAllBooking = async() =>{
    const result = await Booking.find().populate("facility").populate("user")
    return result

}
const getSingleUserBookings = async(id:string) =>{
    console.log(id ,"i am from service")
    const result = await Booking.find({user: id})
    return result
    // console.log(result,"from single user data get service")
}

const deleteBookings = async(id:string) =>{
    const result = await Booking.findByIdAndUpdate(id,{isBooked:"canceled"},{new:true})
    return result
}

const checkSlots = async (date: string) => {
    console.log("Checking availability for date:", date);
    const availableSlots = [];
  
    // Define start and end of the day in minutes
    const startDay = 0;
    const endDay = 24 * 60;
  
    // Convert time to minutes
    const hourToMinutes = (time: string): number => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    };
  
    // Convert minutes to HH:MM format
    const minutesToHours = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };
  
    // Retrieve bookings for the specified date
    const bookingData = await Booking.find({ date: date });
    console.log("Booking data:", bookingData);
  
    // Extract booked time slots
    const bookedTimeSlots = bookingData.map((booking) => ({
      startTime: hourToMinutes(booking.startTime),
      endTime: hourToMinutes(booking.endTime),
    }));
  
    // Calculate available slots
    let previousEndTime = startDay;
  
    // Iterate over booked slots to find gaps
    for (const slot of bookedTimeSlots) {
      if (slot.startTime > previousEndTime) {
        availableSlots.push({
          startTime: minutesToHours(previousEndTime),
          endTime: minutesToHours(slot.startTime),
        });
      }
      previousEndTime = Math.max(previousEndTime, slot.endTime);
    }
  
    // Check if there are any slots available after the last booking
    if (previousEndTime < endDay) {
      availableSlots.push({
        startTime: minutesToHours(previousEndTime),
        endTime: minutesToHours(endDay),
      });
    }
  
    return availableSlots;
  };
  


export const bookingServices = {
    createBooking,
    getAllBooking,
    deleteBookings,
    getSingleUserBookings,
    checkSlots
}