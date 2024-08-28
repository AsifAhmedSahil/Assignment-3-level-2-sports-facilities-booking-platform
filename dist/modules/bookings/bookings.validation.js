"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        guestCount: zod_1.z.number(),
        user: zod_1.z.string().optional(),
        facility: zod_1.z.string(),
        transactionId: zod_1.z.string().optional(),
        payableAmount: zod_1.z.number().optional(),
        isBooked: zod_1.z.enum(['confirmed', "unconfirmed", "canceled"]).optional(),
        paymentStatus: zod_1.z.enum(['Paid', "unpaid"]).optional()
    })
});
exports.bookingValidations = {
    createBookingValidation
};
