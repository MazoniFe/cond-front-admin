// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../assets/components/types';


interface UserState {
  users: User[];
}

// Estado inicial
const initialState: UserState = {
  users: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    overwriteUsers(state, action: PayloadAction<User[]>) {
        state.users = action.payload;
      },
  },
});

export const { addUser, overwriteUsers } = userSlice.actions;

// Exportando o reducer
export default userSlice.reducer;