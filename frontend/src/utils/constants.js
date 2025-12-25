export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  CUSTOMERS: "/customers",
  BOOKS: "/books",
  AUTHORS: "/authors",
  LOGIN: "/customers/login",
  REGISTER: "/customers/register",
};

export const AUTH_TOKEN_KEY = "library_auth_token";
