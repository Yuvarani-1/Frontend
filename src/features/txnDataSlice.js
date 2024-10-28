// store/txnDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTxnData = createAsyncThunk('txnData/fetchTxnData', async () => {
  const response = await fetch('http://localhost:8000/api/admin/txn-data', {
    credentials: 'include', // Include cookies if needed
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
});

const txnDataSlice = createSlice({
  name: 'txnData',
  initialState: {
    data: [],
    loading: false,
    error: null,
    timeRange: 'day', // Default time range
  },
  reducers: {
    setTimeRange(state, action) {
      state.timeRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTxnData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTxnData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the fetched data
      })
      .addCase(fetchTxnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setTimeRange } = txnDataSlice.actions;
export const selectTxnData = (state) => state.txnData;

export default txnDataSlice.reducer;
