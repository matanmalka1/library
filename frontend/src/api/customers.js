import api from "./axios";
import { API_ENDPOINTS } from "../utils/constants";

export const getAllCustomers = async () => {
  const response = await api.get(API_ENDPOINTS.CUSTOMERS);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.CUSTOMERS}/${id}`);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await api.put(
    `${API_ENDPOINTS.CUSTOMERS}/${id}`,
    customerData
  );
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.CUSTOMERS}/${id}`);
  return response.data;
};
