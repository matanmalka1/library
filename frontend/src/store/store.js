import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import booksReducer from './slices/booksSlice'
import authorsReducer from './slices/authorsSlice'
import customersReducer from './slices/customersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    authors: authorsReducer,
    customers: customersReducer,
  },
})
