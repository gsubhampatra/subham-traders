import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
