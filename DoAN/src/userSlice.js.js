// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    resetUserId: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, resetUserId } = userSlice.actions;
export default userSlice.reducer;
