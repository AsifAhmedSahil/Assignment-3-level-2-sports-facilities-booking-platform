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
exports.userControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.createUserIntoDB(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User Create Successfully",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User Retrive Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
const getUserByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    console.log(email);
    try {
        const user = yield user_service_1.userServices.getUserByEmailFromDB(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            data: [],
        });
    }
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        console.log(email);
        const result = yield user_service_1.userServices.updateUserIntoDB(email, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: " User updated Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
exports.userControllers = {
    createUser,
    getAllUser,
    getUserByEmail,
    updateUser
};
