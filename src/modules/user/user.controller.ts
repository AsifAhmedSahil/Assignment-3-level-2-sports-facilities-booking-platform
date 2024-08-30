import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User Create Successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  try {
    const result = await userServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User Retrive Successfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

const getUserByEmail = catchAsync(async (req, res) => {
  const email = req.params.email;
  console.log(email)

  try {
    const user = await userServices.getUserByEmailFromDB(email);

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

const updateUser = catchAsync(async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email)
    
    const result = await userServices.updateUserIntoDB(email, req.body);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: " User updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
}
});

export const userControllers = {
  createUser,
  getAllUser,
  getUserByEmail,
  updateUser
};
