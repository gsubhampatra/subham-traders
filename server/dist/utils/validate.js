"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = exports.stockDecrementSchema = exports.stockIncrementSchema = exports.paymentSchema = exports.saleSchema = exports.purchaseSchema = exports.itemSchema = exports.dealerSchema = exports.customerSchema = exports.accountSchema = exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema, data) => {
    try {
        return schema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const message = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");
            throw new Error(message);
        }
        throw error;
    }
};
exports.validateRequest = validateRequest;
exports.accountSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    accountNo: zod_1.z
        .string()
        .min(5, "Account number must be at least 5 characters long"),
    bankName: zod_1.z.string().min(3, "Bank name must be at least 3 characters long"),
    balance: zod_1.z.number().min(0, "Balance cannot be negative").default(0),
});
exports.customerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    contact: zod_1.z
        .string()
        .min(10, "Contact number must be at least 10 digits")
        .max(15, "Contact number too long"),
    address: zod_1.z.string().min(5, "Address must be at least 5 characters long"),
    creditBalance: zod_1.z
        .number()
        .min(0, "Credit balance cannot be negative")
        .default(0),
});
exports.dealerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    contact: zod_1.z
        .string()
        .min(10, "Contact number must be at least 10 digits")
        .max(15, "Contact number too long"),
    address: zod_1.z.string().min(5, "Address must be at least 5 characters long"),
});
exports.itemSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Item name must be at least 3 characters long"),
    unitPrice: zod_1.z.number().positive("Unit price must be a positive number"),
});
exports.purchaseSchema = zod_1.z.object({
    dealerId: zod_1.z.number().int().positive("Dealer ID must be a positive integer"),
    totalAmount: zod_1.z.number().positive("Total amount must be positive"),
    paidAmount: zod_1.z.number().min(0, "Paid amount cannot be negative"),
    items: zod_1.z.array(zod_1.z.object({
        itemId: zod_1.z.number().int().positive("Item ID must be a positive integer"),
        quantity: zod_1.z.number().positive("Quantity must be positive"),
        price: zod_1.z.number().positive("Price must be positive"),
    })),
});
exports.saleSchema = zod_1.z.object({
    customerId: zod_1.z
        .number()
        .int()
        .positive("Customer ID must be a positive integer"),
    truckNumber: zod_1.z.string().min(1, "Truck number is required"),
    totalAmount: zod_1.z.number().positive("Total amount must be positive"),
    paidAmount: zod_1.z.number().min(0, "Paid amount cannot be negative"),
    items: zod_1.z.array(zod_1.z.object({
        itemId: zod_1.z.number().int().positive("Item ID must be a positive integer"),
        quantity: zod_1.z.number().positive("Quantity must be positive"),
        price: zod_1.z.number().positive("Price must be positive"),
    })),
});
exports.paymentSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be positive"),
    accountId: zod_1.z.number().int().positive("Account ID must be a positive integer"),
    dealerId: zod_1.z.number().int().optional(),
    customerId: zod_1.z.number().int().optional(),
    message: zod_1.z.string().optional(),
});
exports.stockIncrementSchema = zod_1.z.object({
    itemId: zod_1.z.number().int().positive("Item ID must be a positive integer"),
    quantity: zod_1.z.number().positive("Quantity must be positive"),
});
exports.stockDecrementSchema = zod_1.z.object({
    itemId: zod_1.z.number().int().positive("Item ID must be a positive integer"),
    quantity: zod_1.z.number().positive("Quantity must be positive"),
});
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    PhoneNumber: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number too long"),
    role: zod_1.z.enum(["ADMIN", "STAFF"]).default("STAFF"),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long").optional(),
    email: zod_1.z.string().email("Invalid email address").optional(),
    PhoneNumber: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number too long")
        .optional(),
    role: zod_1.z.enum(["ADMIN", "STAFF"]).optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long").optional(),
});
