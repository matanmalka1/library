import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as customersApi from '../../api/customers'
import { showNotification } from '../../utils/notifications'

export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await customersApi.getAllCustomers()
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch customers'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default customersSlice.reducer
