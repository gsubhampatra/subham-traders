"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealer = exports.updateDealer = exports.getDealerById = exports.getDealers = exports.createDealer = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Create Dealer
const createDealer = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.dealerSchema, req.body);
        const dealer = await prisma_1.default.dealer.create({ data: validatedData });
        res.status(201).json(dealer);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating dealer");
    }
};
exports.createDealer = createDealer;
// Get All Dealers
const getDealers = async (_req, res) => {
    try {
        const dealers = await prisma_1.default.dealer.findMany();
        res.json(dealers);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching dealers");
    }
};
exports.getDealers = getDealers;
// Get Single Dealer by ID
const getDealerById = async (req, res) => {
    try {
        const dealer = await prisma_1.default.dealer.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!dealer)
            throw new Error("Dealer not found");
        res.json(dealer);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching dealer");
    }
};
exports.getDealerById = getDealerById;
// Update Dealer
const updateDealer = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.dealerSchema, req.body);
        const dealer = await prisma_1.default.dealer.update({
            where: { id: Number(req.params.id) },
            data: validatedData,
        });
        res.json(dealer);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while updating dealer");
    }
};
exports.updateDealer = updateDealer;
// Delete Dealer
const deleteDealer = async (req, res) => {
    try {
        await prisma_1.default.dealer.delete({
            where: { id: Number(req.params.id) },
        });
        res.json({ message: "Dealer deleted successfully" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while deleting dealer");
    }
};
exports.deleteDealer = deleteDealer;
