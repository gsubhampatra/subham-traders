"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchasesByDate = exports.getPurchasesByDealer = exports.createPurchase = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Create a Purchase
const createPurchase = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.purchaseSchema, req.body);
        // Create the purchase with related items
        const purchase = await prisma_1.default.purchase.create({
            data: {
                dealerId: validatedData.dealerId,
                totalAmount: validatedData.totalAmount,
                paidAmount: validatedData.paidAmount,
                items: {
                    create: validatedData.items.map((item) => ({
                        itemId: item.itemId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { items: true },
        });
        res.status(201).json(purchase);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating purchase");
    }
};
exports.createPurchase = createPurchase;
// Get Purchases by Dealer ID
const getPurchasesByDealer = async (req, res) => {
    try {
        const dealerId = Number(req.params.dealerId);
        const purchases = await prisma_1.default.purchase.findMany({
            where: { dealerId },
            include: { dealer: true, items: { include: { item: true } } },
        });
        res.json(purchases);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching purchases by dealer");
    }
};
exports.getPurchasesByDealer = getPurchasesByDealer;
// Get Purchases by Date
const getPurchasesByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date)
            throw new Error("Date is required");
        const purchases = await prisma_1.default.purchase.findMany({
            where: { date: new Date(date) },
            include: { dealer: true, items: { include: { item: true } } },
        });
        res.json(purchases);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching purchases by date");
    }
};
exports.getPurchasesByDate = getPurchasesByDate;
