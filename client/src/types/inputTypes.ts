// Auth Input Types
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
}

export interface LoginInput {
  email: string;
  password: string;
}

// Item Input Types
export interface CreateItemInput {
  name: string;
  unitPrice: number;
}

export interface UpdateItemInput {
  id: number;
  name?: string;
  unitPrice?: number;
}

// Stock Input Types
export interface StockOperationInput {
  itemId: number;
  quantity: number;
}

export interface UpdateStockByTransactionInput {
  transactionId: number;
}

// Dealer Input Types
export interface CreateDealerInput {
  name: string;
  contact: string;
  address: string;
}

export interface UpdateDealerInput {
  id: number;
  name?: string;
  contact?: string;
  address?: string;
}

export interface SearchDealerInput {
  name: string;
}

// Transaction Input Types
export interface TransactionItemInput {
  itemId: number;
  quantity: number;
  price: number;
}

export interface CreateTransactionInput {
  dealerId: number;
  userId: number;
  items: TransactionItemInput[];
  totalAmount: number;
  paidAmount: number;
}

export interface TransactionDateRangeInput {
  startDate: Date;
  endDate: Date;
}
