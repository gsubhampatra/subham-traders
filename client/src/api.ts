import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_ROUTE = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
  },
  ITEM: {
    GET_ALL: "/items",
    GET_ONE: "/item/:id",
    CREATE: "/item",
    UPDATE: "/item/:id",
    DELETE: "/item/:id",
  },
  DEALER: {
    GET_ALL: "/dealers",
    CREATE: "/dealer",
    DELETE: "/dealer/:id",
    UPDATE: "/dealer/:id",
    SEARCH: "/dealer/search",
  },
  STOCK: {
    GET_ALL: "/stock",
    INCREMENT: "/stock/increment",
    DECREMENT: "/stock/decrement",
    UPDATE: "/stock/update",
    UPDATE_BY_TRANSACTION: "/stock/update-by-transaction",
  },
  TRANSACTION: {
    GET_ALL: "/transactions",
    CREATE: "/transaction",
    GET_BY_DATE: "/transactions/by-date",
  },
};
