import { Request, Response } from "express";
import prisma from "../prisma";
import { paymentSchema, validateRequest } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Record Payment Received
export const recordPaymentReceived = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(paymentSchema, req.body);

    const payment = await prisma.payment.create({
      data: {
        type: "RECEIVED",
        amount: validatedData.amount,
        accountId: validatedData.accountId,
        dealerId: validatedData.dealerId,
        customerId: validatedData.customerId,
        message: validatedData.message,
      },
    });

    // Update Account Balance
    await prisma.account.update({
      where: { id: validatedData.accountId },
      data: { balance: { increment: validatedData.amount } },
    });

    // Update Customer Credit Balance
    if (validatedData.customerId) {
      await prisma.customer.update({
        where: { id: validatedData.customerId },
        data: { creditBalance: { decrement: validatedData.amount } },
      });
    }

    res.status(201).json(payment);
  } catch (error) {
    handleError(error, res, "Error while recording received payment");
  }
};

// Record Payment Sent
export const recordPaymentSent = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(paymentSchema, req.body);

    // Check if the account has enough balance
    const account = await prisma.account.findUnique({
      where: { id: validatedData.accountId },
    });

    if (!account || account.balance < validatedData.amount) {
      throw new Error("Insufficient balance in the account");
    }

    const payment = await prisma.payment.create({
      data: {
        type: "SENT",
        amount: validatedData.amount,
        accountId: validatedData.accountId,
        dealerId: validatedData.dealerId,
        customerId: validatedData.customerId,
        message: validatedData.message,
      },
    });

    // Deduct from Account Balance
    await prisma.account.update({
      where: { id: validatedData.accountId },
      data: { balance: { decrement: validatedData.amount } },
    });

    res.status(201).json(payment);
  } catch (error) {
    handleError(error, res, "Error while recording sent payment");
  }
};

// Get Total Amount in All Accounts
export const getTotalAmountInAccounts = async (_req: Request, res: Response) => {
  try {
    const total = await prisma.account.aggregate({
      _sum: { balance: true },
    });

    res.json({ totalBalance: total._sum.balance || 0 });
  } catch (error) {
    handleError(error, res, "Error while fetching total account balance");
  }
};

// Get Payments by Account ID
export const getPaymentsByAccount = async (req: Request, res: Response) => {
  try {
    const accountId = Number(req.params.accountId);

    const payments = await prisma.payment.findMany({
      where: { accountId },
      include: { account: true, dealer: true, customer: true },
    });

    res.json(payments);
  } catch (error) {
    handleError(error, res, "Error while fetching payments by account");
  }
};

// Get Payments by Date
export const getPaymentsByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) throw new Error("Date is required");

    const payments = await prisma.payment.findMany({
      where: { date: new Date(date as string) },
      include: { account: true, dealer: true, customer: true },
    });

    res.json(payments);
  } catch (error) {
    handleError(error, res, "Error while fetching payments by date");
  }
};
