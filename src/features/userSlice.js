import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Users: [],
  BookmarkedUser: [],
};

const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.Users = action.payload;
    },
    setBookmarkedUser: (state, action) => {
      state.BookmarkedUser.push(action.payload);
      let data = JSON.parse(localStorage.getItem("bookMarkedUser")) || [];

      data.push(action.payload);
      localStorage.setItem("bookMarkedUser", JSON.stringify(data));
    },
    setUnBookmarked: (state, action) => {
      state.BookmarkedUser = state.BookmarkedUser.filter(
        (user) => user.id !== action.payload
      );

      let data = JSON.parse(localStorage.getItem("bookMarkedUser")) || [];

      if (data.length > 0) {
        let filteredData = data.filter((user) => user.id !== action.payload);
        localStorage.setItem("bookMarkedUser", JSON.stringify(filteredData));
      }
    },
  },
});

export const { setUsers, setBookmarkedUser, setUnBookmarked } =
  userSlice.actions;
export default userSlice.reducer;

// thunk
export function fetchUsers() {
  return async function fetchUsersThunk(dispatch, getState) {
    try {
      const res = await fetch("https://api.github.com/users");
      const data = await res.json();
      dispatch(setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
}
