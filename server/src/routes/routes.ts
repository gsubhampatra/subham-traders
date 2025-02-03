import express, { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";
import {
  getAllDealersController,
  createDealerController,
  searchDealerController,
  deleteDealerController,
  updateDealerController,
} from "../controllers/dealer.controller";
import {
  getStockController,
  incrementStockController,
  decrementStockController,
  updateStockController,
  updateStockByTransactionController,
} from "../controllers/stock.controller";
import {
  createTransactionController,
  getAllTransactionsController,
  getTransactionsByDateController,
} from "../controllers/transaction.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  createItemController,
  deleteItemController,
  getAllItemsController,
  getItemController,
  updateItemController,
} from "../controllers/item.controller";

const router: Router = express.Router();

// Auth Routes
router.post("/register", registerController);
router.post("/login", loginController);

//Item Routes
router.post("/item", createItemController);
router.get("/items", getAllItemsController);
router.get("/item/:id", authenticate, getItemController);
router.put("/item/:id", updateItemController);
router.delete(
  "/item/:id",

  deleteItemController
);

// Dealer Routes
router.get("/dealers", getAllDealersController);
router.post("/dealer", createDealerController);
router.delete("/dealer/:id", deleteDealerController);
router.put("/dealer/:id", updateDealerController);
router.get("/dealer/search", searchDealerController);

// Stock Routes
router.get("/stock", authenticate, authorize(["ADMIN"]), getStockController);
router.post("/stock/increment", authenticate, incrementStockController);
router.post("/stock/decrement", authenticate, decrementStockController);
router.post("/stock/update", authenticate, updateStockController);
router.post(
  "/stock/update-by-transaction",
  authenticate,
  updateStockByTransactionController
);

// Transaction Routes
router.post("/transaction", authenticate, createTransactionController);
router.get("/transactions", authenticate, getAllTransactionsController);
router.get(
  "/transactions/by-date",
  authenticate,
  getTransactionsByDateController
);

export default router;
