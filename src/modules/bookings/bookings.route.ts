import express  from "express";
import { bookingControllers } from "./bookings.controller";
import validationSchema from "../../middlewares/ValidationSchema";
import { bookingValidations } from "./bookings.validation";
import { auth } from "../../middlewares/auth";
import { USER_Role } from "../user/user.contant";

const router = express.Router()

router.post("/",auth(USER_Role.user),validationSchema(bookingValidations.createBookingValidation),bookingControllers.createBookingController)
router.get("/",auth(USER_Role.admin),bookingControllers.getAllBookingController)
router.delete("/:id",auth(USER_Role.user),bookingControllers.deleteBookingController)

export const bookingRoute = router