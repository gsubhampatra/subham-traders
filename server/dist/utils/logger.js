"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class Logger {
    info(message) {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    }
    error(message, error) {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
    }
    logRequest(req) {
        console.log(`[REQUEST] ${new Date().toISOString()}: ${req.method} ${req.url}`);
    }
}
exports.logger = new Logger();
