import { Types } from "mongoose";

export interface TBooking {
    date:string;
    startTime:string;
    endTime:string;
    firstName:string;
    lastName:string;
    guestCount:string;
    user?:Types.ObjectId;
    facility:Types.ObjectId;
    payableAmount?:number;
    isBooked: 'confirmed'| "unconfirmed"| "canceled"
}