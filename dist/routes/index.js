"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facilities_route_1 = require("../modules/facility/facilities.route");
const bookings_route_1 = require("../modules/bookings/bookings.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const middleRoute = [
    {
        path: "/auth",
        route: auth_route_1.authRouter
    },
    {
        path: "/facility",
        route: facilities_route_1.facilitiesRouter
    },
    {
        path: "/bookings",
        route: bookings_route_1.bookingRoute
    },
    // {
    //     path:"/",
    //     route:bookingRoute
    // }
];
middleRoute.forEach(route => router.use(route.path, route.route));
exports.default = router;
