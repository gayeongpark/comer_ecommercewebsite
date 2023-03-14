import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    name: authSlice.reducer,
  },
});

export const RooteState = store.getState();
export const AppDispatch = store.dispatch;
