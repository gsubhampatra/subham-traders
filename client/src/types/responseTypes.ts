// Base model interfaces
export interface Item {
  id: number;
  name: string;
  unitPrice: number;
  stock?: Stock;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stock {
  id: number;
  itemId: number;
  quantity: number;
  item: Item;
  updatedAt: Date;
}

export interface Dealer {
  id: number;
  name: string;
  contact: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: number;
  dealerId: number;
  userId: number;
  totalPrice: number;
  date: Date;
  createdAt: Date;
  dealer: Dealer;
  items: TransactionItem[];
}

export interface TransactionItem {
  id: number;
  itemId: number;
  transactionId: number;
  quantity: number;
  price: number;
  item: Item;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface ItemsResponse extends ApiResponse {
  items: Item[];
}

export interface ItemResponse extends ApiResponse {
  item: Item;
}

export interface StockResponse extends ApiResponse {
  stocks: Stock[];
}

export interface DealerResponse extends ApiResponse {
  dealers: Dealer[];
}

export interface TransactionResponse extends ApiResponse {
  transactions: Transaction[];
}

export interface UserResponse extends ApiResponse {
  users: User[];
}
