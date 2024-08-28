"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const bookings_controller_1 = require("./modules/bookings/bookings.controller");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173', "https://fortune-arena.vercel.app"], credentials: true }));
app.use("/api", routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the project - Sports Facility Booking Platform');
});
app.get("/api/check-availability", bookings_controller_1.bookingControllers.checkAvailability);
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
