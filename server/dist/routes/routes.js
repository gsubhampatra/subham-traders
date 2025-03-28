"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const customer_controller_1 = require("../controllers/customer.controller");
const dealer_controller_1 = require("../controllers/dealer.controller");
const item_controller_1 = require("../controllers/item.controller");
const payment_controller_1 = require("../controllers/payment.controller");
const purchase_controller_1 = require("../controllers/purchase.controller");
const sale_controller_1 = require("../controllers/sale.controller");
const user_controller_1 = require("../controllers/user.controller");
const stock_controller_1 = require("../controllers/stock.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Auth Routes
router.post("/login", auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.get("/current-user", auth_middleware_1.authenticate, auth_controller_1.getCurrentUser);
// Account Routes
router.post("/account", auth_middleware_1.authenticate, account_controller_1.createAccount);
router.get("/accounts", auth_middleware_1.authenticate, account_controller_1.getAccounts);
router.get("/account/:id", auth_middleware_1.authenticate, account_controller_1.getAccountById);
router.put("/account/:id", auth_middleware_1.authenticate, account_controller_1.updateAccount);
router.delete("/account/:id", auth_middleware_1.authenticate, account_controller_1.deleteAccount);
// Customer Routes
router.post("/customer", auth_middleware_1.authenticate, customer_controller_1.createCustomer);
router.get("/customers", auth_middleware_1.authenticate, customer_controller_1.getCustomers);
router.get("/customer/:id", auth_middleware_1.authenticate, customer_controller_1.getCustomerById);
router.put("/customer/:id", auth_middleware_1.authenticate, customer_controller_1.updateCustomer);
router.delete("/customer/:id", auth_middleware_1.authenticate, customer_controller_1.deleteCustomer);
// Dealer Routes
router.post("/dealer", auth_middleware_1.authenticate, dealer_controller_1.createDealer);
router.get("/dealers", auth_middleware_1.authenticate, dealer_controller_1.getDealers);
router.get("/dealer/:id", auth_middleware_1.authenticate, dealer_controller_1.getDealerById);
router.put("/dealer/:id", auth_middleware_1.authenticate, dealer_controller_1.updateDealer);
router.delete("/dealer/:id", auth_middleware_1.authenticate, dealer_controller_1.deleteDealer);
// Item Routes
router.post("/item", auth_middleware_1.authenticate, item_controller_1.createItem);
router.get("/items", auth_middleware_1.authenticate, item_controller_1.getItems);
router.get("/item/:id", auth_middleware_1.authenticate, item_controller_1.getItemById);
router.put("/item/:id", auth_middleware_1.authenticate, item_controller_1.updateItem);
router.delete("/item/:id", auth_middleware_1.authenticate, item_controller_1.deleteItem);
// Payment Routes
router.post("/payment/received", auth_middleware_1.authenticate, payment_controller_1.recordPaymentReceived);
router.post("/payment/sent", auth_middleware_1.authenticate, payment_controller_1.recordPaymentSent);
router.get("/account/:accountId/payments", auth_middleware_1.authenticate, payment_controller_1.getPaymentsByAccount);
router.get("/payment/date", auth_middleware_1.authenticate, payment_controller_1.getPaymentsByDate);
router.get("/payment/accounts/total", auth_middleware_1.authenticate, payment_controller_1.getTotalAmountInAccounts);
// Purchase Routes
router.post("/purchase", auth_middleware_1.authenticate, purchase_controller_1.createPurchase);
router.get("/purchases/dealer/:dealerId", auth_middleware_1.authenticate, purchase_controller_1.getPurchasesByDealer);
router.get("/purchase/date", auth_middleware_1.authenticate, purchase_controller_1.getPurchasesByDate);
// Sale Routes
router.post("/sale", auth_middleware_1.authenticate, sale_controller_1.createSale);
router.get("/sales/customer/:customerId", auth_middleware_1.authenticate, sale_controller_1.getSalesByCustomer);
router.get("/sale/date", auth_middleware_1.authenticate, sale_controller_1.getSalesByDate);
router.put("/sale/customer", auth_middleware_1.authenticate, sale_controller_1.updateCustomerBySale);
// Stock Routes
router.post("/stock/increment", auth_middleware_1.authenticate, stock_controller_1.incrementStock);
router.post("/stock/decrement", auth_middleware_1.authenticate, stock_controller_1.decrementStock);
router.get("/stock", auth_middleware_1.authenticate, stock_controller_1.getStocks);
// User Routes
router.post("/user", user_controller_1.createUser);
router.get("/users", auth_middleware_1.authenticate, user_controller_1.getUsers);
router.get("/user/:id", auth_middleware_1.authenticate, user_controller_1.getUserById);
router.put("/user/:id", auth_middleware_1.authenticate, user_controller_1.updateUser);
router.delete("/user/:id", auth_middleware_1.authenticate, user_controller_1.deleteUser);
exports.default = router;
