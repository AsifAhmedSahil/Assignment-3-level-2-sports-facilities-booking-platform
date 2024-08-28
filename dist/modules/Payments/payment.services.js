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
exports.paymentServices = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const Payments_util_1 = require("./Payments.util");
const bookings_model_1 = require("../bookings/bookings.model");
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify payment
        const verifyResponse = yield (0, Payments_util_1.verifyPayment)(transactionId);
        let bookingDetails = null;
        if (verifyResponse && verifyResponse.pay_status === "Successful") {
            // Retrieve booking details
            const booking = yield bookings_model_1.Booking.findOne({ transactionId }).exec();
            if (booking) {
                // Extract booking details with type conversion
                bookingDetails = {
                    firstName: booking.firstName || "N/A",
                    lastName: booking.lastName || "N/A",
                    bookingDate: booking.date || "N/A",
                    startTime: booking.startTime || "N/A",
                    endTime: booking.endTime || "N/A",
                    guestCount: typeof booking.guestCount === 'number' ? booking.guestCount : parseInt(booking.guestCount, 10) || 0,
                    paymentStatus: "Paid",
                };
                // Update booking payment status
                yield bookings_model_1.Booking.findOneAndUpdate({ transactionId }, { paymentStatus: "Paid" }, { new: true } // Optionally return the updated document
                );
            }
            else {
                console.warn(`No booking found with transactionId: ${transactionId}`);
            }
        }
        // Read and modify HTML template
        const filepath = (0, path_1.join)(__dirname, '../../views/confirmation.html');
        let template = (0, fs_1.readFileSync)(filepath, "utf-8");
        // Replace placeholders with booking details
        if (bookingDetails) {
            template = template
                .replace("{{firstName}}", bookingDetails.firstName)
                .replace("{{lastName}}", bookingDetails.lastName)
                .replace("{{bookingDate}}", bookingDetails.bookingDate)
                .replace("{{startTime}}", bookingDetails.startTime)
                .replace("{{endTime}}", bookingDetails.endTime)
                .replace("{{guestCount}}", bookingDetails.guestCount.toString())
                .replace("{{paymentStatus}}", bookingDetails.paymentStatus);
        }
        // Replace status message
        template = template.replace("{{message}}", status);
        return template;
    }
    catch (error) {
        console.error("Error processing confirmation:", error);
        throw new Error("Failed to process confirmation.");
    }
});
exports.paymentServices = {
    confirmationService,
};
