"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerBySale = exports.getSalesByDate = exports.getSalesByCustomer = exports.createSale = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Create a Sale
const createSale = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.saleSchema, req.body);
        // Create the sale with related items
        const sale = await prisma_1.default.sale.create({
            data: {
                customerId: validatedData.customerId,
                truckNumber: validatedData.truckNumber,
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
        res.status(201).json(sale);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating sale");
    }
};
exports.createSale = createSale;
// Get Sales by Customer ID
const getSalesByCustomer = async (req, res) => {
    try {
        const customerId = Number(req.params.customerId);
        const sales = await prisma_1.default.sale.findMany({
            where: { customerId },
            include: { customer: true, items: { include: { item: true } } },
        });
        res.json(sales);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching sales by customer");
    }
};
exports.getSalesByCustomer = getSalesByCustomer;
// Get Sales by Date
const getSalesByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date)
            throw new Error("Date is required");
        const sales = await prisma_1.default.sale.findMany({
            where: { date: new Date(date) },
            include: { customer: true, items: { include: { item: true } } },
        });
        res.json(sales);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching sales by date");
    }
};
exports.getSalesByDate = getSalesByDate;
const updateCustomerBySale = async (req, res) => {
    try {
        const { saleId, creditBalance } = req.body;
        // Validate the request body
        if (isNaN(Number(saleId))) {
            return res.status(400).json({ error: "Sale ID must be a number" });
        }
        const sale = await prisma_1.default.sale.findUnique({
            where: { id: Number(saleId) },
        });
        if (!sale) {
            return res.status(404).json({ error: "Sale not found" });
        }
        if (sale.isSaleUpdate) {
            return res.status(400).json({ error: "Sale already updated" });
        }
        let updateCreditBalance;
        if (Number(creditBalance)) {
            updateCreditBalance = Number(creditBalance);
        }
        else {
            updateCreditBalance = sale.totalAmount - sale.paidAmount;
        }
        const updatedCustomer = await prisma_1.default.customer.update({
            where: { id: sale.customerId },
            data: {
                creditBalance: {
                    increment: updateCreditBalance,
                },
            },
        });
        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        const updatedSale = await prisma_1.default.sale.update({
            where: { id: Number(saleId) },
            data: {
                isSaleUpdate: true,
            },
        });
        if (!updatedSale) {
            return res.status(404).json({ error: "Sale not found" });
        }
        res.json({ message: "Customer credit balance updated successfully" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while updating customer credit balance by sale");
    }
};
exports.updateCustomerBySale = updateCustomerBySale;
