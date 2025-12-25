import api from "./axios";
import { API_ENDPOINTS } from "../utils/constants";

export const getAllBooks = async () => {
  const response = await api.get(API_ENDPOINTS.BOOKS);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.BOOKS}/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const formData = new FormData();
  Object.keys(bookData).forEach((key) => {
    if (bookData[key] !== null && bookData[key] !== undefined) {
      formData.append(key, bookData[key]);
    }
  });

  const response = await api.post(API_ENDPOINTS.BOOKS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`${API_ENDPOINTS.BOOKS}/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.BOOKS}/${id}`);
  return response.data;
};
