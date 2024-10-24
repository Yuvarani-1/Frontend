import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for logging in a user
export const loginUser = createAsyncThunk('auth/loginUser', async (user) => {
  const response = await axios.post('http://localhost:8000/api/auth/login', user, { withCredentials: true });
  return response.data; // Assuming your backend responds with a JWT token or user data
});

// Async thunk for registering a user
export const registerUser = createAsyncThunk('auth/registerUser', async (user) => {
  const response = await axios.post('http://localhost:8000/api/auth/register', user);
  return response.data; // Assuming your backend responds with success message or user data
});

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ email, otp }) => {
  const response = await axios.post('http://localhost:8000/api/auth/verify-otp', { email, otp }, { withCredentials: true });
  return response.data; // Assuming your backend responds with a success message or user data
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false, 
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload; // Set authentication status
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data or JWT token
        state.isAuthenticated = true; // Set authenticated to true on login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture the error
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // You can decide what to store here after registration
        state.user = action.payload; // Store user data or success message
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture the error
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data or success message
        state.isAuthenticated = true; // Set authenticated to true on successful OTP verification
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture the error
      });
  },
});

// Export the action creators
export const { setAuthentication } = authSlice.actions;

export default authSlice.reducer;
