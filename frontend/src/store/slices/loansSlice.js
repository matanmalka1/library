import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as loansApi from "../../api/loans.js";
import { showNotification } from "../../utils/notifications.js";

export const fetchLoans = createAsyncThunk(
  "loans/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await loansApi.getAllLoans();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to fetch loans";
      showNotification("error", message);
      return rejectWithValue(message);
    }
  }
);

export const addLoan = createAsyncThunk(
  "loans/add",
  async (loanData, { rejectWithValue }) => {
    try {
      const loan = await loansApi.createLoan(loanData);
      showNotification("success", "Loan created successfully!");
      return loan;
    } catch (error) {
      const message = error.response?.data?.error || "Failed to create loan";
      showNotification("error", message);
      return rejectWithValue(message);
    }
  }
);

export const removeLoan = createAsyncThunk(
  "loans/delete",
  async (id, { rejectWithValue }) => {
    try {
      await loansApi.deleteLoan(id);
      showNotification("success", "Loan deleted successfully!");
      return id;
    } catch (error) {
      const message = error.response?.data?.error || "Failed to delete loan";
      showNotification("error", message);
      return rejectWithValue(message);
    }
  }
);

const loansSlice = createSlice({
  name: "loans",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeLoan.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (loan) => loan.LoanID !== action.payload
        );
      });
  },
});

export default loansSlice.reducer;
