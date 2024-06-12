import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";


const bookingModel = new Schema<TBooking>({
    date:{
        type:Date,
        required: [true,"Booking date is required"]
    },
    startTime:{
        type:String,
        required: [true,"Start Time is required"]
    },
    endTime:{
        type:String,
        required: [true,"End Time is required"]
    },
    user:{
        type: Schema.Types.ObjectId,
        required: [true,"User id is required"]
    },
    facility:{
        type: Schema.Types.ObjectId,
        required: [true,"Which facility you want is required"]
    },
    payableAmount:{
        type:Number,

    },
    isBooking:{
        type:String,
        enum:['confirmed', "unconfirmed", "canceled"]
    }

})

export const Booking = model<TBooking>("Booking",bookingModel)