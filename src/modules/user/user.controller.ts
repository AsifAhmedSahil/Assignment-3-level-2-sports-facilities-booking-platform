import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {

    const result = await userServices.createUserIntoDB(req.body);
  
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User Create Successfully',
      data: result,
    });
  });


  export const userControllers = {
    createUser
  }