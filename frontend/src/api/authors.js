import api from "./axios";
import { API_ENDPOINTS } from "../utils/constants";

export const getAllAuthors = async () => {
  const response = await api.get(API_ENDPOINTS.AUTHORS);
  return response.data;
};

export const getAuthorById = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.AUTHORS}/${id}`);
  return response.data;
};

export const createAuthor = async (authorData) => {
  const response = await api.post(API_ENDPOINTS.AUTHORS, authorData);
  return response.data;
};

export const updateAuthor = async (id, authorData) => {
  const response = await api.put(`${API_ENDPOINTS.AUTHORS}/${id}`, authorData);
  return response.data;
};

export const deleteAuthor = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.AUTHORS}/${id}`);
  return response.data;
};
