// src/store/graphSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from the backend
export const fetchGraphData = createAsyncThunk('graph/fetchGraphData', async () => {
    const response = await axios.get('YOUR_BACKEND_API_URL'); // Replace with your API endpoint
    return response.data;
});

const graphSlice = createSlice({
    name: 'graph',
    initialState: {
        data: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setGraphData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGraphData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGraphData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Assuming the action.payload contains an array of user objects
                state.data = action.payload.map((user) => ({
                    month: user.userId, // You may want to change this to something meaningful
                    value: Math.floor(Math.random() * 100), // Dummy values for demonstration
                }));
            })
            .addCase(fetchGraphData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setGraphData } = graphSlice.actions;
export default graphSlice.reducer;
