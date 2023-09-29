import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  Users: [],
};

const userSlice = createSlice({
  name: "Users",
  intialState,
  reducers: {
    setUsers: (state, action) => {
      state.Users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

// thunk

