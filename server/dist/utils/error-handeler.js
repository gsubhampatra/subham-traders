"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, res, message) => {
    const errorMessage = error instanceof Error ? error.message : message;
    console.error(errorMessage); // Log the error message to the console
    res.status(500).json({ error: errorMessage, message });
};
exports.handleError = handleError;
