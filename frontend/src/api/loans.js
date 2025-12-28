import api from "./axios.js";
import { API_ENDPOINTS } from "../utils/constants.js";

export const getAllLoans = async () => {
  const response = await api.get(API_ENDPOINTS.LOANS);
  return response.data;
};

export const getLoanById = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.LOANS}/${id}`);
  return response.data;
};

export const createLoan = async (loanData) => {
  const response = await api.post(API_ENDPOINTS.LOANS, loanData);
  return response.data;
};

export const deleteLoan = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.LOANS}/${id}`);
  return response.data;
};