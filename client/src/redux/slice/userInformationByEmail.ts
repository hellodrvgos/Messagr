import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../types/types";

type InitialState = {
  userInfoByEmail: User;
  loginInfo: boolean;
};

const initialState: InitialState = {
  userInfoByEmail: {
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
    gitHub: "",
    phone: "",
  },
  loginInfo: false,
};

const userInfoByEmailSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    getUserInfoByEmail: (state, action) => {
      state.userInfoByEmail = action.payload;
    },
  },
});

export const userInfoByEmailActions = userInfoByEmailSlice.actions;

const userReducerByEmail = userInfoByEmailSlice.reducer;

export default userReducerByEmail;
