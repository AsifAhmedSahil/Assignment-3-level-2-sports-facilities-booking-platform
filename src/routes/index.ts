import { Router } from "express";
import { userRouter } from "../modules/user/user.route";


const router  = Router()

const middleRoute = [
    {
        path:"/auth",
        route: userRouter
    }


]

middleRoute.forEach(route => router.use(route.path,route.route))

export default router