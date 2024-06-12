import { Types } from "mongoose";

export interface TBooking {
    date:Date;
    startTime:string;
    endTime:string;
    user:Types.ObjectId;
    facility:Types.ObjectId;
    payableAmount:number;
    isBooking: 'confirmed'| "unconfirmed"| "canceled"
}