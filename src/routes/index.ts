import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { facilitiesRouter } from "../modules/facility/facilities.route";


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


]

middleRoute.forEach(route => router.use(route.path,route.route))

export default router