"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        const app = (0, app_1.createApp)();
        app.listen(PORT, () => {
            logger_1.logger.info(`Server running on port http://localhost:${PORT}`);
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to start server", error);
        process.exit(1);
    }
}
startServer();
