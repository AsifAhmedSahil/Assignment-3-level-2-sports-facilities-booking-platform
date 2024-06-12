import catchAsync from "../../utils/catchAsync";
import { bookingServices } from "./bookings.service";

const createBookingController = catchAsync(async(req,res) =>{
    const result = await bookingServices.createBooking(req.body)

    res.status(200).json({
        success:true,
        statusCode: 200,
        message: "Booking created successfully",
        data:result
    })

})
const getAllBookingController = catchAsync(async(req,res) =>{
    const result = await bookingServices.getAllBooking()

    res.status(200).json({
        success:true,
        statusCode: 200,
        message: "All Booking Retrived successfully",
        data:result
    })

})
const deleteBookingController = catchAsync(async(req,res) =>{
    const {id} = req.params;

    const result = await bookingServices.deleteBookings(id)

    res.status(200).json({
        success:true,
        statusCode: 200,
        message: "All Booking Retrived successfully",
        data:result
    })

})

export const bookingControllers = {
    createBookingController,
    getAllBookingController,
    deleteBookingController
}