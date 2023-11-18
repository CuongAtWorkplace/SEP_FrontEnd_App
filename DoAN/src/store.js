import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Thêm các reducer khác nếu có
  },
});

export default store;
