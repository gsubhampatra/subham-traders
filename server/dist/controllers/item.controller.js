"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getItems = exports.createItem = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Create Item
const createItem = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.itemSchema, req.body);
        const item = await prisma_1.default.item.create({ data: validatedData });
        res.status(201).json(item);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating item");
    }
};
exports.createItem = createItem;
// Get All Items
const getItems = async (_req, res) => {
    try {
        const items = await prisma_1.default.item.findMany({
            include: { stock: true },
        });
        res.json(items);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching items");
    }
};
exports.getItems = getItems;
// Get Single Item by ID
const getItemById = async (req, res) => {
    try {
        const item = await prisma_1.default.item.findUnique({
            where: { id: Number(req.params.id) },
            include: { stock: true },
        });
        if (!item)
            throw new Error("Item not found");
        res.json(item);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching item");
    }
};
exports.getItemById = getItemById;
// Update Item
const updateItem = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.itemSchema, req.body);
        const item = await prisma_1.default.item.update({
            where: { id: Number(req.params.id) },
            data: validatedData,
        });
        res.json(item);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while updating item");
    }
};
exports.updateItem = updateItem;
// Delete Item
const deleteItem = async (req, res) => {
    try {
        await prisma_1.default.item.delete({
            where: { id: Number(req.params.id) },
        });
        res.json({ message: "Item deleted successfully" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while deleting item");
    }
};
exports.deleteItem = deleteItem;
