export interface AccountInput {
  name: string;
  accountNo: string;
  bankName: string;
  balance?: number; // Defaults to 0 on the server side
}

export interface CustomerInput {
  name: string;
  contact: string;
  address: string;
  creditBalance?: number; // Defaults to 0 on the server side
}

export interface DealerInput {
  name: string;
  contact: string;
  address: string;
}

export interface ItemInput {
  name: string;
  unitPrice: number;
}

export interface PurchaseItemInput {
  itemId: number;
  quantity: number;
  price: number;
}

export interface PurchaseInput {
  dealerId: number;
  totalAmount: number;
  paidAmount: number;
  items: PurchaseItemInput[];
}

export interface SaleItemInput {
  itemId: number;
  quantity: number;
  price: number;
}

export interface SaleInput {
  customerId: number;
  truckNumber: string;
  totalAmount: number;
  paidAmount: number;
  items: SaleItemInput[];
}

export interface PaymentInput {
  amount: number;
  accountId: number;
  dealerId?: number;
  customerId?: number;
  message?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  PhoneNumber: string;
}

export interface UpdateCustomerBySaleInput {
  saleId: number;
  creditBalance?: number;
}
