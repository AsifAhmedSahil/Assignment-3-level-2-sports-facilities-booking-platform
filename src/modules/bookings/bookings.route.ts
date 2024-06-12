import express  from "express";
import { bookingControllers } from "./bookings.controller";
import validationSchema from "../../middlewares/ValidationSchema";
import { bookingValidations } from "./bookings.validation";

const router = express.Router()

router.post("/",validationSchema(bookingValidations.createBookingValidation),bookingControllers.createBookingController)
router.get("/",bookingControllers.getAllBookingController)
router.delete("/:id",bookingControllers.deleteBookingController)

export const bookingRoute = router