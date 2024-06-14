"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const signupController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.signup(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User Registered Successfully",
        data: result,
    });
}));
const loginController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.login(req.body);
    console.log("result from login", result);
    const { accessToken, refreshToken, user } = result;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config_1.default.node_env === 'production'
    });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User Logged In Successfully",
        token: accessToken,
        data: user,
    });
}));
exports.authControllers = {
    signupController,
    loginController
};
