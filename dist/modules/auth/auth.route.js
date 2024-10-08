"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", auth_controller_1.authControllers.signupController);
router.post("/adminSignup", auth_controller_1.authControllers.adminSignUpController);
router.post("/login", auth_controller_1.authControllers.loginController);
router.get("/:id", auth_controller_1.authControllers.loginController);
exports.authRouter = router;
