import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import booksReducer from './slices/booksSlice.js'
import authorsReducer from './slices/authorsSlice.js'
import customersReducer from './slices/customersSlice.js'
import loansReducer from './slices/loansSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    authors: authorsReducer,
    customers: customersReducer,
    loans: loansReducer,
  },
})