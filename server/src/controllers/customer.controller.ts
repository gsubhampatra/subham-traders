import { Request, Response } from "express";
import prisma from "../prisma";
import { validateRequest, customerSchema } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Create Customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(customerSchema, req.body);
    const customer = await prisma.customer.create({ data: validatedData });
    res.status(201).json(customer);
  } catch (error) {
    handleError(error, res, "Error while creating customer");
  }
};

// Get All Customers
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    handleError(error, res, "Error while fetching customers");
  }
};

// Get Single Customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!customer) throw new Error("Customer not found");
    res.json(customer);
  } catch (error) {
    handleError(error, res, "Error while fetching customer");
  }
};

// Update Customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(customerSchema, req.body);
    const customer = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data: validatedData,
    });
    res.json(customer);
  } catch (error) {
    handleError(error, res, "Error while updating customer");
  }
};

// Delete Customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await prisma.customer.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    handleError(error, res, "Error while deleting customer");
  }
};
