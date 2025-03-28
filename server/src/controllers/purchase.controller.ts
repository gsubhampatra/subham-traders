import { Request, Response } from "express";
import prisma from "../prisma";
import { validateRequest, purchaseSchema } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Create a Purchase
export const createPurchase = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(purchaseSchema, req.body);

    // Create the purchase with related items
    const purchase = await prisma.purchase.create({
      data: {
        dealerId: validatedData.dealerId,
        totalAmount: validatedData.totalAmount,
        paidAmount: validatedData.paidAmount,
        items: {
          create: validatedData.items.map((item: any) => ({
            itemId: item.itemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(purchase);
  } catch (error) {
    handleError(error, res, "Error while creating purchase");
  }
};

// Get Purchases by Dealer ID
export const getPurchasesByDealer = async (req: Request, res: Response) => {
  try {
    const dealerId = Number(req.params.dealerId);

    const purchases = await prisma.purchase.findMany({
      where: { dealerId },
      include: { dealer: true, items: { include: { item: true } } },
    });

    res.json(purchases);
  } catch (error) {
    handleError(error, res, "Error while fetching purchases by dealer");
  }
};

// Get Purchases by Date
export const getPurchasesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) throw new Error("Date is required");

    const purchases = await prisma.purchase.findMany({
      where: { date: new Date(date as string) },
      include: { dealer: true, items: { include: { item: true } } },
    });

    res.json(purchases);
  } catch (error) {
    handleError(error, res, "Error while fetching purchases by date");
  }
};
