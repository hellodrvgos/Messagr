import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../types/types";

type InitialState = {
  userList: User[];
};
const initialState: InitialState = {
  userList: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action) => {
      state.userList = action.payload;
    },
    sortAscending: (state) => {
      state.userList.sort((a, b) =>
        a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0
      );
    },
    sortDescending: (state) => {
      state.userList.sort((a, b) =>
        a.firstName < b.firstName ? 1 : b.firstName < a.firstName ? -1 : 0
      );
    },
  },
});

export const userActions = usersSlice.actions;
const userReducer = usersSlice.reducer;
export default userReducer;
