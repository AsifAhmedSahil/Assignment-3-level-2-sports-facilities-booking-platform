import {  TUser } from "../user/user.interface"
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"
import { isPasswordMatched } from "./auth.util"


const signup = async(payload:TUser) =>{

    // check user existance
    const user = await User.findOne({email:payload.email})
    if(user){
        throw new Error("User Already Exists!")
    }

    payload.role = "user"

    // console.log(payload)
    const result = await User.create(payload)
    return result

}

const login = async(payload :TLoginUser) =>{

    // check user existance
    const user = await User.findOne({email:payload.email}).select("+password")
    if(!user){
        throw new Error("User Not Found!")
    }

    // check password is matched or not
    const passwordMatch = await isPasswordMatched(payload.password,user.password)

    if(!passwordMatch){
        throw new Error("Password not matched!")
    }
}

export const userServices = {
    signup
}