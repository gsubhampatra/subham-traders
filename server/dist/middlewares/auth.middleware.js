"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
// Middleware to protect routes
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        console.log("Decoded token:", decoded); // Log the decoded token for debugging
        req.body.user = decoded; // Attach user info to the request
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res
            .status(403)
            .json({ success: false, message: "Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
// Middleware for role-based authorization
const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.body.user;
        if (!roles.includes(user.role)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        next();
    };
};
exports.authorize = authorize;
