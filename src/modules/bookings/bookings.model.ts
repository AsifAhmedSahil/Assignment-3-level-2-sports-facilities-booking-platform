import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";


const bookingModel = new Schema<TBooking>({
    date:{
        type: String,
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
    firstName:{
        type:String,
        required: [true,"First Name is required"]
    },
    lastName:{
        type:String,
        required: [true,"Last Name is required"]
    },
    guestCount:{
        type:String,
        required: [true,"Guest Count is required"]
    },
    transactionId:{
        type:String
        
    },
    
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        
    },
    facility:{
        type: Schema.Types.ObjectId,
        ref:"Facilities",
        required: [true,"Which facility you want is required"]
    },
    payableAmount:{
        type:Number,

    },
    isBooked:{
        type:String,
        enum:['confirmed', "unconfirmed", "canceled"]
    },
    paymentStatus:{
        type:String,
        enum:['Paid',  "unpaid"]
    }

})



export const Booking = model<TBooking>("Booking",bookingModel)