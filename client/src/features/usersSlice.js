import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { signIn, signOut } = usersSlice.actions;

export const selectUser = (state) => state.user.user;

export default usersSlice.reducer;
