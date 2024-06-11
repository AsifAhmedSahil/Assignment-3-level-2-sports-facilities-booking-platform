import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";


 const facilitiesModel = new Schema<TFacility>({
    name:{
        type:String,
        required:[true,'name is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    pricePerHour:{
        type:Number,
        required:[true,'Price is required']
    },
    location:{
        type:String,
        required:[true,'Location is required']
    },
    isDeleted:{
        type:String,
        default:false
    }
})

export const Facilities = model<TFacility>("Facilities",facilitiesModel)