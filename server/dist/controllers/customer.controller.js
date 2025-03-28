"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.getCustomers = exports.createCustomer = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const validate_1 = require("../utils/validate");
const error_handeler_1 = require("../utils/error-handeler");
// Create Customer
const createCustomer = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.customerSchema, req.body);
        const customer = await prisma_1.default.customer.create({ data: validatedData });
        res.status(201).json(customer);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while creating customer");
    }
};
exports.createCustomer = createCustomer;
// Get All Customers
const getCustomers = async (_req, res) => {
    try {
        const customers = await prisma_1.default.customer.findMany();
        res.json(customers);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching customers");
    }
};
exports.getCustomers = getCustomers;
// Get Single Customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await prisma_1.default.customer.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!customer)
            throw new Error("Customer not found");
        res.json(customer);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while fetching customer");
    }
};
exports.getCustomerById = getCustomerById;
// Update Customer
const updateCustomer = async (req, res) => {
    try {
        const validatedData = (0, validate_1.validateRequest)(validate_1.customerSchema, req.body);
        const customer = await prisma_1.default.customer.update({
            where: { id: Number(req.params.id) },
            data: validatedData,
        });
        res.json(customer);
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while updating customer");
    }
};
exports.updateCustomer = updateCustomer;
// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
        await prisma_1.default.customer.delete({
            where: { id: Number(req.params.id) },
        });
        res.json({ message: "Customer deleted successfully" });
    }
    catch (error) {
        (0, error_handeler_1.handleError)(error, res, "Error while deleting customer");
    }
};
exports.deleteCustomer = deleteCustomer;
