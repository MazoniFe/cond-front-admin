import { configureStore } from '@reduxjs/toolkit';

import reportReducer from '../features/ReportSlice';
import userReducer from '../features/UserSlice';
import residentReducer from '../features/ResidentSlice';

const store = configureStore({
  reducer: {
    report: reportReducer,
    user: userReducer,
    resident: residentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
