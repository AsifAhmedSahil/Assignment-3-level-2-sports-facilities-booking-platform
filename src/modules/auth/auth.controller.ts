import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";


const signupController = catchAsync(async (req, res) => {
    const result = await authServices.signup(req.body);
  
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User Registered Successfully",
      data: result,
    });
  });
  
const adminSignUpController = catchAsync(async (req, res) => {
    const result = await authServices.adminSignup(req.body);
  
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User Registered Successfully",
      data: result,
    });
  });
const loginController = catchAsync(async (req, res) => {
    
    const result = await authServices.login(req.body);
    console.log("result from login",result)

    const {accessToken,refreshToken,user} = result
    

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure: config.node_env === 'production'
    })

  
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User Logged In Successfully",
      token:accessToken,
      data:user,
    });
  });

  const getUserByEmail = catchAsync(async (req, res) => {
    const id = req.params;
  
    try {
      const user = await authServices.getUserByEmailFromDB(id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "User not found",
          data: [],
        });
      }
  
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal server error",
        data: [],
      });
    }
  });

  export const authControllers = {
    signupController,
    loginController,
    getUserByEmail,
    adminSignUpController
  }