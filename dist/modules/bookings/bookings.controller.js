"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_model_1 = require("../user/user.model");
const bookings_service_1 = require("./bookings.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bookings_model_1 = require("./bookings.model");
const createBookingController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenWithBearer = req.headers.authorization;
        if (!tokenWithBearer) {
            throw new AppError_1.default(401, "Unauthorized users!");
        }
        const token = tokenWithBearer.split(" ")[1];
        if (!token) {
            throw new AppError_1.default(401, "Unauthorized users!");
        }
        const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { email } = verifiedToken;
        const userinfo = yield user_model_1.User.findOne({ email: email });
        const userID = userinfo === null || userinfo === void 0 ? void 0 : userinfo._id;
        if (!userID) {
            throw new AppError_1.default(401, "Unauthorized users!");
        }
        const newData = Object.assign(Object.assign({}, req.body), { user: userinfo === null || userinfo === void 0 ? void 0 : userinfo._id });
        const { startTime: startTimeFromBooking, endTime: endTimeFromBooking, date: bodyDate, facility } = req.body;
        // Check for overlapping bookings
        const overlappingBookings = yield bookings_model_1.Booking.find({
            user: userID,
            date: bodyDate,
            facility: facility,
            $or: [
                {
                    startTime: { $lt: endTimeFromBooking }, // Check if the new start time is before the existing end time
                    endTime: { $gt: startTimeFromBooking } // Check if the new end time is after the existing start time
                }
            ]
        });
        if (overlappingBookings.length > 0) {
            throw new AppError_1.default(400, "This time slot overlaps with an existing booking.");
        }
        // Call the service to create the booking
        const result = yield bookings_service_1.bookingServices.createBooking(newData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
}));
const getAllBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookings_service_1.bookingServices.getAllBooking();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "All Booking Retrived successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
const getSingleBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenWithBearer = req.headers.authorization;
        if (!tokenWithBearer) {
            throw new AppError_1.default(401, "Unauthorized users!");
        }
        if (tokenWithBearer) {
            const token = tokenWithBearer.split(" ")[1];
            console.log("after cut bearer", token);
            if (!token) {
                throw new AppError_1.default(401, "Unauthorized users!");
            }
            const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            // console.log(verifiedToken)
            const { email } = verifiedToken;
            console.log("email ", email);
            const user = yield user_model_1.User.findOne({ email: email });
            const userId = user === null || user === void 0 ? void 0 : user._id.toString();
            if (userId) {
                try {
                    const result = yield bookings_service_1.bookingServices.getSingleUserBookings(userId);
                    console.log("result from controller boking", result);
                    res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "Specific User Bookings Retrived successfully",
                        data: result,
                    });
                }
                catch (error) {
                    res.status(200).json({
                        success: false,
                        statusCode: 404,
                        message: "No Data Found",
                        data: [],
                    });
                }
            }
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
const getSingleBookingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Booking ID:', id); // Check if the ID is correctly received
    try {
        const result = yield bookings_service_1.bookingServices.getSingleBookingById(id);
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
    }
    catch (error) {
        console.error('Error retrieving booking:', error); // Log the error for debugging
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
            data: [],
        });
    }
}));
const deleteBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bookings_service_1.bookingServices.deleteBookings(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: " Booking cancelled successfully",
        data: result,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(req.body, id);
        const result = yield bookings_service_1.bookingServices.updateBookingIntoDB(id, req.body);
        console.log(result);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: " Booking updated Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
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
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure date is a string or set to today’s date
    let date = typeof req.query.date === 'string' ? req.query.date : new Date().toISOString().split('T')[0];
    const facility = typeof req.query.facility === 'string' ? req.query.facility : '';
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
    const result = yield bookings_service_1.bookingServices.checkSlots(date, facility);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Available slots here",
        data: result,
    });
}));
exports.bookingControllers = {
    createBookingController,
    getAllBookingController,
    getSingleBookingController,
    deleteBookingController,
    checkAvailability,
    updateFacility,
    getSingleBookingById
};
