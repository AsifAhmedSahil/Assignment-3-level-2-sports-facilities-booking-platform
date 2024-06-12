import express  from "express";
import { bookingControllers } from "./bookings.controller";

const router = express.Router()

router.post("/",bookingControllers.createBookingController)
router.get("/",bookingControllers.getAllBookingController)

export const bookingRoute = router