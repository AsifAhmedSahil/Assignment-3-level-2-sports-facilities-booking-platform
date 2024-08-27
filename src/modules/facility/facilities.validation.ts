import { z } from "zod";

const createFacilitiesValidation = z.object({
    body: z.object({
        name:z.string(),
        description:z.string(),
        pricePerHour:z.number(),
        location:z.string(),
        image:z.string().optional(),
        isDeleted:z.boolean().optional(),
    })
})

export const facilitiesValidaions = {
    createFacilitiesValidation
}