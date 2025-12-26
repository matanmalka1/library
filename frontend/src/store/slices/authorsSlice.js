import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authorsApi from '../../api/authors'
import { showNotification } from '../../utils/notifications'

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await authorsApi.getAllAuthors()
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch authors'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const addAuthor = createAsyncThunk(
  'authors/add',
  async (authorData, { rejectWithValue }) => {
    try {
      const author = await authorsApi.createAuthor(authorData)
      showNotification('success', 'Author added successfully!')
      return author
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to add author'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const modifyAuthor = createAsyncThunk(
  'authors/update',
  async ({ id, authorData }, { rejectWithValue }) => {
    try {
      await authorsApi.updateAuthor(id, authorData)
      showNotification('success', 'Author updated successfully!')
      return { id, authorData }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update author'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const removeAuthor = createAsyncThunk(
  'authors/delete',
  async (id, { rejectWithValue }) => {
    try {
      await authorsApi.deleteAuthor(id)
      showNotification('success', 'Author deleted successfully!')
      return id
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete author'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(modifyAuthor.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (author) => author.AuthorID === action.payload.id
        )
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.authorData,
          }
        }
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (author) => author.AuthorID !== action.payload
        )
      })
  },
})

export default authorsSlice.reducer
