"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingModel = new mongoose_1.Schema({
    date: {
        type: String,
        required: [true, "Booking date is required"]
    },
    startTime: {
        type: String,
        required: [true, "Start Time is required"]
    },
    endTime: {
        type: String,
        required: [true, "End Time is required"]
    },
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    guestCount: {
        type: String,
        required: [true, "Guest Count is required"]
    },
    transactionId: {
        type: String
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Facilities",
        required: [true, "Which facility you want is required"]
    },
    payableAmount: {
        type: Number,
    },
    isBooked: {
        type: String,
        enum: ['confirmed', "unconfirmed", "canceled"]
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', "unpaid"]
    }
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingModel);
