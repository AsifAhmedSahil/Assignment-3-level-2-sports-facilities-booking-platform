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
        if (tokenWithBearer) {
            const token = tokenWithBearer.split(" ")[1];
            console.log("after cut bearer", token);
            if (!token) {
                throw new AppError_1.default(401, "Unauthorized users!");
            }
            const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            console.log(verifiedToken, "from boking contro");
            const { email } = verifiedToken;
            // console.log("email",email)
            const userinfo = yield user_model_1.User.findOne({ email: email });
            const userID = userinfo === null || userinfo === void 0 ? void 0 : userinfo._id;
            // console.log(userinfo?._id ,"user id decoded")
            const newData = Object.assign(Object.assign({}, req.body), { user: userinfo === null || userinfo === void 0 ? void 0 : userinfo._id });
            const { startTime: startTimeFromBooking, endTime: endTimeFromBooking, date } = req.body;
            const bodyDate = date;
            // check user booked same time or not
            const bookingDataCheckTime = yield bookings_model_1.Booking.find({ user: userID });
            const checkSameTimeSlot = bookingDataCheckTime.map((time) => {
                if (time.date === bodyDate && time.startTime === startTimeFromBooking && time.endTime === endTimeFromBooking) {
                    throw new AppError_1.default(401, "This time slot already booked by you");
                }
                console.log(time.date, bodyDate);
            });
            const result = yield bookings_service_1.bookingServices.createBooking(newData);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Booking created successfully",
                data: result,
            });
        }
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
const checkAvaiability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const date = req.query.date
    let date = req.query.date ? req.query.date : new Date();
    console.log(date, "date 1st");
    const todaysDate = new Date();
    // console.log(todaysDate,"todays date");
    if (date.toString() === todaysDate.toString()) {
        const getTodayDate = () => {
            const day = todaysDate.getDate().toString().padStart(2, "0");
            const month = (todaysDate.getMonth() + 1).toString().padStart(2, "0");
            const year = todaysDate.getFullYear().toString();
            return `${year}-${month}-${day}`;
        };
        const modifiedDate = getTodayDate();
        console.log(modifiedDate, "modifieddate***********");
        date = modifiedDate;
    }
    // else {
    //     const fixDateFormat = (dateString: string): string => {
    //     const [day, month, year] = dateString.split("-");
    //     return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    //   };
    //   const fixDate = fixDateFormat(date.toString());
    //   console.log(fixDate,"fixdate")
    //   date = fixDate;
    //   console.log(date)
    // }
    if (!date) {
        throw new Error("date is not define");
    }
    const result = yield bookings_service_1.bookingServices.checkSlots(date);
    console.log(result.length);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: " avaiable slots here",
        data: result,
    });
}));
exports.bookingControllers = {
    createBookingController,
    getAllBookingController,
    getSingleBookingController,
    deleteBookingController,
    checkAvaiability,
};
