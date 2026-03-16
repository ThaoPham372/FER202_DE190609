import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/expenses';

export const fetchExpensesThunk = createAsyncThunk(
  'expenses/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data;
      return data.filter((e) => e.userId === userId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể tải danh sách expenses',
      );
    }
  },
);

export const addExpenseThunk = createAsyncThunk(
  'expenses/add',
  async (expense, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, expense);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể thêm expense',
      );
    }
  },
);

export const updateExpenseThunk = createAsyncThunk(
  'expenses/update',
  async ({ id, updatedExpense }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedExpense);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể cập nhật expense',
      );
    }
  },
);

export const deleteExpenseThunk = createAsyncThunk(
  'expenses/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể xóa expense',
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpensesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch expenses failed';
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.error = action.payload || 'Add expense failed';
      })
      .addCase(updateExpenseThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateExpenseThunk.rejected, (state, action) => {
        state.error = action.payload || 'Update expense failed';
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.error = action.payload || 'Delete expense failed';
      });
  },
});

export const { clearExpensesError } = expensesSlice.actions;
export default expensesSlice.reducer;

