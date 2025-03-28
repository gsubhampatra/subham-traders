import { Request, Response } from "express";
import prisma from "../prisma";
import { saleSchema, validateRequest } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Create a Sale
export const createSale = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(saleSchema, req.body);

    // Create the sale with related items
    const sale = await prisma.sale.create({
      data: {
        customerId: validatedData.customerId,
        truckNumber: validatedData.truckNumber,
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

    res.status(201).json(sale);
  } catch (error) {
    handleError(error, res, "Error while creating sale");
  }
};

// Get Sales by Customer ID
export const getSalesByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.customerId);

    const sales = await prisma.sale.findMany({
      where: { customerId },
      include: { customer: true, items: { include: { item: true } } },
    });

    res.json(sales);
  } catch (error) {
    handleError(error, res, "Error while fetching sales by customer");
  }
};

// Get Sales by Date
export const getSalesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) throw new Error("Date is required");

    const sales = await prisma.sale.findMany({
      where: { date: new Date(date as string) },
      include: { customer: true, items: { include: { item: true } } },
    });

    res.json(sales);
  } catch (error) {
    handleError(error, res, "Error while fetching sales by date");
  }
};

export const updateCustomerBySale = async (req: Request, res: Response) => {
  try {
    const { saleId, creditBalance } = req.body;

    // Validate the request body
    if (isNaN(Number(saleId))) {
      return res.status(400).json({ error: "Sale ID must be a number" });
    }

    const sale = await prisma.sale.findUnique({
      where: { id: Number(saleId) },
    });

    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    if (sale.isSaleUpdate) {
      return res.status(400).json({ error: "Sale already updated" });
    }

    let updateCreditBalance: number;
    if (Number(creditBalance)) {
      updateCreditBalance = Number(creditBalance);
    } else {
      updateCreditBalance = sale.totalAmount - sale.paidAmount;
    }

    const updatedCustomer = await prisma.customer.update({
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
    const updatedSale = await prisma.sale.update({
      where: { id: Number(saleId) },
      data: {
        isSaleUpdate: true,
      },
    });
    if (!updatedSale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.json({ message: "Customer credit balance updated successfully" });
  } catch (error) {
    handleError(
      error,
      res,
      "Error while updating customer credit balance by sale"
    );
  }
};
