"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const error_handeler_1 = require("../utils/error-handeler");
const validate_1 = require("../utils/validate");
const auth_1 = require("../utils/auth");
// Create User
const createUser = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.userSchema, req.body);
        const hashedPassword = await (0, auth_1.hashPassword)(validatedData.password);
        const user = await prisma_1.default.user.create({
            data: { ...validatedData, password: hashedPassword },
        });
        res.json(user);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating user");
    }
};
exports.createUser = createUser;
// Get All Users
const getUsers = async (_req, res) => {
    try {
        const users = await prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while getting users");
    }
};
exports.getUsers = getUsers;
// Get Single User by ID
const getUserById = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while getting user by ID");
    }
};
exports.getUserById = getUserById;
// Update User
const updateUser = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.updateUserSchema, req.body);
        const hashedPassword = await (0, auth_1.hashPassword)(validatedData.password);
        const user = await prisma_1.default.user.update({
            where: { id: Number(req.params.id) },
            data: {
                name: validatedData.name ? validatedData.name : undefined,
                email: validatedData.email ? validatedData.email : undefined,
                password: hashedPassword ? hashedPassword : undefined,
                PhoneNumber: validatedData.PhoneNumber
                    ? validatedData.PhoneNumber
                    : undefined,
                role: validatedData.role ? validatedData.role : undefined,
            },
        });
        res.json(user);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while updating user");
    }
};
exports.updateUser = updateUser;
// Delete User
const deleteUser = async (req, res) => {
    try {
        await prisma_1.default.user.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while deleting user");
    }
};
exports.deleteUser = deleteUser;
