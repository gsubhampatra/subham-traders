"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.getAccountById = exports.getAccounts = exports.createAccount = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Create Account
const createAccount = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.accountSchema, req.body);
        const account = await prisma_1.default.account.create({ data: validatedData });
        res.status(201).json(account);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating account");
    }
};
exports.createAccount = createAccount;
// Get All Accounts
const getAccounts = async (_req, res) => {
    try {
        const accounts = await prisma_1.default.account.findMany();
        res.json(accounts);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching accounts");
    }
};
exports.getAccounts = getAccounts;
// Get Single Account by ID
const getAccountById = async (req, res) => {
    try {
        const account = await prisma_1.default.account.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!account)
            throw new Error("Account not found");
        res.json(account);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching account");
    }
};
exports.getAccountById = getAccountById;
// Update Account
const updateAccount = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.accountSchema, req.body);
        const account = await prisma_1.default.account.update({
            where: { id: Number(req.params.id) },
            data: validatedData,
        });
        res.json(account);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while updating account");
    }
};
exports.updateAccount = updateAccount;
// Delete Account
const deleteAccount = async (req, res) => {
    try {
        await prisma_1.default.account.delete({
            where: { id: Number(req.params.id) },
        });
        res.json({ message: "Account deleted successfully" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while deleting account");
    }
};
exports.deleteAccount = deleteAccount;
