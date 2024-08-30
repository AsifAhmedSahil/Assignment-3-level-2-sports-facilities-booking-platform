"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const bookings_controller_1 = require("./bookings.controller");
const ValidationSchema_1 = __importDefault(require("../../middlewares/ValidationSchema"));
const bookings_validation_1 = require("./bookings.validation");
const auth_1 = require("../../middlewares/auth");
const user_contant_1 = require("../user/user.contant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(user_contant_1.USER_Role.user), (0, ValidationSchema_1.default)(bookings_validation_1.bookingValidations.createBookingValidation), bookings_controller_1.bookingControllers.createBookingController);
router.get("/", (0, auth_1.auth)(user_contant_1.USER_Role.admin), bookings_controller_1.bookingControllers.getAllBookingController);
// router.get("/",bookingControllers.getAllBookingController)
router.get("/:user", (0, auth_1.auth)(user_contant_1.USER_Role.user), bookings_controller_1.bookingControllers.getSingleBookingController);
router.get("/:id", bookings_controller_1.bookingControllers.getSingleBookingById);
// router.get("/user",bookingControllers.getSingleBookingController)
router.delete("/:id", (0, auth_1.auth)(user_contant_1.USER_Role.user, user_contant_1.USER_Role.admin), bookings_controller_1.bookingControllers.deleteBookingController);
router.put("/:id", bookings_controller_1.bookingControllers.updateFacility);
// router.delete("/:id",bookingControllers.deleteBookingController) 
exports.bookingRoute = router;
