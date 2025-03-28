"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Clears all data from the database while preserving the schema structure
 * This utility function should be used with caution, typically in development or testing environments
 */
async function clearDatabase() {
    try {
        console.log("Starting database clearing process...");
        // Delete data in a specific order to avoid foreign key constraint issues
        // First delete dependent tables that have foreign key relationships
        console.log("Clearing PurchaseItem records...");
        await prisma_1.default.purchaseItem.deleteMany();
        console.log("Clearing SaleItem records...");
        await prisma_1.default.saleItem.deleteMany();
        console.log("Clearing Stock records...");
        await prisma_1.default.stock.deleteMany();
        console.log("Clearing Payment records...");
        await prisma_1.default.payment.deleteMany();
        console.log("Clearing Purchase records...");
        await prisma_1.default.purchase.deleteMany();
        console.log("Clearing Sale records...");
        await prisma_1.default.sale.deleteMany();
        // Now delete the main tables
        console.log("Clearing Item records...");
        await prisma_1.default.item.deleteMany();
        console.log("Clearing Dealer records...");
        await prisma_1.default.dealer.deleteMany();
        console.log("Clearing Customer records...");
        await prisma_1.default.customer.deleteMany();
        console.log("Clearing Account records...");
        await prisma_1.default.account.deleteMany();
        // Be careful with users - you might want to keep admin users
        console.log("Clearing User records...");
        await prisma_1.default.user.deleteMany();
        console.log("Database cleared successfully!");
        return { success: true, message: "Database cleared successfully" };
    }
    catch (error) {
        console.error("Error clearing database:", error);
        return {
            success: false,
            message: "Failed to clear database",
            error: error instanceof Error ? error.message : String(error)
        };
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
// Export the function for use in CLI scripts or API endpoints
exports.default = clearDatabase;
// If this file is run directly (e.g., via node clear-db.js)
if (require.main === module) {
    clearDatabase()
        .then((result) => {
        console.log(result.message);
        process.exit(result.success ? 0 : 1);
    })
        .catch((error) => {
        console.error("Unexpected error:", error);
        process.exit(1);
    });
}
