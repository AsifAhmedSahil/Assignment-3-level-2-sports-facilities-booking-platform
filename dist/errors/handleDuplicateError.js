"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractMessage} already exists`
        }
    ];
    return {
        message: err.errmsg,
        errorSources
    };
};
exports.default = handleDuplicateError;
