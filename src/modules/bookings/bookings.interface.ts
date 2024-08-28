import { Types } from "mongoose";

export interface TBooking {
    date:string;
    startTime:string;
    endTime:string;
    email:string;
    firstName:string;
    lastName:string;
    guestCount:string;
    user?:Types.ObjectId;
    facility:Types.ObjectId;
    payableAmount?:number;
    transactionId?: string;
    isBooked: 'confirmed'| "unconfirmed"| "canceled"
    paymentStatus: "Paid" | "unpaid"
}