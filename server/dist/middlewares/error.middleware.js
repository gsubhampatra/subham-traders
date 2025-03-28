"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../utils/logger");
function errorMiddleware(error, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    logger_1.logger.error(error.message, error);
    res.status(statusCode).json({
        success: false,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
}
