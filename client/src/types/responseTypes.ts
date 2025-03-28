// Common API Response Interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error: string;
}

// Account Response
export interface AccountResponse {
  id: number;
  name: string;
  accountNo: string;
  bankName: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

// Customer Response
export interface CustomerResponse {
  id: number;
  name: string;
  contact: string;
  address: string;
  creditBalance: number;
  createdAt: string;
  updatedAt: string;
}

// Dealer Response
export interface DealerResponse {
  id: number;
  name: string;
  contact: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// Item and Stock Responses
export interface StockResponse {
  id: number;
  itemId: number;
  quantity: number;
  updatedAt: string;
  // Optionally include the related item details
  item?: ItemResponse;
}

export interface ItemResponse {
  id: number;
  name: string;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
  stock?: StockResponse | null;
}

// Purchase Responses
export interface PurchaseItemResponse {
  id: number;
  purchaseId: number;
  itemId: number;
  quantity: number;
  price: number;
  // Optionally include related item details
  item?: ItemResponse;
}

export interface PurchaseResponse {
  id: number;
  dealerId: number;
  totalAmount: number;
  paidAmount: number;
  date: string;
  createdAt: string;
  items: PurchaseItemResponse[];
  // Optionally include dealer details
  dealer?: DealerResponse;
}

// Sale Responses
export interface SaleItemResponse {
  id: number;
  saleId: number;
  itemId: number;
  quantity: number;
  price: number;
  // Optionally include related item details
  item?: ItemResponse;
}

export interface SaleResponse {
  id: number;
  customerId: number;
  truckNumber: string;
  totalAmount: number;
  paidAmount: number;
  date: string;
  createdAt: string;
  items: SaleItemResponse[];
  // Optionally include customer details
  customer?: CustomerResponse;
}

// Payment Responses
export type PaymentType = "RECEIVED" | "SENT";

export interface PaymentResponse {
  id: number;
  type: PaymentType;
  amount: number;
  accountId: number;
  dealerId?: number | null;
  customerId?: number | null;
  message?: string | null;
  date: string;
  createdAt: string;
  // Optionally include related account, dealer, and customer details
  account?: AccountResponse;
  dealer?: DealerResponse;
  customer?: CustomerResponse;
}

// User Response
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  PhoneNumber: string;
  role: "ADMIN" | "STAFF";
  createdAt: string;
  updatedAt: string;
}

// Auth Responses
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}