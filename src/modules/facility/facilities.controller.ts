import catchAsync from "../../utils/catchAsync";
import { facilitiesServices } from "./facilities.service";

const createFacility = catchAsync(async (req, res) => {

    const result = await facilitiesServices.createFacilityIntoDB(req.body)


    res.status(200).json({
        success:true,
        message:"Facilities Created Successfully",
        data:result
    })

});

export const facilitiesController = {
    createFacility
}