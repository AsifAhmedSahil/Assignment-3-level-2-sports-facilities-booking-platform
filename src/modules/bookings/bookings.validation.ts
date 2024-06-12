import { z } from "zod";


const createBookingValidation = z.object({
    body:z.object({
        date:z.string(),
        startTime:z.string(),
        endTime:z.string(),
        user:z.string(),
        facility:z.string(),
        payableAmount:z.number().optional(),
        isBooked:z.enum(['confirmed', "unconfirmed", "canceled"]).optional()
    })
})

export const bookingValidations = {
    createBookingValidation
}