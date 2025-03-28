"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStocks = exports.decrementStock = exports.incrementStock = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const error_handeler_1 = require("../utils/error-handeler");
// Increment Stock
const incrementStock = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        if (!itemId || !quantity || quantity <= 0) {
            throw new Error("Invalid itemId or quantity");
        }
        const stock = await prisma_1.default.stock.upsert({
            where: { itemId },
            update: { quantity: { increment: quantity } },
            create: { itemId, quantity },
        });
        res.json(stock);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while incrementing stock");
    }
};
exports.incrementStock = incrementStock;
// Decrement Stock
const decrementStock = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        if (!itemId || !quantity || quantity <= 0) {
            throw new Error("Invalid itemId or quantity");
        }
        const stock = await prisma_1.default.stock.findUnique({ where: { itemId } });
        if (!stock || stock.quantity < quantity) {
            throw new Error("Insufficient stock");
        }
        const updatedStock = await prisma_1.default.stock.update({
            where: { itemId },
            data: { quantity: { decrement: quantity } },
        });
        res.json(updatedStock);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while decrementing stock");
    }
};
exports.decrementStock = decrementStock;
// Get Stocks
const getStocks = async (req, res) => {
    try {
        const stock = await prisma_1.default.stock.findMany({
            include: { item: true },
        });
        if (!stock)
            throw new Error("Stocks not found");
        res.json(stock);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching stocks");
    }
};
exports.getStocks = getStocks;
