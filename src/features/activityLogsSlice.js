import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchActivityLogs = createAsyncThunk('activityLogs/fetchActivityLogs', async () => {
    const response = await axios.get('http://localhost:8000/api/admin/activity-logs');
    console.log('Fetched Activity Logs:', response.data); 
    return response.data;
});

// New thunk for fetching a single activity log by ID
export const fetchActivityLogById = createAsyncThunk('activityLogs/fetchActivityLogById', async (id) => {
    const response = await axios.get(`http://localhost:8000/api/admin/activity-logs/${id}`);
    console.log('Fetched Activity Logs:', response.data); 
    return response.data;
});

const activityLogsSlice = createSlice({
    name: 'activityLogs',
    initialState: {
        logs: [],
        currentLog: null, // Add this to store a single activity log
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivityLogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchActivityLogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.logs = action.payload;
            })
            .addCase(fetchActivityLogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle fetching a single activity log
            .addCase(fetchActivityLogById.fulfilled, (state, action) => {
                state.currentLog = action.payload; // Store the fetched log
            });
    },
});

export const selectActivityLogs = (state) => state.activityLogs.logs;
export const selectActivityLog = (state) => state.activityLogs.currentLog; // Selector for current log
export const selectActivityLogsStatus = (state) => state.activityLogs.status;
export const selectActivityLogsError = (state) => state.activityLogs.error;

export default activityLogsSlice.reducer;
