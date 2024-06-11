import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const {  user: userData } = req.body;
    
    
  
    const result = await userServices.createUserIntoDB();
  
    res.status(200).json({
      success: true,
      message: 'User Create Successfully',
      data: result,
    });
  });


  export const userControllers = {
    createUser
  }