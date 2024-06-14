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
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let message = err.message || "something went wrong";
    let errorSources = [
        {
            path: "",
            message: "something wrong!"
        }
    ];
    if (err.name === 'ValidationError') {
        const simplified = (0, handleValidationError_1.default)(err);
        errorSources = simplified.errorSources;
        // console.log(simplified)
    }
    else if (err.name === "CastError") {
        const simplified = (0, handleCastError_1.default)(err);
        errorSources = simplified.errorSources;
    }
    else if (err.code === 11000) {
        console.log(err);
        const simplified = (0, handleDuplicateError_1.default)(err);
        errorSources = simplified.errorSources;
        message = simplified.message;
    }
    if (err instanceof zod_1.ZodError) {
        // console.log("zod error",err)
        const simplified = (0, handleZodError_1.default)(err);
        errorSources = simplified.errorSources;
        message = simplified.message;
    }
    console.log("find authentication error", err);
    res.status(500).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
});
exports.default = globalErrorHandler;
