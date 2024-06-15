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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const facilities_model_1 = require("../facility/facilities.model");
const bookings_model_1 = require("./bookings.model");
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime, facility } = payload;
    // convert time string to number
    const startTimeHours = parseInt(startTime.split(":")[0]);
    const endTimeHours = parseInt(endTime.split(":")[0]);
    // find facility data and get per hour cost
    const facilityData = yield facilities_model_1.Facilities.findById(facility);
    const payPerHour = facilityData ? facilityData.pricePerHour : 0;
    const bookingHours = (endTimeHours - startTimeHours);
    const payableAmount = bookingHours * payPerHour;
    // console.log("payableAmount",payableAmount)
    const isBooked = "confirmed";
    const updatePayloadWithPayableAmount = Object.assign(Object.assign({}, payload), { payableAmount, isBooked });
    const result = (yield bookings_model_1.Booking.create(updatePayloadWithPayableAmount)).populate("user");
    return result;
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookings_model_1.Booking.find().populate("facility").populate("user");
    return result;
});
const getSingleUserBookings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, "i am from service");
    const result = yield bookings_model_1.Booking.find({ user: id });
    return result;
    // console.log(result,"from single user data get service")
});
const deleteBookings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookings_model_1.Booking.findByIdAndUpdate(id, { isBooked: "canceled" }, { new: true });
    return result;
});
const checkSlots = (date) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("check kar", date);
    const avaiableSlots = [];
    // define start and end of the day in 24 hr formate: convert minute for match with bookings time 
    const startDay = 0;
    const endDay = 24 * 60;
    // const startDay = "00:00"
    // const endDay = (24 * 60).toString()
    // convert hr and minute format time to min format
    const hourToMinutes = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 60 + minute;
    };
    // convert min to hr format 
    const minutesToHours = (minutes) => {
        const hours = Math.floor(minutes % 60);
        console.log(hours, "hours");
        // const mins = minutes % 60;
        // console.log(mins,"mins")
        // return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        return `${hours.toString().padStart(2, '0')}:00`;
    };
    const bookingData = yield bookings_model_1.Booking.find({ date: date });
    console.log("booking data", bookingData);
    const bookedTimeSlots = bookingData.filter((booking) => {
        const startTime = hourToMinutes(booking.startTime);
        const endTime = hourToMinutes(booking.endTime);
        console.log(startTime, endTime);
        return {
            startTime, endTime
        };
    });
    // calculate avaiable slots for this day
    let previousEndTime = startDay;
    for (const slot of bookedTimeSlots) {
        console.log("check loop", slot.startTime);
        if (parseInt(slot.startTime) > previousEndTime) {
            avaiableSlots.push({
                startTime: minutesToHours(previousEndTime),
                endTime: minutesToHours(parseInt(slot.startTime))
            });
        }
        previousEndTime = parseInt(slot.endTime);
    }
    // check if there are any slots avaiable there after last booking
    if (previousEndTime < endDay) {
        avaiableSlots.push({
            startTime: minutesToHours(previousEndTime),
            endTime: minutesToHours(endDay)
        });
    }
    return avaiableSlots;
});
exports.bookingServices = {
    createBooking,
    getAllBooking,
    deleteBookings,
    getSingleUserBookings,
    checkSlots
};
