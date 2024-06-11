import catchAsync from "../../utils/catchAsync";
import { facilitiesServices } from "./facilities.service";

const createFacility = catchAsync(async (req, res) => {

    const result = await facilitiesServices.createFacilityIntoDB(req.body)


    res.status(200).json({
        success:true,
        statusCode: 200,
        message:"Facilities Created Successfully",
        data:result
    })

});

const getAllFacility = catchAsync(async (req, res) => {

    const result = await facilitiesServices.getAllFacilityFromDB()


    res.status(200).json({
        success:true,
        statusCode: 200,
        message:"All Facilities retrived Successfully",
        data:result
    })

});

const updateFacility = catchAsync(async (req, res) => {
    const {id} = req.params
    // console.log(object)
    const result = await facilitiesServices.updateFacilityIntoDB(id,req.body)


    res.status(200).json({
        success:true,
        statusCode: 200,
        message:" Facilities updated Successfully",
        data:result
    })
});

export const facilitiesController = {
    createFacility,
    getAllFacility,
    updateFacility
}