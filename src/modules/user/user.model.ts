import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";


const userModel = new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: [true,"password must be 8 characters"]
    },
    phone:{
        type:Number
    },
    role:{
        type: String,
        enum:['user','admin']
    },
    address:{
        type:String
    }
})

export const User = model<TUser>("User",userModel)