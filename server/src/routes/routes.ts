import { Router } from "express";
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from "../controllers/account.controller";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";
import {
  createDealer,
  getDealers,
  getDealerById,
  updateDealer,
  deleteDealer,
} from "../controllers/dealer.controller";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";
import {
  recordPaymentReceived,
  recordPaymentSent,
  getTotalAmountInAccounts,
  getPaymentsByAccount,
  getPaymentsByDate,
} from "../controllers/payment.controller";
import {
  createPurchase,
  getPurchasesByDealer,
  getPurchasesByDate,
} from "../controllers/purchase.controller";
import {
  createSale,
  getSalesByCustomer,
  getSalesByDate,
  updateCustomerBySale,
} from "../controllers/sale.controller";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import {
  decrementStock,
  getStocks,
  incrementStock,
} from "../controllers/stock.controller";
import { getCurrentUser, login, logout } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Auth Routes
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", authenticate, getCurrentUser);

// Account Routes
router.post("/account", authenticate, createAccount);
router.get("/accounts", authenticate, getAccounts);
router.get("/account/:id", authenticate, getAccountById);
router.put("/account/:id", authenticate, updateAccount);
router.delete("/account/:id", authenticate, deleteAccount);

// Customer Routes
router.post("/customer", authenticate, createCustomer);
router.get("/customers", authenticate, getCustomers);
router.get("/customer/:id", authenticate, getCustomerById);
router.put("/customer/:id", authenticate, updateCustomer);
router.delete("/customer/:id", authenticate, deleteCustomer);
// Dealer Routes
router.post("/dealer", authenticate, createDealer);
router.get("/dealers", authenticate, getDealers);
router.get("/dealer/:id", authenticate, getDealerById);
router.put("/dealer/:id", authenticate, updateDealer);
router.delete("/dealer/:id", authenticate, deleteDealer);

// Item Routes
router.post("/item", authenticate, createItem);
router.get("/items", authenticate, getItems);
router.get("/item/:id", authenticate, getItemById);
router.put("/item/:id", authenticate, updateItem);
router.delete("/item/:id", authenticate, deleteItem);

// Payment Routes
router.post("/payment/received", authenticate, recordPaymentReceived);
router.post("/payment/sent", authenticate, recordPaymentSent);
router.get("/account/:accountId/payments", authenticate, getPaymentsByAccount);
router.get("/payment/date", authenticate, getPaymentsByDate);
router.get("/payment/accounts/total", authenticate, getTotalAmountInAccounts);

// Purchase Routes
router.post("/purchase", authenticate, createPurchase);
router.get("/purchases/dealer/:dealerId", authenticate, getPurchasesByDealer);
router.get("/purchase/date", authenticate, getPurchasesByDate);

// Sale Routes
router.post("/sale", authenticate, createSale);
router.get("/sales/customer/:customerId", authenticate, getSalesByCustomer);
router.get("/sale/date", authenticate, getSalesByDate);
router.put("/sale/customer", authenticate, updateCustomerBySale);

// Stock Routes
router.post("/stock/increment", authenticate, incrementStock);
router.post("/stock/decrement", authenticate, decrementStock);
router.get("/stock", authenticate, getStocks);

// User Routes
router.post("/user", createUser);
router.get("/users", authenticate, getUsers);
router.get("/user/:id", authenticate, getUserById);
router.put("/user/:id", authenticate, updateUser);
router.delete("/user/:id", authenticate, deleteUser);

export default router;
