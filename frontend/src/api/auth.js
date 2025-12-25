import api from "./axios";
import { API_ENDPOINTS } from "../utils/constants";

export const login = async (email, password) => {
  const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post(API_ENDPOINTS.REGISTER, userData);
  return response.data;
};
