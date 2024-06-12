import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";
import { boolean } from "zod";


 const facilitiesModel = new Schema<TFacility>({
    name:{
        type:String,
        required:[true,'name is required'],
        unique:true
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
        type:Boolean,
        default:false
    }
})

export const Facilities = model<TFacility>("Facilities",facilitiesModel)