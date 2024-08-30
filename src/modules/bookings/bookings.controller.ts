
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { User } from "../user/user.model";
import { bookingServices } from "./bookings.service";
import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction } from "express";
import { Booking } from "./bookings.model";

const createBookingController = catchAsync(async (req, res, next: NextFunction) => {
  try {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(401, "Unauthorized users!");
    }

    const token = tokenWithBearer.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Unauthorized users!");
    }

    const verifiedToken = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    );

    const { email } = verifiedToken as JwtPayload;
    const userinfo = await User.findOne({ email: email });
    const userID = userinfo?._id;

    if (!userID) {
      throw new AppError(401, "Unauthorized users!");
    }

    const newData = {
      ...req.body,
      user: userinfo?._id,
    };

    const { startTime: startTimeFromBooking, endTime: endTimeFromBooking, date: bodyDate, facility } = req.body;

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      user: userID,
      date: bodyDate,
      facility: facility,
      $or: [
        {
          startTime: { $lt: endTimeFromBooking }, // Check if the new start time is before the existing end time
          endTime: { $gt: startTimeFromBooking }  // Check if the new end time is after the existing start time
        }
      ]
    });

    if (overlappingBookings.length > 0) {
      throw new AppError(400, "This time slot overlaps with an existing booking.");
    }

    // Call the service to create the booking
    const result = await bookingServices.createBooking(newData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const getAllBookingController = catchAsync(async (req, res) => {
  try {
    const result = await bookingServices.getAllBooking();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All Booking Retrived successfully",
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


const getSingleBookingController = catchAsync(async (req, res) => {
  try {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(401, "Unauthorized users!");
    }
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(" ")[1];
      console.log("after cut bearer", token);

      if (!token) {
        throw new AppError(401, "Unauthorized users!");
      }

      const verifiedToken = jwt.verify(
        token as string,
        config.jwt_access_secret as string
      );
      // console.log(verifiedToken)

      const { email } = verifiedToken as JwtPayload;
      console.log("email ", email);

      const user = await User.findOne({ email: email });
      const userId = user?._id.toString();

      if (userId) {
        try {
          const result = await bookingServices.getSingleUserBookings(userId);
        console.log("result from controller boking", result);
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Specific User Bookings Retrived successfully",
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
      }
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

const getSingleBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log('Booking ID:', id); // Check if the ID is correctly received
  try {
    const result = await bookingServices.getSingleBookingById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No Data Found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking retrieved Successfully",
      data: result,
    });
  } catch (error) {
    console.error('Error retrieving booking:', error); // Log the error for debugging
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
});

const deleteBookingController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.deleteBookings(id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: " Booking cancelled successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body,id)
    const result = await bookingServices.updateBookingIntoDB(id, req.body);
    console.log(result)

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: " Booking updated Successfully",
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

// const checkAvaiability = catchAsync(async (req, res) => {
//   let date = req.query.date || new Date().toISOString().split('T')[0];
//   const todaysDate = new Date().toISOString().split('T')[0];

//   if (date === todaysDate) {
//     date = todaysDate;
//   } else {
//     // Ensure date is formatted correctly
//     date = new Date(date).toISOString().split('T')[0];
//   }

//   const result = await bookingServices.checkSlots(date);
//   res.status(200).json({
//     success: true,
//     statusCode: 200,
//     message: "Available slots here",
//     data: result,
//   });
// });


// -------------------with update slots----------------

const checkAvailability = catchAsync(async (req, res) => {
  // Ensure date is a string or set to today’s date
  let date: string = typeof req.query.date === 'string' ? req.query.date : new Date().toISOString().split('T')[0];
  const facility: string = typeof req.query.facility === 'string' ? req.query.facility : '';

  // Validate facility ID
  if (!facility) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Facility parameter is required",
    });
  }

  // Validate date format
  if (isNaN(new Date(date).getTime())) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid date format",
    });
  }

  // Ensure date is formatted correctly
  date = new Date(date).toISOString().split('T')[0];

  // Call the service to check slots based on date and facility
  const result = await bookingServices.checkSlots(date, facility);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Available slots here",
    data: result,
  });
});



export const bookingControllers = {
  createBookingController,
  getAllBookingController,
  getSingleBookingController,
  deleteBookingController,
  checkAvailability,
  updateFacility,
  getSingleBookingById
  
};
