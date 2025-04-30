import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  email: string;
  userId: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthPayload {
  email: string;
  password: string;
}

import { config } from '../../../config';
const BASE_URL = config.API_URL;

// Async thunks
export const registerUser = createAsyncThunk<
  User,
  AuthPayload,
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, userData);
    localStorage.setItem("token", res.data.token);
    return {
      email: res.data.email,
      userId: res.data.userId,
      token: res.data.token,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
    return thunkAPI.rejectWithValue(
      "An unknown error occurred during registration"
    );
  }
});

export const loginUser = createAsyncThunk<
  User,
  AuthPayload,
  { rejectValue: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, userData);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    return {
      email: res.data.email,
      userId: res.data.userId,
      token: res.data.token,
    };  
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
    return thunkAPI.rejectWithValue("An unknown error occurred during login");
  }
});

const userFromStorage = localStorage.getItem('user');

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
