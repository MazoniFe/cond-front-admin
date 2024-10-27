// src/features/ResidentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resident } from '../assets/components/types';


interface ResidentState {
  Residents: Resident[];
}

// Estado inicial
const initialState: ResidentState = {
  Residents: []
};

const ResidentSlice = createSlice({
  name: 'Resident',
  initialState,
  reducers: {
    addResident(state, action: PayloadAction<Resident>) {
      state.Residents.push(action.payload);
    },
    overwriteResidents(state, action: PayloadAction<Resident[]>) {
        state.Residents = action.payload;
      },
  },
});

export const { addResident, overwriteResidents } = ResidentSlice.actions;

export default ResidentSlice.reducer;