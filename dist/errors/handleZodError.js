"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message
        };
    });
    return {
        message: "Zod validation error",
        errorSources
    };
};
exports.default = handleZodError;
