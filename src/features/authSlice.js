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

// Async thunk for sending a reset email
export const sendResetEmail = createAsyncThunk('auth/sendResetEmail', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
    return response.data; // Assuming the response has a success message
  } catch (error) {
    return rejectWithValue(error.response?.data.msg || 'Something went wrong.');
  }
});

// Async thunk for resetting the password
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/reset-password', { token, newPassword: password });
    return response.data; // Assuming the response has a success message
  } catch (error) {
    return rejectWithValue(error.response?.data.msg || 'Something went wrong.');
  }
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    resetEmailMessage: '', // For forgot password success message
    resetEmailError: '',   // For forgot password error message
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload; // Set authentication status
    },
    clearMessages: (state) => {
      state.resetEmailMessage = '';
      state.resetEmailError = '';
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
      })
      // Send reset email
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.resetEmailMessage = '';
        state.resetEmailError = '';
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.resetEmailMessage = action.payload.msg; // Store success message
        state.resetEmailError = ''; // Clear any previous errors
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.resetEmailError = action.payload; // Capture the error message from the API
        state.resetEmailMessage = ''; // Clear any previous success messages
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.resetEmailMessage = '';
        state.resetEmailError = '';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetEmailMessage = action.payload.msg; // Store success message
        state.resetEmailError = ''; // Clear any previous errors
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetEmailError = action.payload; // Capture the error message from the API
        state.resetEmailMessage = ''; // Clear any previous success messages
      });
  },
});

// Export the action creators
export const { setAuthentication, clearMessages } = authSlice.actions;

export default authSlice.reducer;
