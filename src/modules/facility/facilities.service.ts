import { TFacility } from "./facilities.interface"
import { Facilities } from "./facilities.model"

const createFacilityIntoDB = async(payload:TFacility) =>{

    const result = await Facilities.create(payload)
    return result
}

const getAllFacilityFromDB = async() =>{

    const result = await Facilities.find()
    return result
}
const updateFacilityIntoDB = async(id:string , payload:Partial<TFacility>) =>{

    const {...updatedFields} = payload
  
    const result = await Facilities.findByIdAndUpdate(id,updatedFields,{new:true})
   
    return result
}

export const facilitiesServices = {
     createFacilityIntoDB,
     getAllFacilityFromDB,
     updateFacilityIntoDB

}