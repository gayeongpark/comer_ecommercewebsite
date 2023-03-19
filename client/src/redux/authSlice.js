import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.value = action.payload;
    },
    changeProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthUser, changeProfile } = authSlice.actions;

export default authSlice.reducer;
