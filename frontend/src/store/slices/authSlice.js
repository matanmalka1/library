import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../../api/auth.js'
import { AUTH_TOKEN_KEY } from '../../utils/constants.js'
import { showNotification } from '../../utils/notifications.js'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.login(email, password)
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      showNotification('success', 'Login successful!')
      return data
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Login failed'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authApi.register(userData)
      showNotification('success', 'Registration successful! Please login.')
      return data
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || 'Registration failed'
      showNotification('error', message)
      return rejectWithValue(message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem(AUTH_TOKEN_KEY),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      localStorage.removeItem(AUTH_TOKEN_KEY)
      showNotification('success', 'Logged out successfully')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
