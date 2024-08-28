"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const ValidationSchema_1 = __importDefault(require("../../middlewares/ValidationSchema"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, ValidationSchema_1.default)(user_validation_1.userValidations.createUserValidation), user_controller_1.userControllers.createUser);
router.get("/", user_controller_1.userControllers.getAllUser);
router.get("/:email", user_controller_1.userControllers.getAllUser);
exports.userRouter = router;
