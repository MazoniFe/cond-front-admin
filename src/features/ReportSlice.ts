// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Report } from '../assets/components/types';


interface ReportState {
  reports: Report[];
}

// Estado inicial
const initialState: ReportState = {
  reports: []
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReport(state, action: PayloadAction<Report>) {
      state.reports.push(action.payload);
    },
    overwriteReports(state, action: PayloadAction<Report[]>) {
        state.reports = action.payload;
      },
  },
});

export const { addReport, overwriteReports } = reportSlice.actions;

export default reportSlice.reducer;