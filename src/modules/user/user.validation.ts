import { z } from "zod";

const createUserValidation = z.object({
    body: z.object({
        name:z.string(),
        email:z.string(),
        password: z.string(),
        phone:z.string(),
        image:z.string(),
        role:z.enum(['user','admin']),
        address:z.string()

    })
})

export const userValidations = {
    createUserValidation

}