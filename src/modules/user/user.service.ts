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


export const userServices = {
    createUserIntoDB,
    getAllUserFromDB
}