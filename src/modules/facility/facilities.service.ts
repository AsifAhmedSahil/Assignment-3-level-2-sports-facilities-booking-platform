import { TFacility } from "./facilities.interface"
import { Facilities } from "./facilities.model"

const createFacilityIntoDB = async(payload:TFacility) =>{

    const result = await Facilities.create(payload)
    return result
}

export const facilitiesServices = {
     createFacilityIntoDB

}