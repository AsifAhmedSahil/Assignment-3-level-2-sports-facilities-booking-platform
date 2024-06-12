import { z } from "zod";


const createBookingValidation = z.object({
    body:z.object({
        date:z.string(),
        startTime:z.string(),
        endTime:z.string(),
        user:z.string(),
        facility:z.string(),
        payableAmount:z.number(),
        isBooked:z.enum(['confirmed', "unconfirmed", "canceled"])
    })
})

export const bookingValidations = {
    createBookingValidation
}