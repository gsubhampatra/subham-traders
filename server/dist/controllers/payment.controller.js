"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentsByDate = exports.getPaymentsByAccount = exports.getTotalAmountInAccounts = exports.recordPaymentSent = exports.recordPaymentReceived = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Record Payment Received
const recordPaymentReceived = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.paymentSchema, req.body);
        const payment = await prisma_1.default.payment.create({
            data: {
                type: "RECEIVED",
                amount: validatedData.amount,
                accountId: validatedData.accountId,
                dealerId: validatedData.dealerId,
                customerId: validatedData.customerId,
                message: validatedData.message,
            },
        });
        // Update Account Balance
        await prisma_1.default.account.update({
            where: { id: validatedData.accountId },
            data: { balance: { increment: validatedData.amount } },
        });
        // Update Customer Credit Balance
        if (validatedData.customerId) {
            await prisma_1.default.customer.update({
                where: { id: validatedData.customerId },
                data: { creditBalance: { decrement: validatedData.amount } },
            });
        }
        res.status(201).json(payment);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while recording received payment");
    }
};
exports.recordPaymentReceived = recordPaymentReceived;
// Record Payment Sent
const recordPaymentSent = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.paymentSchema, req.body);
        // Check if the account has enough balance
        const account = await prisma_1.default.account.findUnique({
            where: { id: validatedData.accountId },
        });
        if (!account || account.balance < validatedData.amount) {
            throw new Error("Insufficient balance in the account");
        }
        const payment = await prisma_1.default.payment.create({
            data: {
                type: "SENT",
                amount: validatedData.amount,
                accountId: validatedData.accountId,
                dealerId: validatedData.dealerId,
                customerId: validatedData.customerId,
                message: validatedData.message,
            },
        });
        // Deduct from Account Balance
        await prisma_1.default.account.update({
            where: { id: validatedData.accountId },
            data: { balance: { decrement: validatedData.amount } },
        });
        res.status(201).json(payment);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while recording sent payment");
    }
};
exports.recordPaymentSent = recordPaymentSent;
// Get Total Amount in All Accounts
const getTotalAmountInAccounts = async (_req, res) => {
    try {
        const total = await prisma_1.default.account.aggregate({
            _sum: { balance: true },
        });
        res.json({ totalBalance: total._sum.balance || 0 });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching total account balance");
    }
};
exports.getTotalAmountInAccounts = getTotalAmountInAccounts;
// Get Payments by Account ID
const getPaymentsByAccount = async (req, res) => {
    try {
        const accountId = Number(req.params.accountId);
        const payments = await prisma_1.default.payment.findMany({
            where: { accountId },
            include: { account: true, dealer: true, customer: true },
        });
        res.json(payments);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching payments by account");
    }
};
exports.getPaymentsByAccount = getPaymentsByAccount;
// Get Payments by Date
const getPaymentsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date)
            throw new Error("Date is required");
        const payments = await prisma_1.default.payment.findMany({
            where: { date: new Date(date) },
            include: { account: true, dealer: true, customer: true },
        });
        res.json(payments);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching payments by date");
    }
};
exports.getPaymentsByDate = getPaymentsByDate;
