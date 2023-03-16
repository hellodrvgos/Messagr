import { createSlice } from "@reduxjs/toolkit";

import { User} from "../../types/types";

type InitialState ={
    userList: User[],
    userDetail: {
      _id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
      isBanned: false,
      avatar: "",
      role: "",
      location: "",
      github: "",
      phone: 1,
    },
  };
const initialState: InitialState = {
  userList: [],
  userDetail: {
    _id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    isBanned: false,
    avatar: "",
    role: "",
    location: "",
    github: "",
    phone: 1,
  },
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action) => {
      state.userList = action.payload;
    },
    getUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});
export const userActions = usersSlice.actions;
const userReducer = usersSlice.reducer;
export default userReducer;
