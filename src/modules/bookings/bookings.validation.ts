import { z } from "zod";


const createBookingValidation = z.object({
    body:z.object({
        date:z.string(),
        startTime:z.string(),
        endTime:z.string(),
        firstName:z.string(),
        lastName:z.string(),
        guestCount:z.number(),
        user:z.string().optional(),
        facility:z.string(),
        transactionId:z.string().optional(),
        payableAmount:z.number().optional(),
        isBooked:z.enum(['confirmed', "unconfirmed", "canceled"]).optional(),
        paymentStatus:z.enum(['Paid',  "unpaid"]).optional()
    })
})

export const bookingValidations = {
    createBookingValidation
}