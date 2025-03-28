import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const API_ROUTE = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    CURRENT_USER: "/current-user",
  },
  ACCOUNT: {
    CREATE: "/account",
    GET_ALL: "/accounts",
    GET_ONE: "/account/:id",
    UPDATE: "/account/:id",
    DELETE: "/account/:id",
  },
  CUSTOMER: {
    CREATE: "/customer",
    GET_ALL: "/customers",
    GET_ONE: "/customer/:id",
    UPDATE: "/customer/:id",
    DELETE: "/customer/:id",
  },
  DEALER: {
    CREATE: "/dealer",
    GET_ALL: "/dealers",
    GET_ONE: "/dealer/:id",
    UPDATE: "/dealer/:id",
    DELETE: "/dealer/:id",
  },
  ITEM: {
    CREATE: "/item",
    GET_ALL: "/items",
    GET_ONE: "/item/:id",
    UPDATE: "/item/:id",
    DELETE: "/item/:id",
  },
  PAYMENT: {
    CREATE_RECEIVED: "/payment/received",
    CREATE_SENT: "/payment/sent",
    GET_BY_ACCOUNT: "/account/:accountId/payments",
    GET_BY_DATE: "/payment/date",
    GET_TOTAL_AMOUNT: "/payment/accounts/total",
  },
  PURCHASE: {
    CREATE: "/purchase",
    GET_BY_DEALER: "/purchases/dealer/:dealerId",
    GET_BY_DATE: "/purchase/date",
  },
  SALE: {
    CREATE: "/sale",
    GET_BY_CUSTOMER: "/sales/customer/:customerId",
    GET_BY_DATE: "/sale/date",
    UPDATE_CUSTOMER: "/sale/customer",
  },
  STOCK: {
    INCREMENT: "/stock/increment",
    DECREMENT: "/stock/decrement",
    GET_ALL: "/stock",
  },
  USER: {
    CREATE: "/user",
    GET_ALL: "/users",
    GET_ONE: "/user/:id",
    UPDATE: "/user/:id",
    DELETE: "/user/:id",
  },
};

export default api;
