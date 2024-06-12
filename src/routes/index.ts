import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { facilitiesRouter } from "../modules/facility/facilities.route";
import { bookingRoute } from "../modules/bookings/bookings.route";


const router  = Router()

const middleRoute = [
    {
        path:"/auth",
        route: userRouter
    },
    {
        path:"/facility",
        route: facilitiesRouter
    },
    {
        path:"/bookings",
        route: bookingRoute
    },


]

middleRoute.forEach(route => router.use(route.path,route.route))

export default router