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
exports.auth = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenWithBearer = req.headers.authorization;
        if (!tokenWithBearer) {
            throw new AppError_1.default(401, "You are not authorized!");
        }
        if (tokenWithBearer) {
            const token = tokenWithBearer.split(" ")[1];
            console.log("after cut bearer", token);
            if (!token) {
                throw new AppError_1.default(401, "You are not authorized!");
            }
            const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            console.log(verifiedToken);
            const { role, email } = verifiedToken;
            // check user exist in database or not
            const user = yield user_model_1.User.findOne({ email });
            if (!user) {
                throw new AppError_1.default(404, "User not found!");
            }
            console.log("required roles", requiredRoles);
            console.log("roles", role);
            // console.log(requiredRoles.includes(role))
            // console.log(!requiredRoles.includes(role))
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError_1.default(401, "You are not authorized!");
            }
        }
        next();
    }));
};
exports.auth = auth;
