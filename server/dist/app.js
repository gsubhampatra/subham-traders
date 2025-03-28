"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_1 = require("./utils/logger");
const routes_1 = __importDefault(require("./routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/", (req, res) => {
        res.json({
            success: true,
            message: "Welcome to the API",
        });
    });
    app.use("/api", routes_1.default);
    app.use((req, res, next) => {
        logger_1.logger.logRequest(req);
        next();
    });
    app.use(error_middleware_1.errorMiddleware);
    return app;
}
