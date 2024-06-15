import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcryptjs from 'bcryptjs'
import config from "../../config";


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
        type:String,
        required:true
    },
    role:{
        type: String,
        enum:['user','admin']
    },
    address:{
        type:String
    }
})

userModel.pre('save',async function(next){
    const user = this

    user.password = await bcryptjs.hash(user.password,Number(config.salt_round))

    next()
})
// hashed password hide***
userModel.post('save', function(doc,next){
    doc.password = ""

    next()
})

export const User = model<TUser>("User",userModel)