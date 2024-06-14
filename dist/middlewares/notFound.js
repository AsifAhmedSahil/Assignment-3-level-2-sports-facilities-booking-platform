"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (req, res, next) => {
    return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Api Not Found",
    });
};
exports.default = notFound;
