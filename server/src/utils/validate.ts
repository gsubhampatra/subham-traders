import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema, data: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(message);
    }
    throw error;
  }
};

export const accountSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  accountNo: z
    .string()
    .min(5, "Account number must be at least 5 characters long"),
  bankName: z.string().min(3, "Bank name must be at least 3 characters long"),
  balance: z.number().min(0, "Balance cannot be negative").default(0),
});

export const customerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number too long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  creditBalance: z
    .number()
    .min(0, "Credit balance cannot be negative")
    .default(0),
});

export const dealerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number too long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
});

export const itemSchema = z.object({
  name: z.string().min(3, "Item name must be at least 3 characters long"),
  unitPrice: z.number().positive("Unit price must be a positive number"),
});

export const purchaseSchema = z.object({
  dealerId: z.number().int().positive("Dealer ID must be a positive integer"),
  totalAmount: z.number().positive("Total amount must be positive"),
  paidAmount: z.number().min(0, "Paid amount cannot be negative"),
  items: z.array(
    z.object({
      itemId: z.number().int().positive("Item ID must be a positive integer"),
      quantity: z.number().positive("Quantity must be positive"),
      price: z.number().positive("Price must be positive"),
    })
  ),
});

export const saleSchema = z.object({
  customerId: z
    .number()
    .int()
    .positive("Customer ID must be a positive integer"),
  truckNumber: z.string().min(1, "Truck number is required"),
  totalAmount: z.number().positive("Total amount must be positive"),
  paidAmount: z.number().min(0, "Paid amount cannot be negative"),
  items: z.array(
    z.object({
      itemId: z.number().int().positive("Item ID must be a positive integer"),
      quantity: z.number().positive("Quantity must be positive"),
      price: z.number().positive("Price must be positive"),
    })
  ),
});

export const paymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  accountId: z.number().int().positive("Account ID must be a positive integer"),
  dealerId: z.number().int().optional(),
  customerId: z.number().int().optional(),
  message: z.string().optional(),
});

export const stockIncrementSchema = z.object({
  itemId: z.number().int().positive("Item ID must be a positive integer"),
  quantity: z.number().positive("Quantity must be positive"),
});

export const stockDecrementSchema = z.object({
  itemId: z.number().int().positive("Item ID must be a positive integer"),
  quantity: z.number().positive("Quantity must be positive"),
});

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  PhoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  role: z.enum(["ADMIN", "STAFF"]).default("STAFF"),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  PhoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .optional(),
  role: z.enum(["ADMIN", "STAFF"]).optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});
