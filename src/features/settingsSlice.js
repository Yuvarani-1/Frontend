// src/redux/slices/settingsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Async thunk to fetch all settings
export const fetchAllSettings = createAsyncThunk('settings/fetchAll', async () => {
  const response = await axios.get('http://localhost:8000/api/admin/');
  return response.data;
});

// Async thunk to fetch a setting by key
export const fetchSettingByKey = createAsyncThunk('settings/fetchByKey', async (key) => {
  const response = await axios.get(`http://localhost:8000/api/admin/:key/${key}`);
  return response.data;
});

// Async thunk to create or update a setting
export const createOrUpdateSetting = createAsyncThunk('settings/createOrUpdate', async ({ key, value }) => {
  const response = await axios.post(`http://localhost:8000/api/admin/:key/${key}`, { value });
  return response.data;
});

// Async thunk to delete a setting
export const deleteSetting = createAsyncThunk('settings/delete', async (key) => {
  await axios.delete(`http://localhost:8000/api/admin/:key/${key}`);
  return key;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchAllSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSettingByKey.fulfilled, (state, action) => {
        const existingIndex = state.settings.findIndex(s => s.key === action.payload.key);
        if (existingIndex !== -1) {
          state.settings[existingIndex] = action.payload;
        } else {
          state.settings.push(action.payload);
        }
      })
      .addCase(createOrUpdateSetting.fulfilled, (state, action) => {
        const existingIndex = state.settings.findIndex(s => s.key === action.payload.key);
        if (existingIndex !== -1) {
          state.settings[existingIndex] = action.payload;
        } else {
          state.settings.push(action.payload);
        }
      })
      .addCase(deleteSetting.fulfilled, (state, action) => {
        state.settings = state.settings.filter(setting => setting.key !== action.payload);
      });
  },
});

export default settingsSlice.reducer;
