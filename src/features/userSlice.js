// userSummarySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchUserSummary = createAsyncThunk('userSummary/fetchUserSummary', async () => {
    const token = Cookies.get('jwt');
    if (!token) {
        throw new Error('No token found, please log in again.');
    }

    const response = await axios.get('http://localhost:8000/api/admin/users/summary', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    return response.data;
});

const userSummarySlice = createSlice({
    name: 'userSummary',
    initialState: {
        userSummary: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.userSummary = action.payload;
            })
            .addCase(fetchUserSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user summary.';
            });
    },
});

export default userSummarySlice.reducer;
