import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as booksApi from '../../api/books.js'
import { showNotification } from '../../utils/notifications.js'

export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await booksApi.getAllBooks()
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch books'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const addBook = createAsyncThunk(
  'books/add',
  async (bookData, { rejectWithValue }) => {
    try {
      const book = await booksApi.createBook(bookData)
      showNotification('success', 'Book added successfully!')
      return book
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to add book'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const modifyBook = createAsyncThunk(
  'books/update',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      await booksApi.updateBook(id, bookData)
      showNotification('success', 'Book updated successfully!')
      return { id, bookData }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update book'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const removeBook = createAsyncThunk(
  'books/delete',
  async (id, { rejectWithValue }) => {
    try {
      await booksApi.deleteBook(id)
      showNotification('success', 'Book deleted successfully!')
      return id
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete book'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(modifyBook.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (book) => book.bookID === action.payload.id
        )
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.bookData,
          }
        }
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (book) => book.bookID !== action.payload
        )
      })
  },
})

export default booksSlice.reducer
