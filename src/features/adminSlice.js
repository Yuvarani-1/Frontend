import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        analyticsData: [],
    },
    reducers: {
        setAnalyticsData(state, action) {
            state.analyticsData = action.payload;
        },
    },
});

export const { setAnalyticsData } = adminSlice.actions;
export default adminSlice.reducer;
