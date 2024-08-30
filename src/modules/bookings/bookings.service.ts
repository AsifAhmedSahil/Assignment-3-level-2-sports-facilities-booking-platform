/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { Facilities } from "../facility/facilities.model";

import { TBooking } from "./bookings.interface"
import { Booking } from "./bookings.model"
import { initiatePayment } from "../Payments/Payments.util";

const createBooking = async (payload: TBooking) => {
  const { startTime, endTime, facility } = payload;

  // Define working hours in minutes (10:00 AM to 10:00 PM)
  const workingStart = 10 * 60; // 10:00 AM in minutes
  const workingEnd = 22 * 60;   // 10:00 PM in minutes

  // Helper function to convert 12-hour time to minutes since midnight
  const convertToMinutes = (time: string) => {
    const [timePart, period] = time.split(' ');
    const [hour, minute] = timePart.split(":").map(Number);

    let hourIn24 = hour;
    if (period === 'PM' && hour !== 12) {
      hourIn24 += 12;
    }
    if (period === 'AM' && hour === 12) {
      hourIn24 = 0;
    }

    return hourIn24 * 60 + minute;
  };

  // Convert start and end times to minutes since midnight
  const startTimeInMinutes = convertToMinutes(startTime);
  const endTimeInMinutes = convertToMinutes(endTime);

  // Check if start and end times are within working hours
  if (startTimeInMinutes < workingStart || endTimeInMinutes > workingEnd) {
    console.error("Booking times must be within working hours (10:00 AM to 10:00 PM)");
    throw new Error("Booking times must be within working hours (10:00 AM to 10:00 PM)");
  }

  // Calculate the total duration in minutes
  const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

  // Check if duration is valid
  if (durationInMinutes <= 0) {
    console.error("Invalid booking duration");
    throw new Error("Invalid booking duration");
  }

  // Find facility data and get per hour cost
  const facilityData = await Facilities.findById(facility);
  if (!facilityData) {
    console.error("Facility not found");
    throw new Error("Facility not found");
  }

  const payPerHour = facilityData.pricePerHour;

  // Ensure payPerHour is valid
  if (payPerHour <= 0) {
    console.error("Invalid facility price");
    throw new Error("Invalid facility price");
  }

  // Calculate per minute cost
  const payPerMinute = payPerHour / 60;

  // Calculate the payable amount
  const payableAmount = Math.round(durationInMinutes * payPerMinute);

  // Check for overlapping bookings for the same facility on the same date
  const overlappingBookings = await Booking.find({
    facility: facility,
    startTime: { $lt: endTimeInMinutes },  // Start time is before the new end time
    endTime: { $gt: startTimeInMinutes }   // End time is after the new start time
  }).exec();

  if (overlappingBookings.length > 0) {
    console.error("The selected time slot overlaps with an existing booking for the same facility.");
    throw new Error("The selected time slot overlaps with an existing booking for the same facility.");
  }

  // Log for debugging
  console.log({
    startTime, endTime,
    startTimeInMinutes, endTimeInMinutes, durationInMinutes,
    payPerHour, payPerMinute, payableAmount
  });

  const isBooked = "confirmed";
  const paymentStatus = "unpaid"
  const transactionId = `TXN-${Date.now()}`;


  // Update payload with payable amount and booking status
  const updatePayloadWithPayableAmount = { ...payload, payableAmount, isBooked ,transactionId,paymentStatus};

  // Create the booking and populate user details
  const result = (await Booking.create(updatePayloadWithPayableAmount)).populate("user");
  console.log(result)


  // payment

  const paymentData = {
    transactionId,
    payableAmount,
    customerName:payload.firstName,
    customerEmail:payload.email
  }

  const paymentInfo = await initiatePayment(paymentData)
  console.log(paymentInfo)


  return paymentInfo;
};




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
    const result = await Booking.findByIdAndDelete(id)
    return result
}

const updateBookingIntoDB = async(id:string , payload:Partial<TBooking>) =>{

  const {...updatedFields} = payload

  const result = await Booking.findByIdAndUpdate(id,updatedFields,{new:true})
 
  return result
}

const getSingleBookingById = async (id: string) => {
  try {
    const result = await Booking.findById(id);
    if (!result) {
      throw new Error('Booking not found');
    }
    return result;
  } catch (error) {
    console.error('Error in service:', error); // Log error for debugging
    throw error; // Re-throw error to be caught in the controller
  }
};

// const checkSlots = async (date: string) => {
//     console.log("Checking availability for date:", date);
//     const availableSlots = [];
  
//     // Define start and end of the day in minutes
//     const startDay = 0;
//     const endDay = 24 * 60;
  
//     // Convert time to minutes
//     const hourToMinutes = (time: string): number => {
//       const [hour, minute] = time.split(":").map(Number);
//       return hour * 60 + minute;
//     };
  
//     // Convert minutes to HH:MM format
//     const minutesToHours = (minutes: number): string => {
//       const hours = Math.floor(minutes / 60);
//       const mins = minutes % 60;
//       return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//     };
  
//     // Retrieve bookings for the specified date
//     const bookingData = await Booking.find({ date: date });
//     console.log("Booking data:", bookingData);
  
//     // Extract booked time slots
//     const bookedTimeSlots = bookingData.map((booking) => ({
//       startTime: hourToMinutes(booking.startTime),
//       endTime: hourToMinutes(booking.endTime),
//     }));
  
//     // Calculate available slots
//     let previousEndTime = startDay;
  
//     // Iterate over booked slots to find gaps
//     for (const slot of bookedTimeSlots) {
//       if (slot.startTime > previousEndTime) {
//         availableSlots.push({
//           startTime: minutesToHours(previousEndTime),
//           endTime: minutesToHours(slot.startTime),
//         });
//       }
//       previousEndTime = Math.max(previousEndTime, slot.endTime);
//     }
  
//     // Check if there are any slots available after the last booking
//     if (previousEndTime < endDay) {
//       availableSlots.push({
//         startTime: minutesToHours(previousEndTime),
//         endTime: minutesToHours(endDay),
//       });
//     }
  
//     return availableSlots;
//   };
  

// ----------------update with requirement---------------







const checkSlots = async (date: string, facility: string) => {
  console.log("Checking availability for date:", date, "and facility:", facility);

  // Define working hours in minutes (10:00 AM to 10:00 PM)
  const workingStart = 10 * 60; // 10:00 AM in minutes
  const workingEnd = 22 * 60;   // 10:00 PM in minutes

  // Helper function to convert 12-hour time to minutes since midnight
  const convertToMinutes = (time: string) => {
    const [timePart, period] = time.split(' ');
    const [hour, minute] = timePart.split(":").map(Number);

    let hourIn24 = hour;
    if (period === 'PM' && hour !== 12) {
      hourIn24 += 12;
    }
    if (period === 'AM' && hour === 12) {
      hourIn24 = 0;
    }

    return hourIn24 * 60 + minute;
  };

  // Convert minutes to 12-hour format with AM/PM
  const minutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const hourIn12 = hours % 12 || 12; // Convert 0 to 12 for AM
    return `${hourIn12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  // Retrieve all bookings for the specified date and facility
  const bookingData = await Booking.find({
    date: date,
    facility: new mongoose.Types.ObjectId(facility),
  }).exec();

  console.log("Booking data:", bookingData);

  // Handle case when no bookings are found
  if (!bookingData || bookingData.length === 0) {
    console.log("No bookings found for the given date and facility.");
    return [{
      startTime: minutesToHours(workingStart),
      endTime: minutesToHours(workingEnd),
    }];
  }

  // Extract booked time slots and sort them by start time
  const bookedTimeSlots = bookingData.map((booking: any) => ({
    startTime: convertToMinutes(booking.startTime),
    endTime: convertToMinutes(booking.endTime),
  })).sort((a, b) => a.startTime - b.startTime);

  console.log("Booked time slots:", bookedTimeSlots);

  const availableSlots: { startTime: string; endTime: string }[] = [];
  let previousEndTime = workingStart;

  // Iterate over booked slots to find gaps
  for (const slot of bookedTimeSlots) {
    // Skip slots outside the working hours
    if (slot.startTime >= workingEnd || slot.endTime <= workingStart) {
      continue;
    }

    if (slot.startTime > previousEndTime) {
      availableSlots.push({
        startTime: minutesToHours(previousEndTime),
        endTime: minutesToHours(Math.min(slot.startTime, workingEnd)),
      });
    }
    previousEndTime = Math.max(previousEndTime, Math.min(slot.endTime, workingEnd));
  }

  // Check if there are any slots available after the last booking within working hours
  if (previousEndTime < workingEnd) {
    availableSlots.push({
      startTime: minutesToHours(previousEndTime),
      endTime: minutesToHours(workingEnd),
    });
  }

  // If no available slots, return a message
  console.log("Available Slots:", availableSlots);
  if (availableSlots.length === 0) {
    return {
      success: false,
      message: "No available slots for the selected date. Please try another day.",
    };
  }

  return {
    success: true,
    message: "Available slots found.",
    data: availableSlots,
  };
};





export const bookingServices = {
    createBooking,
    getAllBooking,
    deleteBookings,
    getSingleUserBookings,
    checkSlots,
    updateBookingIntoDB,
    getSingleBookingById
}