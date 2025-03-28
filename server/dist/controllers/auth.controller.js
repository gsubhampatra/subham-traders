"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.login = void 0;
const auth_1 = require("../utils/auth");
const prisma_1 = __importDefault(require("../prisma"));
const error_handeler_1 = require("../utils/error-handeler");
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Email and password are required" });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        const isPasswordValid = await (0, auth_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        const token = (0, auth_1.generateToken)(user.id, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, message: "Login successful", token });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while logging in");
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while logging out");
    }
};
exports.logout = logout;
const getCurrentUser = async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.body.user.userId },
        });
        res.json(user);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while getting current user");
    }
};
exports.getCurrentUser = getCurrentUser;
