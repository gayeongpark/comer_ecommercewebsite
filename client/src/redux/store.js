import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    authUser: authReducer
  },
})

export const RooteState = store.getState();
export const AppDispatch = typeof store.dispatch;