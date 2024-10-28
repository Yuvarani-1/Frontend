import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import graphReducer from '../features/graphSlice';
import userSummaryReducer from '../features/userSlice';
import txnDataReducer from '../features/txnDataSlice';
import activityLogsReducer from '../features/activityLogsSlice';
import settingsReducer from '../features/settingsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    graph: graphReducer,
    userSummary: userSummaryReducer,
    txnData: txnDataReducer,
    activityLogs: activityLogsReducer,
    settings: settingsReducer,
  },
});

export default store;
