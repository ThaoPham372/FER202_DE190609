import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const user = users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password,
      );

      if (!user) {
        return rejectWithValue('Tài khoản hoặc mật khẩu không chính xác');
      }

      // không lưu password vào store
      // eslint-disable-next-line no-unused-vars
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Không thể kết nối đến máy chủ';
      return rejectWithValue(message);
    }
  },
);

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập thất bại';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

