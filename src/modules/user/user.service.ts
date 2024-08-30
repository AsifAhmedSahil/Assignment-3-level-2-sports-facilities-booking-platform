/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface"
import { User } from "./user.model"


const createUserIntoDB = async(payload:TUser) =>{

    // console.log(payload)
    const result = await User.create(payload)
    return result

}
const getAllUserFromDB = async() =>{

    // console.log(payload)
    const result = await User.find()
    return result

}

const getUserByEmailFromDB = async (email:any) => {
    console.log(email,"from service******************")
    return await User.findOne({ email: email });
  };

  const updateUserIntoDB = async(email:string , payload:Partial<TUser>) =>{

    const {...updatedFields} = payload
    console.log(payload,email)
  
    const result = await User.findOneAndUpdate({email},updatedFields,{new:true})
   
    return result
}

export const userServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getUserByEmailFromDB,
    updateUserIntoDB
}